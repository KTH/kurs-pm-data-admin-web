/* eslint-disable import/prefer-default-export */
export const seasonStr = (translate, semesterCode) =>
  `${translate.season[semesterCode.toString()[4]]}${semesterCode.toString().slice(0, 4)}`

export const getDateFormat = (date, language) => {
  if (language === 'Svenska' || language === 'Engelska' || language === 1 || language === 'sv') {
    return date
  }
  const splitDate = date.split('-')
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
}
