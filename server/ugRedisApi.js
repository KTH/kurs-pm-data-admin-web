const redis = require('kth-node-redis')
const log = require('kth-node-log')
const { server: serverConfig } = require('./configuration')

const redisKeys = (courseCode, semester, ladokRoundIds) => ({
  teachers: ladokRoundIds.map(round => `${courseCode}.${semester}.${round}.teachers`),
  examiner: [`${courseCode}.examiner`],
  responsibles: ladokRoundIds.map(round => `${courseCode}.${semester}.${round}.courseresponsible`),
  assistants: ladokRoundIds.map(round => `${courseCode}.${semester}.${round}.assistants`), // edu.courses.SF.SF1624.20191.1.assistants
})

const _removeDublicates = personListWithDublicates =>
  personListWithDublicates
    .map(person => JSON.stringify(person))
    .filter((person, index, self) => self.indexOf(person) === index)
    .map(personStr => JSON.parse(personStr))

const createPersonHtml = personList => {
  let personString = ''
  personList &&
    personList.forEach(person => {
      if (person) {
        personString += `<p class = "person">
      <img src="https://www.kth.se/files/thumbnail/${person.username}" alt="Profile picture" width="31" height="31">
      <a href="/profile/${person.username}/" property="teach:teacher">
          ${person.givenName} ${person.lastName} 
      </a> 
    </p>  `
      }
    })
  return personString
}

// ------- EXAMINATOR AND RESPONSIBLES FROM UG-REDIS: ------- /
async function _getCourseEmployees(apiMemoData) {
  const { courseCode, semester, ladokRoundIds } = apiMemoData
  try {
    const { assistants, teachers, examiner, responsibles } = redisKeys(courseCode, semester, ladokRoundIds)
    log.info(
      '_getCourseEmployees for all memos course rounds with keys: ',
      assistants,
      teachers,
      examiner,
      responsibles
    )
    const ugClient = await redis('ugRedis', serverConfig.cache.ugRedis.redis)
    const arrWithStringifiedArrays = await ugClient
      .multi()
      .mget(teachers) // [0]
      .mget(examiner) // [1]
      .mget(responsibles) // [2]
      .mget(assistants) // [3]
      .execAsync()
    log.info(
      ' Ug Redis fetched correctly,  number of teachers: ',
      arrWithStringifiedArrays[0].length,
      ' for course ',
      courseCode,
      ' for semester ',
      semester
    )
    log.info(
      ' Ug Redis, examiners: ',
      arrWithStringifiedArrays[1].length,
      ' for course ',
      courseCode,
      ' for semester ',
      semester
    )
    log.info(
      ' Ug Redis, responsibles: ',
      arrWithStringifiedArrays[2].length,
      ' for course ',
      courseCode,
      ' for semester ',
      semester
    )
    log.info(
      ' Ug Redis, assistants: ',
      arrWithStringifiedArrays[3].length,
      ' for course ',
      courseCode,
      ' for semester ',
      semester
    )

    const flatArrWithHtmlStr = arrWithStringifiedArrays.map(perTypeStringifiedArr => {
      const thisTypeAllRoundsEmployees = perTypeStringifiedArr.flatMap(perRoundStr => JSON.parse(perRoundStr))
      /* Remove duplicates */
      const deepDistinctEmpoyeesNoDublicates = _removeDublicates(thisTypeAllRoundsEmployees)
      return createPersonHtml(deepDistinctEmpoyeesNoDublicates)
    })
    return {
      teacher: flatArrWithHtmlStr[0],
      examiner: flatArrWithHtmlStr[1],
      courseCoordinator: flatArrWithHtmlStr[2],
      teacherAssistants: flatArrWithHtmlStr[3],
    }
  } catch (err) {
    log.error('Exception from ugRedis - multi getCourseEmployees', { error: err })
    return err
  }
}

module.exports = {
  getCourseEmployees: _getCourseEmployees,
}
