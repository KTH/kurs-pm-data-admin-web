import { observable, action } from 'mobx'
import { combineScheduleValues } from '../util/defaultValues'

class RouterStore {
  @observable courseCode

  @observable dirtyEditor = ''

  @observable semester

  @observable koppsFreshData = {}

  @observable slicedTermsByPrevYear = {}

  @observable memoEndPoint

  @observable memoData = {}

  @observable existingLatestMemos = {}

  @observable rebuilDraftFromPublishedVer = false

  @action setMemoBasicInfo(props) {
    this.semester = props.semester || ''
    this.courseCode = props.courseCode.toUpperCase() || ''
    this.memoEndPoint = props.memoEndPoint.toUpperCase() || ''
    this.memoLangAbbr = props.memoLangAbbr || 'sv'
  }

  @action combineDefaultValues() {
    const {
      examinationSubSection,
      equipment,
      scheduleDetails,
      literature,
      possibilityToCompletion,
      possibilityToAddition
    } = this.memoData
    this.memoData = {
      ...this.memoData,
      examinationSubSection: examinationSubSection || this.koppsFreshData.examinationModules || '', // koppsFreshData.examinationModules
      // eslint-disable-next-line no-use-before-define
      equipment: equipment || this.koppsFreshData.equipmentTemplate || '',
      scheduleDetails:
        scheduleDetails ||
        combineScheduleValues(this.koppsFreshData.schemaUrls, this.memoLangAbbr) ||
        '',
      literature: literature || this.koppsFreshData.literatureTemplate || '',
      possibilityToCompletion:
        possibilityToCompletion || this.koppsFreshData.possibilityToCompletionTemplate || '',
      possibilityToAddition:
        possibilityToAddition || this.koppsFreshData.possibilityToAdditionTemplate || ''
    }
  }

  @action removeTemplatesFromKoppsFreshData() {
    ;[
      'equipmentTemplate',
      'literatureTemplate',
      'possibilityToCompletionTemplate',
      'possibilityToAdditionTemplate'
    ].map(property => delete this.koppsFreshData[property])
  }

  @action updateMemoDataWithFreshKoppsData() {
    this.memoData = { ...this.memoData, ...this.koppsFreshData }
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

export default RouterStore
