const {
  calcPreviousSemester,
  parseSemesterIntoYearSemesterNumber,
  SemesterNumber,
  LadokSemesterPrefix,
} = require('../../shared/semesterUtils')

const getValidUntilTerm = (syllabuses, currentSyllabus) => {
  // Sort syllabuses by semester in ascending order
  if (!Array.isArray(syllabuses) || syllabuses.length === 0 || !currentSyllabus) {
    return undefined
  }
  const sorted = syllabuses.sort((a, b) => {
    const { yearA, semesterNumberA } = parseSemesterIntoYearSemesterNumber(a.kursplan?.giltigfrom)
    const { yearB, semesterNumberB } = parseSemesterIntoYearSemesterNumber(b.kursplan?.giltigfrom)

    // First sort by year, then by termOrder
    if (yearA !== yearB) return yearA - yearB
    return semesterNumberA - semesterNumberB
  })
  // Prevent duplicates
  const seen = new Set()
  const syllabusesUniqueGiltigFrom = sorted.filter(item => {
    const key = item.kursplan.giltigfrom
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const index = syllabusesUniqueGiltigFrom.indexOf(
    syllabusesUniqueGiltigFrom.find(syllabus => syllabus.kursplan.giltigfrom === currentSyllabus.kursplan.giltigfrom)
  )
  // validUntilTerm will be the term/semester before the next syllabus validFromTerm semester
  if (index !== -1 && index < syllabusesUniqueGiltigFrom.length - 1) {
    const nextSyllabusValidFrom = syllabusesUniqueGiltigFrom[index + 1].kursplan.giltigfrom
    const semester = parseSemesterIntoYearSemesterNumber(nextSyllabusValidFrom)
    return semester.semesterNumber === SemesterNumber.Autumn
      ? LadokSemesterPrefix.Spring + semester.year
      : LadokSemesterPrefix.Autumn + calcPreviousSemester(semester).year
  } else {
    return undefined
  }
}

module.exports = {
  getValidUntilTerm,
}
