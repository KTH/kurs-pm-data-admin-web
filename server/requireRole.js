'use strict'

const language = require('@kth/kth-node-web-common/lib/language')
const log = require('@kth/log')

const i18n = require('../i18n')
const ladokCourseData = require('./ladokApi')
const { getEmployeeRoleForCourse } = require('./controllers/ugRestCtrl')
const { parseMemoEndPointString } = require('./utils/memoUtils')
const { fetchGroupNamesForUserCategorizedByRole } = require('./ugRestApi')

const schools = () => ['abe', 'eecs', 'itm', 'cbh', 'sci']

async function _isAdminOfCourseSchool(courseCode, user) {
  // app.kursinfo.***
  const { memberOf: userGroups } = user

  if (!userGroups || userGroups?.length === 0) return false

  const userSchools = schools().filter(schoolCode => userGroups.includes(`app.kursinfo.${schoolCode}`))

  if (userSchools.length === 0) return false
  const courseSchoolCode = await ladokCourseData.getCourseSchoolCode(courseCode)
  log.debug('Fetched courseSchoolCode to define user role', { courseSchoolCode, userSchools })

  if (courseSchoolCode === 'missing_school_code') {
    log.info('Has problems with fetching school code to define if user is a school admin', {
      message: courseSchoolCode,
    })
    return false
  }

  const hasSchoolCodeInAdminGroup = userSchools.includes(courseSchoolCode.toLowerCase())
  log.debug('User admin role', { hasSchoolCodeInAdminGroup })

  // think about missing course code

  return hasSchoolCodeInAdminGroup
}

const messageHaveNotRights = lang => ({
  status: 403,
  message: i18n.message('message_have_not_rights', lang),
})

module.exports.requireRole = (...requiredRoles) =>
  async function hasCourseAcceptedRoles(req, res, next) {
    const lang = language.getLanguage(res)
    const { user = {} } = req.session.passport
    const { courseCode, memoEndPoint } = req.params

    // Fetch UG group names the user belongs to, categorized by role (coordinator, teacher, etc.)
    const groupNamesByRole = await fetchGroupNamesForUserCategorizedByRole(user.kthId)

    // Attach user group names to the session object for use in other parts of the app
    req.session.passport.user.groups = {
      courseCoordinators: groupNamesByRole.courseCoordinators,
      teachers: groupNamesByRole.teachers,
    }

    let semester, applicationCode

    // If memoEndPoint is provided, extract semester and applicationCode from it
    if (memoEndPoint) {
      const parsed = parseMemoEndPointString(memoEndPoint)
      if (parsed) {
        ;({ semester, applicationCode } = parsed)
      }
    }

    // Determine the user's role in the course (and possibly in a specific course instance)
    const { isCourseCoordinator, isCourseTeacher, isExaminer } = await getEmployeeRoleForCourse(
      user.kthId,
      courseCode,
      semester,
      applicationCode
    )

    // Build a full list of role flags for the user
    const roles = {
      isCourseCoordinator,
      isCourseTeacher,
      isExaminer,
      isKursinfoAdmin: user.isKursinfoAdmin,
      isSuperUser: user.isSuperUser,
      isSchoolAdmin: null, // Will be resolved below if needed
    }

    // Save role info in session for later use in the app
    req.session.passport.user.roles = roles

    // Check if the user has at least one of the required roles
    const isAuthorized = requiredRoles.some(role => roles[role])
    if (isAuthorized) return next()

    // If the required roles do NOT include school admin, deny access
    if (!requiredRoles.includes('isSchoolAdmin')) {
      return next(messageHaveNotRights(lang))
    }

    // Otherwise, check whether the user is a school admin for the given course
    const isAdmin = await _isAdminOfCourseSchool(courseCode, user)
    req.session.passport.user.roles.isSchoolAdmin = isAdmin

    // Allow or deny access based on school admin status
    if (isAdmin) return next()
    else return next(messageHaveNotRights(lang))
  }
