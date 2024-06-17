const { roundIsNotOutdated } = require('../../server/utils-shared/helpers')

describe('roundIsNotOutdated', () => {
  it('should return true for a date in the current year', () => {
    const date = new Date().toISOString()
    expect(roundIsNotOutdated(date)).toBe(true)
  })

  it('should return true for a date in the previous year', () => {
    const lastYear = new Date().getFullYear() - 1
    const date = new Date(`${lastYear}-01-01`).toISOString()
    expect(roundIsNotOutdated(date)).toBe(true)
  })

  it('should return false for a date older than the previous year', () => {
    const twoYearsAgo = new Date().getFullYear() - 2
    const date = new Date(`${twoYearsAgo}-01-01`).toISOString()
    expect(roundIsNotOutdated(date)).toBe(false)
  })

  it('should return true for the last day of the previous year', () => {
    const lastYear = new Date().getFullYear() - 1
    const date = new Date(`${lastYear}-12-31`).toISOString()
    expect(roundIsNotOutdated(date)).toBe(true)
  })

  it('should return error for an invalid date', () => {
    const date = 'fghtk'
    expect(() => roundIsNotOutdated(date)).toThrow('Invalid date')
  })
})
