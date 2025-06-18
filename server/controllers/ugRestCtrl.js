const log = require('@kth/log')
const {
  fetchCourseAndRoundGroups,
  fetchUsersInGroupsCategorizedByRole,
  fetchGroupsForUserCategorizedByRole,
  getCourseGroupName,
} = require('../ugRestApi')

/**
 * Converts a list of person objects into HTML snippets with links and profile pictures.
 *
 * @param {Array<Object>} personList - List of person objects with `username`, `givenName`, and `surname`.
 * @returns {string} HTML string representing the persons.
 */
function createPersonHtml(personList) {
  return personList
    .map(
      person => `
    <p class="person">
      <img class="profile-picture" src="https://www.kth.se/files/thumbnail/${person.username}" width="31" height="31">
      <a href="/profile/${person.username}/">${person.givenName} ${person.surname}</a> 
    </p>`
    )
    .join('')
}

/**
 * Builds an object containing HTML strings for course employees categorized by role.
 *
 * @param {Array<Object>} examiners - List of examiner users.
 * @param {Array<Object>} teachers - List of teacher users.
 * @param {Array<Object>} courseCoordinators - List of course coordinator users.
 * @returns {Object} Object with optional HTML fields: `examiners`, `teachers`, `courseCoordinators`.
 */
function buildEmployeesHtmlObject(examiners, teachers, courseCoordinators) {
  return {
    ...(examiners?.length && { examiners: createPersonHtml(examiners) }),
    ...(teachers?.length && { teachers: createPersonHtml(teachers) }),
    ...(courseCoordinators?.length && { courseCoordinators: createPersonHtml(courseCoordinators) }),
  }
}

/**
 * Fetches course-related groups and returns users categorized by role in HTML format.
 *
 * @param {Object} params - Input parameters.
 * @param {string} params.courseCode - Course code.
 * @param {string} params.semester - Semester code (e.g., "20241").
 * @param {Array<string>} params.applicationCodes - Application codes for course rounds.
 * @returns {Promise<Object>} Object with HTML strings for `examiners`, `teachers`, and `courseCoordinators`.
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
 * Determines if a user is an examiner, teacher, or coordinator for a specific course.
 *
 * @param {string} userKthId - KTH ID of the user.
 * @param {string} courseCode - Course code to check against.
 * @returns {Promise<Object>} Object with boolean values: `isExaminer`, `isCourseTeacher`, `isCourseCoordinator`.
 */
async function getEmployeeRoleForCourse(userKthId, courseCode) {
  const groupsByRole = await fetchGroupsForUserCategorizedByRole(userKthId)
  const courseGroupName = getCourseGroupName(courseCode)

  return {
    isExaminer: groupsByRole.examiners.some(g => g.name.includes(courseGroupName)),
    isCourseTeacher: groupsByRole.teachers.some(g => g.name.includes(courseGroupName)),
    isCourseCoordinator: groupsByRole.courseCoordinators.some(g => g.name.includes(courseGroupName)),
  }
}

module.exports = {
  getCourseEmployees,
  getEmployeeRoleForCourse,
}
