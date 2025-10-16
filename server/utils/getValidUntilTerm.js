const SemesterPrefix = {
  AUTUMN: 'HT',
  SPRING: 'VT',
}

const getSemesterPrefix = semester => semester.slice(0, 2)
const getSemesterYear = semester => semester.slice(2, 6)

const getValidUntilTerm = (syllabuses, currentSyllabus) => {
  // Sort syllabuses by semester in ascending order
  const sorted = syllabuses.sort((a, b) => {
    const parse = s => {
      const term = s.slice(0, 2)
      const year = parseInt(s.slice(2))
      const termOrder = term === 'VT' ? 0 : 1
      return { year, termOrder }
    }

    const A = parse(a.kursplan.giltigfrom)
    const B = parse(b.kursplan.giltigfrom)

    // First sort by year, then by termOrder
    if (A.year !== B.year) return A.year - B.year
    return A.termOrder - B.termOrder
  })
  // Prevent duplicates
  const seen = new Set()
  const syllabusesNoValidFromTermDups = sorted.filter(item => {
    const key = item.kursplan.giltigfrom
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const index = syllabusesNoValidFromTermDups.indexOf(
    syllabusesNoValidFromTermDups.find(syllabus => syllabus.kursplan.giltigfrom === currentSyllabus.kursplan.giltigfrom)
  )
  // validUntilTerm will be the term/semester before the next syllabus validFromTerm semester
  if (index !== -1 && index < syllabusesNoValidFromTermDups.length - 1) {
    const yearOffset = 1
    const nextSyllabusValidFrom = syllabusesNoValidFromTermDups[index + 1].kursplan.giltigfrom
    return getSemesterPrefix(nextSyllabusValidFrom) === SemesterPrefix.AUTUMN
      ? SemesterPrefix.SPRING + getSemesterYear(nextSyllabusValidFrom)
      : SemesterPrefix.AUTUMN + (getSemesterYear(nextSyllabusValidFrom) - yearOffset)
  } else {
    return undefined
  }
}

module.exports = {
  getValidUntilTerm,
}
