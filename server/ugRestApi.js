// Be aware that this entire file, or most of it, is replicated in multiple apps,
// so changes here should probably be synced to the other apps.
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.

const { ugRestApiHelper } = require('@kth/ug-rest-api-helper')
const { server: serverConfig } = require('./configuration')

/**
 * Initializes connection properties for the UG REST API.
 * This must be called before any UG API requests are made.
 */
function initializeUGConnection() {
  const { url, key } = serverConfig.ugRestApiURL
  const { authTokenURL, authClientId, authClientSecret } = serverConfig.ugAuth

  ugRestApiHelper.initConnectionProperties({
    authorityURL: authTokenURL,
    clientId: authClientId,
    clientSecret: authClientSecret,
    ugURL: url,
    subscriptionKey: key,
  })
}

/**
 * Converts a course code to its corresponding UG course group name.
 *
 * @param {string} courseCode - The Ladok course code (6 or 7 characters).
 * @returns {string|undefined} UG course group name or undefined if format is invalid.
 */
function getCourseGroupName(courseCode) {
  if (courseCode.length === 7) return `ladok2.kurser.${courseCode.slice(0, 3)}.${courseCode.slice(3)}`
  if (courseCode.length === 6) return `ladok2.kurser.${courseCode.slice(0, 2)}.${courseCode.slice(2)}`
  return undefined
}

/**
 * Fetches UG course group and round group objects for a given course.
 *
 * @param {string} courseCode - The Ladok course code.
 * @param {string} semester - The semester code (e.g., '20241').
 * @param {string[]} applicationCodes - List of application codes for the course rounds.
 * @returns {Promise<Object[]>} List of UG group objects.
 */
async function fetchCourseAndRoundGroups(courseCode, semester, applicationCodes) {
  initializeUGConnection()

  const courseGroupName = getCourseGroupName(courseCode)
  const courseGroupNames = [courseGroupName]
  const courseRoundGroupNames = applicationCodes.map(code => `${courseGroupName}.${semester}.${code}`)

  return await ugRestApiHelper.getUGGroups('name', 'in', [...courseGroupNames, ...courseRoundGroupNames], false)
}

/**
 * Removes duplicate users from each role list based on their `kthid`.
 *
 * @param {Object} roles - Object with role keys (`examiners`, `teachers`, `courseCoordinators`) and arrays of user objects.
 */
function removeDuplicateUsers(roles) {
  for (const role of Object.keys(roles)) {
    const seen = new Set()

    roles[role] = roles[role].filter(user => {
      const { kthid } = user
      if (!kthid || seen.has(kthid)) return false
      seen.add(kthid)
      return true
    })
  }
}

/**
 * Fetches user details for all users in the given groups,
 * categorized by their role (examiner, teacher, or courseCoordinator).
 *
 * @param {Object[]} groups - List of group objects, each containing role arrays of KTH IDs.
 * @returns {Promise<Object>} An object mapping roles to arrays of user objects.
 */
async function fetchUsersInGroupsCategorizedByRole(groups) {
  initializeUGConnection()

  const usersByRole = { examiners: [], teachers: [], courseCoordinators: [] }

  for (const group of groups) {
    for (const role of Object.keys(usersByRole)) {
      const kthIds = group[role]
      if (Array.isArray(kthIds)) {
        const users = await Promise.all(kthIds.map(id => ugRestApiHelper.getUGUsers('kthid', 'eq', id)))
        usersByRole[role].push(...users.flat())
      }
    }
  }

  removeDuplicateUsers(usersByRole)

  return usersByRole
}

/**
 * Fetches all UG groups in which a given user appears as a role attribute,
 * categorized by the user's role in those groups (examiner, teacher, or courseCoordinator).
 *
 * @param {string} userKthId - The user's KTH ID.
 * @returns {Promise<Object>} An object mapping roles to arrays of UG group objects.
 */
async function fetchGroupsForUserCategorizedByRole(userKthId) {
  initializeUGConnection()

  const groupsByRole = { examiners: [], teachers: [], courseCoordinators: [] }

  await Promise.all(
    Object.keys(groupsByRole).map(async role => {
      const groups = await ugRestApiHelper.getUGGroups(role, 'contains', userKthId)
      groupsByRole[role].push(...groups)
    })
  )

  return groupsByRole
}

module.exports = {
  fetchCourseAndRoundGroups,
  fetchUsersInGroupsCategorizedByRole,
  fetchGroupsForUserCategorizedByRole,
  getCourseGroupName,
}
