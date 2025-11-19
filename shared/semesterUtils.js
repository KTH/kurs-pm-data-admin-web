/**
 * This file is reproduced in multiple repos. See confluence for more info:
 * confluence.sys.kth.se/confluence/x/6wYJDQ
 */

/**
 * semester: 20242 (Number) -> Autumn 2024
 */

const SemesterNumber = {
  Spring: 1,
  Autumn: 2,
}

const LadokSemesterPrefix = {
  Spring: 'VT',
  Autumn: 'HT',
}

/**
 * Takes a yearSemesterNumber and returns a yearSemesterNumber representing the semester previous to the given semester
 *
 * @param param0 YearSemesterNumber, e.g. { year: 2024, semesterNumber: 1 }
 * @returns YearSemesterNumber, e.g. { year: 2023, semesterNumber: 2 }
 */
const calcPreviousSemester = ({ year, semesterNumber }) => {
  if (semesterNumber === 2) {
    return {
      year,
      semesterNumber: SemesterNumber.Spring,
    }
  }

  return {
    year: year - 1,
    semesterNumber: SemesterNumber.Autumn,
  }
}

/**
 * Takes a KTH semester in string or number format, returns an array with year at index 0
 * and semester number at index 1.
 * YearSemesterNumberArray is a legacy format, which is used in some parts of our code.
 * The preferred format is YearSemesterNumber.
 *
 * @param semester "20241" or 20241
 * @returns [2024, 1]
 */
const parseSemesterIntoYearSemesterNumberArray = semester => {
  const yearSemesterNumberArrayStrings = semester.toString().match(/.{1,4}/g)

  return yearSemesterNumberArrayStrings.map(str => Number(str))
}

// TODO Refactor this, confusing name as "Period" is ladok-speak, but here we create a KTH semester string
/**
 * Returns a KTH semester string.
 *
 * @param date
 * @returns a KTH semester string "20241"
 */
const getPeriodCodeForDate = date => {
  const JULY = 6
  const year = date.getFullYear()
  const month = date.getMonth()
  const semester = month < JULY ? SemesterNumber.Spring : SemesterNumber.Autumn
  return `${year}${semester}`
}

/**
 * Takes a string in LadokPeriod format and returns a YearSemesterNumberArray
 * Note that YearSemesterNumberArray is a legacy format.
 * YearSemesterNumber or AcademicSemester are preferred.
 * If possible, use {parseSemesterIntoYearSemesterNumber}.
 *
 * @param semester Semester string in ladok format, e.g. "VT2024"
 * @returns YearSemesterNumberArray, e.g. [2024, 1]
 */
const parseLadokSemester = semester => {
  let match = undefined
  if (semester) {
    match = semester.match(/(HT|VT)(\d{4})/)
  }

  if (!match) throw new Error("Invalid semester format. Expected 'HTYYYY' or 'VTYYYY'.")

  const [, term, year] = match
  const semesterNumber = term === 'VT' ? SemesterNumber.Spring : SemesterNumber.Autumn

  return [Number(year), semesterNumber]
}

/**
 * Takes a string in KTH semester format and returns a YearSemesterNumberArray
 * Note that YearSemesterNumberArray is a legacy format.
 * YearSemesterNumber or AcademicSemester are preferred.
 * If possible, use {parseSemesterIntoYearSemesterNumber}.
 *
 * @param semester Semester string in KTH format, e.g. 20241
 * @returns  YearSemesterNumberArray, e.g. [2024, 1]
 */
const parseSemester = semester => {
  let match = undefined
  if (semester) {
    match = semester.match(/^(\d{4})([1|2])$/)
  }

  if (!match) throw new Error("Invalid semester format. Expected 'YYYYS' where S is 1 for VT or 2 for HT.")

  const [, year, parsedSemesterNumber] = match
  const semesterNumber =
    parsedSemesterNumber === SemesterNumber.Spring.toString() ? SemesterNumber.Spring : SemesterNumber.Autumn

  return [Number(year), semesterNumber]
}

/**
 * Takes a semester, either in LadokPeriod string format or KTH Semester string or number format.
 * Returns a YearSemesterNumber.
 *
 * @param semester A semester string|number in either KTH or Ladok format, e.g. "VT2024", "20241", 20241
 * @returns YearSemesterNumber, e.g. { year: 2024, semesterNumber: 1 }
 */
const parseSemesterIntoYearSemesterNumber = semester => {
  const semesterString = semester.toString()
  const semesterRegex = /^([A-Za-z]{2}\d{4})$/
  const ladokFormat = semesterRegex.test(semesterString)
  if (ladokFormat) {
    const [year, semesterNumber] = parseLadokSemester(semesterString)
    return {
      year,
      semesterNumber,
    }
  } else {
    const [year, semesterNumber] = parseSemester(String(semester))
    return {
      year,
      semesterNumber,
    }
  }
}

module.exports = {
  SemesterNumber,
  LadokSemesterPrefix,
  calcPreviousSemester,
  parseSemesterIntoYearSemesterNumberArray,
  getPeriodCodeForDate,
  parseLadokSemester,
  parseSemester,
  parseSemesterIntoYearSemesterNumber,
}
