const i18n = require('../../../../i18n')

const convertLangToIndex = langShortName => (langShortName === 'en' ? 0 : 1)

const seasonStr = (language, semesterRaw) => {
  if (!semesterRaw) return ''
  const isLangANumber = typeof language === 'number'
  const langIndex = isLangANumber ? language : convertLangToIndex(language)
  const { extraInfo } = i18n.messages[langIndex]
  return /^(HT|VT)\d{4}$/.test(semesterRaw)
    ? `${semesterRaw.slice(0, 2)} ${semesterRaw.slice(2, 6)}`
    : `${extraInfo.season[semesterRaw.toString()[4]]}${semesterRaw.toString().slice(0, 4)}`
}

export { convertLangToIndex, seasonStr }
