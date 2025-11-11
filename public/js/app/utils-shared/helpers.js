import { parseSemesterIntoYearSemesterNumber } from '../../../../server/utils/semesterUtils'

const i18n = require('../../../../i18n')

const convertLangToIndex = langShortName => (langShortName === 'en' ? 0 : 1)

const seasonStr = (language, semesterRaw) => {
  if (!semesterRaw) return ''
  const isLangANumber = typeof language === 'number'
  const langIndex = isLangANumber ? language : convertLangToIndex(language)
  const { extraInfo } = i18n.messages[langIndex]
  return `${extraInfo.season[parseSemesterIntoYearSemesterNumber(semesterRaw).semesterNumber]}${parseSemesterIntoYearSemesterNumber(semesterRaw).year}`
}

export { convertLangToIndex, seasonStr }
