'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { safeGet } = require('safe-utils')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const apis = require('../api')

const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const { getCourseInfo } = require('../kursInfoApi')

const { getSyllabus } = require('../koppsApi')
const i18n = require('../../i18n')

function resolveSellingText(sellingText, recruitmentText, lang) {
  return sellingText[lang] ? sellingText[lang] : recruitmentText
}

// eslint-disable-next-line consistent-return
async function publishMemoByEndPoint(req, res, next) {
  try {
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData('publishMemoByEndPoint', { memoEndPoint }, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API trying to publish a new memo: ', apiResponse.message)
    }
    log.info('New memo was published in kurs-pm-data-api for course memo with memoEndPoint:', memoEndPoint)
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in publishMemoByEndPoint', { error: err })
    next(err)
  }
}

async function renderMemoPreviewPage(req, res, next) {
  try {
    const userLang = language.getLanguage(res) || 'sv'
    const langIndex = userLang === 'en' ? 0 : 1
    const { courseCode, memoEndPoint } = req.params
    // STORE MANIPULATIONS
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const applicationStore = createStore()

    applicationStore.setBrowserConfig(browser, serverPaths, apis, server.hostUrl)
    applicationStore.doSetLanguageIndex(userLang)
    const apiMemoData = await getMemoApiData('getDraftByEndPoint', { memoEndPoint })
    const allApiMemoData = await getMemoApiData('getAllMemosByCourseCodeAndType', {
      courseCode,
      type: 'published',
    })
    applicationStore.memoDatas = allApiMemoData
    applicationStore.memoData = apiMemoData
    const { semester, memoCommonLangAbbr } = apiMemoData
    const memoLangAbbr = memoCommonLangAbbr || userLang
    applicationStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester: '',
      memoLangAbbr,
    })
    applicationStore.koppsFreshData = await getSyllabus(courseCode, semester, memoLangAbbr)

    const { sellingText, imageInfo } = await getCourseInfo(courseCode)
    const { recruitmentText } = applicationStore.koppsFreshData
    applicationStore.sellingText = resolveSellingText(sellingText, recruitmentText, memoLangAbbr)
    applicationStore.imageFromAdmin = imageInfo

    await applicationStore.setSectionsStructure()

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = server.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    res.render('preview/index', {
      compressedStoreCode,
      html: view,
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name,
        url: `${server.hostUrl}${server.hostUrl.includes('.se/') ? '' : '/'}kursinfoadmin/kurser/kurs/${courseCode}`,
      },
      title: userLang === 'sv' ? 'Administrera Om kursen' : 'Administer About course',
      lang: userLang,
      languageLink: {
        title: i18n.messages[langIndex === 0 ? 1 : 0].messages.locale_text,
        toLang: `?l=${userLang === 'sv' ? 'en' : 'sv'}`,
      },
      instrumentationKey: server.appInsights.instrumentationKey,
      description:
        userLang === 'sv'
          ? 'Kursinformation – Förhandsgranskning av kurs-PM'
          : 'Course Information – Preview of course memos',
    })
  } catch (err) {
    log.error('Error in renderMemoPreviewPage', { error: err })
    next(err)
  }
}

module.exports = {
  publishMemoByEndPoint,
  renderMemoPreviewPage,
}
