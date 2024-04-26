/* eslint-disable prefer-destructuring */
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

const { getSyllabus, getKoppsCourseRoundTerms } = require('../koppsApi')
const i18n = require('../../i18n')
const { HttpError } = require('../utils/errorUtils')

function getCurrentTerm(overrideDate) {
  const JULY = 6
  const SPRING = 1
  const FALL = 2
  const currentDate = overrideDate || new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentSemester = currentMonth < JULY ? SPRING : FALL
  return `${currentYear * 10 + currentSemester}`
}

function resolveSellingText(sellingText, recruitmentText, lang) {
  return sellingText[lang] ? sellingText[lang] : recruitmentText
}

function fetchStartDates(miniKoppsObj, semester) {
  const { lastTermsInfo } = miniKoppsObj
  const thisTermInfo = lastTermsInfo.find(({ term }) => term === semester)
  const { rounds } = thisTermInfo
  const roundsStartDate = rounds.map(round => round.firstTuitionDate)

  return roundsStartDate
}
function addRoudsStartDate(startDates, memoData) {
  const newMemoData = { ...memoData, roundsStartDate: startDates }

  return newMemoData
}
function isDateWithInCurrentOrFutureSemester(startSemesterDate, endSemesterDate) {
  const currentDate = new Date()
  const startSemester = new Date(startSemesterDate)
  const endSemester = new Date(endSemesterDate)
  if (startSemester.valueOf() >= currentDate.valueOf() || endSemester.valueOf() >= currentDate.valueOf()) {
    return true
  }
  return false
}
function removeDuplicates(elements) {
  return elements.filter((term, index) => elements.indexOf(term) === index)
}
function outdatedMemoData(offerings, startSelectionYear, memoData) {
  // Course memo semester is in current or previous year
  const memoYear = Math.floor(memoData.semester / 10)
  if (memoYear >= startSelectionYear && memoData.semester >= getCurrentTerm()) {
    return false
  }

  // Course offering in memo has end year later or equal to previous year
  const offering = offerings.find(offer => {
    const { rounds } = offer
    const { term } = offer
    if (rounds.length > 0) {
      const { applicationCode = '' } = rounds[0]
      if (memoData.applicationCodes.includes(applicationCode) && memoData.semester === String(term)) {
        return offer
      }
    }
    return false
  })

  if (offering) {
    const { rounds } = offering
    if (rounds.length > 0) {
      const { lastTuitionDate } = rounds[0]
      const year = lastTuitionDate.substring(0, 4)
      const currentDate = new Date()
      const endSemester = new Date(lastTuitionDate)
      if (year >= startSelectionYear && endSemester.valueOf() >= currentDate.valueOf()) {
        return false
      }
    }
  }

  // Course memo does not meet the criteria
  return true
}
function markOutdatedMemoDatas(memoDatas = [], miniKoppsObj) {
  const { lastTermsInfo } = miniKoppsObj

  if (!Array.isArray(memoDatas)) {
    log.error('markOutdatedMemoDatas received non-Array memoDatas argument', memoDatas)
    return []
  }
  // for test
  if (memoDatas.length === 0 || lastTermsInfo.length === 0) {
    return []
  }

  const allActiveTerms = lastTermsInfo.filter(r =>
    isDateWithInCurrentOrFutureSemester(r.rounds[0].firstTuitionDate, r.rounds[0].lastTuitionDate)
  )
  const activeYears = removeDuplicates(allActiveTerms.map(t => t.term.substring(0, 4))).sort()
  const startSelectionYear = activeYears[0]

  const offerings = lastTermsInfo.filter(r =>
    r.rounds &&
    r.rounds[0].applicationCodes &&
    r.rounds[0].firstTuitionDate &&
    r.rounds[0].lastTuitionDate.substring(0, 4) >= startSelectionYear
      ? {
          semester: r.term,
          endYear: r.rounds[0].lastTuitionDate.substring(0, 4),
        }
      : {}
  )

  const markedOutDatedMemoDatas = memoDatas.map(m => ({
    ...m,
    ...{
      outdated: outdatedMemoData(offerings, startSelectionYear, m),
      // startDate: extendMemoWithStartDate(offerings, m),
    },
  }))

  return markedOutDatedMemoDatas.reverse()
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
  } catch (error) {
    log.error('Error in publishMemoByEndPoint', { error })
    if (error instanceof HttpError) {
      res.status(error.status).json(error.message)
      return error
    }
    next(error)
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
    const miniKoppsObj = await getKoppsCourseRoundTerms(courseCode)
    const memoDataAsArray = []
    // will be used later for add flag outdated to new pm
    memoDataAsArray.push(apiMemoData)
    applicationStore.memoData = markOutdatedMemoDatas(memoDataAsArray, miniKoppsObj)[0]
    const { semester, memoCommonLangAbbr } = apiMemoData
    const memoLangAbbr = memoCommonLangAbbr || userLang
    applicationStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester: '',
      memoLangAbbr,
    })
    applicationStore.koppsFreshData = await getSyllabus(courseCode, semester, memoLangAbbr)
    const startDates = fetchStartDates(miniKoppsObj, semester)
    const { sellingText, imageInfo } = await getCourseInfo(courseCode)
    const { recruitmentText } = applicationStore.koppsFreshData
    applicationStore.sellingText = resolveSellingText(sellingText, recruitmentText, memoLangAbbr)
    applicationStore.imageFromAdmin = imageInfo
    applicationStore.memoData = addRoudsStartDate(startDates, applicationStore.memoData)
    await applicationStore.setSectionsStructure()
    applicationStore.activeTermsPublishedMemos = markOutdatedMemoDatas(applicationStore.memoDatas, miniKoppsObj)

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
