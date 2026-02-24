function adminLinkWithSource(courseCode, source) {
  return `/kursinfoadmin/kurser/kurs/${courseCode}?source=${source}`
}

module.exports = {
  adminLinkWithSource,
}
