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
 * for a given course (and optionally course round).
 *
 * @param {string} userKthId - The KTH ID of the user.
 * @param {string} courseCode - The course code (e.g., 'SF1624').
 * @param {string} semester - The semester (e.g., '20241').
 * @param {string} [applicationCode] - Optional application code for the course round.
 * @returns {Promise<Object>} An object with boolean flags for each role.
 */
async function getEmployeeRoleForCourse(userKthId, courseCode, semester, applicationCode) {
  const groupNamesByRole = await fetchGroupNamesForUserCategorizedByRole(userKthId)
  const courseGroupName = getCourseGroupName(courseCode)
  const courseRoundGroupName =
    semester && applicationCode ? getCourseRoundGroupName(courseCode, semester, applicationCode) : courseGroupName

  return {
    isExaminer: groupNamesByRole.examiners.some(name => name.includes(courseGroupName)),
    isCourseTeacher: groupNamesByRole.teachers.some(name => name.includes(courseRoundGroupName)),
    isCourseCoordinator: groupNamesByRole.courseCoordinators.some(name => name.includes(courseRoundGroupName)),
  }
}

module.exports = {
  getCourseEmployees,
  getEmployeeRoleForCourse,
}
