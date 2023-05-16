/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'
import axios from 'axios'
import { SERVICE_URL } from '../util/constants'
import {
  getDefaultSections,
  excludedFieldsInContractEducation,
  getContractEducationStructure,
} from '../util/fieldsByType'

function createApplicationStore() {
  const store = {
    /**
     * @property {string} courseCode
     * @property {string} dirtyEditor
     * @property {string} semester
     * @property {array} sections
     */
    courseCode: null,
    dirtyEditor: observable.box(''),
    semester: null,
    sections: observable.box([]), // will change it it's UPP - contract education
    /**
     * @property {object} koppsFreshData
     */
    koppsFreshData: {},
    /**
     * @property {number} langIndex
     */
    langIndex: 0,
    /**
     * @property {string} langAbbr
     */
    langAbbr: 'en',
    /**
     * @property {object} miniKoppsObj
     */
    miniKoppsObj: {},
    /**
     * @property {string} memoEndPoint
     */
    memoEndPoint: null,
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
    miniMemos: {},
    /**
     * @property {boolean} rebuilDraftFromPublishedVer
     */
    rebuilDraftFromPublishedVer: false,
    /**
     * @property {boolean} closeEmptyHeadingErrorMessage
     */
    closeEmptyHeadingErrorMessage: observable.box(true),
    /**
     * @property {object} extraContentState
     */
    extraContentState: observable.box(
      Object.fromEntries(getDefaultSections().map(({ extraHeaderTitle }) => [extraHeaderTitle, []])) || {}
    ),
    /**
     * @property {string} sellingText
     */
    sellingText: '',
    /**
     * @property {string} imageFromAdmin
     */
    imageFromAdmin: '',
    /**
     * @property {object} browserConfig
     */
    browserConfig: null,
    paths: null,
    apiHost: null,
    /**
     * @property {string} thisHostBaseUrl
     */
    thisHostBaseUrl: null,
    setExtraContentProps: action(setExtraContentProps),
    removeExtraContent: action(removeExtraContent),
    checkExtraTitlesForSectionId: action(checkExtraTitlesForSectionId),
    checkAllSectionsHasTitles: action(checkAllSectionsHasTitles),
    cleanUpAllEmptyExtraContent: action(cleanUpAllEmptyExtraContent),
    setCourseTitle: action(setCourseTitle),
    setDirtyEditor: action(setDirtyEditor),
    setExaminationModules: action(setExaminationModules),
    setMemoBasicInfo: action(setMemoBasicInfo),
    setMemoByContentId: action(setMemoByContentId),
    setMemoExtraContent: action(setMemoExtraContent),
    setNewEmptyExtraContent: action(setNewEmptyExtraContent),
    setSectionsStructure: action(setSectionsStructure),
    setVisibilityOfStandard: action(setVisibilityOfStandard),
    _filterOutUsedRounds,
    getThisHost,
    showAvailableSemesterRounds: action(showAvailableSemesterRounds),
    postNewMemo: action(postNewMemo),
    updateDraft: action(updateDraft),
    setBrowserConfig: action(setBrowserConfig),
    doSetLanguageIndex: action(doSetLanguageIndex),
    updateContractEducationSections: action(updateContractEducationSections),
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
  // this.memoData[contentId][currentIndex] = value
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

function updateContractEducationSections() {
  const updatedSections = getContractEducationStructure()

  for (const excludedProp of excludedFieldsInContractEducation) {
    this.memoData[excludedProp] = ''
    if (this.memoData.visibleInMemo) {
      this.memoData.visibleInMemo[excludedProp] = false
    }
  }
  return updatedSections
}

function checkIfContractEducation(educationalTypeId) {
  const isContractEducation = [101992, 101993].includes(educationalTypeId)
  return isContractEducation
}

async function setSectionsStructure() {
  if (Object.keys(this.memoData).length === 0) {
    // eslint-disable-next-line no-console
    console.error('Missing memoData, check if you run this function after memoData were assigned')
  }
  const { educationalTypeId } = this.memoData

  const isContractEducation = checkIfContractEducation(educationalTypeId)

  this.sections = isContractEducation ? await this.updateContractEducationSections() : getDefaultSections()
}

function setVisibilityOfStandard(contentId, value) {
  this.memoData.visibleInMemo = { ...this.memoData.visibleInMemo, [contentId]: value } // to make state change noticeable
  return this.memoData.visibleInMemo
}

function _isValidAndEmpty(isValid, html = '') {
  const trimmedHtml = html.trim()
  if (isValid && !trimmedHtml) return true
  return false
}

function setExaminationModules(isValid) {
  const { examinationModules, examinationSubSection } = this.memoData
  if (_isValidAndEmpty(isValid, examinationSubSection))
    this.setMemoByContentId('examinationSubSection', examinationModules)
}

function setExtraContentProps(contentId, currentIndex, hasEmptyHeading, hasEmptyText) {
  this.extraContentState[contentId][currentIndex] = {
    hasEmptyHeadingAndText: !!(hasEmptyText && hasEmptyHeading),
    canFinish: !(hasEmptyHeading && !hasEmptyText),
  }

  this.checkAllSectionsHasTitles()
}

function removeExtraContent(contentId, currentIndex) {
  this.memoData[contentId].splice(currentIndex, 1)
}

function cleanUpAllEmptyExtraContent(extraHeadersId) {
  if (!this.extraContentState || !this.extraContentState[extraHeadersId]) return true

  this.extraContentState[extraHeadersId].forEach(({ hasEmptyHeadingAndText }, currentIndex) => {
    if (hasEmptyHeadingAndText) {
      this.removeExtraContent(extraHeadersId, currentIndex)
    }
  })
  return true
}

function checkExtraTitlesForSectionId(contentId) {
  const { extraContentState } = this
  let canBeSwitched = true
  if (!extraContentState || !extraContentState[contentId]) return true

  extraContentState[contentId].forEach(({ canFinish: isReadyForReview }) => {
    if (!isReadyForReview) canBeSwitched = isReadyForReview
  })
  return canBeSwitched
}

function checkAllSectionsHasTitles() {
  const filterEmpty = this.sections.filter(
    ({ extraHeaderTitle }) => this.checkExtraTitlesForSectionId(extraHeaderTitle) === false
  )
  const canBeFinished = !(filterEmpty.length > 0)
  this.closeEmptyHeadingErrorMessage = canBeFinished
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
      (await thisTerm.rounds
        .filter(r => !usedRoundsThisTerm.includes(r.applicationCode) && r.state === 'APPROVED')
        .reverse())) ||
    []
  )
}

function getThisHost() {
  return this.thisHostBaseUrl.slice(-1) === '/' ? this.thisHostBaseUrl.slice(0, -1) : this.thisHostBaseUrl
}

// eslint-disable-next-line consistent-return
async function showAvailableSemesterRounds(chosenSemester, testUsedRounds = [], testLastTerms = null) {
  if (testLastTerms) {
    // eslint-disable-next-line no-return-await
    return await this._filterOutUsedRounds(testUsedRounds, chosenSemester, testLastTerms)
  }
  try {
    const thisHost = this.getThisHost()
    const result = await axios.get(`${thisHost}${SERVICE_URL.API}used-rounds/${this.courseCode}/${chosenSemester}`)
    if (result) {
      if (result.status >= 400) {
        return 'ERROR-createApplicationStore.js-showAvailableSemesterRounds-' + result.status
      }
      const { usedApplicationCodesThisSemester } = result.data

      return await this._filterOutUsedRounds(usedApplicationCodesThisSemester, chosenSemester)
    }
  } catch (error) {
    if (error.response) {
      throw new Error('createApplicationStore.js-showAvailableSemesterRounds-' + error.message)
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
      throw new Error('createApplicationStore.js-postNewMemo-' + error.message)
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
      throw new Error('createApplicationStore.js-updateDraft-' + error.message)
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
