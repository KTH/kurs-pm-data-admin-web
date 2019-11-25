'use strict'

const api = require('../api')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
const { getSyllabus } = require('../koppsApi')

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

async function getIndex(req, res, next) {
  try {
    const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const { courseCode, semester } = req.params
    const renderProps = _staticRender(context, req.url)

    // renderProps.props.children.props.routerStore.getData(courseCode, semester)
    renderProps.props.children.props.routerStore.syllabusObjFromKopps = await getSyllabus(
      courseCode,
      semester,
      lang
    )
    const html = ReactDOMServer.renderToString(renderProps)

    res.render('sample/index', {
      html,
      title: lang === 'sv' ? 'Administration av kurs-PM' : 'Administration of course memos',
      initialState: JSON.stringify(hydrateStores(renderProps)),
      lang,
      description:
        lang === 'sv'
          ? '[NY] Kursinformation – Administration av kurs-PM'
          : '[NEW] Course Information – Administration of course memos'
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex
}
