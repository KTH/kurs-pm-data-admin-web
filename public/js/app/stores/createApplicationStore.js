/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'
import axios from 'axios'
import { SERVICE_URL } from '../util/constants'
import { sections } from '../util/fieldsByType'

function createApplicationStore() {
  const store = {
    /**
     * @property {string} courseCode
     * @property {string} dirtyEditor
     * @property {string} semester
     */
    courseCode: observable.box(null),
    dirtyEditor: observable.box(''),
    semester: observable.box(null),
    /**
     * @property {object} koppsFreshData
     */
    koppsFreshData: observable.box({}),
    /**
     * @property {number} langIndex
     */
    langIndex: observable.box(0),
    /**
     * @property {string} langAbbr
     */
    langAbbr: observable.box('en'),
    /**
     * @property {object} miniKoppsObj
     */
    miniKoppsObj: observable.box({}),
    /**
     * @property {string} memoEndPoint
     */
    memoEndPoint: observable.box(null),
    /**
     * @property {string} memoLangAbbr
     */
    memoLangAbbr: 'sv',
    /**
     * @property {object} memoData
     */
    memoData: observable.box({}),
    /**
     * @property {object} miniMemos
     */
    miniMemos: observable.box({}),
    /**
     * @property {boolean} rebuilDraftFromPublishedVer
     */
    rebuilDraftFromPublishedVer: observable.box(false),
    /**
     * @property {boolean} showError
     */
    showError: observable.box(false),
    /**
     * @property {object} extraContentState
     */
    extraContentState: observable.box(
      Object.fromEntries(sections.map(({ extraHeaderTitle }) => [extraHeaderTitle, []])) || {}
    ),
    /**
     * @property {string} sellingText
     */
    sellingText: observable.box(''),
    /**
     * @property {string} imageFromAdmin
     */
    imageFromAdmin: observable.box(''),
    /**
     * @property {object} browserConfig
     */
    browserConfig: observable.box(null),
    paths: observable.box(null),
    apiHost: observable.box(null),
    /**
     * @property {string} thisHostBaseUrl
     */
    thisHostBaseUrl: observable.box(null),
    checkTitleExist: action(checkTitleExist),
    removeExtraContent: action(removeExtraContent),
    stopAndShowError: action(stopAndShowError),
    checkExtraTitlesForSectionId: action(checkExtraTitlesForSectionId),
    checkAllSectionsHasTitles: action(checkAllSectionsHasTitles),
    cleanUpAllEmptyExtraContent: action(cleanUpAllEmptyExtraContent),
    setCourseTitle: action(setCourseTitle),
    setDirtyEditor: action(setDirtyEditor),
    setMemoBasicInfo: action(setMemoBasicInfo),
    setMemoByContentId: action(setMemoByContentId),
    setMemoExtraContent: action(setMemoExtraContent),
    setNewEmptyExtraContent: action(setNewEmptyExtraContent),
    setVisibilityOfStandard: action(setVisibilityOfStandard),
    _filterOutUsedRounds,
    getThisHost,
    showAvailableSemesterRounds: action(showAvailableSemesterRounds),
    postNewMemo: action(postNewMemo),
    updateDraft: action(updateDraft),
    setBrowserConfig: action(setBrowserConfig),
    doSetLanguageIndex: action(doSetLanguageIndex),
  }

  return store
}

function setCourseTitle(courseTitle) {
  this.memoData.courseTitle = courseTitle
}
function setDirtyEditor(contentId) {
  this.dirtyEditor = contentId
}
function setMemoByContentId(contentId, value) {
  this.memoData[contentId] = value
}

function setMemoExtraContent(contentId, currentIndex = null, contextId = null, value = null) {
  this.memoData[contentId][currentIndex][contextId] = value
}
function setNewEmptyExtraContent(extraHeaderTitle) {
  const newSection = {
    uKey: Math.random().toString(), // react requires unique key to add/remove items
    title: '',
    htmlContent: '',
    visibleInMemo: true,
  }
  this.dirtyEditor = newSection.uKey

  this.memoData[extraHeaderTitle] = [...this.memoData[extraHeaderTitle], newSection]
}

function setVisibilityOfStandard(contentId, value) {
  this.memoData.visibleInMemo[contentId] = value
}

function checkTitleExist(contentId, currentIndex, hasEmptyTitle, hasEmptyText) {
  const hasEmptyTitleAndText = hasEmptyText && hasEmptyTitle

  this.extraContentState[contentId][currentIndex] = {
    hasEmptyTitleAndText,
    hasEmptyText,
    hasEmptyTitle,
    canFinish: !hasEmptyTitle || hasEmptyTitleAndText,
  }
}

function removeExtraContent(contentId, currentIndex) {
  this.memoData[contentId].splice(currentIndex, 1)
}

function stopAndShowError() {
  this.showError = true
}

function cleanUpAllEmptyExtraContent(contentId) {
  const { extraContentState } = this
  let canBeSwitched = true
  if (!extraContentState || !extraContentState[contentId]) return true

  extraContentState[contentId].forEach(({ hasEmptyTitleAndText }, currentIndex) => {
    if (hasEmptyTitleAndText) this.removeExtraContent(contentId, currentIndex)
  })
}

function checkExtraTitlesForSectionId(contentId) {
  const { extraContentState } = this
  let canBeSwitched = true
  if (!extraContentState || !extraContentState[contentId]) return true

  extraContentState[contentId].forEach(({ hasEmptyTitleAndText, canFinish: isReadyForReview }, currentIndex) => {
    if (!isReadyForReview) canBeSwitched = isReadyForReview
  })
  return canBeSwitched
}

function checkAllSectionsHasTitles() {
  const filterEmpty = sections.filter(
    ({ extraHeaderTitle }) => this.checkExtraTitlesForSectionId(extraHeaderTitle) === false
  )
  const canBeFinished = !(filterEmpty.length > 0)

  return canBeFinished
}

function setMemoBasicInfo(props) {
  this.semester = props.semester || ''
  this.courseCode = props.courseCode.toUpperCase() || ''
  this.memoEndPoint = props.memoEndPoint.toUpperCase() || ''
  this.memoLangAbbr = props.memoLangAbbr || 'sv'
}

async function _filterOutUsedRounds(usedRoundsThisTerm, chosenSemester, koppsLastTerms = null) {
  const lastTerms = this.miniKoppsObj.lastTermsInfo || koppsLastTerms.lastTermsInfo
  const thisTerm = (lastTerms && (await lastTerms.find(({ term }) => term === chosenSemester))) || {}
  return (
    (thisTerm &&
      thisTerm.rounds &&
      (await thisTerm.rounds.filter(r => !usedRoundsThisTerm.includes(r.ladokRoundId)).reverse())) ||
    []
  )
}

function getThisHost() {
  return this.thisHostBaseUrl.slice(-1) === '/' ? this.thisHostBaseUrl.slice(0, -1) : this.thisHostBaseUrl
}

async function showAvailableSemesterRounds(chosenSemester, testUsedRounds = [], testLastTerms = null) {
  if (testLastTerms) {
    return await this._filterOutUsedRounds(testUsedRounds, chosenSemester, testLastTerms)
  }
  try {
    const thisHost = this.getThisHost()
    const result = await axios.get(`${thisHost}${SERVICE_URL.API}used-rounds/${this.courseCode}/${chosenSemester}`)
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

async function postNewMemo(actionType, copyFromMemoEndPoint, body, isTest = false) {
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

async function updateDraft(body, isTest = false) {
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

function setBrowserConfig(config, paths, apiHost, thisHostBaseUrl) {
  this.browserConfig = config
  this.paths = paths
  this.apiHost = apiHost
  this.thisHostBaseUrl = thisHostBaseUrl
}

function doSetLanguageIndex(lang) {
  this.langIndex = lang === 'sv' ? 1 : 0
  this.langAbbr = lang
}

export default createApplicationStore
