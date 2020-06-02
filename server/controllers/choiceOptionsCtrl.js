'use strict'

const apis = require('../api')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const { toJS } = require('mobx')
const { safeGet } = require('safe-utils')
const ReactDOMServer = require('react-dom/server')
const { getKoppsCourseRoundTerms } = require('../koppsApi')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const i18n = require('../../i18n')

function hydrateStores(renderProps) {
  // This assumes that all stores are specified in a root element called Provider
  const outp = {}
  const { props } = renderProps.props.children

  Object.keys(props).map(key => {
    if (typeof props[key].initializeStore === 'function') {
      outp[key] = encodeURIComponent(JSON.stringify(toJS(props[key], true)))
    }
  })

  return outp
}

// eslint-disable-next-line consistent-return
async function getUsedDrafts(req, res, next) {
  const { courseCode } = req.params
  try {
    log.debug('trying to fetch getUsedDrafts with course code: ' + courseCode)

    const apiResponse = await getMemoApiData('getMemosStartingFromPrevYearSemester', {
      courseCode
    })
    log.debug('getUsedDrafts response: ', apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error('Exception from getUsedDrafts ', { error })
    next(error)
  }
}
function _staticRender(context, location) {
  if (process.env.NODE_ENV === 'development') {
    delete require.cache[require.resolve('../../dist/app.js')]
  }

  const { staticRender } = require('../../dist/app.js')

  return staticRender(context, location)
}

async function getCourseOptionsPage(req, res, next) {
  try {
    const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const langIndex = lang === 'en' ? 0 : 1
    const { courseCode } = req.params
    const renderProps = _staticRender(context, req.url)

    // renderProps.props.children.props.routerStore.getData(courseCode, semester)
    renderProps.props.children.props.routerStore.setBrowserConfig(
      browser,
      serverPaths,
      apis,
      server.hostUrl
    )
    renderProps.props.children.props.routerStore.doSetLanguageIndex(lang)
    renderProps.props.children.props.routerStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint: req.query.memoEndPoint || ''
    })
    renderProps.props.children.props.routerStore.slicedTermsByPrevYear = await getKoppsCourseRoundTerms(
      courseCode
    )
    // await renderProps.props.children.props.routerStore.fetchExistingMemos(courseCode)
    renderProps.props.children.props.routerStore.existingLatestMemos = await getMemoApiData(
      'getMemosStartingFromPrevYearSemester',
      {
        courseCode
      }
    )

    // TODO GET AWAIT COURSE
    const html = ReactDOMServer.renderToString(renderProps)
    res.render('memo/index', {
      html,
      title: i18n.messages[langIndex].messages.site_name,
      lang,
      initialState: JSON.stringify(hydrateStores(renderProps)),
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name + courseCode,
        url: server.hostUrl + '/kursinfoadmin/kurser/kurs/' + courseCode
      },
      languageLink: {
        title: i18n.messages[langIndex === 0 ? 1 : 0].messages.locale_text,
        toLang: `?l=${lang === 'sv' ? 'en' : 'sv'}`
      },
      description:
        lang === 'sv'
          ? '[NY] Kursinformation – Administration av kurs-PM'
          : '[NEW] Course Information – Administration of course memos'
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
    log.debug(
      'trying to fetch getUsedRounds with course code: ' + courseCode + ' and semester: ' + semester
    )

    const apiResponse = await getMemoApiData('getCourseSemesterUsedRounds', {
      courseCode,
      semester
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
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData(
      'createDraftByMemoEndPoint',
      { memoEndPoint },
      req.body
    )
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API trying to create a new draft: ', apiResponse.message)
    }
    log.info(
      'New memo draft was created in kursinfo api for course memo with memoEndPoint:',
      memoEndPoint
    )
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in createDraftCopyOfPublishedMemo', { error: err })
    next(err)
  }
}

async function removeMemoDraft(req, res, next) {
  try {
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData(
      'deleteDraftByMemoEndPoint',
      { memoEndPoint },
      req.body
    )
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API trying to delete a draft: ', apiResponse.message)
    }
    log.info(
      'Memo contents was deleted in kursinfo api for course memo with memoEndPoint:',
      memoEndPoint
    )
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
  removeMemoDraft
}
