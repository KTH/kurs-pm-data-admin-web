'use strict'

require('dotenv').config()

const log = require('kth-node-log')
const config = require('./server/configuration').server
const server = require('./server/server')

const packageFile = require('./package.json')

// catches uncaught exceptions
process.on('uncaughtException', err => {
  log.error('APPLICATION EXIT - uncaught exception in ', packageFile.name)
  log.error('Uncaught Exception', { err })
  process.exit(1)
})

/* ****************************
 * ******* SERVER START *******
 * ****************************
 */
// Exports a promise to use in integration tests
module.exports = server.start({
  useSsl: config.useSsl,
  pfx: config.ssl.pfx,
  passphrase: config.ssl.passphrase,
  key: config.ssl.key,
  ca: config.ssl.ca,
  cert: config.ssl.cert,
  port: config.port,
  logger: log,
})
