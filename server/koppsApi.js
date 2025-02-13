'use strict'

const log = require('@kth/log')
const redis = require('kth-node-redis')
const connections = require('@kth/api-call').Connections
const { server: config } = require('./configuration')

const koppsOpts = {
  log,
  https: true,
  redis,
  cache: config.cache,
  timeout: 5000,
  defaultTimeout: config.koppsApi.defaultTimeout,
  retryOnESOCKETTIMEDOUT: true,
  useApiKey: false, // skip key
}

config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because kopps doesnt have it
config.koppsApi.connected = true

const koppsConfig = {
  koppsApi: config.koppsApi,
}

const api = connections.setup(koppsConfig, koppsConfig, koppsOpts)

/**
 * This is temporary method to fetch only round id for UG Rest Api.
 * Because UG Rest Api is using ladok round id in its group names still.
 * So once it gets updated then this method will be removed.
 */

async function getLadokRoundIds(courseCode, semester, applicationCodes = null) {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms`

  try {
    const { body } = await client.getAsync({ uri, useCache: true })
    const { termsWithCourseRounds } = body
    const selectedTerm = termsWithCourseRounds.find(t => t.term.toString() === semester.toString())

    const { rounds = [] } = selectedTerm

    if (applicationCodes) {
      const ladokRoundIds = []
      for (const { applicationCode = '', ladokRoundId } of rounds) {
        const index = applicationCodes.findIndex(x => x.toString() === applicationCode.toString())
        if (index >= 0) {
          ladokRoundIds.push(ladokRoundId)
          applicationCodes.splice(index, 0)
        }
        if (applicationCodes.length === 0) {
          break
        }
      }
      return ladokRoundIds
    } else {
      return rounds.map(round => round.ladokUID)
    }
  } catch (err) {
    throw new Error(`Failed to get Ladok Round IDs for course ${courseCode} in semester ${semester}: ${err.message}`)
  }
}

/** STEP 2: CONTENT FOR COURSE SYLLLABUS INFO AND OTHER COURES INFO WHEN USER EDIT A MEMO * */
const _combineStartEndDates = (sortedSyllabuses, indexOf) => {
  if (sortedSyllabuses.length === 0) return ''
  let validUntilTerm = ''

  const nextSyllabusDate = sortedSyllabuses[indexOf - 1] ? sortedSyllabuses[indexOf - 1].validFromTerm.term : ''
  const lastTerm = nextSyllabusDate.toString().substring(4, 5)
  if (lastTerm === '2') validUntilTerm = nextSyllabusDate - 1
  else if (lastTerm === '1') validUntilTerm = nextSyllabusDate - 9
  return validUntilTerm
}

function findSyllabus(body, semester) {
  const { publicSyllabusVersions = [] } = body
  const sortedSyllabusesByTerms = publicSyllabusVersions.sort(
    (a, b) => Number(b.validFromTerm.term) - Number(a.validFromTerm.term)
  )
  const syllabusIndex = sortedSyllabusesByTerms.findIndex(syllabus => syllabus.validFromTerm.term <= Number(semester))

  const syllabusContent = sortedSyllabusesByTerms[syllabusIndex]

  const validUntilTerm = _combineStartEndDates(sortedSyllabusesByTerms, syllabusIndex)

  const { courseSyllabus = {}, validFromTerm = {} } = syllabusContent

  const selectedFields = {
    additionalRegulations: courseSyllabus.additionalRegulations || '',
    learningOutcomes: courseSyllabus.goals || '',
    courseContent: courseSyllabus.content || '',
    ethicalApproach: courseSyllabus.ethicalApproach || '',
    examComments: courseSyllabus.examComments || '',
    otherRequirementsForFinalGrade: courseSyllabus.reqsForFinalGrade || '',
    syllabusValid: {
      validFromTerm: validFromTerm.term || '',
      validUntilTerm,
    },
  }

  return selectedFields
}

function _choosePermanentDisabilityTemplate(language = 'sv') {
  const message = {
    en: `<p>Students at KTH with a permanent disability can get support during studies from Funka:</p>
    <p><a href="https://www.kth.se/en/student/stod/studier/funktionsnedsattning/funka">Funka - compensatory support for students with disabilities</a></p>`,
    sv: `<p>Om du har en funktionsnedsättning kan du få stöd via Funka:</p>
  <p><a href="https://www.kth.se/student/stod/studier/funktionsnedsattning/funka">Funka- stöd för studenter med funktionsnedsättningar</a></p>`,
  }
  return message[language]
}

function _getRecruitmentText(body) {
  const { course } = body
  return course && course.recruitmentText ? course.recruitmentText : ''
}

function _getCommonInfo(resBody) {
  // step 2
  const { course: c = {} } = resBody
  return {
    creditUnitAbbr: c.creditUnitAbbr || '',
  }
}

async function _getDetailedInformation(courseCode, language = 'sv') {
  // step 2
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${courseCode}/detailedinformation?l=${language}`
  try {
    const res = await client.getAsync({ uri, useCache: false })
    return res
  } catch (err) {
    log.debug('Kopps is not available', err)
    return err
  }
}

function parseSyllabus(body, semester, language = 'sv') {
  if (!body || !semester) return {}
  const selectedSyllabus = findSyllabus(body, semester)
  const commonInfo = _getCommonInfo(body)
  const permanentDisability = _choosePermanentDisabilityTemplate(language)
  const recruitmentText = _getRecruitmentText(body)

  return {
    ...commonInfo,
    ...selectedSyllabus,
    permanentDisability,
    recruitmentText,
  }
}

async function getSyllabus(courseCode, semester, language = 'sv') {
  try {
    const detailedInformation = await _getDetailedInformation(courseCode, language)
    const { body } = detailedInformation
    const formattedSyllabus = parseSyllabus(body, semester, language)

    return formattedSyllabus
  } catch (err) {
    log.debug('Kopps is not available', err)
    return err
  }
}

module.exports = {
  koppsApi: api,
  getSyllabus,
  findSyllabus,
  parseSyllabus,
  getLadokRoundIds,
}
