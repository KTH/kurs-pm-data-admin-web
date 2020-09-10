'use strict'

const apis = require('../api')
// const kursPmDataApi = require('../kursPmDataApi')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const { combineScheduleValues } = require('../defaultValues')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
const { getSyllabus } = require('../koppsApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const { getCourseEmployees } = require('../ugRedisApi')
const { safeGet } = require('safe-utils')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const i18n = require('../../i18n')

function hydrateStores(renderProps) {
  // This assumes that all stores are specified in a root element called Provider
  const outp = {}
  const { props } = renderProps.props.children

  Object.keys(props).map((key) => {
    if (typeof props[key].initializeStore === 'function') {
      outp[key] = encodeURIComponent(JSON.stringify(toJS(props[key], true)))
    }
  })

  return outp
}

const combineDefaultValues = (freshMemoData, koppsFreshData, memoLangAbbr) => {
  const {
    examinationSubSection,
    equipment,
    scheduleDetails,
    literature,
    possibilityToCompletion,
    possibilityToAddition
  } = freshMemoData
  const updatedWithDefaults = {
    ...freshMemoData,
    examinationSubSection: examinationSubSection || koppsFreshData.examinationModules || '', // koppsFreshData.examinationModules
    // eslint-disable-next-line no-use-before-define
    equipment: equipment || koppsFreshData.equipmentTemplate || '',
    scheduleDetails:
      scheduleDetails || combineScheduleValues(koppsFreshData.schemaUrls, memoLangAbbr) || '',
    literature: literature || koppsFreshData.literatureTemplate || '',
    possibilityToCompletion:
      possibilityToCompletion || koppsFreshData.possibilityToCompletionTemplate || '',
    possibilityToAddition:
      possibilityToAddition || koppsFreshData.possibilityToAdditionTemplate || ''
  }

  return updatedWithDefaults
}

const removeTemplatesFromKoppsFreshData = async (koppsFreshData) => {
  await delete koppsFreshData.equipmentTemplate
  await delete koppsFreshData.literatureTemplate
  await delete koppsFreshData.possibilityToCompletionTemplate
  await delete koppsFreshData.possibilityToAdditionTemplate
  return koppsFreshData
}

const refreshMemoData = (defaultAndMemoApiValues, cleanKoppsFreshData) => {
  return { ...defaultAndMemoApiValues, ...cleanKoppsFreshData }
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
    const langIndex = userLang === 'en' ? 0 : 1
    const translateTo = userLang === 'en' ? 1 : 0
    const { courseCode, memoEndPoint } = req.params
    const { action } = req.query
    const renderProps = _staticRender(context, req.url)
    const apiMemoData = await getMemoApiData('getDraftByEndPoint', { memoEndPoint })
    const { semester, memoCommonLangAbbr } = apiMemoData
    const memoLangAbbr = memoCommonLangAbbr || userLang

    renderProps.props.children.props.routerStore.rebuilDraftFromPublishedVer = !!action

    renderProps.props.children.props.routerStore.setBrowserConfig(
      browser,
      serverPaths,
      apis,
      server.hostUrl
    )

    renderProps.props.children.props.routerStore.doSetLanguageIndex(userLang)

    renderProps.props.children.props.routerStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester,
      memoLangAbbr
    })

    const koppsFreshData = {
      ...(await getSyllabus(courseCode, semester, apiMemoData.memoCommonLangAbbr || userLang)),
      ...(await getCourseEmployees(apiMemoData))
    }

    const defaultAndMemoApiValues = await combineDefaultValues(
      apiMemoData,
      koppsFreshData,
      memoLangAbbr
    )
    const cleanKoppsFreshData = await removeTemplatesFromKoppsFreshData(koppsFreshData)
    const newMemoData = refreshMemoData(defaultAndMemoApiValues, cleanKoppsFreshData)

    renderProps.props.children.props.routerStore.memoData = newMemoData

    const html = ReactDOMServer.renderToString(renderProps)

    res.render('memo/index', {
      html,
      title: userLang === 'sv' ? 'Administration av kurs-PM' : 'Administration of course memos',
      initialState: JSON.stringify(hydrateStores(renderProps)),
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name + courseCode,
        url: server.hostUrl + '/kursinfoadmin/kurser/kurs/' + courseCode
      },
      languageLink: {
        title: i18n.messages[translateTo].messages.locale_text,
        toLang: `?l=${userLang === 'sv' ? 'en' : 'sv'}`
      },
      instrumentationKey: server.appInsights.instrumentationKey,
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
    const apiResponse = await changeMemoApiData('updateCreatedDraft', { memoEndPoint }, req.body)
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
  combineDefaultValues,
  refreshMemoData,
  renderMemoEditorPage,
  removeTemplatesFromKoppsFreshData,
  updateContentByEndpoint
}
