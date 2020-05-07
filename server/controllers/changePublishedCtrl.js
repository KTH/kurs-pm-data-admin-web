'use strict'

const apis = require('../api')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
const { getKoppsCourseRoundTerms } = require('../koppsApi')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const { getMemoApiData } = require('../kursPmDataApi')

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

async function getChangePublishedStartPage(req, res, next) {
  // TODO MAYBE IT IS NOT NEEDED
  try {
    const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const { courseCode } = req.params
    const renderProps = _staticRender(context, req.url)

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
      title: lang === 'sv' ? 'Administration av kurs-PM' : 'Administration of course memos',
      lang,
      initialState: JSON.stringify(hydrateStores(renderProps)),
      description:
        lang === 'sv'
          ? '[NY] Kursinformation – Administration av kurs-PM'
          : '[NEW] Course Information – Administration of course memos'
    })
  } catch (err) {
    log.error('Error in getChangePublishedStartPage', { error: err })
    next(err)
  }
}

module.exports = {
  getChangePublishedStartPage
}
