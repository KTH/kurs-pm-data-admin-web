'use strict'

const log = require('kth-node-log')
const config = require('./configuration').server
const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections

const koppsOpts = {
  log,
  https: true,
  redis,
  cache: config.cache,
  timeout: 5000,
  defaultTimeout: config.koppsApi.defaultTimeout,
  retryOnESOCKETTIMEDOUT: true,
  useApiKey: false // skip key
}

config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because kopps doesnt have it
config.koppsApi.connected = true

const koppsConfig = {
  koppsApi: config.koppsApi
}

const api = connections.setup(koppsConfig, koppsConfig, koppsOpts)

function getSelectedSyllabus(syllabusObject) {
  // TODO: Maybe add to be sure check if it is correct syllabus by looking at validFromTerm.term === semester
  const lastSyllabus = syllabusObject.publicSyllabusVersions[0].courseSyllabus
  const selectedFields = {
    // TODO: Adapt keys to kurs-pm API instead of kopps naming
    goals: lastSyllabus.goals,
    content: lastSyllabus.content,
    additionalRegulations: lastSyllabus.additionalRegulations,
    ethicalApproach: lastSyllabus.ethicalApproach,
    examComments: lastSyllabus.examComments,
    languageOfInstruction: lastSyllabus.languageOfInstruction,
    reqsForFinalGrade: lastSyllabus.reqsForFinalGrade
  }
  return selectedFields
}
function getCommonInfo(courseObj) {
  const { title, credits, creditUnitAbbr } = courseObj
  return { title, credits, creditUnitAbbr }
}
function getExamModules(examinationSets, grades, roundLang) {
  const language = roundLang === 'en' ? 0 : 1
  let examSet = examinationSets.map(exam => {
    exam.credits =
      exam.credits && exam.credits.toString().length === 1 ? exam.credits + '.0' : exam.credits
    return {
      title: `${exam.title} ( ${exam.examCode} )`,
      liStr: `<li> ${exam.examCode} - ${exam.title}, ${
        language === 0 ? exam.credits : exam.credits.toString().replace('.', ',')
      } ${language === 0 ? 'credits' : 'hp'}, ${
        language === 0 ? 'Grading scale' : 'Betygsskala'
      }: ${grades[exam.gradeScaleCode]}</li>`
    }
  })
  return examSet
}

function combineExamInfo(examModules, selectedSyllabus) {
  const examModulesHtmlList = `<p><ul class="ul-no-padding">${examModules.map(
    exam => exam.liStr
  )}</ul></p>`
  const examination = `${examModulesHtmlList}<p>${selectedSyllabus.examComments}</p>`
  const examinationModules = `${examModules.map(exam => `<h4>${exam.title}</h4>`)}`
  return { examination, examinationModules }
}

async function getSyllabus(courseCode, semester, language = 'sv') {
  const { client } = api.koppsApi

  const uri = `${config.koppsApi.basePath}syllabuses/${courseCode}/${semester}?l=${language}`
  try {
    const res = await client.getAsync({ uri, useCache: true })
    const selectedSyllabus = getSelectedSyllabus(res.body)
    const examModules = getExamModules(
      res.body.examinationSets[semester].examinationRounds,
      res.body.formattedGradeScales,
      language
    )
    const combinedExamInfo = combineExamInfo(examModules, selectedSyllabus)
    const commonInfo = getCommonInfo(res.body.course)
    return {
      ...commonInfo,
      ...combinedExamInfo,
      ...selectedSyllabus
    }
  } catch (err) {
    log.debug('Kopps is not available', err)
    return err
  }
}

module.exports = {
  koppsApi: api,
  getSyllabus
}
