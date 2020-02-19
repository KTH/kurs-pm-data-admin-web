'use strict'

const apis = require('../api')
// const kursPmDataApi = require('../kursPmDataApi')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const { toJS } = require('mobx')

const ReactDOMServer = require('react-dom/server')
const { getKoppsCourseRoundTerms } = require('../koppsApi')
const { getAllMemosByCourseCode } = require('../kursPmDataApi')
// const { safeGet } = require('safe-utils')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')

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

async function getCourseRounds(req, res, next) {
  try {
    const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const { courseCode } = req.params
    const semester =
      req.query.semester && req.query.semester.match(/^[0-9]{5}$/) ? req.query.semester : ''
    const rounds = (req.query.rounds && req.query.rounds.split(',')) || []
    // req.query.rounds && req.query.rounds.match(/^[0-9][,]{10}$/) ? req.query.rounds.split(',') : []
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
    renderProps.props.children.props.routerStore.rounds = rounds
    renderProps.props.children.props.routerStore.koppsCourseRounds = await getKoppsCourseRoundTerms(
      courseCode
    )
    renderProps.props.children.props.routerStore.memoData = await getAllMemosByCourseCode(
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
    log.error('Error in getContent', { error: err })
    next(err)
  }
}

module.exports = {
  getCourseRounds
}
