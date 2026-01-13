const { formatLadokData } = require('../utils/formatLadokData')
const { ladokCourseRounds, ladokCourseData, formattedData } = require('../../test/mocks/mockLadokCourseRounds')
jest.useFakeTimers().setSystemTime(new Date('2024-09-024'))

describe('Test Ladok course rounds grouping logic', () => {
  it('should group Ladok course rounds and create an object with the same structure as the response from Kopps', () => {
    expect(formatLadokData(ladokCourseRounds, ladokCourseData)).toEqual(formattedData)
  })
})
