'use strict'

const passport = require('passport')
const log = require('kth-node-log')

/**
 * Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated
 * user must be serialized to the session, and deserialized when subsequent requests are made.
 *
 * Passport does not impose any restrictions on how your user records are stored. Instead, you provide functions
 * to Passport which implements the necessary serialization and deserialization logic. In a typical
 * application, this will be as simple as serializing the user ID, and finding the user by ID when deserializing.
 */
passport.serializeUser((user, done) => {
  if (user) {
    log.debug('User serialized: ' + user)
    done(null, user)
  } else {
    done()
  }
})

passport.deserializeUser((user, done) => {
  if (user) {
    log.debug('User deserialized: ' + user)
    done(null, user)
  } else {
    done()
  }
})

/*
  Checks req.session.authUser as created above im unpackLdapUser.

  Usage:

  requireRole('isAdmin', 'isEditor')
*/

function requireRole() {
  const roles = Array.prototype.slice.call(arguments)

  return function _hasNoneOfAcceptedRoles(req, res, next) {
    const ldapUser = req.session.authUser || {}

    // Check if we have any of the roles passed
    const hasAuthorizedRole = roles.reduce((prev, curr) => prev || ldapUser[curr], false)
    // If we don't have one of these then access is forbidden
    if (!hasAuthorizedRole) {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error)
    }
    return next()
  }
}

module.exports.requireRole = requireRole
