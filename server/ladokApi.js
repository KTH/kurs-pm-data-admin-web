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

async function getCourseRoundsData(courseCode, lang) {
  // TODO: need to find a way to handle state instead of just hardcoding it
  try {
    const course = await client.getActiveCourseRounds(courseCode, lang)
    const mappedRounds = course.map(round => {
      const otherLang = lang === 'en' ? 'sv' : 'en'
      return {
        shortName: round.kortnamn,
        applicationCode: round.tillfalleskod,
        startperiod: round.startperiod,
        firstTuitionDate: round.forstaUndervisningsdatum.date,
        lastTuitionDate: round.sistaUndervisningsdatum.date,
        state: 'APPROVED',
        language: {
          [lang]: round.undervisningssprak ? round.undervisningssprak.name : '',
          [otherLang]: round.undervisningssprak ? round.undervisningssprak.nameOther : '',
        },
        campus: {
          [lang]: round.studieort ? round.studieort.name : '',
          [otherLang]: round.studieort ? round.studieort.nameOther : '',
        },
      }
    })
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
  getCourseRoundsData,
  getCourseSchoolCode,
}