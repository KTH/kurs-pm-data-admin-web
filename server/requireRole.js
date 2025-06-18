'use strict'

const language = require('@kth/kth-node-web-common/lib/language')
const log = require('@kth/log')

const i18n = require('../i18n')
const ladokCourseData = require('./ladokApi')
const { getEmployeeRoleForCourse } = require('./controllers/ugRestCtrl')

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

module.exports.requireRole = (...roles) =>
  // eslint-disable-next-line consistent-return
  async function _hasCourseAcceptedRoles(req, res, next) {
    const lang = language.getLanguage(res)
    const { user = {} } = req.session.passport

    const courseCode = req.params.courseCode.toUpperCase()
    const { isCourseCoordinator, isCourseTeacher, isExaminer } = await getEmployeeRoleForCourse(user.kthId, courseCode)

    const basicUserCourseRoles = {
      isCourseCoordinator,
      isCourseTeacher,
      isExaminer,
      isKursinfoAdmin: user.isKursinfoAdmin,
      isSuperUser: user.isSuperUser,
      isSchoolAdmin: null,
    }

    req.session.passport.user.roles = basicUserCourseRoles

    const hasBasicAuthorizedRole = roles.reduce((prev, curr) => prev || basicUserCourseRoles[curr], false)

    if (hasBasicAuthorizedRole) return next()

    if (!hasBasicAuthorizedRole && !roles.includes('isSchoolAdmin')) return next(messageHaveNotRights(lang))

    _isAdminOfCourseSchool(courseCode, user).then(isAdminOfCourseSchool => {
      req.session.passport.user.roles.isSchoolAdmin = isAdminOfCourseSchool

      if (isAdminOfCourseSchool) return next()
      else return next(messageHaveNotRights(lang))
    })
  }
