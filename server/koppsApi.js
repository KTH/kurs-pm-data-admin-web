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
  const literatureComment = lastSyllabus.literatureComment ? lastSyllabus.literatureComment : ''
  const selectedFields = {
    // TODO: Adapt keys to kurs-pm API instead of kopps naming
    learningOutcomes: lastSyllabus.goals,
    courseContent: lastSyllabus.content,
    additionalRegulations: lastSyllabus.additionalRegulations,
    ethicalApproach: lastSyllabus.ethicalApproach,
    examComments: lastSyllabus.examComments,
    literature: lastSyllabus.literature
      ? lastSyllabus.literature + literatureComment
      : '<i>No information found in kopps</i>',
    otherRequirementsForFinalGrade: lastSyllabus.reqsForFinalGrade
  }
  return selectedFields
}
function getCommonInfo(resBody) {
  const { credits, creditUnitAbbr, gradeScaleCode, title, prerequisites } = resBody.course
  const gradingScale = resBody.formattedGradeScales[gradeScaleCode]
  return { credits, creditUnitAbbr, gradingScale, title, prerequisites }
}
function getExamModules(examinationSets, grades, roundLang) {
  const language = roundLang === 'en' ? 0 : 1
  let titles = ''
  let liStrs = ''
  examinationSets.map(exam => {
    const credits =
      exam.credits && exam.credits.toString().length === 1 ? exam.credits + '.0' : exam.credits
    ;(titles += `<h4>${exam.title} ( ${exam.examCode} )</h4>`),
      (liStrs += `<li>${exam.examCode} - ${exam.title}, ${
        language === 0 ? credits : credits.toString().replace('.', ',')
      } ${language === 0 ? 'credits' : 'hp'}, ${
        language === 0 ? 'Grading scale' : 'Betygsskala'
      }: ${grades[exam.gradeScaleCode]}</li>`)
  })
  return { titles, liStrs }
}

function combineExamInfo(examModules, selectedSyllabus) {
  const examModulesHtmlList = `<p><ul>${examModules.liStrs}</ul></p>`
  const examination = `${examModulesHtmlList}<p>${selectedSyllabus.examComments}</p>`
  const examinationModules = examModules.titles
  return { examination, examinationModules }
}

function getScheduleDetailsTemplate(language) {
  const english = language === 'en'
  const header = `<thead><tr>
  <td style="width: 33.3333%">${english ? 'Learning activities' : 'Läraktivitet'}</td>
  <td style="width: 33.3333%">${english ? 'Content' : 'Innehåll'}</td>
  <td style="width: 33.3333%">${english ? 'Preparations' : 'Förberedelse'}</td>
  </tr></thead>`

  const emptyRow = `<tr>
  <td style="width: 33.3333%;">&nbsp;</td>
  <td style="width: 33.3333%;">&nbsp;</td>
  <td style="width: 33.3333%;">&nbsp;</td>
  </tr>`

  const scheduleDetailsTemplate = `<table style="border-collapse: collapse; width: 100%;" border="1">
  ${header}
  <tbody>
  ${emptyRow.repeat(3)}
  </tbody>
  </table>
  `

  return { scheduleDetailsTemplate }
}

function getScheduleLinks(language) {
  const english = language === 'en'
  const scheduleName = english ? 'Schedule' : 'Schema'

  return function scheduleLinks(url) {
    if (!url) return ''
    const urls = Array.isArray(url) ? url : [url]
    const uniqueUrls = urls.filter(function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    })
    return uniqueUrls
      .map(function urlRow(uniqueUrl) {
        return uniqueUrl
          ? `<br/><a title="${scheduleName}" href="${uniqueUrl}" target="_blank" rel="noopener">${scheduleName}</a>`
          : ''
      })
      .join('')
  }
}

async function getDetailedInformation(courseCode) {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${courseCode}/detailedinformation`
  try {
    const res = await client.getAsync({ uri, useCache: true })
    const { infoContactName, possibilityToCompletion, possibilityToAddition } = res.body.course // Kontaktperson
    const { round } = res.body.roundInfos[1] // Hardcoded
    const schemaUrl = []
    res.body.roundInfos.forEach(roundInfo => {
      schemaUrl.push(roundInfo.schemaUrl)
    })
    return {
      infoContactName,
      languageOfInstructions: round.language,
      possibilityToCompletion,
      possibilityToAddition,
      schemaUrl
    }
  } catch (err) {
    log.debug('Kopps is not available', err)
    return err
  }
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
    const commonInfo = getCommonInfo(res.body)
    const scheduleDetails = getScheduleDetailsTemplate(language)
    const scheduleLinks = getScheduleLinks(language)
    return {
      ...commonInfo,
      ...combinedExamInfo,
      ...selectedSyllabus,
      ...scheduleDetails,
      scheduleLinks,
      ...(await getDetailedInformation(courseCode, language))
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
