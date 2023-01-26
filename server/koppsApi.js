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

/** STEP 1: CHOOSE COURSE ROUNDS TO CREATE A NEW ONE * */
function getDateOfMondayOfTheWeek(startDate) {
  const currentDate = new Date(startDate)
  const first = currentDate.getDate() - currentDate.getDay() + 1
  const firstMondayOfSpringSemester = new Date(currentDate.setDate(first))
  return firstMondayOfSpringSemester
}

function addDays(date, days) {
  // return date.setDate(date.getDate() + days)
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

function getCurrentTerm(overrideDate) {
  const JULY = 6
  const SPRING = 1
  const FALL = 2
  const currentDate = overrideDate || new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentSemester = currentMonth < JULY ? SPRING : FALL
  return `${currentYear * 10 + currentSemester}`
}

function isDateWithinCurrentSemester(checkDate) {
  // checking if lastTuitionDate is within current semester
  const currentSemester = getCurrentTerm().slice(-1)
  const dateToCheck = new Date(checkDate)
  const today = new Date()
  const currentYear = today.getFullYear()
  const startDateOfStartWeekAutumnSemester = `${currentYear}-08-28`
  // const endDateOfStartWeekAutumnSemester = `${currentYear}-09-03`
  const startDateOfAutumnSemester = getDateOfMondayOfTheWeek(startDateOfStartWeekAutumnSemester)

  const endDateOfAutumnSemester = addDays(startDateOfAutumnSemester, 140)
  const startDateOfSpringSemester = addDays(endDateOfAutumnSemester, 1)
  const endDateOfSpringSemester = addDays(startDateOfSpringSemester, 140)

  if (currentSemester == 2) {
    if (
      dateToCheck > startDateOfAutumnSemester ||
      (dateToCheck > startDateOfAutumnSemester && dateToCheck < endDateOfAutumnSemester)
    ) {
      return true
    }
  } else {
    if (
      dateToCheck > startDateOfSpringSemester ||
      (dateToCheck > startDateOfSpringSemester && dateToCheck < endDateOfSpringSemester)
    ) {
      return true
    }
  }
  return false
}

function isDateInFuture(checkDate) {
  const dateToCheck = new Date(checkDate)
  const today = new Date()

  if (dateToCheck > today) return true

  return false
}

async function getApplicationFromLadokUID(ladokUID) {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}courses/offerings/roundnumber?ladokuid=${ladokUID}`
  log.info('Trying fetch courses application by', { ladokuid: ladokUID, uri, config: config.koppsApi })
  try {
    const res = await client.getAsync({ uri, useCache: true })
    if (res.body) {
      const { body } = res
      log.info('Fetched successfully course application for', { ladokuid: ladokUID, uri, config: config.koppsApi })
      return body
    }
    log.warn('Kopps responded with', res.statusCode, res.statusMessage, ` for ladokuid ${ladokUID}`)
    return {}
  } catch (err) {
    log.error('Kopps is not available', err)
    return []
  }
}

// No need to merge this method to master
async function getAllCourseCodes() {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}courses`
  try {
    const { body: courses, statusCode } = await client.getAsync({ uri, useCache: true })
    if (!courses || statusCode !== 200) return 'kopps_get_fails'
    const courseCodes = []
    courses.forEach(({ code }) => {
      courseCodes.push(code)
    })
    return courseCodes
  } catch (err) {
    return err
  }
}

async function getCourseSchool(courseCode) {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}`
  try {
    const { body: course, statusCode } = await client.getAsync({ uri, useCache: true })
    if (!course || statusCode !== 200) return 'kopps_get_fails'

    const { school } = course
    if (!school) return 'missing_school_code'
    const { code } = school
    if (!code) return 'missing_school_code'
    return code
  } catch (err) {
    return err
  }
}

async function getKoppsCourseRoundTerms(courseCode, fetchApplication = true) {
  // step 1
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms`
  try {
    const res = await client.getAsync({ uri, useCache: true })
    const { course, termsWithCourseRounds } = res.body

    /*  const activeTerms = termsWithCourseRounds.filter(
      term =>
        isDateWithinCurrentSemester(term.rounds[0].lastTuitionDate) || isDateInFuture(term.rounds[0].lastTuitionDate)
    ) */

    if (termsWithCourseRounds && termsWithCourseRounds.length > 0 && fetchApplication) {
      for await (const term of termsWithCourseRounds) {
        const { rounds } = term
        for await (const round of rounds) {
          const { ladokUID } = round
          if (ladokUID && ladokUID !== '') {
            const { application_code } = await getApplicationFromLadokUID(ladokUID)
            round.applicationCodes = [application_code]
          }
        }
      }
    }

    return {
      course,
      lastTermsInfo: termsWithCourseRounds,
    }
  } catch (err) {
    log.debug('getKoppsCourseRoundTerms has an error:' + err)
    return err
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

function _parseExamModules(body, semester, roundLang) {
  const { course = {}, examinationSets = {}, formattedGradeScales = {} } = body
  const { creditUnitAbbr = '' } = course
  const sortedDescExamTerms = Object.keys(examinationSets).sort((a, b) => Number(b) - Number(a))
  const matchingExamSetKey = sortedDescExamTerms.find(examTerm => Number(examTerm) <= Number(semester))
  const { examinationRounds = [] } = examinationSets[matchingExamSetKey] ? examinationSets[matchingExamSetKey] : {}

  const language = roundLang === 'en' ? 0 : 1
  let titles = ''
  let liStrs = ''
  examinationRounds.forEach(exam => {
    let { credits: examCredits = '' } = exam
    const { examCode = '', title = '', gradeScaleCode = '' } = exam
    examCredits = examCredits.toString().length === 1 ? examCredits + '.0' : examCredits
    const localeCredits = language === 0 ? examCredits : examCredits.toString().replace('.', ',')
    const localeCreditUnitAbbr = language === 0 ? 'credits' : creditUnitAbbr
    let examTitle = examCode || title ? `${examCode} ${examCode && title ? '-' : ''} ${title}` : ''
    examTitle = examTitle ? `${examTitle}${localeCredits ? `, ${localeCredits} ${localeCreditUnitAbbr}` : ''}` : ''

    titles += examTitle ? `<h4>${examTitle}</h4>` : ''
    liStrs += examTitle
      ? `<li>${examTitle}, ${language === 0 ? 'Grading scale' : 'Betygsskala'}: ${
          formattedGradeScales[gradeScaleCode]
        }</li>`
      : ''
  })
  return { titles, liStrs }
}

function _combineExamInfo(examModules, selectedSyllabus) {
  const { liStrs = '', titles: examinationModules = '' } = examModules
  const { examComments = '' } = selectedSyllabus
  const examModulesHtmlList = liStrs ? `<p><ul>${liStrs}</ul></p>` : ''
  const examination = `${examModulesHtmlList}${examComments ? `<p>${examComments}</p>` : ''}`
  return { examination, examinationModules }
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

function _getDepartment(body) {
  const { course } = body
  return course && course.department ? course.department.name : ''
}

function _getRecruitmentText(body) {
  const { course } = body
  return course && course.recruitmentText ? course.recruitmentText : ''
}

function _getCourseMainSubjects(body) {
  const { mainSubjects } = body
  return mainSubjects && mainSubjects.length > 0 ? mainSubjects.join(', ') : ''
}
function _getCommonInfo(resBody) {
  // step 2
  const { course: c = {}, roundInfos = [], formattedGradeScales = {} } = resBody
  const gradingScale = c.gradeScaleCode ? `<p>${formattedGradeScales[c.gradeScaleCode]}</p>` : ''
  const schemaUrls = roundInfos.filter(roundInfo => roundInfo.schemaUrl !== undefined).map(({ schemaUrl }) => schemaUrl)
  const isCreditNotStandard =
    c.credits && c.credits.toString().indexOf('.') < 0 && c.credits.toString().indexOf(',') < 0
  return {
    credits: isCreditNotStandard ? c.credits + '.0' : c.credits || '',
    creditUnitAbbr: c.creditUnitAbbr || '',
    educationalTypeId: c.educationalTypeId || null,
    gradingScale,
    title: c.title || '',
    titleOther: c.titleOther || '',
    prerequisites: c.prerequisites || '',
    possibilityToCompletionTemplate: c.possibilityToCompletion || '',
    possibilityToAdditionTemplate: c.possibilityToAddition || '',
    schemaUrls: schemaUrls || '',
    literatureTemplate: c.courseLiterature || '',
    equipmentTemplate: c.requiredEquipment || '',
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
  const examModules = _parseExamModules(body, semester, language)
  const combinedExamInfo = _combineExamInfo(examModules, selectedSyllabus)
  const permanentDisability = _choosePermanentDisabilityTemplate(language)
  const departmentName = _getDepartment(body)
  const recruitmentText = _getRecruitmentText(body)
  const courseMainSubjects = _getCourseMainSubjects(body)

  return {
    ...commonInfo,
    ...combinedExamInfo,
    ...selectedSyllabus,
    permanentDisability,
    departmentName,
    recruitmentText,
    courseMainSubjects,
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
  getAllCourseCodes,
  getCourseSchool,
  getKoppsCourseRoundTerms,
  getSyllabus,
  findSyllabus,
  parseSyllabus,
  getApplicationFromLadokUID,
}
