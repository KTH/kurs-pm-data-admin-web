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

const { ugRestApiHelper } = require('@kth/ug-rest-api-helper')

jest.mock('@kth/log')
const log = require('@kth/log')

log.info = jest.fn()
log.debug = jest.fn()
log.error = jest.fn()

// Import all the updated functions to test
const {
  fetchCourseAndRoundGroups,
  fetchUsersInGroupsCategorizedByRole,
  fetchGroupsForUserCategorizedByRole,
  getCourseGroupName,
} = require('./ugRestApi')

describe('getCourseGroupName', () => {
  test('returns correct UG group name for 7-char course code', () => {
    expect(getCourseGroupName('AOK6241')).toBe('ladok2.kurser.AOK.6241')
  })

  test('returns correct UG group name for 6-char course code', () => {
    expect(getCourseGroupName('SF1624')).toBe('ladok2.kurser.SF.1624')
  })

  test('returns undefined for invalid length', () => {
    expect(getCourseGroupName('SF16')).toBeUndefined()
    expect(getCourseGroupName('')).toBeUndefined()
  })
})

describe('fetchCourseAndRoundGroups', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('initializes connection and fetches groups with correct parameters', async () => {
    const courseCode = 'SF1624'
    const semester = '20222'
    const applicationCodes = ['11111', '22222']

    // Mock getUGGroups to return dummy groups
    const dummyGroups = [{ name: 'group1' }, { name: 'group2' }]
    ugRestApiHelper.getUGGroups.mockResolvedValue(dummyGroups)

    const result = await fetchCourseAndRoundGroups(courseCode, semester, applicationCodes)

    expect(ugRestApiHelper.initConnectionProperties).toHaveBeenCalledTimes(1)

    const expectedCourseGroupName = 'ladok2.kurser.SF.1624'
    const expectedGroupNames = [
      expectedCourseGroupName,
      `${expectedCourseGroupName}.${semester}.11111`,
      `${expectedCourseGroupName}.${semester}.22222`,
    ]

    expect(ugRestApiHelper.getUGGroups).toHaveBeenCalledWith('name', 'in', expectedGroupNames, false)

    expect(result).toBe(dummyGroups)
  })
})

describe('fetchUsersInGroupsCategorizedByRole', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches users for all roles and removes duplicates', async () => {
    // Prepare groups with KTH ids
    const groups = [
      {
        examiners: ['id1', 'id2'],
        teachers: ['id3'],
        courseCoordinators: ['id4', 'id2'], // note 'id2' duplicate in examiners/courseCoordinators
      },
    ]

    // Map from KTH id to fake user
    const usersMap = {
      id1: { kthid: 'id1', username: 'user1' },
      id2: { kthid: 'id2', username: 'user2' },
      id3: { kthid: 'id3', username: 'user3' },
      id4: { kthid: 'id4', username: 'user4' },
    }

    ugRestApiHelper.getUGUsers.mockImplementation((_key, _op, kthid) => Promise.resolve([usersMap[kthid]]))

    const result = await fetchUsersInGroupsCategorizedByRole(groups)

    expect(ugRestApiHelper.initConnectionProperties).toHaveBeenCalled()

    // Duplicates removed - id2 only once per role list
    expect(result.examiners).toHaveLength(2)
    expect(result.teachers).toHaveLength(1)
    expect(result.courseCoordinators).toHaveLength(2)

    // Check correct users fetched
    expect(result.examiners).toEqual(expect.arrayContaining([usersMap.id1, usersMap.id2]))
    expect(result.teachers).toEqual(expect.arrayContaining([usersMap.id3]))
    expect(result.courseCoordinators).toEqual(expect.arrayContaining([usersMap.id4, usersMap.id2]))
  })

  test('handles groups with missing role arrays gracefully', async () => {
    const groups = [{ examiners: ['id1'] }, { teachers: ['id2'] }, { courseCoordinators: null }]

    ugRestApiHelper.getUGUsers.mockImplementation((_key, _op, kthid) =>
      Promise.resolve([{ kthid, username: `user-${kthid}` }])
    )

    const result = await fetchUsersInGroupsCategorizedByRole(groups)

    expect(result.examiners).toHaveLength(1)
    expect(result.teachers).toHaveLength(1)
    expect(result.courseCoordinators).toHaveLength(0)
  })
})

describe('fetchGroupsForUserCategorizedByRole', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches groups for all roles for a user', async () => {
    const userKthId = 'user1'

    const groupsByRole = {
      examiners: [{ name: 'examiners-group' }],
      teachers: [{ name: 'teachers-group' }],
      courseCoordinators: [{ name: 'coordinators-group' }],
    }

    ugRestApiHelper.getUGGroups.mockImplementation(role => Promise.resolve(groupsByRole[role]))

    const result = await fetchGroupsForUserCategorizedByRole(userKthId)

    expect(ugRestApiHelper.initConnectionProperties).toHaveBeenCalled()

    expect(result.examiners).toEqual(groupsByRole.examiners)
    expect(result.teachers).toEqual(groupsByRole.teachers)
    expect(result.courseCoordinators).toEqual(groupsByRole.courseCoordinators)

    // Check getUGGroups called with correct args
    expect(ugRestApiHelper.getUGGroups).toHaveBeenCalledTimes(3)
    expect(ugRestApiHelper.getUGGroups).toHaveBeenCalledWith('examiners', 'contains', userKthId)
    expect(ugRestApiHelper.getUGGroups).toHaveBeenCalledWith('teachers', 'contains', userKthId)
    expect(ugRestApiHelper.getUGGroups).toHaveBeenCalledWith('courseCoordinators', 'contains', userKthId)
  })
})
