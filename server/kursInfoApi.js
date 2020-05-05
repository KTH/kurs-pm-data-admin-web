'use strict'

const log = require('kth-node-log')
const api = require('./api')

async function getCourseInfo(courseCode) {
  const { client, paths } = api.kursInfoApi
  const uri = client.resolve(paths.getSellingTextByCourseCode.uri, { courseCode })

  try {
    const res = await client.getAsync({ uri }, { useCache: false })
    if (res.body) {
      const { sellingText, imageInfo } = res.body
      return { sellingText, imageInfo }
    }
    return { sellingText: '', imageInfo: '' }
  } catch (err) {
    log.debug('getCourseInfo is not available', err)
    return err
  }
}

module.exports = {
  getCourseInfo
}
