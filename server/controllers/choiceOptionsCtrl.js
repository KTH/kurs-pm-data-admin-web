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
const { getMemoApiData, saveToMemoApi } = require('../kursPmDataApi')

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
    const { courseCode } = req.params
    const semester =
      req.query.semester && req.query.semester.match(/^[0-9]{5}$/) ? req.query.semester : ''
    const renderProps = _staticRender(context, req.url)

    // renderProps.props.children.props.routerStore.getData(courseCode, semester)
    renderProps.props.children.props.routerStore.setBrowserConfig(
      browser,
      serverPaths,
      apis,
      server.hostUrl
    )
    renderProps.props.children.props.routerStore.doSetLanguageIndex(lang)
    renderProps.props.children.props.routerStore.courseCode = courseCode
    renderProps.props.children.props.routerStore.semester = semester
    renderProps.props.children.props.routerStore.memoEndPoint = req.query.memoEndPoint || ''
    renderProps.props.children.props.routerStore.allRoundsOfCourseFromKopps = await getKoppsCourseRoundTerms(
      courseCode
    )

    const html = ReactDOMServer.renderToString(renderProps)
    res.render('memo/index', {
      html,
      title: lang === 'sv' ? 'Administration av kurs-PM' : 'Administration of course memos',
      lang,
      initialState: JSON.stringify(hydrateStores(renderProps)),
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

    const apiResponse = await getMemoApiData('getUsedRounds', { courseCode, semester })
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
    const apiResponse = await saveToMemoApi('createDraftByMemoEndPoint', { memoEndPoint }, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API: ', apiResponse.message)
    }
    log.info(
      'Memo contents was updated in kursinfo api for course memo with memoEndPoint:',
      memoEndPoint
    )
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in createDraftCopyOfPublishedMemo', { error: err })
    next(err)
  }
}

module.exports = {
  createDraftByMemoEndPoint,
  getCourseOptionsPage,
  getUsedRounds
}
