function linkToSchool(name) {
  return name ? `https://www.kth.se/${name.toLowerCase().split('/')[0]}` : 'https://www.kth.se/'
}

function linkToArchive(courseCode, language) {
  const languageParameter = language === 'en' ? '?l=en' : ''
  return `/kursutveckling/${courseCode}${languageParameter}`
}

function linkToMemoPdf(courseCode, memoEndPoint) {
  return `/kurs-pm/${courseCode}/${memoEndPoint}/pdf`
}

function linkToSyllabus(courseCode, validFromTerm, language) {
  const languageParameter = language === 'en' ? '?lang=en' : ''
  return `https://www.kth.se/student/kurser/kurs/kursplan/${courseCode}-${validFromTerm}.pdf${languageParameter}`
}

function courseLinks(language) {
  const languagePath = language === 'en' ? 'en/' : ''
  return {
    beforeAndDuringACourse: `https://www.kth.se/${languagePath}student/kurs/infor-och-under-en-kurs`,
    contactPersonsAndStudentCounselling: `https://www.kth.se/${languagePath}student/studievagledning-kontakt`,
    rightsAndResponsibilities: `https://www.kth.se/${languagePath}student/studentliv/studentratt`
  }
}

function aboutCourseLink(courseCode, language) {
  const languageParameter = language === 'en' ? '?l=en' : ''
  return `https://www.kth.se/student/kurser/kurs/${courseCode}${languageParameter}`
}

module.exports = {
  linkToSchool,
  linkToArchive,
  linkToMemoPdf,
  linkToSyllabus,
  courseLinks,
  aboutCourseLink
}
