jest.mock('./configuration', () => ({
  server: {
    ugRestApiURL: {
      url: 'https://ug.test.api',
      key: 'dummy-subscription-key',
    },
    ugAuth: {
      authTokenURL: 'https://auth.test.token',
      authClientId: 'dummy-client-id',
      authClientSecret: 'dummy-client-secret',
    },
  },
}))

jest.mock('@kth/ug-rest-api-helper', () => ({
  ugRestApiHelper: {
    initConnectionProperties: jest.fn(),
    getUGGroups: jest.fn(),
    getUGUsers: jest.fn(),
  },
}))

const { faker } = require('@faker-js/faker')
const { ugRestApiHelper } = require('@kth/ug-rest-api-helper')

jest.mock('@kth/log')
const log = require('@kth/log')

log.info = jest.fn()
log.debug = jest.fn()
log.error = jest.fn()

const { getCourseEmployees, getEmployeeRoleForCourse } = require('./ugRestApi')

describe('getCourseEmployees', () => {
  const createUser = () => ({
    username: faker.internet.userName(),
    kthid: faker.string.uuid(),
    givenName: faker.person.firstName(),
    surname: faker.person.lastName(),
  })

  const examiners = [createUser(), createUser()]
  const teachers = [createUser()]
  const courseCoordinators = [createUser()]

  const mockGroups = [
    {
      name: 'edu.courses.SF.1624',
      examiners: examiners.map(u => u.kthid),
    },
    {
      name: 'edu.courses.SF.1624.20222.11111',
      teachers: teachers.map(u => u.kthid),
      courseCoordinators: courseCoordinators.map(u => u.kthid),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()

    ugRestApiHelper.getUGGroups.mockResolvedValue(mockGroups)

    ugRestApiHelper.getUGUsers.mockImplementation((_key, _op, kthid) => {
      const all = [...examiners, ...teachers, ...courseCoordinators]
      return Promise.resolve([all.find(u => u.kthid === kthid)])
    })
  })

  test('should return expected HTML for examiners, teachers, and course coordinators', async () => {
    const result = await getCourseEmployees({
      courseCode: 'SF1624',
      semester: '20222',
      applicationCodes: ['11111'],
    })

    expect(result.examiners).toContain('<p class="person">')
    expect(result.teachers).toContain('<p class="person">')
    expect(result.courseCoordinators).toContain('<p class="person">')

    examiners.forEach(user => {
      expect(result.examiners).toContain(user.username)
      expect(result.examiners).toContain(user.givenName)
    })

    teachers.forEach(user => {
      expect(result.teachers).toContain(user.username)
    })

    courseCoordinators.forEach(user => {
      expect(result.courseCoordinators).toContain(user.username)
    })
  })

  test('should return undefined for missing roles', async () => {
    const modifiedGroups = mockGroups.map(group => ({
      ...group,
      teachers: [],
      courseCoordinators: [],
    }))
    ugRestApiHelper.getUGGroups.mockResolvedValue(modifiedGroups)

    const result = await getCourseEmployees({
      courseCode: 'SF1624',
      semester: '20222',
      applicationCodes: ['11111'],
    })

    expect(result.teachers).toBeUndefined()
    expect(result.courseCoordinators).toBeUndefined()
    expect(result.examiners).toContain('<p class="person">')
  })

  test('should handle UG API error and log it', async () => {
    const error = new Error('UG API failure')
    ugRestApiHelper.getUGGroups.mockRejectedValue(error)

    const result = await getCourseEmployees({
      courseCode: 'SF1624',
      semester: '20222',
      applicationCodes: ['11111'],
    })

    expect(log.info).toHaveBeenCalledWith('Exception from UG Rest API - multi', { error })
    expect(result).toBe(error)
  })

  test('should return empty object when no groups found', async () => {
    ugRestApiHelper.getUGGroups.mockResolvedValue([])

    const result = await getCourseEmployees({
      courseCode: 'SF1624',
      semester: '20222',
      applicationCodes: ['11111'],
    })

    expect(result).toEqual({})
  })
})

describe('getEmployeeRoleForCourse', () => {
  const user = {
    kthid: faker.string.uuid(),
    username: faker.internet.userName(),
  }

  const courseCode = 'SF1624'
  const courseGroupName = `ladok2.kurser.SF.1624`

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should correctly identify all roles for a user', async () => {
    ugRestApiHelper.getUGGroups.mockImplementation((role, _op, kthid) => {
      if (kthid !== user.kthid) return Promise.resolve([])
      return Promise.resolve([[{ name: `${courseGroupName}` }]])
    })

    const result = await getEmployeeRoleForCourse(user.kthid, courseCode)

    expect(result).toEqual({
      isCourseCoordinator: true,
      isCourseTeacher: true,
      isExaminer: true,
    })
  })

  test('should return false for all roles if user not in any group', async () => {
    ugRestApiHelper.getUGGroups.mockResolvedValue([])

    const result = await getEmployeeRoleForCourse(user.kthid, courseCode)

    expect(result).toEqual({
      isCourseCoordinator: false,
      isCourseTeacher: false,
      isExaminer: false,
    })
  })

  test('should return mixed roles if user is in some but not all', async () => {
    ugRestApiHelper.getUGGroups.mockImplementation(role => {
      if (role === 'examiners') return Promise.resolve([{ name: `${courseGroupName}` }])
      if (role === 'teachers') return Promise.resolve([])
      if (role === 'courseCoordinators') return Promise.resolve([{ name: 'some.other.course.group' }])
      return Promise.resolve([])
    })

    const result = await getEmployeeRoleForCourse(user.kthid, courseCode)

    expect(result).toEqual({
      isCourseCoordinator: false,
      isCourseTeacher: false,
      isExaminer: true,
    })
  })

  test('should handle errors in getUGGroups', async () => {
    const error = new Error('UG group fetch failed')
    ugRestApiHelper.getUGGroups.mockRejectedValue(error)

    await expect(getEmployeeRoleForCourse(user.kthid, courseCode)).rejects.toThrow('UG group fetch failed')
  })
})
