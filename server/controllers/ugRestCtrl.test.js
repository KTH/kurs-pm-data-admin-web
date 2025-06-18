jest.mock('../ugRestApi', () => ({
  fetchCourseAndRoundGroups: jest.fn(),
  fetchUsersInGroupsCategorizedByRole: jest.fn(),
  fetchGroupsForUserCategorizedByRole: jest.fn(),
  getCourseGroupName: jest.fn(),
}))

jest.mock('@kth/log')
const log = require('@kth/log')

log.info = jest.fn()

const { faker } = require('@faker-js/faker')
const { getCourseEmployees, getEmployeeRoleForCourse } = require('../controllers/ugRestCtrl') // replace with actual relative path

const {
  fetchCourseAndRoundGroups,
  fetchUsersInGroupsCategorizedByRole,
  fetchGroupsForUserCategorizedByRole,
  getCourseGroupName,
} = require('../ugRestApi')

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

  beforeEach(() => {
    jest.clearAllMocks()

    fetchCourseAndRoundGroups.mockResolvedValue([
      {
        name: 'edu.courses.SF.1624',
        examiners: examiners.map(u => u.kthid),
        teachers: teachers.map(u => u.kthid),
        courseCoordinators: courseCoordinators.map(u => u.kthid),
      },
    ])

    fetchUsersInGroupsCategorizedByRole.mockResolvedValue({
      examiners,
      teachers,
      courseCoordinators,
    })
  })

  test('returns HTML strings for examiners, teachers, and coordinators', async () => {
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
      expect(result.examiners).toContain(user.surname)
    })

    teachers.forEach(user => {
      expect(result.teachers).toContain(user.username)
      expect(result.teachers).toContain(user.givenName)
    })

    courseCoordinators.forEach(user => {
      expect(result.courseCoordinators).toContain(user.username)
      expect(result.courseCoordinators).toContain(user.givenName)
    })
  })

  test('handles empty roles gracefully', async () => {
    fetchUsersInGroupsCategorizedByRole.mockResolvedValue({
      examiners: [],
      teachers: [],
      courseCoordinators: [],
    })

    const result = await getCourseEmployees({
      courseCode: 'SF1624',
      semester: '20222',
      applicationCodes: ['11111'],
    })

    expect(result.examiners).toBeUndefined()
    expect(result.teachers).toBeUndefined()
    expect(result.courseCoordinators).toBeUndefined()
  })

  test('logs and throws error from underlying calls', async () => {
    const error = new Error('UG API failure')
    fetchCourseAndRoundGroups.mockRejectedValue(error)

    await expect(
      getCourseEmployees({
        courseCode: 'SF1624',
        semester: '20222',
        applicationCodes: ['11111'],
      })
    ).rejects.toThrow(error)

    expect(log.info).toHaveBeenCalledWith('Error in getCourseEmployees', { error })
  })
})

describe('getEmployeeRoleForCourse', () => {
  const userKthId = faker.string.uuid()
  const courseCode = 'SF1624'
  const courseGroupName = 'ladok2.kurser.SF.1624'

  beforeEach(() => {
    jest.clearAllMocks()
    getCourseGroupName.mockReturnValue(courseGroupName)
  })

  test('returns true for all roles if user is in all groups', async () => {
    fetchGroupsForUserCategorizedByRole.mockResolvedValue({
      examiners: [{ name: courseGroupName }],
      teachers: [{ name: courseGroupName }],
      courseCoordinators: [{ name: courseGroupName }],
    })

    const result = await getEmployeeRoleForCourse(userKthId, courseCode)

    expect(result).toEqual({
      isExaminer: true,
      isCourseTeacher: true,
      isCourseCoordinator: true,
    })
  })

  test('returns false for all roles if user not found', async () => {
    fetchGroupsForUserCategorizedByRole.mockResolvedValue({
      examiners: [],
      teachers: [],
      courseCoordinators: [],
    })

    const result = await getEmployeeRoleForCourse(userKthId, courseCode)

    expect(result).toEqual({
      isExaminer: false,
      isCourseTeacher: false,
      isCourseCoordinator: false,
    })
  })

  test('returns mixed roles correctly', async () => {
    fetchGroupsForUserCategorizedByRole.mockResolvedValue({
      examiners: [{ name: courseGroupName }],
      teachers: [],
      courseCoordinators: [{ name: 'some.other.course.group' }],
    })

    const result = await getEmployeeRoleForCourse(userKthId, courseCode)

    expect(result).toEqual({
      isExaminer: true,
      isCourseTeacher: false,
      isCourseCoordinator: false,
    })
  })
})
