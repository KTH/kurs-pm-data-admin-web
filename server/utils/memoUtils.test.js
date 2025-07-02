const { parseMemoEndPointString } = require('./memoUtils')

describe('parseMemoEndPointString', () => {
  test('parses single application code', () => {
    const input = 'SF162420252-10276'
    const result = parseMemoEndPointString(input)
    expect(result).toEqual({
      courseCode: 'SF1624',
      semester: '20252',
      applicationCodes: ['10276'],
    })
  })

  test('parses multiple application codes', () => {
    const input = 'SF162420252-10276-50299'
    const result = parseMemoEndPointString(input)
    expect(result).toEqual({
      courseCode: 'SF1624',
      semester: '20252',
      applicationCodes: ['10276', '50299'],
    })
  })

  test('parses even more application codes', () => {
    const input = 'SFK162420252-10276-50299-77777'
    const result = parseMemoEndPointString(input)
    expect(result).toEqual({
      courseCode: 'SFK1624',
      semester: '20252',
      applicationCodes: ['10276', '50299', '77777'],
    })
  })

  test('returns undefined for invalid input (missing dash)', () => {
    const input = 'SF16242025210276'
    expect(parseMemoEndPointString(input)).toBeUndefined()
  })

  test('returns undefined for invalid input (short course code)', () => {
    const input = 'S162420252-10276'
    expect(parseMemoEndPointString(input)).toBeUndefined()
  })

  test('returns undefined for invalid input (missing semester)', () => {
    const input = 'SF1624-10276'
    expect(parseMemoEndPointString(input)).toBeUndefined()
  })

  test('returns undefined for invalid input (wrong application code format)', () => {
    const input = 'SF162420252-1027A'
    expect(parseMemoEndPointString(input)).toBeUndefined()
  })
})
