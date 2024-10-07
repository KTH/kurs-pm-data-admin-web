'use strict'

const i18n = require('../i18n')
const api = require('./api')

function throwGenericError() {
  throw new Error(i18n.messages[1].messages.error_generic)
}

function parseCourseInfo(body, language) {
  if (!body) return {}
  return {
    courseCode: body.courseCode,
    sellingText: body.sellingText[language],
    supplementaryInfo: body.supplementaryInfo[language],
    courseDisposition: body.courseDisposition[language],
    recommendedPrerequisites: body.recommendedPrerequisites[language],
    lastChangedBy: body.lastChangedBy,
    imageInfo: body.imageInfo,
  }
}

async function getCourseInfo(courseCode, language) {
  try {
    const { client, paths } = api.kursinfoApi
    const uri = client.resolve(paths.getCourseInfoByCourseCode.uri, { courseCode })
    const res = await client.getAsync({ uri })

    if (res.response.statusCode === 404) {
      return {
        notFound: true,
      }
    }

    if (!res.response.ok || !res.body) {
      return throwGenericError()
    } else {
      const formattedCourseInfo = parseCourseInfo(res.body, language)
      return formattedCourseInfo
    }
  } catch (err) {
    return throwGenericError()
  }
}

module.exports = {
  getCourseInfo,
}
