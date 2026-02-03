const { getValidUntilTerm, sortSyllabusesByGiltigFrom } = require('../utils/getValidUntilTerm')

describe('getValidUntilTerm', () => {
  const make = term => ({ kursplan: { giltigfrom: term } })

  it('returns the term before the next syllabus validFrom date', () => {
    const syllabuses = [make('HT2018'), make('VT2020'), make('HT2022'), make('VT2023')]
    const result = getValidUntilTerm(syllabuses, make('HT2018'))
    expect(result).toBe('HT2019')
  })

  it('deduplicates by giltigfrom', () => {
    const syllabuses = [make('HT2018'), make('HT2018'), make('VT2019'), make('VT2019'), make('HT2019')]

    const result = getValidUntilTerm(syllabuses, make('HT2018'))
    expect(result).toBe('HT2018') // Next unique is VT2019
  })

  it('should return undefined if no other syllabuses are present', () => {
    const syllabuses = [make('HT2018')]
    const result = getValidUntilTerm(syllabuses, make('HT2018'))
    expect(result).toBe(undefined)
  })
  it('should return undefined if syllabuses array is empty', () => {
    const syllabuses = []
    const result = getValidUntilTerm(syllabuses, make('HT2018'))
    expect(result).toBe(undefined)
  })
  it('should sort syllabuses correctly', () => {
    const syllabuses = [make('HT2023'), make('VT2021'), make('VT2019'), make('VT2019'), make('HT2020')]
    const result = sortSyllabusesByGiltigFrom(syllabuses)
    expect(result).toStrictEqual([
      { kursplan: { giltigfrom: 'VT2019' } },
      { kursplan: { giltigfrom: 'VT2019' } },
      { kursplan: { giltigfrom: 'HT2020' } },
      { kursplan: { giltigfrom: 'VT2021' } },
      { kursplan: { giltigfrom: 'HT2023' } },
    ])
  })
})
