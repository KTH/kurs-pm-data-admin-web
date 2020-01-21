const serverConfig = require('./configuration').server
const redis = require('kth-node-redis')
const i18n = require('../i18n')
const log = require('kth-node-log')

const redisKeys = (courseCode, semester, round) => {
  // Used to get examiners and responsibles from UG Rdedis
  return {
    teachers: [`${courseCode}.${semester}.${round}.teachers`],
    examiner: [`${courseCode}.examiner`],
    responsibles: [`${courseCode}.${semester}.${round}.courseresponsible`],
    assistants: [`${courseCode}.${semester}.${round}.assistants`] //edu.courses.SF.SF1624.20191.1.assistants
  }
}

const createPersonHtml = personList => {
  let personString = ''
  personList &&
    personList.forEach(person => {
      personString += `<p class = "person">
        <i class="fas fa-user-alt"></i>
        <a href="/profile/${person.username}/" target="_blank" property="teach:teacher">
            ${person.givenName} ${person.lastName} 
        </a> 
      </p>  `
    })
  console.log('---------- personString ---------', personString)
  return personString
}
const minimizePesonalData = personList => {
  let personInfo = []
  personList &&
    personList.forEach(person => {
      personInfo.push({
        username: person.username,
        givenName: person.givenName,
        lastName: person.lastName
      })
    })
  console.log('---------- personString ---------', personInfo)
  return personInfo
}
// ------- EXAMINATOR AND RESPONSIBLES FROM UG-REDIS: ------- /
async function _getCourseEmployees(courseCode, semester, round = '1') {
  try {
    const { assistants, teachers, examiner, responsibles } = redisKeys(courseCode, semester, round)
    log.info('_getCourseEmployees with keys: ' + teachers, examiner, responsibles, assistants)
    const ugClient = await redis('ugRedis', serverConfig.cache.ugRedis.redis)
    const arrWithStringifiedArray = await ugClient
      .multi()
      .mget(teachers) // [0]
      .mget(examiner) // [1]
      .mget(responsibles) // [2]
      .mget(assistants) //[3]
      .execAsync()
    console.log(
      'arrWithStringifiedArrayarrWithStringifiedArrayarrWithStringifiedArray ',
      arrWithStringifiedArray[3]
    )
    const flatArrWithHtmlStr = arrWithStringifiedArray
      .flat()
      .map(str => createPersonHtml(JSON.parse(str)))
    return {
      teacher: flatArrWithHtmlStr[0],
      examiner: flatArrWithHtmlStr[1],
      courseCoordinator: flatArrWithHtmlStr[2],
      teacherAssistants: flatArrWithHtmlStr[3]
    }
  } catch (err) {
    log.error('Exception from ugRedis - multi', { error: err })
    return err
  }
}

module.exports = {
  getCourseEmployees: _getCourseEmployees
}
