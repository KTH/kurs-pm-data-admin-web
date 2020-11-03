function linkToSchool(name) {
  return name ? `https://www.kth.se/${name.toLowerCase().split('/')[0]}` : 'https://www.kth.se/'
}

function linkToArchive(courseCode, language) {
  const languageParameter = language === 'en' ? '?l=en' : ''
  return `/kursutveckling/${courseCode}/arkiv${languageParameter}`
}

function linkToPublishedMemoPdf(memoEndPoint, documentName) {
  return `/kurs-pm/memo/pdf/${memoEndPoint}?documentName=${documentName}&status=published`
}

function linkToSyllabus(courseCode, validFromTerm, language) {
  return `/kurs-pm/syllabus/pdf/${courseCode}/${validFromTerm}/${language}?documentName=${courseCode}-${validFromTerm}`
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

function adminLink(courseCode, language) {
  return `/kursinfoadmin/kurser/kurs/${courseCode}?l=${language}`
}

module.exports = {
  linkToSchool,
  linkToArchive,
  linkToPublishedMemoPdf,
  linkToSyllabus,
  courseLinks,
  aboutCourseLink,
  adminLink
}
