'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function formatExaminationTitles(examinationModules) {
  const { completeExaminationStrings, titles } = examinationModules
  try {
    const completeExaminationStringsFormatted = completeExaminationStrings.map(m => `<li>${m}</li>`)

    const examinationTitlesFormatted = titles.map(t => `<h4>${t}</h4>`)

    return {
      completeExaminationStrings: completeExaminationStringsFormatted.join(''),
      titles: examinationTitlesFormatted.join(''),
    }
  } catch (error) {
    throw new Error(`Failed to format examination titles: ${error.message}`)
  }
}

async function getLadokCourseData(courseCode, lang) {
  try {
    return await client.getLatestCourseVersion(courseCode, lang)
  } catch (error) {
    throw new Error(`Failed to fetch Ladok course data: ${error.message}`)
  }
}

async function getCourseRoundsData(courseCode, lang) {
  // TODO: need to find a way to handle state instead of just hardcoding it
  try {
    const course = await client.getActiveCourseRounds(courseCode, lang)
    const mappedRounds = course.map(round => ({
      shortName: round.kortnamn,
      applicationCode: round.tillfalleskod,
      startperiod: round.startperiod,
      firstTuitionDate: round.forstaUndervisningsdatum.date,
      lastTuitionDate: round.sistaUndervisningsdatum.date,
      state: 'APPROVED',
      cancelled: round.installt,
      language: {
        sv: (lang === 'sv' ? round.undervisningssprak?.name : round.undervisningssprak?.nameOther) ?? '',
        en: (lang === 'en' ? round.undervisningssprak?.name : round.undervisningssprak?.nameOther) ?? '',
      },
    }))
    return mappedRounds
  } catch (error) {
    throw new Error(error.message)
  }
}

async function getCourseSchoolCode(courseCode) {
  try {
    const ladokCourseData = await getLadokCourseData(courseCode)
    if (!ladokCourseData || ladokCourseData.statusCode !== 200) return 'ladok_get_fails'
    const { schoolCode } = ladokCourseData
    if (!schoolCode) return 'missing_school_code'
    return schoolCode
  } catch (err) {
    return err
  }
}

async function getExaminationModules(utbildningstillfalleUid, language) {
  try {
    const examinationModules = await client.getExaminationModulesByUtbildningstillfalleUid(
      utbildningstillfalleUid,
      language
    )
    const formattedModules = formatExaminationTitles(examinationModules)
    return formattedModules
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getExaminationModules,
  getLadokCourseData,
  getCourseRoundsData,
  getCourseSchoolCode,
}
