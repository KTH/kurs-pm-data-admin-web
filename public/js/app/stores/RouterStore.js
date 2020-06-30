import { observable, action } from 'mobx'
import { combineScheduleValues } from '../util/defaultValues'
import axios from 'axios'
import { SERVICE_URL } from '../util/constants'

class RouterStore {
  @observable courseCode

  @observable dirtyEditor = ''

  @observable semester

  @observable koppsFreshData = {}

  @observable miniKoppsObj = {}

  @observable memoEndPoint

  @observable memoData = {}

  @observable miniMemos = {}

  @observable rebuilDraftFromPublishedVer = false

  // @observable availableSemesterRounds = []

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

  async _filterOutUsedRounds(usedRoundsThisTerm, chosenSemester) {
    const lastTerms = this.miniKoppsObj.lastTermsInfo || null
    const thisTerm =
      (lastTerms && (await lastTerms.find(({ term }) => term === chosenSemester))) || {}
    return (
      (thisTerm &&
        thisTerm.rounds &&
        (await thisTerm.rounds
          .filter(r => !usedRoundsThisTerm.includes(r.ladokRoundId))
          .reverse())) ||
      []
    )
  }

  @action
  async showAvailableSemesterRounds(chosenSemester) {
    try {
      const result = await axios.get(
        `${this.thisHostBaseUrl}${SERVICE_URL.API}used-rounds/${this.courseCode}/${chosenSemester}`
      )
      if (result) {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        const { usedRoundsThisSemester } = result.data
        console.log('usedRoundsThisSemester', usedRoundsThisSemester)
        return await this._filterOutUsedRounds(usedRoundsThisSemester, chosenSemester)
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.message)
      }
      throw error
    }
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
