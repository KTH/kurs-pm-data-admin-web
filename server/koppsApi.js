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
    formattedGradeScales: lastSyllabus.formattedGradeScales,
    ethicalApproach: lastSyllabus.ethicalApproach,
    examComments: lastSyllabus.examComments,
    reqsForFinalGrade: lastSyllabus.reqsForFinalGrade
  }
  return selectedFields
}

async function getSyllabus(courseCode, semester, language = 'sv') {
  const { client } = api.koppsApi

  const uri = `${config.koppsApi.basePath}syllabuses/${courseCode}/${semester}?l=${language}`
  try {
    const res = await client.getAsync({ uri, useCache: true })
    const selectedSyllabus = getSelectedSyllabus(res.body)
    const commonInfo = { title: res.body.course.title, credits: res.body.course.credits }
    return {
      ...selectedSyllabus,
      ...commonInfo
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
