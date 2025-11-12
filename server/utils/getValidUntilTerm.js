import {
  calcPreviousSemester,
  parseSemesterIntoYearSemesterNumber,
  SemesterNumber,
  LadokSemesterPrefix,
} from './semesterUtils'

const getValidUntilTerm = (syllabuses, currentSyllabus) => {
  // Sort syllabuses by semester in ascending order
  if (!Array.isArray(syllabuses) || syllabuses.length === 0 || !currentSyllabus) {
    return undefined
  }
  const sorted = syllabuses.sort((a, b) => {
    const parse = s => {
      const term = s.slice(0, 2)
      const year = parseInt(s.slice(2))
      const termOrder = term === 'VT' ? 0 : 1
      return { year, termOrder }
    }

    const A = parse(a.kursplan?.giltigfrom)
    const B = parse(b.kursplan?.giltigfrom)

    // First sort by year, then by termOrder
    if (A.year !== B.year) return A.year - B.year
    return A.termOrder - B.termOrder
  })
  if (sorted.length === 0) return undefined
  // Prevent duplicates
  const seen = new Set()
  const syllabusesNoGiltigFromDups = sorted.filter(item => {
    const key = item.kursplan.giltigfrom
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const index = syllabusesNoGiltigFromDups.indexOf(
    syllabusesNoGiltigFromDups.find(syllabus => syllabus.kursplan.giltigfrom === currentSyllabus.kursplan.giltigfrom)
  )
  // validUntilTerm will be the term/semester before the next syllabus validFromTerm semester
  if (index !== -1 && index < syllabusesNoGiltigFromDups.length - 1) {
    const nextSyllabusValidFrom = syllabusesNoGiltigFromDups[index + 1].kursplan.giltigfrom
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
