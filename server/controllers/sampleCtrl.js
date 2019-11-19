'use strict'

const api = require('../api')
const log = require('kth-node-log')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')

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
    const renderProps = _staticRender(context, req.url)

    renderProps.props.children.props.routerStore.getData()

    const html = ReactDOMServer.renderToString(renderProps)

    res.render('sample/index', {
      html,
      title: 'TODO',
      initialState: JSON.stringify(hydrateStores(renderProps)),
      // lang: lang,
      description: 'TODO' // lang === 'sv' ? "KTH  för "+courseCode.toUpperCase() : "KTH course information "+courseCode.toUpperCase()
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex
}
