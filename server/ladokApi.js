'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function formatExaminationTitles(language, examinationModules) {
  try {
    const completeExaminationStrings = examinationModules.map(
      m =>
        `<li>${m.kod} - ${m.benamning}, ${m.omfattning.formattedWithUnit}, ${
          language === 'sv' ? 'Betygsskala' : 'Grading scale'
        }: ${m.betygsskala.formatted}</li>`
    )

    const examinationTitles = examinationModules.map(
      m => `<h4>${m.kod} - ${m.benamning}, ${m.omfattning.formattedWithUnit}</h4>`
    )

    return {
      completeExaminationStrings: completeExaminationStrings.join(''),
      titles: examinationTitles.join(''),
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
    const formattedModules = formatExaminationTitles(language, examinationModules)
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
