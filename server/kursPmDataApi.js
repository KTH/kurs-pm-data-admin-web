'use strict'

const log = require('kth-node-log')
// const config = require('./configuration').server
const api = require('./api')

async function getMemoByEndPoint(status, memoEndPoint) {
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(paths.getMemoByEndPoint.uri, { memoEndPoint, status })
  try {
    const res = await client.getAsync({ uri })
    console.log('getMemoByEndPoint', res.body)
    return res.body
  } catch (err) {
    log.debug('getMemoByEndPoint is not available', err)
    return err
  }
}

async function postMemoDataById(courseCode, semester, body) {
  const { client, paths } = api.kursPmDataApi
  const id = `${courseCode}${semester}`
  const uri = client.resolve(paths.postCourseMemoData.uri, { id })
  console.log('Prepared whole object is', body)

  try {
    const res = await client.postAsync({ uri, body, useCache: false })
    console.log('!After  postAsync postMemoDataById', res)
    return res.body
  } catch (err) {
    log.debug('postMemoDataById is not available', err)
    return err
  }
}

// GET DRAFTS

async function getAllMemosByCourseCode(courseCode) {
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(
    paths.getAllMemosByCourseCodeAndType.uri,
    { courseCode, type: 'latest' },
    { batchSize: 10000 }
  )
  try {
    const res = await client.getAsync({ uri })
    console.log('getAllMemosByCourseCode', res.body)
    return res.body
  } catch (err) {
    log.debug('getAllMemosByCourseCode is not available', err)
    return err
  }
}

// POST TOTALLY NEW DRAFT ONLY COURSE, SEMESTER, ROUNDS
async function postNewDrafttFromScratch(courseCode, semester, body) {
  // updated
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(paths.postNewDrafttFromScratch.uri, { courseCode, semester })
  try {
    const res = await client.postAsync({ uri, body, useCache: false })
    return res.body
  } catch (err) {
    log.debug('postNewDrafttFromScratch is not available', err)
    return err
  }
}
module.exports = {
  getMemoByEndPoint,
  getAllMemosByCourseCode, // first step to get drafts
  postMemoDataById,
  postNewDrafttFromScratch
}
