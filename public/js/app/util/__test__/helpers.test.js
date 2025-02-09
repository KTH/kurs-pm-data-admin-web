const { combinedCourseName } = require('../helpers')
const { seasonStr, convertLangToIndex } = require('../../utils-shared/helpers')

const coursesTypeOne = {
  course_SV: {
    courseCode: 'ML1616',
    gradeScaleCode: 'AF',
    title: { sv: 'Industriell projektledning och projektstyrning' },
    credits: 7.5,
    creditUnitLabel: 'Högskolepoäng',
    creditUnitAbbr: 'hp',
  },
  course_EN: {
    courseCode: 'DD1321',
    gradeScaleCode: 'AF',
    title: { en: 'Applied Programming and Computer Science' },
    credits: 7.5,
    creditUnitLabel: 'Credits',
    creditUnitAbbr: 'hp',
  },
}
const courseTypeTwo = {
  course: {
    title: {
      sv: 'Tillämpad programmering och datalogi',
      en: 'Applied Programming and Computer Science',
    },
    credits: 9,
    creditUnitLabel: {
      sv: 'Högskolepoäng',
      en: 'Credits',
    },
    creditUnitAbbr: {
      sv: 'hp',
      en: 'hp',
    },
  },
}
describe('combine course name', () => {
  test('combine course name for an object from a detailed information endpoint in Swedish', () => {
    const courseTitle = combinedCourseName('ML1616', coursesTypeOne.course_SV, 'sv')
    expect(courseTitle).toBe('ML1616 Industriell projektledning och projektstyrning 7,5 hp')
  })

  test('combine course name for an object from a detailed information endpoint in English', () => {
    const courseTitle = combinedCourseName('ML1616', coursesTypeOne.course_EN, 'en')
    expect(courseTitle).toBe('ML1616 Applied Programming and Computer Science 7.5 credits')
  })

  test('combine course name for an object from a course rounds information endpoint in Swedish', () => {
    const courseTitle = combinedCourseName('ALLLLL', courseTypeTwo.course, 'sv')
    expect(courseTitle).toBe('ALLLLL Tillämpad programmering och datalogi 9.0 hp')
  })

  test('combine course name for an object from a course rounds endpoint in English', () => {
    const courseTitle = combinedCourseName('ALLLLL', courseTypeTwo.course, 'en')
    expect(courseTitle).toBe('ALLLLL Applied Programming and Computer Science 9.0 credits')
  })
})

describe('parse termin/semester into a season string', () => {
  test('host termin 2022 in English', () => {
    const season_str_1 = seasonStr('en', 20222)
    expect(season_str_1).toBe('Autumn 2022')

    const enInNumber = convertLangToIndex('en')
    expect(enInNumber).toBe(0)

    const season_str_2 = seasonStr(enInNumber, 20222)
    expect(season_str_2).toBe('Autumn 2022')
  })

  test('host termin 2022 in Swedish', () => {
    const season_str_1 = seasonStr('sv', 20222)
    expect(season_str_1).toBe('HT 2022')

    const svInNumber = convertLangToIndex('sv')
    expect(svInNumber).toBe(1)

    const season_str_2 = seasonStr(svInNumber, 20222)
    expect(season_str_2).toBe('HT 2022')
  })
  test('spring termin 2022 in English', () => {
    const season = seasonStr('en', 20221)
    expect(season).toBe('Spring 2022')
  })
  test('spring termin 2022 in Swedish', () => {
    const season = seasonStr('sv', 20221)
    expect(season).toBe('VT 2022')
  })
})
