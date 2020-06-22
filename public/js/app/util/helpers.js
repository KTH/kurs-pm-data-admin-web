/* eslint-disable import/prefer-default-export */
const i18n = require('../../../../i18n')

export const seasonStr = (translate, semesterCode) =>
  `${translate.season[semesterCode.toString()[4]]}${semesterCode.toString().slice(0, 4)}`

export const getDateFormat = (date, language) => {
  if (language === 1 || language === 'Svenska' || language === 'Swedish' || language === 'sv') {
    return date
  }
  const splitDate = date.split('-')
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
}

export const combineMemoName = (roundInfo, semester, langAbbr = 'sv') => {
  const { firstTuitionDate, shortName, ladokRoundId, language } = roundInfo
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { extraInfo } = i18n.messages[langIndex]

  const seasonOrShortName = shortName
    ? shortName + ' '
    : `${seasonStr(extraInfo, semester)}-${ladokRoundId}`

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

export const uncheckRadioById = chosenId => {
  const memoElem = document.getElementById(chosenId)
  if (chosenId && memoElem && memoElem.checked) {
    document.getElementById(chosenId).checked = false
  }
}

export const emptyCheckboxesByIds = (sortedRoundIds, startOfId) => {
  sortedRoundIds.map(ladokRoundId => {
    const checkboxId = `${startOfId}${ladokRoundId}`
    document.getElementById(checkboxId).checked = false
  })
}

export const sortRoundAndKoppsInfo = (koppsMiniObj, prevSortedInfo) => {
  // addRoundAndInfo
  // const { firstTuitionDate, ladokRoundId, language, shortName } = koppsMiniObj
  const { ladokRoundId } = koppsMiniObj
  const { sortedRoundIds, sortedKoppsInfo } = prevSortedInfo
  sortedRoundIds.push(ladokRoundId)
  const sortedRounds = sortedRoundIds.sort()
  const addIndex = sortedRounds.indexOf(ladokRoundId)
  sortedKoppsInfo.splice(addIndex, 0, koppsMiniObj)
  return { sortedRoundIds, sortedKoppsInfo }
}

export const removeAndSortRoundAndInfo = (ladokRoundId, prevSortedInfo) => {
  const { sortedRoundIds, sortedKoppsInfo } = prevSortedInfo
  const removeIndex = sortedRoundIds.indexOf(ladokRoundId)
  sortedRoundIds.splice(removeIndex, 1)
  sortedKoppsInfo.splice(removeIndex, 1)
  return { sortedRoundIds, sortedKoppsInfo }
}
