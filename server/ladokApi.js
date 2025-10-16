'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')
const { resolveUserAccessRights } = require('./ugRestApi')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokCourseData(courseCode, lang) {
  try {
    return await client.getLatestCourseVersion(courseCode, lang)
  } catch (error) {
    throw new Error(`Failed to fetch Ladok course data: ${error.message}`)
  }
}

async function getCourseRoundsData(courseCode, lang, user) {
  try {
    // TODO: Add endpoint to ladok client for retieving data from previous year onward
    // See requirements in http://kth-se.atlassian.net/browse/KUI-1653
    const previousYear = new Date().getFullYear() - 1
    const rounds = await client.getCourseInstancesFromPeriod(courseCode, `VT${previousYear}`, lang)
    const mappedRounds = await Promise.all(
      rounds.map(async round => ({
        shortName: round.kortnamn,
        applicationCode: round.tillfalleskod,
        startperiod: round.startperiod,
        firstTuitionDate: round.forstaUndervisningsdatum.date,
        lastTuitionDate: round.sistaUndervisningsdatum.date,
        status: round.status.code,
        full: round.fullsatt,
        cancelled: round.installt,
        language: {
          sv: (lang === 'sv' ? round.undervisningssprak?.name : round.undervisningssprak?.nameOther) ?? '',
          en: (lang === 'en' ? round.undervisningssprak?.name : round.undervisningssprak?.nameOther) ?? '',
        },
        userAccessDenied: !(await resolveUserAccessRights(
          user,
          courseCode,
          round.startperiod?.inDigits,
          round.tillfalleskod
        )),
      }))
    )
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

async function getLadokCourseSyllabus(courseCode, semester, lang) {
  try {
    const courseSyllabus = await client.getCourseSyllabus(courseCode, semester, lang)

    return courseSyllabus
  } catch (error) {
    throw new Error(error.message)
  }
}

async function getLadokCourseSyllabuses(courseCode, semester, lang) {
  try {
    const courseSyllabuses = await client.getCourseSyllabuses(courseCode, semester, lang)

    return courseSyllabuses
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getLadokCourseData,
  getCourseRoundsData,
  getCourseSchoolCode,
  getLadokCourseSyllabus,
  getLadokCourseSyllabuses,
}
