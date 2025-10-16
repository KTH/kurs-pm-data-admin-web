const { getValidUntilTerm } = require('../utils/getValidUntilTerm')

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
})
