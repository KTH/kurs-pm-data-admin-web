const { HttpError } = require('../../server/utils/HttpError')
const {
  setupLadokApiMocks,
  mockClient,
  mockSuccessfulCourseData,
  mockNotFoundCourseData,
  mockServerErrorCourseData,
} = require('../mocks/ladokApiMocks')

setupLadokApiMocks()

const { getLadokCourseData } = require('../../server/ladokApi')

describe('Test getLadokCourseData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return course data on successful API call', async () => {
    mockClient.getLatestCourseVersion.mockResolvedValue(mockSuccessfulCourseData)

    const result = await getLadokCourseData('SF1624', 'en')

    expect(mockClient.getLatestCourseVersion).toHaveBeenCalledWith('SF1624', 'en')
    expect(result).toEqual(mockSuccessfulCourseData)
    expect(result.statusCode).toBe(200)
    expect(result.courseCode).toBe('SF1624')
  })

  it('should throw HttpError with 404 status when course is not found', async () => {
    mockClient.getLatestCourseVersion.mockResolvedValue(mockNotFoundCourseData)

    await expect(getLadokCourseData('INVALID', 'en')).rejects.toThrow(HttpError)
    expect(mockClient.getLatestCourseVersion).toHaveBeenCalledWith('INVALID', 'en')
  })

  it('should throw HttpError when API returns server error (500)', async () => {
    mockClient.getLatestCourseVersion.mockResolvedValue(mockServerErrorCourseData)

    await expect(getLadokCourseData('SF1624', 'en')).rejects.toThrow(HttpError)
    expect(mockClient.getLatestCourseVersion).toHaveBeenCalledWith('SF1624', 'en')
  })

  it('should throw HttpError when API returns with apiError set', async () => {
    const errorResponse = {
      statusCode: 200,
      apiError: { message: 'Some API error' },
    }
    mockClient.getLatestCourseVersion.mockResolvedValue(errorResponse)

    await expect(getLadokCourseData('SF1624', 'en')).rejects.toThrow(HttpError)
    expect(mockClient.getLatestCourseVersion).toHaveBeenCalledWith('SF1624', 'en')
  })
})
