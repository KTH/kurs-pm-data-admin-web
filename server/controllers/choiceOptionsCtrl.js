'use strict'

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { safeGet } = require('safe-utils')
const apis = require('../api')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { getKoppsCourseRoundTerms } = require('../koppsApi')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const i18n = require('../../i18n')

// eslint-disable-next-line consistent-return
async function getUsedDrafts(req, res, next) {
  const { courseCode } = req.params
  try {
    log.debug('trying to fetch getUsedDrafts with course code: ' + courseCode)

    const apiResponse = await getMemoApiData('getMemosStartingFromPrevYearSemester', {
      courseCode,
    })
    log.debug('getUsedDrafts response: ', apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error('Exception from getUsedDrafts ', { error })
    next(error)
  }
}

async function getCourseOptionsPage(req, res, next) {
  try {
    // const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const langIndex = lang === 'en' ? 0 : 1
    const { courseCode } = req.params
    // STORE MANIPULATIONS
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const applicationStore = createStore()
    applicationStore.setBrowserConfig(browser, serverPaths, apis, server.hostUrl)
    applicationStore.doSetLanguageIndex(lang)
    applicationStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint: req.query.memoEndPoint || '',
    })

    applicationStore.miniKoppsObj = await getKoppsCourseRoundTerms(courseCode)

    applicationStore.miniMemos = await getMemoApiData('getMemosStartingFromPrevYearSemester', {
      courseCode,
    })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = server.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    res.render('memo/index', {
      compressedStoreCode,
      html,
      title: i18n.messages[langIndex].messages.site_name,
      lang,
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name + courseCode,
        url: server.hostUrl + '/kursinfoadmin/kurser/kurs/' + courseCode,
      },
      languageLink: {
        title: i18n.messages[langIndex === 0 ? 1 : 0].messages.locale_text,
        toLang: `?l=${lang === 'sv' ? 'en' : 'sv'}`,
      },
      instrumentationKey: server.appInsights.instrumentationKey,
      proxyPrefix,
      description:
        lang === 'sv'
          ? 'Kursinformation – Administration av kurs-PM'
          : 'Course Information – Administration of course memos',
    })
  } catch (err) {
    log.error('Error in getCourseOptionsPage', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function getUsedRounds(req, res, next) {
  const { courseCode, semester } = req.params
  try {
    log.debug('trying to fetch getUsedRounds with course code: ' + courseCode + ' and semester: ' + semester)

    const apiResponse = await getMemoApiData('getCourseSemesterUsedRounds', {
      courseCode,
      semester,
    })
    log.debug('getUsedRounds response: ', apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error('Exception from getUsedRounds ', { error })
    next(error)
  }
}

// eslint-disable-next-line consistent-return
async function createDraftByMemoEndPoint(req, res, next) {
  try {
    const { memoEndPoint, anotherMemoEndPoint } = req.params
    const apiPathId = anotherMemoEndPoint ? 'copyFromAPublishedMemo' : 'createDraftByMemoEndPoint'

    const apiResponse = await changeMemoApiData(apiPathId, { memoEndPoint, anotherMemoEndPoint }, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API trying to create a new draft: ', apiResponse.message)
    }
    log.info('New memo draft was created in kursinfo api for course memo with memoEndPoint:', memoEndPoint)
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in createDraftCopyOfPublishedMemo', { error: err })
    next(err)
  }
}

async function removeMemoDraft(req, res, next) {
  try {
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData('deleteDraftByMemoEndPoint', { memoEndPoint }, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API trying to delete a draft: ', apiResponse.message)
    }
    log.info('Memo contents was deleted in kursinfo api for course memo with memoEndPoint:', memoEndPoint)
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in deleting of a draft', { err })
    next(err)
  }
}

module.exports = {
  createDraftByMemoEndPoint,
  getCourseOptionsPage,
  getUsedRounds,
  getUsedDrafts,
  removeMemoDraft,
}
