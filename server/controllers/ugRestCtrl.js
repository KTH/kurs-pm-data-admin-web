// Be aware that this entire file, or most of it, is replicated in multiple apps,
// so changes here should probably be synced to the other apps.
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.

const log = require('@kth/log')

const {
  fetchCourseAndRoundGroups,
  fetchUsersInGroupsCategorizedByRole,
  fetchGroupNamesForUserCategorizedByRole,
} = require('../ugRestApi')

const { buildEmployeesHtmlObject, getCourseGroupName, getCourseRoundGroupName } = require('../utils/ugUtils')

/**
 * Fetches the examiners, teachers, and course coordinators for a given course
 * and returns them formatted as an object suitable for rendering in HTML.
 *
 * @param {Object} params
 * @param {string} params.courseCode - The course code (e.g., 'SF1624').
 * @param {string} params.semester - The semester (e.g., '20241').
 * @param {string[]} params.applicationCodes - List of application codes for course rounds.
 * @returns {Promise<Object>} Object containing categorized user data ready for HTML rendering.
 */
async function getCourseEmployees({ courseCode, semester, applicationCodes }) {
  try {
    const groups = await fetchCourseAndRoundGroups(courseCode, semester, applicationCodes)
    const usersByRole = await fetchUsersInGroupsCategorizedByRole(groups)
    return buildEmployeesHtmlObject(usersByRole.examiners, usersByRole.teachers, usersByRole.courseCoordinators)
  } catch (err) {
    log.info('Error in getCourseEmployees', { error: err })
    throw err
  }
}

/**
 * Checks which roles (examiner, teacher, or course coordinator) a specific user has
 * for a given course and optional course rounds (defined by semester and application codes).
 *
 * @param {string} userKthId - The KTH ID of the user.
 * @param {string} courseCode - The course code (e.g., 'SF1624').
 * @param {string | undefined} semester - Optional semester (e.g., '20241').
 * @param {string[] | undefined} applicationCodes - Optional array of application codes for the course round(s).
 * @returns {Promise<Object>} An object with boolean flags for each role.
 */
async function getEmployeeRoleForCourse(userKthId, courseCode, semester, applicationCodes) {
  const groupNamesByRole = await fetchGroupNamesForUserCategorizedByRole(userKthId)
  const courseGroupName = getCourseGroupName(courseCode)

  // Build all round group names if both semester and application codes are present
  const courseRoundGroupNames =
    semester && Array.isArray(applicationCodes)
      ? applicationCodes.map(appCode => getCourseRoundGroupName(courseCode, semester, appCode)).filter(Boolean)
      : [courseGroupName]

  return {
    isExaminer: groupNamesByRole.examiners.some(name => name.includes(courseGroupName)),
    isCourseTeacher: courseRoundGroupNames.some(group => groupNamesByRole.teachers.some(name => name.includes(group))),
    isCourseCoordinator: courseRoundGroupNames.some(group =>
      groupNamesByRole.courseCoordinators.some(name => name.includes(group))
    ),
  }
}

module.exports = {
  getCourseEmployees,
  getEmployeeRoleForCourse,
}
