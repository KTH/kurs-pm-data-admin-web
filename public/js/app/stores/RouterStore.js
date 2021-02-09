import { observable, action } from 'mobx'
import axios from 'axios'
import { SERVICE_URL } from '../util/constants'
import { sections } from '../util/fieldsByType'

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

  @observable showError = false

  @observable extraContentState =
    Object.fromEntries(sections.map(({ extraHeaderTitle }) => [extraHeaderTitle, []])) || {}

  @action updateThisExtraState(contentId, currentIndex, hasEmptyTitle, hasEmptyText) {
    const hasEmptyTitleAndText = hasEmptyText && hasEmptyTitle

    this.extraContentState[contentId][currentIndex] = {
      hasEmptyTitleAndText,
      hasEmptyText,
      hasEmptyTitle,
      canFinish: !hasEmptyTitle || hasEmptyTitleAndText
    }
  }

  @action removeExtraContent(contentId, currentIndex) {
    this.memoData[contentId].splice(currentIndex, 1)
  }

  @action stopAndShowError() {
    this.showError = true
  }

  @action checkEmptiesForSectionId(contentId) {
    const { extraContentState } = this
    let canBeSwitched = true

    if (!extraContentState || !extraContentState[contentId]) return true

    extraContentState[contentId].forEach(
      ({ hasEmptyTitleAndText, canFinish: isReadyForReview }, currentIndex) => {
        if (hasEmptyTitleAndText) this.removeExtraContent(contentId, currentIndex)
        else if (!isReadyForReview) canBeSwitched = isReadyForReview
      }
    )
    return canBeSwitched
  }

  @action checkAllSectionsHasTitles() {
    const filterEmpty = sections.filter(
      ({ extraHeaderTitle }) => this.checkEmptiesForSectionId(extraHeaderTitle) === false
    )
    const canBeFinished = !(filterEmpty.length > 0)

    return canBeFinished
  }

  @action setMemoBasicInfo(props) {
    this.semester = props.semester || ''
    this.courseCode = props.courseCode.toUpperCase() || ''
    this.memoEndPoint = props.memoEndPoint.toUpperCase() || ''
    this.memoLangAbbr = props.memoLangAbbr || 'sv'
  }

  async _filterOutUsedRounds(usedRoundsThisTerm, chosenSemester, koppsLastTerms = null) {
    const lastTerms = this.miniKoppsObj.lastTermsInfo || koppsLastTerms.lastTermsInfo
    const thisTerm =
      (lastTerms && (await lastTerms.find(({ term }) => term === chosenSemester))) || {}
    return (
      (thisTerm &&
        thisTerm.rounds &&
        (await thisTerm.rounds
          .filter((r) => !usedRoundsThisTerm.includes(r.ladokRoundId))
          .reverse())) ||
      []
    )
  }

  getThisHost() {
    return this.thisHostBaseUrl.slice(-1) === '/'
      ? this.thisHostBaseUrl.slice(0, -1)
      : this.thisHostBaseUrl
  }

  @action async showAvailableSemesterRounds(
    chosenSemester,
    testUsedRounds = [],
    testLastTerms = null
  ) {
    if (testLastTerms) {
      return await this._filterOutUsedRounds(testUsedRounds, chosenSemester, testLastTerms)
    }
    try {
      const thisHost = this.getThisHost()
      const result = await axios.get(
        `${thisHost}${SERVICE_URL.API}used-rounds/${this.courseCode}/${chosenSemester}`
      )

      if (result) {
        if (result.status >= 400) {
          return 'ERROR-RouterStore.js-showAvailableSemesterRounds-' + result.status
        }
        const { usedRoundsThisSemester } = result.data

        return await this._filterOutUsedRounds(usedRoundsThisSemester, chosenSemester)
      }
    } catch (error) {
      if (error.response) {
        throw new Error('RouterStore.js-showAvailableSemesterRounds-' + error.message)
      }
      throw error
    }
  }

  @action async postNewMemo(actionType, copyFromMemoEndPoint, body, isTest = false) {
    if (isTest) {
      return { actionType, copyFromMemoEndPoint, body }
    }

    try {
      const thisHost = await this.getThisHost()

      const result = await axios.post(
        `${thisHost}${SERVICE_URL.API}create-draft/${this.courseCode}/${body.memoEndPoint}/${
          actionType === 'copy' ? 'copyFrom/' + copyFromMemoEndPoint : ''
        }`,
        body
      )

      return result
    } catch (error) {
      if (error.response) {
        throw new Error('RouterStore.js-postNewMemo-' + error.message)
      }
      throw error
    }
  }

  @action async updateDraft(body, isTest = false) {
    if (isTest) {
      return { body }
    }

    try {
      const thisHost = this.getThisHost()

      const resultAfterUpdate = await axios.post(
        `${thisHost}${SERVICE_URL.API}draft-updates/${this.courseCode}/${body.memoEndPoint}`,
        body
      )

      return resultAfterUpdate
    } catch (error) {
      if (error.response) {
        throw new Error('RouterStore.js-updateDraft-' + error.message)
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
    this.langIndex = lang === 'sv' ? 1 : 0
    this.langAbbr = lang
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

      Object.keys(tmp).map((key) => {
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
