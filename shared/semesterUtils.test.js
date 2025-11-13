import {
  calcPreviousSemester,
  getPeriodCodeForDate,
  parseLadokSemester,
  parseSemesterIntoYearSemesterNumber,
  parseSemesterIntoYearSemesterNumberArray,
  SemesterNumber,
} from './semesterUtils'

describe('semesterUtils', () => {
  describe('calcPreviousSemester', () => {
    test.each([2024, 2025, 1990])('returns yearTerm with semesterNumber: 1 if semesterNumber is 2', year => {
      expect(calcPreviousSemester({ year, semesterNumber: SemesterNumber.Autumn })).toStrictEqual({
        year,
        semesterNumber: SemesterNumber.Spring,
      })
    })

    test.each([2024, 2025, 1990])('returns yearTerm with year -1 and semesterNumber 2 if semesterNumber is 1', year => {
      expect(calcPreviousSemester({ year, semesterNumber: SemesterNumber.Spring })).toStrictEqual({
        year: year - 1,
        semesterNumber: SemesterNumber.Autumn,
      })
    })
  })

  describe('parseSemesterIntoYearSemesterNumber', () => {
    describe('works in KTH format', () => {
      test('correctly parses terms with semesterNumber 1', () => {
        expect(parseSemesterIntoYearSemesterNumber(19901)).toEqual({
          year: 1990,
          semesterNumber: SemesterNumber.Spring,
        })
        expect(parseSemesterIntoYearSemesterNumber(20241)).toEqual({
          year: 2024,
          semesterNumber: SemesterNumber.Spring,
        })
        expect(parseSemesterIntoYearSemesterNumber('19901')).toEqual({
          year: 1990,
          semesterNumber: SemesterNumber.Spring,
        })
        expect(parseSemesterIntoYearSemesterNumber('20241')).toEqual({
          year: 2024,
          semesterNumber: SemesterNumber.Spring,
        })
      })

      test('correctly parses terms with semesterNumber 2', () => {
        expect(parseSemesterIntoYearSemesterNumber(20002)).toEqual({
          year: 2000,
          semesterNumber: SemesterNumber.Autumn,
        })
        expect(parseSemesterIntoYearSemesterNumber(20202)).toEqual({
          year: 2020,
          semesterNumber: SemesterNumber.Autumn,
        })
        expect(parseSemesterIntoYearSemesterNumber('20002')).toEqual({
          year: 2000,
          semesterNumber: SemesterNumber.Autumn,
        })
        expect(parseSemesterIntoYearSemesterNumber('20202')).toEqual({
          year: 2020,
          semesterNumber: SemesterNumber.Autumn,
        })
      })

      test.each(['99999', 1111111, '2024T', 'TTT'])('throws error if invalid KTHSemester format "%s"', illegalInput => {
        expect(() => parseSemesterIntoYearSemesterNumber(illegalInput)).toThrow(
          "Invalid semester format. Expected 'YYYYS' where S is 1 for VT or 2 for HT."
        )
      })
    })

    describe('works in ladok format', () => {
      test('correctly parses terms in Spring', () => {
        expect(parseSemesterIntoYearSemesterNumber('VT1990')).toEqual({
          year: 1990,
          semesterNumber: SemesterNumber.Spring,
        })
        expect(parseSemesterIntoYearSemesterNumber('VT2024')).toEqual({
          year: 2024,
          semesterNumber: SemesterNumber.Spring,
        })
      })

      test('correctly parses terms in autumn', () => {
        expect(parseSemesterIntoYearSemesterNumber('HT2000')).toEqual({
          year: 2000,
          semesterNumber: SemesterNumber.Autumn,
        })
        expect(parseSemesterIntoYearSemesterNumber('HT2020')).toEqual({
          year: 2020,
          semesterNumber: SemesterNumber.Autumn,
        })
      })

      test.each(['TT2020', 'vt2021'])('throws error if invalid ladok format', illegalInput => {
        expect(() => parseSemesterIntoYearSemesterNumber(illegalInput)).toThrow(
          "Invalid semester format. Expected 'HTYYYY' or 'VTYYYY'."
        )
        expect(() => parseSemesterIntoYearSemesterNumber(illegalInput)).toThrow(
          "Invalid semester format. Expected 'HTYYYY' or 'VTYYYY'."
        )
      })
    })
  })

  describe('parseLadokSemester', () => {
    test('parseLadokSemester', () => {
      expect(parseLadokSemester('HT2024')).toEqual([2024, 2])
    })
  })

  describe('parseSemesterIntoYearSemesterNumberArray', () => {
    test('parseSemesterIntoYearSemesterNumberArray', () => {
      expect(parseSemesterIntoYearSemesterNumberArray('20241')).toEqual([2024, 1])
      expect(parseSemesterIntoYearSemesterNumberArray('11112')).toEqual([1111, 2])
    })
  })

  describe('getPeriodCodeForDate', () => {
    it.each(['2020-01-01', '2020-02-13', '2020-03-15', '2020-04-20', '2020-05-10', '2020-06-30'])(
      'returns spring for dates within january through june: %s',
      date => {
        expect(getPeriodCodeForDate(new Date(date))).toEqual(`20201`)
      }
    )
    it.each(['1999-07-01', '1999-08-13', '1999-09-15', '1999-10-20', '1999-11-10', '1999-12-31'])(
      'returns autumn for dates within july through december: %s',
      date => {
        expect(getPeriodCodeForDate(new Date(date))).toEqual(`19992`)
      }
    )
  })
})
