'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokCourseData(courseCode, lang) {
  try {
    const course = await client.getLatestCourseVersion(courseCode, lang)

    return course
  } catch (error) {
    throw new Error(error.message)
  }
}

async function getCourseMainSubjects(courseCode, lang) {
  const course = await getLadokCourseData(courseCode, lang)
  if (course.huvudomraden) {
    const mainSubjectsArray = course.huvudomraden.map(subject => subject.name)
    const mainSubjects = mainSubjectsArray.join()
    return { mainSubjects }
  } else return {}
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
      lastTuitionDate: round.sistaUndervisningsdatum,
      state: 'APPROVED',
      language: {
        sv: round.undervisningssprak.name,
        en: round.undervisningssprak.nameOther,
      },
      campus: { sv: round.studieort.name, en: round.studieort.name },
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

module.exports = {
  getLadokCourseData,
  getCourseMainSubjects,
  getCourseRoundsData,
  getCourseSchoolCode,
}
