'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

function formatExaminationTitles(language, examinationModules) {
  const completeExaminationStrings = examinationModules.map(
    examinationModule =>
      `<li>${examinationModule.kod} - ${examinationModule.benamning}, ${examinationModule.omfattning.formattedWithUnit}, ${language === 'sv' ? 'Betygsskala' : 'Grading scale'}: ${examinationModule.betygsskala.code}</li>`
  )
  const examinationTitles = examinationModules.map(
    m => `<h4>${m.kod} - ${m.benamning}, ${m.omfattning.formattedWithUnit}</h4>`
  )
  const formatted = {
    completeExaminationStrings: completeExaminationStrings.join(''),
    titles: examinationTitles.join(''),
  }
  return formatted
}

async function getLadokCourseData(courseCode, lang) {
  try {
    const course = await client.getLatestCourseVersion(courseCode, lang)

    return course
  } catch (error) {
    throw new Error(error.message)
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
