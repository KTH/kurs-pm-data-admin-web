'use strict'

const apis = require('../api')
// const kursPmDataApi = require('../kursPmDataApi')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const { getMemoApiData } = require('../kursPmDataApi')
const { getCourseInfo } = require('../kursInfoApi')

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

function resolveSellingText(sellingText, recruitmentText, lang) {
  return sellingText[lang] ? sellingText[lang] : recruitmentText
}

async function renderMemoPreviewPage(req, res, next) {
  try {
    const context = {}
    const userLang = language.getLanguage(res) || 'sv'
    const { courseCode, memoEndPoint } = req.params
    const renderProps = _staticRender(context, req.url)

    renderProps.props.children.props.routerStore.setBrowserConfig(
      browser,
      serverPaths,
      apis,
      server.hostUrl
    )
    renderProps.props.children.props.routerStore.doSetLanguageIndex(userLang)
    const apiMemoData = await getMemoApiData('getDraftByEndPoint', { memoEndPoint })
    const allApiMemoData = await getMemoApiData('getAllMemosByCourseCodeAndType', {
      courseCode,
      type: 'published'
    })
    renderProps.props.children.props.routerStore.memoDatas = allApiMemoData
    renderProps.props.children.props.routerStore.memoData = apiMemoData
    renderProps.props.children.props.routerStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester: '',
      memoLangAbbr: userLang
    })
    renderProps.props.children.props.routerStore.koppsFreshData = await getSyllabus(
      courseCode,
      apiMemoData.semester,
      apiMemoData.memoCommonLangAbbr || userLang
    ) // TODO: use apiMemoData instead

    const { sellingText, imageInfo } = await getCourseInfo(courseCode)
    const { recruitmentText } = renderProps.props.children.props.routerStore.koppsFreshData
    renderProps.props.children.props.routerStore.sellingText = resolveSellingText(
      sellingText,
      recruitmentText,
      renderProps.props.children.props.routerStore.memoLanguage
    )
    renderProps.props.children.props.routerStore.imageFromAdmin = imageInfo

    const html = ReactDOMServer.renderToString(renderProps)

    res.render('preview/index', {
      html,
      title: userLang === 'sv' ? 'Förhandsgranskning av kurs-PM' : 'Preview of course memos',
      initialState: JSON.stringify(hydrateStores(renderProps)),
      userLang,
      description:
        userLang === 'sv'
          ? '[NY] Kursinformation – Förhandsgranskning av kurs-PM'
          : '[NEW] Course Information – Preview of course memos'
    })
  } catch (err) {
    log.error('Error in renderMemoPreviewPage', { error: err })
    next(err)
  }
}

module.exports = {
  renderMemoPreviewPage
}
