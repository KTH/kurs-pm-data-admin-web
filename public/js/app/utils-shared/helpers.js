import { parseSemesterIntoYearSemesterNumber } from '../../../../shared/semesterUtils'

const i18n = require('../../../../i18n')

const convertLangToIndex = langShortName => (langShortName === 'en' ? 0 : 1)

const seasonStr = (language, semesterRaw) => {
  if (!semesterRaw) return ''
  const isLangANumber = typeof language === 'number'
  const langIndex = isLangANumber ? language : convertLangToIndex(language)
  const { extraInfo } = i18n.messages[langIndex]
  const { year, semesterNumber } = parseSemesterIntoYearSemesterNumber(semesterRaw)
  return `${extraInfo.season[semesterNumber]}${year}`
}

export { convertLangToIndex, seasonStr }
