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

/**
 * This is temporary method to fetch only round id for UG Rest Api.
 * Because UG Rest Api is using ladok round id in its group names still.
 * So once it gets updated then this method will be removed.
 */

async function getLadokRoundIdsFromKopps(courseCode, semester, applicationCodes = null) {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms`

  try {
    const { body } = await client.getAsync({ uri, useCache: true })
    const { termsWithCourseRounds } = body
    const selectedTerm = termsWithCourseRounds.find(t => t.term.toString() === semester.toString())

    const { rounds = [] } = selectedTerm

    if (applicationCodes) {
      const ladokRoundIds = []
      for (const { applicationCode = '', ladokRoundId } of rounds) {
        const index = applicationCodes.findIndex(x => x.toString() === applicationCode.toString())
        if (index >= 0) {
          ladokRoundIds.push(ladokRoundId)
          applicationCodes.splice(index, 0)
        }
        if (applicationCodes.length === 0) {
          break
        }
      }
      return ladokRoundIds
    } else {
      return rounds.map(round => round.ladokUID)
    }
  } catch (err) {
    throw new Error(`Failed to get Ladok Round IDs for course ${courseCode} in semester ${semester}: ${err.message}`)
  }
}

module.exports = {
  koppsApi: api,
  getLadokRoundIdsFromKopps,
}
