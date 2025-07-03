import { seasonStr } from '../utils-shared/helpers'

const i18n = require('../../../../i18n')

export const combinedCourseName = (courseCode, course) => {
  if (!course) return ''
  const { credits, title } = course
  const courseName = `${courseCode} ${title} ${credits?.formattedWithUnit}`
  return courseName
}

export const getDateFormat = (date, language) => {
  const timestamp = Date.parse(date)
  const parsedDate = new Date(timestamp)
  if (language === 1 || language === 'Svenska' || language === 'Swedish' || language === 'sv') {
    return parsedDate.toLocaleDateString('sv')
  }
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return parsedDate.toLocaleDateString('en-GB', options)
}

export const combineMemoName = (roundInfo, semester, langAbbr = 'sv') => {
  const { firstTuitionDate, shortName, language, applicationCode } = roundInfo
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { extraInfo } = i18n.messages[langIndex]

  const seasonOrShortName = shortName ? shortName + ' ' : `${seasonStr(langIndex, semester)}-${applicationCode}`

  const startDateAndLanguage = `(${extraInfo.labelStartDate} ${getDateFormat(firstTuitionDate, langAbbr)}, ${
    language[langAbbr]
  })`
  return `${seasonOrShortName} ${startDateAndLanguage}`
}

export const concatMemoName = (semester, applicationCodes, langAbbr = 'sv') => {
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { memoLabel } = i18n.messages[langIndex].messages
  return `${memoLabel} ${seasonStr(langIndex, semester)}-${
    applicationCodes.length > 1 ? `${applicationCodes[0]}...` : applicationCodes[0]
  }`
}

export const concatHeaderMemoName = (semester, langAbbr = 'sv') => {
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { memoLabel } = i18n.messages[langIndex].messages
  return `${memoLabel} ${seasonStr(langIndex, semester)}`
}

export const fetchThisTermRounds = async (miniLadokObj, memo) => {
  const { semester } = memo
  const { lastTermsInfo } = miniLadokObj
  const thisTermInfo = (lastTermsInfo && (await lastTermsInfo.find(({ term }) => term === semester))) || {}

  return (thisTermInfo && thisTermInfo.rounds) || []
}

export const uncheckRadioById = chosenId => {
  const memoElem = document.getElementById(chosenId)
  if (chosenId && memoElem && memoElem.checked) {
    document.getElementById(chosenId).checked = false
  }
}

export const emptyCheckboxesByIds = (sortedApplicationCodes, startOfId) => {
  sortedApplicationCodes.forEach(applicationCode => {
    const checkboxId = `${startOfId}${applicationCode}`
    document.getElementById(checkboxId).checked = false
  })
}

export const sortRoundAndLadokInfo = (roundLadok, prevSortedInfo) => {
  const { applicationCode } = roundLadok
  const { sortedApplicationCodes, sortedLadokInfo } = prevSortedInfo
  sortedApplicationCodes.push(applicationCode)
  const sortedRounds = sortedApplicationCodes.sort()
  const addIndex = sortedRounds.indexOf(applicationCode)
  sortedLadokInfo.splice(addIndex, 0, roundLadok)
  return { sortedApplicationCodes, sortedLadokInfo }
}

export const removeAndSortApplicationAndInfo = (applicationCode, prevSortedInfo) => {
  const { sortedApplicationCodes, sortedLadokInfo } = prevSortedInfo
  const removeIndex = sortedApplicationCodes.indexOf(applicationCode)
  sortedApplicationCodes.splice(removeIndex, 1)
  sortedLadokInfo.splice(removeIndex, 1)
  return { sortedApplicationCodes, sortedLadokInfo }
}

export const fetchParameters = props => {
  if (!props.location) return ''
  const params = props.location.search
    .toString()
    .substring(1)
    .split('&')
    .map(param => param.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
  return params
}
