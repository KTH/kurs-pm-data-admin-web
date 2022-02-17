/* eslint-disable no-console */

'use strict'

const express = require('express')
const config = require('./config')

const app = express()
config.paths.forEach(path => {
  // console.log('Added path', path.url)
  app[path.method](path.url, (req, res) => {
    // console.log('Responded on path', path.url)
    res.send(path.response)
  })
})

app.use((req, res) => {
  // console.log('Caught request on path', req.url)
  res.send('')
})
process.on('SIGTERM', () => {
  process.exit(0)
})

app.listen(config.host.port, config.host.address)
