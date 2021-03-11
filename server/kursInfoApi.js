'use strict'

const log = require('kth-node-log')
const api = require('./api')

async function getCourseInfo(courseCode) {
  const { client, paths } = api.kursInfoApi
  const uri = client.resolve(paths.getSellingTextByCourseCode.uri, { courseCode })

  try {
    const res = await client.getAsync({ uri }, { useCache: false })
    if (res.body) return { sellingText: res.body.sellingText || {}, imageInfo: res.body.imageInfo || '' }
    return { sellingText: {}, imageInfo: '' }
  } catch (err) {
    log.debug('getCourseInfo is not available', err)

    // it is not important part of app, therefore it doesn't matter if it fails
    // app must continue to work
    return { sellingText: {}, imageInfo: '' }
  }
}

module.exports = {
  getCourseInfo,
}
