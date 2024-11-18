'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

function formatExaminationTitles(examinationModules, lang) {
  const liStrs = examinationModules.map(
    m =>
      `<li>${m.examCode} - ${m.title}, ${m.credits} ${lang === 'sv' ? 'hp' : 'credits'}, ${lang === 'sv' ? 'Betygsskala' : 'Grading scale'}: ${m.gradeScaleCode}</li>`
  )
  const titles = examinationModules.map(
    m => `<h4>${m.examCode} - ${m.title}, ${m.credits} ${lang === 'sv' ? 'hp' : 'credits'}</h4>`
  )
  const formatted = { liStrs: liStrs.join(), titles: titles.join() }
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
      language: {
        sv: round.undervisningssprak ? round.undervisningssprak.name : '',
        en: round.undervisningssprak ? round.undervisningssprak.nameOther : '',
      },
      campus: {
        sv: round.studieort ? round.studieort.name : '',
        en: round.studieort ? round.studieort.nameOther : '',
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

async function getExaminationModules(instansUid, lang) {
  try {
    const examinationModules = await client.getModuler(instansUid)
    const formattedModules = formatExaminationTitles(examinationModules, lang)
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
