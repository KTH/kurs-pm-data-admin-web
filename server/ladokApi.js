'use strict'

const i18n = require('../i18n')
const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { HttpError } = require('./utils/errorUtils')
const { server: serverConfig } = require('./configuration')
const { resolveUserAccessRights } = require('./ugRestApi')

const HTTP_CODE_400 = 400

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokCourseData(courseCode, lang) {
  const courseData = await client.getLatestCourseVersion(courseCode, lang)

  if (courseData.statusCode >= HTTP_CODE_400 || courseData.apiError) {
    throw new HttpError(i18n.message('error_not_found', lang), courseData.statusCode)
  }

  return courseData
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

module.exports = {
  getLadokCourseData,
  getCourseRoundsData,
  getCourseSchoolCode,
  getLadokCourseSyllabus,
}
