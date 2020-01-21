'use strict'

const apis = require('../api')
// const kursPmDataApi = require('../kursPmDataApi')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
const { getSyllabus } = require('../koppsApi')
const { getMemoDataById, postMemoDataById } = require('../kursPmDataApi')
const { getCourseEmployees } = require('../ugRedisApi')
const { safeGet } = require('safe-utils')
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

async function getContent(req, res, next) {
  try {
    const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const { courseCode, semester } = req.params
    const renderProps = _staticRender(context, req.url)

    // renderProps.props.children.props.routerStore.getData(courseCode, semester)
    renderProps.props.children.props.routerStore.setBrowserConfig(
      browser,
      serverPaths,
      apis,
      server.hostUrl
    )
    renderProps.props.children.props.routerStore.courseCode = courseCode
    renderProps.props.children.props.routerStore.semester = semester
    renderProps.props.children.props.routerStore.koppsFreshData = {
      ...(await getSyllabus(courseCode, semester, lang)),
      ...(await getCourseEmployees(courseCode, semester, '1'))
    }
    console.log('fresh data', renderProps.props.children.props.routerStore.koppsFreshData)
    renderProps.props.children.props.routerStore.memoData = await getMemoDataById(
      courseCode,
      semester,
      lang
    )
    await renderProps.props.children.props.routerStore.combineDefaultValues()

    const html = ReactDOMServer.renderToString(renderProps)

    res.render('memo/index', {
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
    log.error('Error in getContent', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function updateContent(req, res, next) {
  try {
    const { courseCode, semester } = req.params
    // const lang = language.getLanguage(res) || 'sv'
    const result = await postMemoDataById(courseCode, semester, req.body)
    if (safeGet(() => result.body.message)) {
      log.error('Error from API: ', result.body.message)
    }
    log.info('Memo contents was updated in kursinfo api for course:', courseCode)
    return res.json(result)
  } catch (err) {
    log.error('Error in updateDescription', { error: err })
    next(err)
  }
}

module.exports = {
  getContent,
  updateContent
}
