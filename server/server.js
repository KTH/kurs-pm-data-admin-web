const server = require('kth-node-server')

// Now read the server config etc.
const config = require('./configuration').server
require('./api')
const AppRouter = require('kth-node-express-routing').PageRouter
const { getPaths } = require('kth-node-express-routing')

// Expose the server and paths
server.locals.secret = new Map()
module.exports = server
module.exports.getPaths = () => getPaths()

/* ***********************
 * ******* LOGGING *******
 * ***********************
 */
const log = require('kth-node-log')
const packageFile = require('../package.json')

const logConfiguration = {
  name: packageFile.name,
  app: packageFile.name,
  env: process.env.NODE_ENV,
  level: config.logging.log.level,
  console: config.logging.console,
  stdout: config.logging.stdout,
  src: config.logging.src
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
  exphbs({
    defaultLayout: 'publicLayout',
    layoutsDir: server.settings.layouts,
    partialsDir: server.settings.partials
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

// helper
function setCustomCacheControl(res, contentType) {
  if (express.static.mime.lookup(contentType) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'no-cache')
  }
}

// Files/statics routes--
// Map components HTML files as static content, but set custom cache control header, currently no-cache to force If-modified-since/Etag check.
server.use(
  config.proxyPrefixPath.uri + '/static/js/components',
  express.static('./dist/js/components', { setHeaders: setCustomCacheControl })
)

// Expose browser configurations
server.use(config.proxyPrefixPath.uri + '/static/browserConfig', browserConfigHandler)
// Files/statics routes
server.use(
  config.proxyPrefixPath.uri + '/static/kth-style',
  express.static('./node_modules/kth-style/dist')
)
// tinymce
server.use(config.proxyPrefixPath.uri + '/static/tinymce', express.static('./tinymce'))
// Map static content like images, css and js.
server.use(config.proxyPrefixPath.uri + '/static', express.static('./dist'))
// Return 404 if static file isn't found so we don't go through the rest of the pipeline
server.use(config.proxyPrefixPath.uri + '/static', (req, res, next) => {
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
const session = require('kth-node-session')
const options = config.session
options.sessionOptions.secret = config.sessionSecret
server.use(session(options))

/* ************************
 * ******* LANGUAGE *******
 * ************************
 */
const { languageHandler } = require('kth-node-web-common/lib/language')
server.use(config.proxyPrefixPath.uri, languageHandler)

/* ******************************
 * ******* AUTHENTICATION *******
 * ******************************
 */
const passport = require('passport')
// const ldapClient = require('./adldapClient')
const {
  authLoginHandler,
  authCheckHandler,
  logoutHandler,
  pgtCallbackHandler,
  serverLogin,
  getServerGatewayLogin
} = require('kth-node-passport-cas').routeHandlers({
  casLoginUri: config.proxyPrefixPath.uri + '/login',
  casGatewayUri: config.proxyPrefixPath.uri + '/loginGateway',
  proxyPrefixPath: config.proxyPrefixPath.uri,
  server
})
const { redirectAuthenticatedUserHandler } = require('./authentication')
server.use(passport.initialize())
server.use(passport.session())

const authRoute = AppRouter()
authRoute.get(
  'cas.login',
  config.proxyPrefixPath.uri + '/login',
  authLoginHandler,
  redirectAuthenticatedUserHandler
)
authRoute.get(
  'cas.gateway',
  config.proxyPrefixPath.uri + '/loginGateway',
  authCheckHandler,
  redirectAuthenticatedUserHandler
)
authRoute.get('cas.logout', config.proxyPrefixPath.uri + '/logout', logoutHandler)
// Optional pgtCallback (use config.cas.pgtUrl?)
authRoute.get('cas.pgtCallback', config.proxyPrefixPath.uri + '/pgtCallback', pgtCallbackHandler)
server.use('/', authRoute.getRouter())

// Convenience methods that should really be removed
server.login = serverLogin
server.gatewayLogin = getServerGatewayLogin

/* ********************************
 * ******* CRAWLER REDIRECT *******
 * ********************************
 */
const excludePath = config.proxyPrefixPath.uri + '(?!/static).*'
const excludeExpression = new RegExp(excludePath)
server.use(
  excludeExpression,
  require('kth-node-web-common/lib/web/crawlerRedirect')({
    hostUrl: config.hostUrl
  })
)

/* **********************************
 * ******* APPLICATION ROUTES *******
 * **********************************
 */
const { ChoiceOptions, System, MemoContent, PreviewContent } = require('./controllers')
const { requireRole } = require('./authentication')

// System routes
const systemRoute = AppRouter()
systemRoute.get('system.monitor', config.proxyPrefixPath.uri + '/_monitor', System.monitor)
systemRoute.get('system.about', config.proxyPrefixPath.uri + '/_about', System.about)
systemRoute.get('system.paths', config.proxyPrefixPath.uri + '/_paths', System.paths)
systemRoute.get('system.robots', '/robots.txt', System.robotsTxt)
server.use('/', systemRoute.getRouter())

// App routes
const appRoute = AppRouter()

appRoute.post(
  'memo.api.updateCreatedDraft',
  config.proxyPrefixPath.uri + '/internal-api/draft-updates/:courseCode/:memoEndPoint',
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  MemoContent.updateContentByEndpoint
)

appRoute.post(
  'memo.api.createDraftByMemoEndPoint',
  config.proxyPrefixPath.uri + '/internal-api/create-draft/:courseCode/:memoEndPoint', // updated
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  ChoiceOptions.createDraftByMemoEndPoint
)

// Gets a list of used round ids for a semester in a course
appRoute.get(
  'memo.api.getUsedRounds',
  config.proxyPrefixPath.uri + '/internal-api/used-rounds/:courseCode/:semester',
  serverLogin,
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  ChoiceOptions.getUsedRounds
)

// appRoute.get(
//   'memo.api.getUsedDrafts',
//   config.proxyPrefixPath.uri + '/internal-api/existing-drafts/:courseCode',
//   ChoiceOptions.getUsedDrafts
// )

appRoute.delete(
  'memo.api.removeMemoDraft',
  config.proxyPrefixPath.uri + '/internal-api/draft-to-remove/:courseCode/:memoEndPoint',
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  ChoiceOptions.removeMemoDraft
)

appRoute.get(
  'memo.getContent',
  config.proxyPrefixPath.uri + '/:courseCode/:memoEndPoint', // /:courseCode/:semester/:memoEndPoint*
  serverLogin,
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  MemoContent.renderMemoEditorPage
)

appRoute.get(
  'memo.getPreviewContent',
  config.proxyPrefixPath.uri + '/:courseCode/:memoEndPoint/preview',
  serverLogin,
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  PreviewContent.renderMemoPreviewPage
)

appRoute.get(
  'memo.chooseRounds',
  config.proxyPrefixPath.uri + '/:courseCode/',
  serverLogin,
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  ChoiceOptions.getCourseOptionsPage
)

appRoute.get(
  'system.gateway',
  config.proxyPrefixPath.uri + '/gateway',
  getServerGatewayLogin('/'),
  requireRole('isCourseResponsible', 'isExaminator', 'isSuperUser'),
  MemoContent.renderMemoEditorPage
)

server.use('/', appRoute.getRouter())

// Not found etc
server.use(System.notFound)
server.use(System.final)

// Register handlebar helpers
require('./views/helpers')
