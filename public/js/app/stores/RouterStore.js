import { observable, action } from 'mobx'
import { context } from '../util/fieldsByType'

class RouterStore {
  @observable courseCode

  @observable semester

  @observable koppsFreshData = {}

  @observable slicedTermsByPrevYear = {}

  @observable memoEndPoint

  @observable memoData = {}

  @observable defaultValues = {
    // LATER: added teachers from UG, PLANERING AS HTML so it will be developed further
  }

  @action combineDefaultValues() {
    this.defaultValues = {
      examinationModules: this[context.examinationModules.defaultSource].examinationModules, // koppsFreshData.examinationModules
      // eslint-disable-next-line no-use-before-define
      scheduleDetails: combineScheduleValues(
        this[context.scheduleDetails.defaultSource].scheduleDetailsTemplate,
        this[context.scheduleDetails.defaultSource].scheduleLinks(
          this[context.scheduleDetails.defaultSource].schemaUrl
        )
      )
      // LATER: added teachers from UG, PLANERING AS HTML so it will be developed further
    }
  }

  @action tempMemoData(memoData) {
    this.memoData = memoData
  }

  @action setBrowserConfig(config, paths, apiHost, thisHostBaseUrl) {
    this.browserConfig = config
    this.paths = paths
    this.apiHost = apiHost
    this.thisHostBaseUrl = thisHostBaseUrl
  }

  @action SSRsetCookieHeader(cookieHeader) {
    if (typeof window === 'undefined') {
      this.cookieHeader = cookieHeader || ''
    }
  }

  @action doSetLanguageIndex(lang) {
    this.langIndex = lang === 'en' ? 0 : 1
  }

  initializeStore(storeName) {
    const store = this

    if (
      typeof window !== 'undefined' &&
      window.__initialState__ &&
      window.__initialState__[storeName]
    ) {
      /* TODO:
        const util = globalRegistry.getUtility(IDeserialize, 'kursinfo-web')
        const importData = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
        console.log("importData",importData, "util",util)
        for (let key in importData) {
          // Deserialize so we get proper ObjectPrototypes
          // NOTE! We need to escape/unescape each store to avoid JS-injection
          store[key] = util.deserialize(importData[key])
        }
        delete window.__initialState__[storeName] */

      const tmp = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))

      Object.keys(tmp).map(key => {
        store[key] = tmp[key]
        delete tmp[key]
      })

      // Just a nice helper message
      if (Object.keys(window.__initialState__).length === 0) {
        window.__initialState__ = 'Mobx store state initialized'
      }
    }
  }
}

const combineScheduleValues = (scheduleDetailsTemplate, scheduleLinks) => {
  return scheduleLinks
    ? `${scheduleDetailsTemplate}<p>${scheduleLinks}</p>`
    : `${scheduleDetailsTemplate}`
}

export default RouterStore
