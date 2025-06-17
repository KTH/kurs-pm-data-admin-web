// Be aware that this entire file, or most of it, is replicated in multiple apps, so changes here should probably be synced to the other apps.
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.
const { ugRestApiHelper } = require('@kth/ug-rest-api-helper')
const log = require('@kth/log')
const serverConfig = require('./configuration').server

// Extracts the organization part of the course code (e.g., 'SF')
const _getOrgPart = courseCode => {
  if (courseCode.length === 7) return courseCode.slice(0, 3)
  if (courseCode.length === 6) return courseCode.slice(0, 2)
  return undefined
}

// Extracts the numerical part of the course code (e.g., '1624')
const _getNumberPart = courseCode => {
  if (courseCode.length === 7) return courseCode.slice(3)
  if (courseCode.length === 6) return courseCode.slice(2)
  return undefined
}

// Builds full course group name in UG format: 'ladok2.kurser.SF.1624'
const _getCourseGroupName = courseCode => {
  const courseOrgPart = _getOrgPart(courseCode)
  const courseNumberPart = _getNumberPart(courseCode)
  return `ladok2.kurser.${courseOrgPart}.${courseNumberPart}`
}

// Builds UG group names for course and each course round based on semester and application codes
const _groupNames = (courseCode, semester, applicationCodes) => {
  const courseGroupName = _getCourseGroupName(courseCode)
  return {
    course: [courseGroupName],
    courseRound: applicationCodes.map(applicationCode => `${courseGroupName}.${semester}.${applicationCode}`),
  }
}

// Creates HTML representation for a list of users
const _createPersonHtml = (personList = []) => {
  let personString = ''
  personList.forEach(person => {
    if (person) {
      personString += `<p class="person">
      <img class="profile-picture" src="https://www.kth.se/files/thumbnail/${
        person.username
      }" alt="Profile picture" width="31" height="31">
      <a href="/profile/${person.username}/" property="teach:teacher">
          ${person.givenName} ${person.surname} 
      </a> 
    </p>`
    }
  })
  return personString
}

// Combines course and course round group names into one array
const _getAllGroups = (courseGroups, courseRoundGroups) => {
  const groups = []
  if (courseGroups.length) {
    courseGroups.forEach(courseGroup => {
      groups.push(courseGroup)
    })
  }
  if (courseRoundGroups.length) {
    courseRoundGroups.forEach(courseRoundGroup => {
      groups.push(courseRoundGroup)
    })
  }
  return groups
}

// Converts lists of users for each role into an object with HTML content
const _getEmployeeObject = (examiners, teachers, courseCoordinators) => {
  const employee = {}
  if (examiners && examiners.length > 0) {
    employee.examiners = _createPersonHtml(examiners)
  }
  if (teachers && teachers.length > 0) {
    employee.teachers = _createPersonHtml(teachers)
  }
  if (courseCoordinators && courseCoordinators.length > 0) {
    employee.courseCoordinators = _createPersonHtml(courseCoordinators)
  }
  return employee
}

// Returns the current date and time in a readable string format
const _getCurrentDateTime = () => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time
  return dateTime
}

/**
 * Initialize connection properties for UG REST API.
 */
function _initializeUGConnection() {
  const { url, key } = serverConfig.ugRestApiURL
  const { authTokenURL, authClientId, authClientSecret } = serverConfig.ugAuth

  const connectionProperties = {
    authorityURL: authTokenURL,
    clientId: authClientId,
    clientSecret: authClientSecret,
    ugURL: url,
    subscriptionKey: key,
  }

  ugRestApiHelper.initConnectionProperties(connectionProperties)
}

/**
 * Fetches group data along with attributes from the UG REST API.
 * @param {string[]} courseGroups - Course group name.
 * @param {string[]} courseRoundGroups - Course round group names.
 * @param {string} courseCode - Course code, used for logging.
 * @param {string} semester - Semester, used for logging.
 * @returns {Promise<Object[]>} Group details with attributes.
 */
async function _getGroupsWithAttributes(courseGroups, courseRoundGroups, courseCode, semester) {
  _initializeUGConnection()

  const groups = _getAllGroups(courseGroups, courseRoundGroups)

  log.info('Fetching course and course round groups with attributes', {
    courseCode,
    semester,
    requestStartTime: _getCurrentDateTime(),
  })

  const groupDetails = await ugRestApiHelper.getUGGroups('name', 'in', groups, false)

  log.info('Fetched course and course round groups with attributes successfully', {
    courseCode,
    semester,
    requestEndTime: _getCurrentDateTime(),
  })

  return groupDetails
}

/**
 * Fetches users from group attributes by KTH ID.
 * @param {Object[]} groupsWithAttributes - List of groups with role-based attributes.
 * @param {string} courseCode - Course code, used for logging.
 * @param {string} semester - Semester, used for logging.
 * @returns {Promise<Object>} Object containing arrays of users categorized by role.
 */
async function _getUsersFromGroupAttributes(groupsWithAttributes, courseCode, semester) {
  _initializeUGConnection()

  const usersByRole = {
    examiners: [],
    teachers: [],
    courseCoordinators: [],
  }

  log.info('Fetching users from group attributes (KTH IDs)', {
    courseCode,
    semester,
    requestStartTime: _getCurrentDateTime(),
  })

  for (const group of groupsWithAttributes) {
    await Promise.all(
      Object.keys(usersByRole).map(async role => {
        const kthIds = group[role]
        if (!Array.isArray(kthIds)) return // Skip undefined or invalid roles

        const userPromises = kthIds.map(kthId => ugRestApiHelper.getUGUsers('kthid', 'eq', kthId))
        const usersPerRole = await Promise.all(userPromises)
        usersByRole[role].push(...usersPerRole.flat())
      })
    )
  }

  log.info('Fetched users from group attributes successfully', {
    courseCode,
    semester,
    requestEndTime: _getCurrentDateTime(),
  })

  return usersByRole
}

/**
 * Main function to fetch course employees by role and return formatted HTML.
 * @param {Object} options - Course details.
 * @param {string} options.courseCode - Course code.
 * @param {string} options.semester - Semester.
 * @param {string[]} options.applicationCodes - Course application codes.
 * @returns {Promise<Object>} Object with HTML strings per role.
 */
async function getCourseEmployees({ courseCode, semester, applicationCodes = [] }) {
  try {
    const { course: courseGroups, courseRound: courseRoundGroups } = _groupNames(courseCode, semester, applicationCodes)

    const groupsAlongWithAttributes = await _getGroupsWithAttributes(
      courseGroups,
      courseRoundGroups,
      courseCode,
      semester
    )
    const { examiners, teachers, courseCoordinators } = await _getUsersFromGroupAttributes(
      groupsAlongWithAttributes,
      courseCode,
      semester
    )

    return _getEmployeeObject(examiners, teachers, courseCoordinators)
  } catch (err) {
    log.info('Exception from UG Rest API - multi', { error: err })
    return err
  }
}

/**
 * Fetches all UG groups where a specific user is assigned a course role.
 * @param {string} userKthId - The user's KTH ID.
 * @returns {Promise<Object>} Groups grouped by role.
 */
async function _getGroupsWithUserAsAttribute(userKthId) {
  _initializeUGConnection()

  const groupsByRole = {
    examiners: [],
    teachers: [],
    courseCoordinators: [],
  }

  log.info('Fetching groups having employee with kthId', {
    kthId: userKthId,
    requestStartTime: _getCurrentDateTime(),
  })

  await Promise.all(
    Object.keys(groupsByRole).map(async role => {
      const groupNames = await ugRestApiHelper.getUGGroups(role, 'contains', userKthId)
      groupsByRole[role].push(...groupNames.flat())
    })
  )

  log.info('Fetched groups having employee with kthId succefully', {
    kthId: userKthId,
    requestEndTime: _getCurrentDateTime(),
  })

  return groupsByRole
}

/**
 * Determines if a user holds any of the defined course roles (examiner, teacher, coordinator).
 * @param {string} userKthId - User's KTH ID.
 * @param {string} courseCode - Course code.
 * @returns {Promise<Object>} Boolean flags for each role.
 */
async function getEmployeeRoleForCourse(userKthId, courseCode) {
  const courseGroupName = _getCourseGroupName(courseCode)

  const { examiners, teachers, courseCoordinators } = await _getGroupsWithUserAsAttribute(userKthId)

  const isCourseCoordinator = courseCoordinators.map(x => x.name).some(groupName => groupName.includes(courseGroupName))
  const isCourseTeacher = teachers.map(x => x.name).some(groupName => groupName.includes(courseGroupName))
  const isExaminer = examiners.map(x => x.name).some(groupName => groupName.includes(courseGroupName))

  return { isCourseCoordinator, isCourseTeacher, isExaminer }
}

module.exports = {
  getCourseEmployees,
  getEmployeeRoleForCourse,
}
