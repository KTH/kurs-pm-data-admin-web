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
function yearBeforeCurrentYear(semester) {
  const currentYear = new Date().getFullYear()
  const previousYear = currentYear - 1
  const yearToCheck = semester.slice(0, 4)
  return yearToCheck === previousYear.toString() ? true : false
}

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
  log.debug('Trying fetch courses application by', { ladokuid: ladokUID, uri, config: config.koppsApi })
  try {
    const { body, statusCode, statusMessage } = await client.getAsync({ uri, useCache: true })
    if (body) {
      log.debug('Fetched successfully course application for', { ladokuid: ladokUID, uri, config: config.koppsApi })
      return body
    }
    log.warn('Kopps responded with', statusCode, statusMessage, ` for ladokuid ${ladokUID}`)
    return {}
  } catch (err) {
    log.error('Kopps is not available', err)
    return []
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

async function getKoppsCourseRoundTerms(courseCode) {
  // step 1
  // fetch course round terms
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms`
  try {
    const res = await client.getAsync({ uri, useCache: true })
    const { course, termsWithCourseRounds } = res.body

    const activeTerms = termsWithCourseRounds.filter(
      t =>
        isDateWithinCurrentSemester(t.rounds[0].lastTuitionDate) ||
        isDateInFuture(t.rounds[0].lastTuitionDate) ||
        yearBeforeCurrentYear(t.term)
    )
    // step 2
    // fetch application codes for every round for every term
    if (activeTerms && activeTerms.length > 0) {
      for await (const term of termsWithCourseRounds) {
        const { rounds = [] } = term
        for await (const round of rounds) {
          const { ladokUID } = round
          if (ladokUID) {
            const { application_code = '' } = await getApplicationFromLadokUID(ladokUID)
            round.applicationCode = application_code
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

/**
 * This is temporary method to fetch only round id for UG Rest Api.
 * Because UG Rest Api is using ladok round id in its group names still.
 * So once it gets updated then this method will be removed.
 */
async function getLadokRoundIds(courseCode, semester, applicationCodes) {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms`
  try {
    const { body } = await client.getAsync({ uri, useCache: true })
    const { termsWithCourseRounds } = body
    const selectedTerm = termsWithCourseRounds.find(t => t.term.toString() === semester.toString())
    const ladokRoundIds = []
    if (selectedTerm) {
      const { rounds = [] } = selectedTerm
      if (rounds && rounds.length > 0) {
        for await (const round of rounds) {
          const { ladokUID, ladokRoundId } = round
          if (ladokUID) {
            const { application_code = '' } = await getApplicationFromLadokUID(ladokUID)
            const index = applicationCodes.findIndex(x => x.toString() === application_code.toString())
            if (index >= 0) {
              ladokRoundIds.push(ladokRoundId)
              applicationCodes.splice(index, 0)
            }
            if (applicationCodes.length === 0) {
              break
            }
          }
        }
      }
    }
    return ladokRoundIds
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
  getCourseSchool,
  getKoppsCourseRoundTerms,
  getSyllabus,
  findSyllabus,
  parseSyllabus,
  getApplicationFromLadokUID,
  getLadokRoundIds,
}
