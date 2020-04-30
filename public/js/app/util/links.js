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

module.exports = {
  linkToSchool,
  linkToArchive,
  linkToMemoPdf,
  linkToSyllabus
}
