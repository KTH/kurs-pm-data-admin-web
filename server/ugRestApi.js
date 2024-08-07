const log = require('@kth/log')
const { ugRestApiHelper } = require('@kth/ug-rest-api-helper')
const { server: serverConfig } = require('./configuration')

const _groupNames = (courseCode, semester, ladokRoundIds) => ({
  teachers: ladokRoundIds.map(
    round => `edu.courses.${String(courseCode).slice(0, 2)}.${courseCode}.${semester}.${round}.teachers`
  ),
  examiners: [`edu.courses.${String(courseCode).slice(0, 2)}.${courseCode}.examiner`],
  responsibles: ladokRoundIds.map(
    round => `edu.courses.${String(courseCode).slice(0, 2)}.${courseCode}.${semester}.${round}.courseresponsible`
  ),
  assistants: ladokRoundIds.map(
    round => `edu.courses.${String(courseCode).slice(0, 2)}.${courseCode}.${semester}.${round}.assistants`
  ), // edu.courses.SF.SF1624.20191.1.assistants
})

const _removeDuplicates = personListWithDublicates =>
  personListWithDublicates
    .map(person => JSON.stringify(person))
    .filter((person, index, arr) => arr.indexOf(person) === index)
    .map(personStr => JSON.parse(personStr))

const _getCurrentDateTime = () => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time
  return dateTime
}

const _createPersonHtml = personList => {
  let personString = ''
  personList &&
    personList.forEach(person => {
      if (person) {
        personString += `<p class = "person">
      <img src="https://www.kth.se/files/thumbnail/${person.username}" alt="Profile picture" width="31" height="31">
      <a href="/profile/${person.username}/" property="teach:teacher">
          ${person.givenName} ${person.lastName ? person.lastName : person.surname} 
      </a> 
    </p>  `
      }
    })
  return personString
}

const _getAllGroups = (assistants, teachers, examiners, responsibles) => {
  const groups = []
  if (assistants.length) {
    assistants.forEach(assistant => {
      groups.push(assistant)
    })
  }
  if (teachers.length) {
    teachers.forEach(teacher => {
      groups.push(teacher)
    })
  }
  if (examiners.length) {
    examiners.forEach(examiner => {
      groups.push(examiner)
    })
  }
  if (responsibles.length) {
    responsibles.forEach(responsible => {
      groups.push(responsible)
    })
  }
  return groups
}

const _getGroupCategory = group => {
  if (group.includes('teachers')) {
    return 'teachers'
  } else if (group.includes('examiner')) {
    return 'examiners'
  } else if (group.includes('courseresponsible')) {
    return 'responsibles'
  } else {
    return 'assistants'
  }
}

const _getEmployeeObject = (examiners, teachers, responsibles, assistants) => {
  const employee = {
    teacher: _createPersonHtml(teachers),
    examiner: _createPersonHtml(examiners),
    courseCoordinator: _createPersonHtml(responsibles),
    teacherAssistants: _createPersonHtml(assistants),
  }
  return employee
}

/**
 * This will first prepare filter query then pass that query to ug rest api and then return groups data along with members.
 * @param assistants Assistants group name
 * @param teachers Teachers group name
 * @param examiners Examiners group name
 * @param responsibles Responsibles group name
 * @param courseCode Course code is needed for logs
 * @param semester Semester is needed for logs
 * @returns Will return groups along with members from ug rest api.
 */
async function _getAllGroupsAlongWithMembersRelatedToCourse(
  assistants,
  teachers,
  examiners,
  responsibles,
  courseCode,
  semester
) {
  const { url, key } = serverConfig.ugRestApiURL
  const { authTokenURL, authClientId, authClientSecret } = serverConfig.ugAuth
  const ugConnectionProperties = {
    authorityURL: authTokenURL,
    clientId: authClientId,
    clientSecret: authClientSecret,
    ugURL: url,
    subscriptionKey: key,
  }
  ugRestApiHelper.initConnectionProperties(ugConnectionProperties)
  const groups = _getAllGroups(assistants, teachers, examiners, responsibles)
  log.info('Going to fetch groups along with members', {
    courseCode,
    semester,
    requestStartTime: _getCurrentDateTime(),
  })
  const groupDetails = await ugRestApiHelper.getUGGroups('name', 'in', groups, true)
  log.info('Successfully fetched groups along with members', {
    courseCode,
    semester,
    requestEndTime: _getCurrentDateTime(),
  })
  return groupDetails
}

const _getMembersObjectFromGroups = (
  groupsAlongWithMembers,
  assistants,
  teachers,
  examiners,
  responsibles,
  courseCode,
  semester
) => {
  let membersAsTeachers = []
  let membersAsExaminers = []
  let membersAsCourseCoordinators = []
  let membersAsTeacherAssistants = []
  if (groupsAlongWithMembers && groupsAlongWithMembers.length > 0) {
    const groups = _getAllGroups(assistants, teachers, examiners, responsibles)
    groupsAlongWithMembers.forEach(group => {
      const isGroupMatched = groups.some(x => x === group.name)
      if (isGroupMatched) {
        const groupCategory = _getGroupCategory(group.name)
        if (groupCategory === 'teachers') {
          membersAsTeachers = membersAsTeachers.concat(group.members)
        } else if (groupCategory === 'examiners') {
          membersAsExaminers = membersAsExaminers.concat(group.members)
        } else if (groupCategory === 'responsibles') {
          membersAsCourseCoordinators = membersAsCourseCoordinators.concat(group.members)
        } else {
          membersAsTeacherAssistants = membersAsTeacherAssistants.concat(group.members)
        }
        log.info(
          ` Ug Rest Api, : ${groupCategory}`,
          group.members.length,
          ' for course ',
          courseCode,
          ' for semester ',
          semester
        )
      }
    })
  }
  return {
    teacher: _removeDuplicates(membersAsTeachers),
    examiner: _removeDuplicates(membersAsExaminers),
    responsibles: _removeDuplicates(membersAsCourseCoordinators),
    assistants: _removeDuplicates(membersAsTeacherAssistants),
  }
}

// ------- EXAMINATOR AND RESPONSIBLES FROM UG-REST_API: ------- /
async function _getCourseEmployees(apiMemoData) {
  const { courseCode, semester, ladokRoundIds } = apiMemoData
  try {
    const { assistants, teachers, examiners, responsibles } = _groupNames(courseCode, semester, ladokRoundIds)
    log.debug(
      '_getCourseEmployees for all memos course rounds with keys: ',
      assistants.length ? assistants : '',
      teachers.length ? teachers : '',
      examiners.length ? examiners : '',
      responsibles.length ? responsibles : ''
    )
    // get all groups along with member of given course code from UG Rest Api
    const groupsAlongWithMembers = await _getAllGroupsAlongWithMembersRelatedToCourse(
      assistants,
      teachers,
      examiners,
      responsibles,
      courseCode,
      semester
    )
    const membersObject = _getMembersObjectFromGroups(
      groupsAlongWithMembers,
      assistants,
      teachers,
      examiners,
      responsibles,
      courseCode,
      semester
    )
    return _getEmployeeObject(
      membersObject.examiner,
      membersObject.teacher,
      membersObject.responsibles,
      membersObject.assistants
    )
  } catch (err) {
    log.info('Exception from UG Rest API - multi', { error: err })
    return err
  }
}

module.exports = {
  getCourseEmployees: _getCourseEmployees,
  getMembersObjectFromGroups: _getMembersObjectFromGroups,
}
