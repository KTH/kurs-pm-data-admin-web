/**
 *
 *            Server specific settings
 *
 * *************************************************
 * * WARNING! Secrets should be read from env-vars *
 * *************************************************
 *
 */
const {
  getEnv,
  devDefaults,
  unpackRedisConfig,
  unpackNodeApiConfig,
  unpackKOPPSConfig,
} = require('kth-node-configuration')
const { safeGet } = require('safe-utils')

// DEFAULT SETTINGS used for dev, if you want to override these for you local environment, use env-vars in .env
const devPort = devDefaults(3000)
const devSsl = devDefaults(false)
const devUrl = devDefaults('http://localhost:' + devPort)
const devKursPmDataApi = devDefaults('http://api-r.referens.sys.kth.se/api/kurs-pm-data?defaultTimeout=10000') // required=true&
const devKoppsApi = devDefaults('https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=10000')
const devSessionKey = devDefaults('kurs-pm-data-admin-web.sid')
const devSessionUseRedis = devDefaults(true)
const devRedis = devDefaults('redis://localhost:6379/')
const devUgRestAuthApiTokenUri = devDefaults('https://login.ref.ug.kth.se/adfs/')
const devUgRestApiUri = devDefaults('https://integral-api.sys.kth.se/test/ug')

const devOidcIssuerURL = devDefaults('https://login.ref.ug.kth.se/adfs')
const devOidcConfigurationURL = devDefaults(`${devOidcIssuerURL}/.well-known/openid-configuration`)
const devOidcTokenSecret = devDefaults('tokenSecretString')
const prefixPath = devDefaults('/kursinfoadmin/kurs-pm-data')
const devOidcCallbackURL = devDefaults(`http://localhost:3000${prefixPath}/auth/login/callback`)
const devOidcCallbackSilentURL = devDefaults(`http://localhost:3000${prefixPath}/auth/silent/callback`)
const devOidcLogoutCallbackURL = devDefaults(`http://localhost:3000${prefixPath}/auth/logout/callback`)

// END DEFAULT SETTINGS

module.exports = {
  hostUrl: getEnv('SERVER_HOST_URL', devUrl),
  useSsl: safeGet(() => getEnv('SERVER_SSL', devSsl + '').toLowerCase() === 'true'),
  port: getEnv('SERVER_PORT', devPort),
  ssl: {
    // In development we don't have SSL feature enabled
    pfx: getEnv('SERVER_CERT_FILE', ''),
    passphrase: getEnv('SERVER_CERT_PASSPHRASE', ''),
  },

  oidc: {
    configurationUrl: getEnv('OIDC_CONFIGURATION_URL', devOidcConfigurationURL),
    clientId: getEnv('OIDC_APPLICATION_ID', null),
    clientSecret: getEnv('OIDC_CLIENT_SECRET', null),
    tokenSecret: getEnv('OIDC_TOKEN_SECRET', devOidcTokenSecret),
    callbackLoginUrl: getEnv('OIDC_CALLBACK_URL', devOidcCallbackURL),
    callbackSilentLoginUrl: getEnv('OIDC_CALLBACK_SILENT_URL', devOidcCallbackSilentURL),
    callbackLogoutUrl: getEnv('OIDC_CALLBACK_LOGOUT_URL', devOidcLogoutCallbackURL),
  },

  // API keys
  apiKey: {
    kursPmDataApi: getEnv('KURS_PM_DATA_API_KEY', devDefaults('1234')),
  },

  ladokMellanlagerApi: {
    clientId: getEnv('LADOK_AUTH_CLIENT_ID', devDefaults('c978bff4-80c6-42d2-8d64-a6d90227013b')),
    clientSecret: getEnv('LADOK_AUTH_CLIENT_SECRET', null),
    tokenUrl: getEnv(
      'LADOK_AUTH_TOKEN_URL',
      devDefaults('https://login.microsoftonline.com/acd7f330-d613-48d9-85f2-258b1ac4a015/oauth2/v2.0/token')
    ),
    scope: getEnv('LADOK_AUTH_SCOPE', devDefaults('api://4afd7e46-019e-44e1-9630-12fdf9d31d02/.default')),
    baseUrl: getEnv('LADOK_BASE_URL', devDefaults('https://ladok-mellanlagring-lab.azure-api.net')),
    ocpApimSubscriptionKey: getEnv('LADOK_OCP_APIM_SUBSCRIPTION_KEY', null),
  },

  // Authentication
  auth: {
    // app.kursinfo.superuser = personer tillagda där ska kunna lägga till folk som adminanvändare
    // app.kursinfo.kursinfo-admins = personer som är tillagda där ska kunna logga in i Om kursen via länken "Administera Om kursen" för alla skolor och alla kurser.
    superuserGroup: 'app.kursinfo.superuser',
    kursinfoAdmins: 'app.kursinfo.kursinfo-admins',
  },

  // Service API's
  nodeApi: {
    kursPmDataApi: unpackNodeApiConfig('KURS_PM_DATA_API_URI', devKursPmDataApi),
  },

  koppsApi: unpackKOPPSConfig('KOPPS_URI', devKoppsApi),

  // Cortina
  blockApi: {
    blockUrl: getEnv('CM_HOST_URL', devDefaults('https://www-r.referens.sys.kth.se/cm/')), // Block API base URL
    addBlocks: {
      secondaryMenu: '1.1066515',
      studentMegaMenu: '1.1066510',
      studentSearch: '1.1066521',
      studentFooter: '1.1066523',
    },
    globalLink: false,
  },

  // Logging
  logging: {
    log: {
      level: getEnv('LOGGING_LEVEL', 'debug'),
    },
    accessLog: {
      useAccessLog: getEnv('LOGGING_ACCESS_LOG', true),
    },
  },
  clientLogging: {
    level: 'debug',
  },
  cache: {
    cortinaBlock: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      redisKey: 'CortinaBlock_kurs-pm-data-admin-web_',
    },
    koppsApi: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      expireTime: getEnv('KOPPS_API_CACHE_EXPIRE_TIME', 60 * 60), // 60 minuteS
    },
  },

  // UG API auth properties
  ugAuth: {
    authTokenURL: getEnv('UG_REST_AUTH_API_TOKEN_URI', devUgRestAuthApiTokenUri),
    authClientId: getEnv('UG_REST_AUTH_CLIENT_ID', null),
    authClientSecret: getEnv('UG_REST_AUTH_CLIENT_SECRET', null),
  },
  // ug redis api base url
  ugRestApiURL: {
    url: getEnv('UG_REST_API_URI', devUgRestApiUri),
    key: getEnv('UG_REST_API_SUBSCRIPTION_KEY', null),
  },

  // Session
  sessionSecret: getEnv('SESSION_SECRET', devDefaults('1234567890')),
  session: {
    key: getEnv('SESSION_KEY', devSessionKey),
    useRedis: safeGet(() => getEnv('SESSION_USE_REDIS', devSessionUseRedis) === 'true'),
    sessionOptions: {
      // do not set session secret here!!
      cookie: {
        secure: String(getEnv('SESSION_SECURE_COOKIE', false)).toLowerCase() === 'true',
        path: getEnv('SERVICE_PUBLISH', '/kursinfoadmin/kurs-pm-data'),
        sameSite: getEnv('SESSION_SAME_SITE_COOKIE', 'Lax'),
      },
      proxy: safeGet(() => getEnv('SESSION_TRUST_PROXY', true) === 'true'),
    },
    redisOptions: unpackRedisConfig('REDIS_URI', devRedis),
  },

  toolbar: {
    url: getEnv('TOOLBAR_URL', devDefaults('https://www-r.referens.sys.kth.se/social/toolbar/widget.js')),
  },
}
