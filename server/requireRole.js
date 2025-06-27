'use strict'

const language = require('@kth/kth-node-web-common/lib/language')
const log = require('@kth/log')

const i18n = require('../i18n')
const ladokCourseData = require('./ladokApi')
const { parseMemoEndPointString } = require('./utils/memoUtils')
const { getEmployeeRoleForCourse, getEmployeeRoleForCourseRound } = require('./ugRestApi')

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

    // Determine the user's role in the course (and possibly in a specific course instance)
    let isCourseCoordinator = false
    let isCourseTeacher = false
    let isExaminer = false

    if (memoEndPoint) {
      // --- Course round level role check ---
      // If memoEndPoint is provided, extract semester and applicationCodes from it
      const { semester, applicationCodes } = parseMemoEndPointString(memoEndPoint)
      // Check roles for each course round (application code) individually
      const roundRoles = await Promise.all(
        applicationCodes.map(code => getEmployeeRoleForCourseRound(user.kthId, courseCode, semester, [code]))
      )

      // If user is coordinator/teacher/examiner for ANY round, grant that role
      isCourseCoordinator = roundRoles.some(r => r.isCourseCoordinator)
      isCourseTeacher = roundRoles.some(r => r.isCourseTeacher)
      isExaminer = roundRoles.some(r => r.isExaminer)
    } else {
      // --- Course level role check ---
      // If no memoEndPoint, check roles for the course as a whole (not a specific round)
      ;({ isCourseCoordinator, isCourseTeacher, isExaminer } = await getEmployeeRoleForCourse(user.kthId, courseCode))
    }

    // Build a full list of role flags
    const roles = {
      isCourseCoordinator,
      isCourseTeacher,
      isExaminer,
      isKursinfoAdmin: user.isKursinfoAdmin,
      isSuperUser: user.isSuperUser,
      isSchoolAdmin: null, // Will be resolved below if needed
    }

    // Check if the user has at least one of the required roles
    const isAuthorized = requiredRoles.some(role => roles[role])
    if (isAuthorized) return next()

    // If the required roles do NOT include school admin, deny access
    if (!requiredRoles.includes('isSchoolAdmin')) {
      return next(messageHaveNotRights(lang))
    }

    // Otherwise, check whether the user is a school admin for the given course
    const isScoolAdmin = await _isAdminOfCourseSchool(courseCode, user)
    req.session.passport.user.isSchoolAdmin = isScoolAdmin

    // Allow or deny access based on school admin status
    if (isScoolAdmin) return next()
    else return next(messageHaveNotRights(lang))
  }
