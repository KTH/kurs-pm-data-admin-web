'use strict'

const apis = require('../api')
// const kursPmDataApi = require('../kursPmDataApi')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
const { getSyllabus } = require('../koppsApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
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

async function renderMemoEditorPage(req, res, next) {
  try {
    const context = {}
    const userLang = language.getLanguage(res) || 'sv'
    const { courseCode, memoEndPoint } = req.params
    const renderProps = _staticRender(context, req.url)
    const apiMemoData = await getMemoApiData('getDraftByEndPoint', { memoEndPoint })

    renderProps.props.children.props.routerStore.setBrowserConfig(
      browser,
      serverPaths,
      apis,
      server.hostUrl
    )
    renderProps.props.children.props.routerStore.doSetLanguageIndex(userLang)

    renderProps.props.children.props.routerStore.memoData = apiMemoData
    renderProps.props.children.props.routerStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester: apiMemoData.semester,
      memoLangAbbr: apiMemoData.memoCommonLangAbbr || userLang
    })
    renderProps.props.children.props.routerStore.koppsFreshData = {
      ...(await getSyllabus(
        courseCode,
        apiMemoData.semester,
        apiMemoData.memoCommonLangAbbr || userLang
      )), // TODO: use apiMemoData instead
      ...(await getCourseEmployees(apiMemoData))
    }

    await renderProps.props.children.props.routerStore.combineDefaultValues()
    await renderProps.props.children.props.routerStore.removeTemplatesFromKoppsFreshData()
    await renderProps.props.children.props.routerStore.updateMemoDataWithFreshKoppsData()

    const html = ReactDOMServer.renderToString(renderProps)

    res.render('memo/index', {
      html,
      title: userLang === 'sv' ? 'Administration av kurs-PM' : 'Administration of course memos',
      initialState: JSON.stringify(hydrateStores(renderProps)),
      userLang,
      description:
        userLang === 'sv'
          ? '[NY] Kursinformation – Administration av kurs-PM'
          : '[NEW] Course Information – Administration of course memos'
    })
  } catch (err) {
    log.error('Error in getContent', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function updateContentByEndpoint(req, res, next) {
  try {
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData('updateCreatedDraft', memoEndPoint, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API: ', apiResponse.message)
    }
    log.info('Memo contents was updated in kursinfo api for memo: ', memoEndPoint)
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in updateContentByEndpoint', { error: err })
    next(err)
  }
}

module.exports = {
  renderMemoEditorPage,
  updateContentByEndpoint
}
