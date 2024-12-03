'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { safeGet } = require('safe-utils')
const apis = require('../api')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { getSyllabus, getLadokRoundIds, getLadokRoundUids } = require('../koppsApi')
const { getLadokCourseData, getExaminationModules } = require('../ladokApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const { getCourseEmployees } = require('../ugRestApi')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const i18n = require('../../i18n')

const combineDefaultValues = (freshMemoData, koppsFreshData) => {
  const { equipment, scheduleDetails, literature, possibilityToCompletion, possibilityToAddition } = freshMemoData
  const updatedWithDefaults = {
    ...freshMemoData,
    // eslint-disable-next-line no-use-before-define
    equipment: equipment || koppsFreshData.equipmentTemplate || '',
    scheduleDetails: scheduleDetails || '',
    literature: literature || koppsFreshData.literatureTemplate || '',
    possibilityToCompletion: possibilityToCompletion || koppsFreshData.possibilityToCompletionTemplate || '',
    possibilityToAddition: possibilityToAddition || koppsFreshData.possibilityToAdditionTemplate || '',
  }

  return updatedWithDefaults
}

const removeTemplatesFromKoppsFreshData = async koppsFreshData => {
  // no map()
  // to send cleaned up koppsFreshData to client side end then to api
  await delete koppsFreshData.equipmentTemplate
  await delete koppsFreshData.literatureTemplate
  await delete koppsFreshData.possibilityToCompletionTemplate
  await delete koppsFreshData.possibilityToAdditionTemplate
  return koppsFreshData
}

const refreshMemoData = (defaultAndMemoApiValues, cleanKoppsFreshData) => ({
  ...defaultAndMemoApiValues,
  ...cleanKoppsFreshData,
})

async function mergeKoppsAndMemoData(koppsFreshData, apiMemoData) {
  const defaultAndMemoApiValues = await combineDefaultValues(apiMemoData, koppsFreshData)
  const cleanKoppsFreshData = await removeTemplatesFromKoppsFreshData(koppsFreshData)
  const newMemoData = refreshMemoData(defaultAndMemoApiValues, cleanKoppsFreshData)
  return newMemoData
}

const mergeAllData = async (koppsData, ladokData, apiMemoData, combinedExamInfo) => {
  const mergedKoppsAndMemoData = await mergeKoppsAndMemoData(koppsData, apiMemoData)
  const mainSubjectsArray = ladokData.huvudomraden.map(subject => subject.name)
  const mainSubjects = mainSubjectsArray.join()
  delete mergedKoppsAndMemoData.courseTitle
  delete mergedKoppsAndMemoData.examination
  delete mergedKoppsAndMemoData.examinationModules
  return {
    credits: ladokData.omfattning,
    title: ladokData.benamning,
    courseTitle: `${ladokData.kod} ${ladokData.benamning} ${ladokData.omfattning.formattedWithUnit}`,
    departmentName: ladokData.organisation.name,
    educationalTypeId: ladokData.utbildningstyp.id,
    mainSubjects,
    examination: combinedExamInfo.examination,
    examinationModules: combinedExamInfo.examinationModules,
    ...mergedKoppsAndMemoData,
  }
}

function combineExamInfo(examinationModules, examComments) {
  const examModulesHtmlList = examinationModules.completeExaminationStrings
    ? `<p><ul>${examinationModules.completeExaminationStrings}</ul></p>`
    : ''
  const examination = `${examModulesHtmlList}${examComments ? `<p>${examComments}</p>` : ''}`
  return { examination, examinationModules: examinationModules.examinationTitles }
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
    const apiMemoDataDeepCopy = apiMemoData
    const { applicationCodes } = apiMemoDataDeepCopy

    // fix this so there's only one function
    apiMemoDataDeepCopy.ladokRoundIds = await getLadokRoundIds(courseCode, semester, applicationCodes)
    const ladokRoundUids = await getLadokRoundUids(courseCode, semester)

    // end
    const koppsFreshData = {
      ...(await getSyllabus(courseCode, semester, memoLangAbbr)),
      ...(await getCourseEmployees(apiMemoDataDeepCopy)),
    }

    // Just pick one of them
    const examinationModules = await getExaminationModules(ladokRoundUids[0], memoLangAbbr)
    const combinedExamInfo = combineExamInfo(examinationModules, koppsFreshData.examComments)

    const ladokCourseData = await getLadokCourseData(courseCode, userLang)

    applicationStore.memoData = await mergeAllData(koppsFreshData, ladokCourseData, apiMemoData, combinedExamInfo)

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
  mergeKoppsAndMemoData,
  mergeAllData,
  renderMemoEditorPage,
  removeTemplatesFromKoppsFreshData,
  updateContentByEndpoint,
}
