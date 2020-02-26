'use strict'

const log = require('kth-node-log')
const api = require('./api')

// Gets a list of used round ids for a semester in a course
async function getMemoApiData(apiFn, uriParam) {
  // (apiFn, param)
  try {
    const { client, paths } = api.kursPmDataApi
    const uri = client.resolve(paths[apiFn].uri, uriParam)
    const res = await client.getAsync({ uri, useCache: false })
    console.log('getMemoApi', apiFn, '======>', res.body)
    return res.body
  } catch (error) {
    log.debug('getMemoApi path ', { apiFn }, ' is not available', { error })
    return error
  }
}

// Gets a list of used round ids for a semester in a course
async function saveToMemoApi(postApiFn, uriParam, body) {
  // (apiFn, param)
  try {
    const { client, paths } = api.kursPmDataApi
    const uri = client.resolve(paths[postApiFn].uri, uriParam)

    const res = await client.postAsync({ uri, body, useCache: false })
    console.log('saveToMemoApi path', postApiFn, '======>', res.body)
    return res.body
  } catch (error) {
    log.debug('saveToMemoApi path ', postApiFn, ' is not available', error)
    return error
  }
}

async function updateCreatedDraft(memoEndPoint, body) {
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(paths.updateCreatedDraft.uri, { memoEndPoint })

  try {
    const res = await client.putAsync({ uri, body, useCache: false })
    return res.body
  } catch (err) {
    log.debug('updateCreatedDraft is not available', err)
    return err
  }
}

module.exports = {
  getMemoApiData,
  saveToMemoApi,
  updateCreatedDraft
}
