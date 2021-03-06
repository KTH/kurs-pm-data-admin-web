'use strict'

const log = require('kth-node-log')
const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections
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
const _prevTermNumber = () => {
  // step 1
  const SPRING = 1
  const FALL = 2
  const today = new Date()
  const prevYear = today.getFullYear() - 1
  const currentMonth = today.getMonth()
  const currentSemester = currentMonth < 7 ? SPRING : FALL
  return Number(`${prevYear}${currentSemester}`)
}

const _sliceTermsArrByPrevTerm = allTerms => {
  // step 1
  const prevTerm = _prevTermNumber()
  const indexForCut = allTerms.findIndex(obj => Number(obj.term) < prevTerm)
  const finalTerms = indexForCut === -1 ? allTerms : allTerms.slice(0, indexForCut)
  return finalTerms
}

async function getKoppsCourseRoundTerms(courseCode) {
  // step 1
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms`
  try {
    const res = await client.getAsync({ uri, useCache: true })
    const { course, termsWithCourseRounds } = res.body
    const slicedTermsByPrevTerm = _sliceTermsArrByPrevTerm(termsWithCourseRounds)

    return {
      course,
      lastTermsInfo: slicedTermsByPrevTerm,
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

function _getSelectedSyllabus(body, semester) {
  // TODO: Maybe add to be sure check if it is correct syllabus by looking at validFromTerm.term === semester
  const { publicSyllabusVersions } = body
  const sortedSyllabusesByTerms = publicSyllabusVersions.sort(
    (a, b) => Number(b.validFromTerm.term) - Number(a.validFromTerm.term)
  )
  const syllabusIndex = sortedSyllabusesByTerms.findIndex(syllabus => syllabus.validFromTerm.term <= Number(semester))

  const syllabusContent = sortedSyllabusesByTerms[syllabusIndex]

  const validUntilTerm = _combineStartEndDates(sortedSyllabusesByTerms, syllabusIndex)

  const { courseSyllabus, validFromTerm } = syllabusContent

  const selectedFields = {
    learningOutcomes: courseSyllabus.goals || '',
    courseContent: courseSyllabus.content || '',
    additionalRegulations: courseSyllabus.additionalRegulations || '',
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

function _getExamModules(body, semester, roundLang) {
  const { examinationSets, formattedGradeScales } = body
  const { creditUnitAbbr } = body.course
  const sortedDescExamTerms = Object.keys(examinationSets).sort((a, b) => Number(b) - Number(a))
  const matchingExamSetKey = sortedDescExamTerms.find(examTerm => Number(examTerm) <= Number(semester))

  const language = roundLang === 'en' ? 0 : 1
  let titles = ''
  let liStrs = ''
  if (examinationSets[matchingExamSetKey] && examinationSets[matchingExamSetKey].examinationRounds.length > 0) {
    examinationSets[matchingExamSetKey].examinationRounds.map(exam => {
      const credits = exam.credits && exam.credits.toString().length === 1 ? exam.credits + '.0' : exam.credits
      titles += `<h4>${exam.title} ( ${exam.examCode} )</h4>`
      liStrs += `<li>${exam.examCode} - ${exam.title}, ${
        language === 0 ? credits : credits.toString().replace('.', ',')
      } ${language === 0 ? 'credits' : creditUnitAbbr}, ${language === 0 ? 'Grading scale' : 'Betygsskala'}: ${
        formattedGradeScales[exam.gradeScaleCode]
      }</li>`
    })
  }
  return { titles, liStrs }
}

function _combineExamInfo(examModules, selectedSyllabus) {
  const examModulesHtmlList = `<p><ul>${examModules.liStrs}</ul></p>`
  const examination = `${examModulesHtmlList}<p>${selectedSyllabus.examComments}</p>`
  const examinationModules = examModules.titles
  return { examination, examinationModules }
}

function _getPermanentDisabilityTemplate(language) {
  const message = {
    en: `<p>Students at KTH with a permanent disability can get support during studies from Funka:</p>
    <p><a href="https://www.kth.se/en/student/studentliv/funktionsnedsattning">Funka - compensatory support for students with disabilities</a></p>`,
    sv: `<p>Om du har en funktionsnedsättning kan du få stöd via Funka:</p>
  <p><a href="https://www.kth.se/student/studentliv/funktionsnedsattning">Funka- stöd för studenter med funktionsnedsättningar</a></p>`,
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
  const { course: c } = resBody
  const gradingScale = `<p>${resBody.formattedGradeScales[c.gradeScaleCode]}</p>`
  const schemaUrls = resBody.roundInfos
    .filter(roundInfo => roundInfo.schemaUrl !== undefined)
    .map(({ schemaUrl }) => schemaUrl)
  const isCreditNotStandard =
    c.credits && c.credits.toString().indexOf('.') < 0 && c.credits.toString().indexOf(',') < 0
  return {
    credits: isCreditNotStandard ? c.credits + '.0' : c.credits || '',
    creditUnitAbbr: c.creditUnitAbbr || '',
    gradingScale: gradingScale || '',
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

async function getSyllabus(courseCode, semester, language = 'sv') {
  try {
    const detailedInformation = await _getDetailedInformation(courseCode, language)
    const { body } = detailedInformation
    const selectedSyllabus = _getSelectedSyllabus(body, semester)
    const commonInfo = _getCommonInfo(body)
    const examModules = _getExamModules(body, semester, language)
    const combinedExamInfo = _combineExamInfo(examModules, selectedSyllabus)
    const permanentDisability = _getPermanentDisabilityTemplate(language)
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
  } catch (err) {
    log.debug('Kopps is not available', err)
    return err
  }
}

module.exports = {
  koppsApi: api,
  getKoppsCourseRoundTerms,
  getSyllabus,
}
