/* eslint-disable import/prefer-default-export */
const i18n = require('../../../../i18n')

export const combinedCourseName = (courseCode, course, langAbbr) => {
  const { credits, creditUnitAbbr, title } = course

  const localeCredits =
    langAbbr === 'sv' ? credits.toLocaleString('sv-SE') : credits.toLocaleString('en-US')
  const creditUnit = langAbbr === 'sv' ? creditUnitAbbr.sv || creditUnitAbbr : 'credits'

  const courseName = `${courseCode} ${title[langAbbr]} ${localeCredits} ${creditUnit}`
  return courseName
}
export const seasonStr = (language, semesterCode) => {
  const langIndex = typeof language === 'number' ? language : language === 'en' ? 0 : 1
  const { extraInfo } = i18n.messages[langIndex]

  const termStringAsSeason = `${
    extraInfo.season[semesterCode.toString()[4]]
  }${semesterCode.toString().slice(0, 4)}`
  return termStringAsSeason
}

export const getDateFormat = (date, language) => {
  if (language === 1 || language === 'Svenska' || language === 'Swedish' || language === 'sv') {
    return date
  }
  const splitDate = date.split('-')
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
}

export const combineMemoName = (roundInfo, semester, langAbbr = 'sv') => {
  console.log('roundInfo', JSON.stringify(roundInfo))
  const { firstTuitionDate, shortName, ladokRoundId, language } = roundInfo
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { extraInfo } = i18n.messages[langIndex]

  const seasonOrShortName = shortName
    ? shortName + ' '
    : `${seasonStr(langIndex, semester)}-${ladokRoundId}`

  const startDateAndLanguage = `(${extraInfo.labelStartDate} ${getDateFormat(
    firstTuitionDate,
    langAbbr
  )}, ${language[langAbbr]})`

  return `${seasonOrShortName} ${startDateAndLanguage}`
}

// "Kurs-pm "+ [termin] "-" [kurstillfälleskoder separerade med bindestreck]
// label + formatted semester + ladokRoundIds

export const concatMemoName = (semester, ladokRoundIds, langAbbr = 'sv') => {
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { memoLabel } = i18n.messages[langIndex].messages
  return `${memoLabel} ${seasonStr(
    i18n.messages[langIndex].extraInfo,
    semester
  )}-${ladokRoundIds.join('-')}`
}

export const fetchThisTermRounds = async (miniKoppsObj, memo) => {
  const { semester } = memo
  const { lastTermsInfo } = miniKoppsObj
  const thisTermInfo =
    (lastTermsInfo && (await lastTermsInfo.find(({ term }) => term === semester))) || {}

  return (thisTermInfo && thisTermInfo.rounds) || []
}

export const uncheckRadioById = (chosenId) => {
  const memoElem = document.getElementById(chosenId)
  if (chosenId && memoElem && memoElem.checked) {
    document.getElementById(chosenId).checked = false
  }
}

export const emptyCheckboxesByIds = (sortedRoundIds, startOfId) => {
  sortedRoundIds.map((ladokRoundId) => {
    const checkboxId = `${startOfId}${ladokRoundId}`
    document.getElementById(checkboxId).checked = false
  })
}

export const emptyCheckboxes = (className) => {
  const checkboxes = (document.getElementsByClassName(className).checked = false)
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false
    }
  }
}

export const sortRoundAndKoppsInfo = (roundKopps, prevSortedInfo) => {
  // addRoundAndInfo
  // const { firstTuitionDate, ladokRoundId, language, shortName } = koppsMiniObj
  const { ladokRoundId } = roundKopps
  const { sortedRoundIds, sortedKoppsInfo } = prevSortedInfo
  sortedRoundIds.push(ladokRoundId)
  const sortedRounds = sortedRoundIds.sort()
  const addIndex = sortedRounds.indexOf(ladokRoundId)
  sortedKoppsInfo.splice(addIndex, 0, roundKopps)
  return { sortedRoundIds, sortedKoppsInfo }
}

export const removeAndSortRoundAndInfo = (ladokRoundId, prevSortedInfo) => {
  const { sortedRoundIds, sortedKoppsInfo } = prevSortedInfo
  const removeIndex = sortedRoundIds.indexOf(ladokRoundId)
  sortedRoundIds.splice(removeIndex, 1)
  sortedKoppsInfo.splice(removeIndex, 1)
  return { sortedRoundIds, sortedKoppsInfo }
}

export const fetchParameters = (props) => {
  // if (props.location.sellingDesciprion !== 'success') {
  const params = props.location.search
    .substring(1)
    .split('&')
    .map((param) => param.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
  // }
  return params
}
