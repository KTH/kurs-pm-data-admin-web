'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const apis = require('../api')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const i18n = require('../../i18n')

async function getPage(req, res, next) {
  try {
    // const context = {}
    const lang = language.getLanguage(res) || 'sv'
    const langIndex = lang === 'en' ? 0 : 1
    // STORE MANIPULATIONS
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const applicationStore = createStore()
    applicationStore.setBrowserConfig(browser, serverPaths, apis, server.hostUrl)
    applicationStore.doSetLanguageIndex(lang)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = server.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    res.render('memo/index', {
      compressedStoreCode,
      html,
      title: i18n.messages[langIndex].messages.site_name,
      lang,
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name + 'test',
        url: server.hostUrl + '/kursinfoadmin/kurser/kurs/_test_editor',
      },
      languageLink: {
        title: i18n.messages[langIndex === 0 ? 1 : 0].messages.locale_text,
        toLang: `?l=${lang === 'sv' ? 'en' : 'sv'}`,
      },
      instrumentationKey: server.appInsights.instrumentationKey,
      proxyPrefix,
      description:
        lang === 'sv'
          ? 'Kursinformation – Administration av kurs-PM'
          : 'Course Information – Administration of course memos',
    })
  } catch (err) {
    log.error('Error in getPage', { error: err })
    next(err)
  }
}

module.exports = {
  getPage,
}
