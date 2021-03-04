'use strict'

/**
 * System controller for functions such as /about and /monitor
 */
const os = require('os')

const log = require('kth-node-log')
const { getPaths } = require('kth-node-express-routing')
const language = require('kth-node-web-common/lib/language')
const registry = require('component-registry').globalRegistry
const { IHealthCheck } = require('kth-node-monitor').interfaces

const version = require('../../config/version')
const i18n = require('../../i18n')
const packageFile = require('../../package.json')

const ldapClient = require('../adldapClient')
const api = require('../api')
const { server: config } = require('../configuration')

/**
 * Adds a zero (0) to numbers less then ten (10)
 */
function zeroPad(value) {
  return value < 10 ? '0' + value : value
}

/**
 * Takes a Date object and returns a simple date string.
 */
function _simpleDate(date) {
  const year = date.getFullYear()
  const month = zeroPad(date.getMonth() + 1)
  const day = zeroPad(date.getDate())
  const hours = zeroPad(date.getHours())
  const minutes = zeroPad(date.getMinutes())
  const seconds = zeroPad(date.getSeconds())
  const hoursBeforeGMT = date.getTimezoneOffset() / -60
  const timezone = [' GMT', ' CET', ' CEST'][hoursBeforeGMT] || ''
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${timezone}`
}

const started = _simpleDate(new Date())

/**
 * Get request on not found (404)
 * Renders the view 'notFound' with the layout 'exampleLayout'.
 */
function _notFound(req, res, next) {
  const err = new Error('Not Found: ' + req.originalUrl)
  err.status = 404
  next(err)
}

function _getFriendlyErrorMessage(lang, statusCode) {
  switch (statusCode) {
    case 404:
      return i18n.message('error_not_found', lang)
    default:
      return i18n.message('error_generic', lang)
  }
}

// this function must keep this signature for it to work properly
// eslint-disable-next-line no-unused-vars
function _final(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500
  const isProd = /prod/gi.test(process.env.NODE_ENV)
  const lang = language.getLanguage(res)

  switch (statusCode) {
    case 403:
      log.info({ err }, `403 Forbidden ${err.message}`)
      break
    case 404:
      log.info({ err }, `404 Not found ${err.message}`)
      break
    default:
      log.error({ err }, `Unhandled error ${err.message}`)
      break
  }

  res.format({
    'text/html': () => {
      res.status(statusCode).render('system/error', {
        layout: 'errorLayout',
        message: err.message,
        friendly: _getFriendlyErrorMessage(lang, statusCode),
        error: isProd ? {} : err,
        status: statusCode,
        debug: 'debug' in req.query,
      })
    },

    'application/json': () => {
      res.status(statusCode).json({
        message: err.message,
        friendly: _getFriendlyErrorMessage(lang, statusCode),
        error: isProd ? undefined : err.stack,
      })
    },

    default: () => {
      res
        .status(statusCode)
        .type('text')
        .send(isProd ? err.message : err.stack)
    },
  })
}

/* GET /_about
 * About page
 */
function _about(req, res) {
  const { uri: proxyPrefix } = config.proxyPrefixPath
  const paths = getPaths()

  res.render('system/about', {
    layout: 'systemLayout',
    title: `About ${packageFile.name}`,
    proxyPrefix,
    appName: packageFile.name,
    appVersion: packageFile.version,
    appDescription: packageFile.description,
    monitorUri: paths.system.monitor.uri,
    robotsUri: paths.system.robots.uri,
    gitBranch: JSON.stringify(version.gitBranch),
    gitCommit: JSON.stringify(version.gitCommit),
    jenkinsBuild: JSON.stringify(version.jenkinsBuild),
    jenkinsBuildDate: /^\d{4}-/.test(version.jenkinsBuildDate)
      ? _simpleDate(new Date(version.jenkinsBuildDate))
      : JSON.stringify(version.jenkinsBuildDate),
    dockerName: JSON.stringify(version.dockerName),
    dockerVersion: JSON.stringify(version.dockerVersion),
    language: language.getLanguage(res),
    hostname: os.hostname(),
    started,
    env: process.env.NODE_ENV,
  })
}

/* GET /_monitor
 * Monitor page
 */
function _monitor(req, res) {
  const apiConfig = config.nodeApi

  // Check APIs
  const subSystems = Object.keys(api).map(apiKey => {
    const apiHealthUtil = registry.getUtility(IHealthCheck, 'kth-node-api')
    return apiHealthUtil.status(api[apiKey], {
      required: apiConfig[apiKey].required,
    })
  })
  // Check LDAP
  const ldapHealthUtil = registry.getUtility(IHealthCheck, 'kth-node-ldap')
  subSystems.push(ldapHealthUtil.status(ldapClient, config.ldap))

  // If we need local system checks, such as memory or disk, we would add it here.
  // Make sure it returns a promise which resolves with an object containing:
  // {statusCode: ###, message: '...'}
  // The property statusCode should be standard HTTP status codes.
  const localSystems = Promise.resolve({ statusCode: 200, message: 'OK' })

  /* -- You will normally not change anything below this line -- */

  // Determine system health based on the results of the checks above. Expects
  // arrays of promises as input. This returns a promise
  const systemHealthUtil = registry.getUtility(IHealthCheck, 'kth-node-system-check')
  const systemStatus = systemHealthUtil.status(localSystems, subSystems)

  systemStatus
    .then(status => {
      // Return the result either as JSON or text
      if (req.headers.accept === 'application/json') {
        const outp = systemHealthUtil.renderJSON(status)
        res.status(status.statusCode).json(outp)
      } else {
        const outp = systemHealthUtil.renderText(status)
        res.type('text').status(status.statusCode).send(outp)
      }
    })
    .catch(err => {
      res.type('text').status(500).send(err)
    })
}

/* GET /robots.txt
 * Robots.txt page
 */
function _robotsTxt(req, res) {
  res.type('text').render('system/robots')
}

/* GET /_paths
 * Return all paths for the system
 */
function _paths(req, res) {
  res.json(getPaths())
}

/*
 * ----------------------------------------------------------------
 * Publicly exported functions.
 * ----------------------------------------------------------------
 */

module.exports = {
  monitor: _monitor,
  about: _about,
  robotsTxt: _robotsTxt,
  paths: _paths,
  notFound: _notFound,
  final: _final,
}
