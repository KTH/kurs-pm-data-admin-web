const server = require('@kth/server')

// Now read the server config etc.
const config = require('./configuration').server
require('./api')
const AppRouter = require('kth-node-express-routing').PageRouter
const { getPaths } = require('kth-node-express-routing')

if (config.appInsights && config.appInsights.instrumentationKey) {
  const appInsights = require('applicationinsights')
  appInsights
    .setup(config.appInsights.instrumentationKey)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .start()
}

const _addProxy = uri => `${config.proxyPrefixPath.uri}${uri}`

// Expose the server and paths
server.locals.secret = new Map()
module.exports = server
module.exports.getPaths = () => getPaths()

/* ***********************
 * ******* LOGGING *******
 * ***********************
 */
const log = require('@kth/log')
const packageFile = require('../package.json')

const logConfiguration = {
  name: packageFile.name,
  app: packageFile.name,
  env: process.env.NODE_ENV,
  level: config.logging.log.level,
  console: config.logging.console,
  stdout: config.logging.stdout,
  src: config.logging.src,
}

log.init(logConfiguration)

/* **************************
 * ******* TEMPLATING *******
 * **************************
 */
const exphbs = require('express-handlebars')
const path = require('path')
server.set('views', path.join(__dirname, '/views'))
server.set('layouts', path.join(__dirname, '/views/layouts'))
server.set('partials', path.join(__dirname, '/views/partials'))
server.engine(
  'handlebars',
  exphbs.engine({
    defaultLayout: 'publicLayout',
    layoutsDir: server.settings.layouts,
    partialsDir: server.settings.partials,
    // !!!! Extended so differ from node-web
    helpers: { isUnauthorized: statusCode => statusCode === 403 || statusCode === '403' },
  })
)
server.set('view engine', 'handlebars')
// Register handlebar helpers
require('./views/helpers')

/* ******************************
 * ******* ACCESS LOGGING *******
 * ******************************
 */
const accessLog = require('kth-node-access-log')
server.use(accessLog(config.logging.accessLog))

/* ****************************
 * ******* STATIC FILES *******
 * ****************************
 */
const browserConfig = require('./configuration').browser
const browserConfigHandler = require('kth-node-configuration').getHandler(browserConfig, getPaths())
const express = require('express')

// Removes the "X-Powered-By: Express header" that shows the underlying Express framework
server.disable('x-powered-by')

// helper
function setCustomCacheControl(res, path2) {
  if (express.static.mime.lookup(path2) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'no-cache')
  }
}

// Files/statics routes--
// Map components HTML files as static content, but set custom cache control header, currently no-cache to force If-modified-since/Etag check.
server.use(
  _addProxy('/static/js/components'),
  express.static('./dist/js/components', { setHeaders: setCustomCacheControl })
)

// Expose browser configurations
server.use(_addProxy('/static/browserConfig'), browserConfigHandler)
// Files/statics routes
server.use(_addProxy('/static/kth-style'), express.static('./node_modules/kth-style/dist'))
// tinymce
server.use(_addProxy('/static/tinymce'), express.static('./tinymce'))
// Map static content like images, css and js.
server.use(_addProxy('/static'), express.static('./dist'))
// server.use(_addProxy('/static/icon/favicon'), express.static('./public/favicon.ico'))

// Return 404 if static file isn't found so we don't go through the rest of the pipeline
server.use(_addProxy('/static'), (req, res, next) => {
  const error = new Error('File not found: ' + req.originalUrl)
  error.statusCode = 404
  next(error)
})

// QUESTION: Should this really be set here?
// http://expressjs.com/en/api.html#app.set
server.set('case sensitive routing', true)

/* *******************************
 * ******* REQUEST PARSING *******
 * *******************************
 */
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
server.use(bodyParser.json({ limit: '50mb' }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
server.use(cookieParser())

/* ***********************
 * ******* SESSION *******
 * ***********************
 */
const session = require('@kth/session')
const options = config.session
options.sessionOptions.secret = config.sessionSecret
server.use(session(options))

/* ************************
 * ******* LANGUAGE *******
 * ************************
 */
const { languageHandler } = require('@kth/kth-node-web-common/lib/language')
server.use(config.proxyPrefixPath.uri, languageHandler)

/* ******************************
 ***** AUTHENTICATION - OIDC ****
 ****************************** */

const passport = require('passport')

server.use(passport.initialize())
server.use(passport.session())

passport.serializeUser((user, done) => {
  if (user) {
    done(null, user)
  } else {
    done()
  }
})

passport.deserializeUser((user, done) => {
  if (user) {
    done(null, user)
  } else {
    done()
  }
})

const { OpenIDConnect } = require('@kth/kth-node-passport-oidc')

const oidc = new OpenIDConnect(server, passport, {
  ...config.oidc,
  callbackLoginRoute: _addProxy('/auth/login/callback'),
  callbackLogoutRoute: _addProxy('/auth/logout/callback'),
  callbackSilentLoginRoute: _addProxy('/auth/silent/callback'),
  defaultRedirect: _addProxy(''),
  failureRedirect: _addProxy(''),
  // eslint-disable-next-line no-unused-vars
  extendUser: (user, claims) => {
    const { memberOf } = claims

    user.isSuperUser = memberOf.includes(config.auth.superuserGroup)
    user.isKursinfoAdmin = memberOf.includes(config.auth.kursinfoAdmins)

    user.memberOf = typeof memberOf === 'string' ? [memberOf] : memberOf
  },
})

// eslint-disable-next-line no-unused-vars
server.get(_addProxy('/login'), oidc.login, (req, res, next) => res.redirect(_addProxy('')))

// eslint-disable-next-line no-unused-vars
server.get(_addProxy('/logout'), oidc.logout)

/* ******************************
 * ******* CORTINA BLOCKS *******
 * ******************************
 */
server.use(
  config.proxyPrefixPath.uri,
  require('@kth/kth-node-web-common/lib/web/cortina')({
    blockUrl: config.blockApi.blockUrl,
    proxyPrefixPath: config.proxyPrefixPath.uri,
    hostUrl: config.hostUrl,
    redisConfig: config.cache.cortinaBlock.redis,
  })
)

/* ********************************
 * ******* CRAWLER REDIRECT *******
 * ********************************
 */
const excludePath = _addProxy('(?!/static).*')
const excludeExpression = new RegExp(excludePath)
server.use(
  excludeExpression,
  require('@kth/kth-node-web-common/lib/web/crawlerRedirect')({
    hostUrl: config.hostUrl,
  })
)

/* **********************************
 * ******* APPLICATION ROUTES *******
 * **********************************
 */
const { ChooseMemoStartPoint, MemoContent, PreviewContent, EditorsForTest, System } = require('./controllers')

const { requireRole } = require('./requireRole')

// System routes
const systemRoute = AppRouter()
systemRoute.get('system.monitor', _addProxy('/_monitor'), System.monitor)
systemRoute.get('system.home', _addProxy('/'), System.about)
systemRoute.get('system.about', _addProxy('/_about'), System.about)
systemRoute.get('system.paths', _addProxy('/_paths'), System.paths)
systemRoute.get('system.robots', '/robots.txt', System.robotsTxt)
server.use('/', systemRoute.getRouter())

// App routes
const appRoute = AppRouter()
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  appRoute.get('memo.testEditor', _addProxy('/_test_editor'), EditorsForTest.getPage)
}
appRoute.post(
  'memo.api.updateCreatedDraft',
  _addProxy('/internal-api/draft-updates/:courseCode/:memoEndPoint'),
  MemoContent.updateContentByEndpoint
)

appRoute.post(
  'memo.api.copyFromAPublishedMemo',
  _addProxy('/internal-api/create-draft/:courseCode/:memoEndPoint/copyFrom/:anotherMemoEndPoint'),
  ChooseMemoStartPoint.createDraftByMemoEndPoint
)

appRoute.post(
  'memo.api.createDraftByMemoEndPoint',
  _addProxy('/internal-api/create-draft/:courseCode/:memoEndPoint'),
  ChooseMemoStartPoint.createDraftByMemoEndPoint
)

appRoute.post(
  'memo.api.publishMemoByEndPoint',
  _addProxy('/internal-api/publish-memo/:courseCode/:memoEndPoint'),
  PreviewContent.publishMemoByEndPoint
)

// Gets a list of used round ids for a semester in a course
appRoute.get(
  'memo.api.getUsedRounds',
  _addProxy('/internal-api/used-rounds/:courseCode/:semester'),
  ChooseMemoStartPoint.getUsedRounds
)

appRoute.delete(
  'memo.api.removeMemoDraft',
  _addProxy('/internal-api/draft-to-remove/:courseCode/:memoEndPoint'),
  ChooseMemoStartPoint.removeMemoDraft
)

appRoute.get(
  'memo.getContent',
  _addProxy('/published/:courseCode'),
  oidc.login,
  requireRole(
    'isCourseResponsible',
    'isCourseTeacher',
    'isExaminator',
    'isKursinfoAdmin',
    'isSuperUser',
    'isSchoolAdmin'
  ),
  ChooseMemoStartPoint.getCourseOptionsPage
)

appRoute.get(
  'memo.getContent',
  _addProxy('/:courseCode/:memoEndPoint'),
  oidc.login,
  requireRole(
    'isCourseResponsible',
    'isCourseTeacher',
    'isExaminator',
    'isKursinfoAdmin',
    'isSuperUser',
    'isSchoolAdmin'
  ),
  MemoContent.renderMemoEditorPage
)

appRoute.get(
  'memo.getPreviewContent',
  _addProxy('/:courseCode/:memoEndPoint/preview'),
  oidc.login,
  requireRole(
    'isCourseResponsible',
    'isCourseTeacher',
    'isExaminator',
    'isKursinfoAdmin',
    'isSuperUser',
    'isSchoolAdmin'
  ),
  PreviewContent.renderMemoPreviewPage
)

appRoute.get(
  'memo.chooseRounds',
  _addProxy('/:courseCode/'),
  oidc.login,
  requireRole(
    'isCourseResponsible',
    'isCourseTeacher',
    'isExaminator',
    'isKursinfoAdmin',
    'isSuperUser',
    'isSchoolAdmin'
  ),
  ChooseMemoStartPoint.getCourseOptionsPage
)

appRoute.get(
  'system.gateway',
  _addProxy('/gateway'),
  oidc.silentLogin,
  requireRole(
    'isCourseResponsible',
    'isCourseTeacher',
    'isExaminator',
    'isKursinfoAdmin',
    'isSuperUser',
    'isSchoolAdmin'
  ),
  ChooseMemoStartPoint.getCourseOptionsPage
)

server.use('/', appRoute.getRouter())

// Not found etc
server.use(System.notFound)
server.use(System.final)

// Register handlebar helpers
require('./views/helpers')
