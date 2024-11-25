'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { safeGet } = require('safe-utils')
const apis = require('../api')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { getCourseInfo } = require('../kursinfoApi')
const { getSyllabus, getLadokRoundIds } = require('../koppsApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const { getCourseEmployees } = require('../ugRestApi')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const i18n = require('../../i18n')

const combineDefaultValues = freshMemoData => {
  const { equipment, scheduleDetails, literature, possibilityToCompletion, possibilityToAddition } = freshMemoData
  const updatedWithDefaults = {
    ...freshMemoData,
    // eslint-disable-next-line no-use-before-define
    equipment: equipment || '',
    scheduleDetails: scheduleDetails || '',
    literature: literature || '',
    possibilityToCompletion: possibilityToCompletion || '',
    possibilityToAddition: possibilityToAddition || '',
  }

  return updatedWithDefaults
}

const refreshMemoData = (defaultAndMemoApiValues, koppsFreshData, courseInfoData) => ({
  ...defaultAndMemoApiValues,
  ...koppsFreshData,
  prerequisites: courseInfoData.recommendedPrerequisites,
})

async function mergeKoppsCourseAndMemoData(koppsFreshData, courseInfoData, apiMemoData) {
  const defaultAndMemoApiValues = await combineDefaultValues(apiMemoData, koppsFreshData)
  const newMemoData = refreshMemoData(defaultAndMemoApiValues, koppsFreshData, courseInfoData)
  return newMemoData
}

async function renderMemoEditorPage(req, res, next) {
  try {
    const userLang = language.getLanguage(res) || 'sv'
    const langIndex = userLang === 'en' ? 0 : 1
    const translateTo = userLang === 'en' ? 1 : 0
    const { courseCode, memoEndPoint } = req.params
    const { action = '' } = req.query
    // STORE MANIPULATIONS
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const applicationStore = createStore()

    const apiMemoData = await getMemoApiData('getDraftByEndPoint', { memoEndPoint })
    const { semester, memoCommonLangAbbr } = apiMemoData
    const memoLangAbbr = memoCommonLangAbbr || userLang

    applicationStore.rebuildDraftFromPublishedVer = action === 'rebuild'

    applicationStore.setBrowserConfig(browser, serverPaths, apis, server.hostUrl)

    applicationStore.doSetLanguageIndex(userLang)

    applicationStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester,
      memoLangAbbr,
    })

    /**
     * This is temporary to fetch only round id for UG Rest Api.
     * Because UG Rest Api is using ladok round id in its group names still.
     * So once it gets updated then this will be removed.
     */

    // start
    const apiMemoDataDeepCopy = JSON.parse(JSON.stringify(apiMemoData))
    const { applicationCodes } = apiMemoDataDeepCopy

    apiMemoDataDeepCopy.ladokRoundIds = await getLadokRoundIds(courseCode, semester, applicationCodes)
    // end
    const koppsFreshData = {
      ...(await getSyllabus(courseCode, semester, memoLangAbbr)),
      ...(await getCourseEmployees(apiMemoDataDeepCopy)),
    }
    const courseInfoData = await getCourseInfo(courseCode, memoLangAbbr)

    applicationStore.memoData = await mergeKoppsCourseAndMemoData(koppsFreshData, courseInfoData, apiMemoData)

    await applicationStore.setSectionsStructure()

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = server.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    res.render('memo/index', {
      compressedStoreCode,
      html: view,
      title: userLang === 'sv' ? 'Administrera Om kursen' : 'Administer About course',
      // initialState: JSON.stringify(hydrateStores(renderProps)),
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name,
        url: `${server.hostUrl}${server.hostUrl.includes('.se/') ? '' : '/'}kursinfoadmin/kurser/kurs/${courseCode}`,
      },
      languageLink: {
        title: i18n.messages[translateTo].messages.locale_text,
        toLang: `?l=${userLang === 'sv' ? 'en' : 'sv'}`,
      },
      toolbarUrl: server.toolbar.url,
      theme: 'student-web',
      proxyPrefix,
      lang: userLang,
      description:
        userLang === 'sv'
          ? 'Kursinformation – Administration av kurs-PM'
          : 'Course Information – Administration of course memos',
    })
  } catch (err) {
    log.error('Error in getContent', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function updateContentByEndpoint(req, res, next) {
  try {
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData('updateCreatedDraft', { memoEndPoint }, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API: ', apiResponse.message)
    }
    log.info('Memo contents was updated in kurs-pm-data-api for memo: ', memoEndPoint)
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in updateContentByEndpoint', { error: err })
    next(err)
  }
}

module.exports = {
  combineDefaultValues,
  mergeKoppsCourseAndMemoData,
  renderMemoEditorPage,
  updateContentByEndpoint,
}
