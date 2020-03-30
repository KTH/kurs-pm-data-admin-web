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
