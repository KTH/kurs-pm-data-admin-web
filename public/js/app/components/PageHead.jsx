import React from 'react'

import i18n from '../../../../i18n'

const { messages } = i18n.messages[1]

const testDataCourseRounds = [
  'Kurstillfällesnamn1 (finns publicerat kurs-PM )',
  'Kurstillfällesnamn2',
  'Kurstillfällesnamn3'
]

const parseSemester = semesterCode => {
  const season = semesterCode.slice(-1) === '1' ? 'VT' : 'HT'
  return season + ' ' + semesterCode.slice(0, -1)
}

const PageHead = ({ semester, courses = testDataCourseRounds }) => (
  <div className="page-header-wrapper">
    <div className="page-header-container">
      <h4>{messages.page_header_heading_semester}</h4>
      <p className="no-wrap">{parseSemester(semester)}</p>
    </div>
    <div className="page-header-container">
      <h4>{messages.page_header_heading_course_round}</h4>
      <p>{courses.map((course, index) => course + (index < courses.length - 1 ? ', ' : ''))}</p>
    </div>
  </div>
)

export default PageHead
