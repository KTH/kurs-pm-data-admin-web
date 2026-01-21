const mockClient = {
  getLatestCourseVersion: jest.fn(),
}

function setupLadokApiMocks() {
  jest.mock('@kth/om-kursen-ladok-client', () => ({
    createApiClient: jest.fn(),
  }))
  jest.mock('../../i18n')
  jest.mock('../../server/ugRestApi')
  jest.mock('../../server/configuration', () => ({
    server: {
      ladokMellanlagerApi: {
        https: true,
        host: 'localhost',
        port: 3000,
        basePath: '/api',
      },
      ugRestApiURL: {
        url: 'http://localhost:3000',
        key: 'test-key',
      },
      ugAuth: {
        authTokenURL: 'http://localhost:3000/auth',
        authClientId: 'test-client-id',
        authClientSecret: 'test-client-secret',
      },
    },
  }))

  const { createApiClient } = require('@kth/om-kursen-ladok-client')
  createApiClient.mockReturnValue(mockClient)

  return mockClient
}

const mockSuccessfulCourseData = {
  statusCode: 200,
  apiError: null,
  courseCode: 'SF1624',
  schoolCode: 'SCI',
  title: {
    sv: 'Algebra och geometri',
    en: 'Algebra and Geometry',
  },
  credits: 7.5,
  creditUnitLabel: { sv: 'Högskolepoäng', en: 'Credits' },
  creditUnitAbbr: { sv: 'hp', en: 'hp' },
}

const mockNotFoundCourseData = {
  statusCode: 404,
  apiError: null,
}

const mockServerErrorCourseData = {
  statusCode: 500,
  apiError: { message: 'Internal server error' },
}

const mockCourseRoundsData = [
  {
    shortName: 'CBIOT1 m.fl.',
    applicationCode: '50001',
    startperiod: '20232',
    firstTuitionDate: '2023-08-28',
    lastTuitionDate: '2023-10-30',
    status: 'S3',
    full: false,
    cancelled: false,
    language: {
      sv: 'Svenska',
      en: 'Swedish',
    },
    userAccessDenied: false,
  },
  {
    shortName: 'CDATE1 m.fl.',
    applicationCode: '50002',
    startperiod: '20232',
    firstTuitionDate: '2023-08-28',
    lastTuitionDate: '2023-10-30',
    status: 'S3',
    full: false,
    cancelled: false,
    language: {
      sv: 'Engelska',
      en: 'English',
    },
    userAccessDenied: false,
  },
]

const mockCourseSyllabusData = {
  edition: 1,
  validFromTerm: '20191',
  courseContent: {
    sv: 'Kursen innehåll på svenska',
    en: 'Course content in English',
  },
  learningOutcomes: {
    sv: 'Lärandemål på svenska',
    en: 'Learning outcomes in English',
  },
}

// Mock functions
const getLadokCourseData = jest.fn()
const getCourseRoundsData = jest.fn()
const getCourseSchoolCode = jest.fn()
const getLadokCourseSyllabus = jest.fn()

module.exports = {
  // Mock setup
  setupLadokApiMocks,
  mockClient,

  // Mock data
  mockSuccessfulCourseData,
  mockNotFoundCourseData,
  mockServerErrorCourseData,
  mockCourseRoundsData,
  mockCourseSyllabusData,

  // Mock functions
  getLadokCourseData,
  getCourseRoundsData,
  getCourseSchoolCode,
  getLadokCourseSyllabus,
}
