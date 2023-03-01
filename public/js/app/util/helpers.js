const i18n = require('../../../../i18n')

export const combinedCourseName = (courseCode, course, langAbbr) => {
  if (!course) return ''
  const { credits, title } = course
  let { creditUnitAbbr = '' } = course
  creditUnitAbbr = typeof creditUnitAbbr === 'object' ? creditUnitAbbr[langAbbr] : creditUnitAbbr
  const creditsStandard = credits.toString().indexOf('.') < 0 ? credits + '.0' : credits
  const localeCredits =
    langAbbr === 'sv' ? creditsStandard.toLocaleString('sv-SE') : creditsStandard.toLocaleString('en-US')
  const creditUnit = langAbbr === 'sv' ? creditUnitAbbr : 'credits'

  const courseName = `${courseCode} ${title[langAbbr]} ${localeCredits} ${creditUnit}`
  return courseName
}
export function convertLangToIndex(langShortName) {
  return langShortName === 'en' ? 0 : 1
}
export const seasonStr = (language, semesterRaw) => {
  if (!semesterRaw) return ''
  const isLangANumber = typeof language === 'number'
  const langIndex = isLangANumber ? language : convertLangToIndex(language)
  const { extraInfo } = i18n.messages[langIndex]
  const termStringAsSeason = `${extraInfo.season[semesterRaw.toString()[4]]}${semesterRaw.toString().slice(0, 4)}`

  return termStringAsSeason
}

export const getDateFormat = (date, language) => {
  if (language === 1 || language === 'Svenska' || language === 'Swedish' || language === 'sv') {
    return date
  }
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  const timestamp = Date.parse(date)
  const parsedDate = new Date(timestamp)
  return parsedDate.toLocaleDateString('en-GB', options)
}

export const combineMemoName = (roundInfo, semester, langAbbr = 'sv') => {
  const { firstTuitionDate, shortName, language, applicationCodes } = roundInfo
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { extraInfo } = i18n.messages[langIndex]

  const seasonOrShortName = shortName ? shortName + ' ' : `${seasonStr(langIndex, semester)}-${applicationCodes[0]}`

  const startDateAndLanguage = `(${extraInfo.labelStartDate} ${getDateFormat(firstTuitionDate, langAbbr)}, ${
    language[langAbbr]
  })`
  return `${seasonOrShortName} ${startDateAndLanguage}`
}

// "Kurs-pm "+ [termin] "-" [kurstillfälleskoder separerade med bindestreck]
// label + formatted semester + applicationCodes

export const concatMemoName = (semester, applicationCodes, langAbbr = 'sv') => {
  const langIndex = langAbbr === 'en' ? 0 : 1
  const { memoLabel } = i18n.messages[langIndex].messages
  return `${memoLabel} ${seasonStr(i18n.messages[langIndex].extraInfo, semester)}-${applicationCodes.join('-')}`
}

export const fetchThisTermRounds = async (miniKoppsObj, memo) => {
  const { semester } = memo
  const { lastTermsInfo } = miniKoppsObj
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

export const emptyCheckboxes = className => {
  const checkboxes = (document.getElementsByClassName(className).checked = false)
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false
    }
  }
}

export const sortRoundAndKoppsInfo = (roundKopps, prevSortedInfo) => {
  const { applicationCodes } = roundKopps
  const { sortedApplicationCodes, sortedKoppsInfo } = prevSortedInfo
  sortedApplicationCodes.push(applicationCodes[0])
  const sortedRounds = sortedApplicationCodes.sort()
  const addIndex = sortedRounds.indexOf(applicationCodes[0])
  sortedKoppsInfo.splice(addIndex, 0, roundKopps)
  return { sortedApplicationCodes, sortedKoppsInfo }
}

export const removeAndSortApplicationAndInfo = (applicationCode, prevSortedInfo) => {
  const { sortedApplicationCodes, sortedKoppsInfo } = prevSortedInfo
  const removeIndex = sortedApplicationCodes.indexOf(applicationCode)
  sortedApplicationCodes.splice(removeIndex, 1)
  sortedKoppsInfo.splice(removeIndex, 1)
  return { sortedApplicationCodes, sortedKoppsInfo }
}

export const fetchParameters = props => {
  if (!props.location) return ''
  const params = props.location.search
    .substring(1)
    .split('&')
    .map(param => param.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
  return params
}
