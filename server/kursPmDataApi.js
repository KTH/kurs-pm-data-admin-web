'use strict'

const log = require('kth-node-log')
const config = require('./configuration').server
const api = require('./api')

async function getMemoDataById(courseCode, semester) {
  const { client, paths } = api.kursPmDataApi
  const id = `${courseCode}${semester}`
  const uri = client.resolve(paths.getCourseMemoDataById.uri, { id })
  // const uri = `${config.nodeApi.kursPmDataApi.basePath}/v1/courseMemoData/${courseCode}${semester}`
  try {
    const res = await client.getAsync({ uri })
    console.log('getMemoDataById', res.body)
    return res.body
  } catch (err) {
    log.debug('getMemoDataById is not available', err)
    return err
  }
}

async function postMemoDataById(courseCode, semester, content) {
  const { client, paths } = api.kursPmDataApi
  const id = `${courseCode}${semester}`
  const uri = client.resolve(paths.postCourseMemoData.uri, { id })
  console.log('postMemoDataById', content)

  const body = {
    _id: id,
    courseCode,
    semester,
    koppsGoals: content.koppsObject.goals,
    betygskriterier: content.editorContent
  }

  try {
    const res = await client.postAsync({ uri, body, useCache: false })
    console.log('!After  postAsync postMemoDataById', res)
    return res.body
  } catch (err) {
    log.debug('postMemoDataById is not available', err)
    return err
  }
}

module.exports = {
  getMemoDataById,
  postMemoDataById
}
