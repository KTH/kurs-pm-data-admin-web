'use strict'

const log = require('@kth/log')
const api = require('./api')
const { HttpError } = require('./utils/errorUtils')

const clientActions = {
  copyFromAPublishedMemo: 'postAsync',
  createDraftByMemoEndPoint: 'postAsync',
  publishMemoByEndPoint: 'postAsync',
  deleteDraftByMemoEndPoint: 'delAsync',
  updateCreatedDraft: 'putAsync',
}
// Gets a list of used round ids for a semester in a course
async function getMemoApiData(apiFnName, uriParam) {
  try {
    const { client, paths } = api.kursPmDataApi
    const uri = client.resolve(paths[apiFnName].uri, uriParam)
    const res = await client.getAsync({ uri, useCache: false })
    return res.body
  } catch (error) {
    log.debug('getMemoApi path ', { apiFnName }, ' is not available', { error })
    return error
  }
}

// Gets a list of used round ids for a semester in a course
async function changeMemoApiData(apiFnName, uriParam, body) {
  try {
    const { client, paths } = api.kursPmDataApi
    const uri = client.resolve(paths[apiFnName].uri, uriParam)
    const action = clientActions[apiFnName]
    const res = await client[action]({ uri, body, useCache: false })
    if (res.statusCode >= 400) {
      throw new HttpError(res.body, res.statusCode)
    }
    return res.body
  } catch (error) {
    log.debug('Changing of data with ', { apiFnName }, ' with parameter,', { uriParam }, { body }, 'is not available', {
      error,
    })
    throw error
  }
}

module.exports = {
  getMemoApiData,
  changeMemoApiData,
}
