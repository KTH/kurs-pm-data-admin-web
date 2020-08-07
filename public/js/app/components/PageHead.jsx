import React from 'react'
import { seasonStr } from '../util/helpers'
import i18n from '../../../../i18n'
import PropTypes from 'prop-types'

const langIndex = Number(i18n.isSwedish())
const { messages } = i18n.messages[langIndex]

// const testDataCourseRounds = [
//   'Kurstillfällesnamn1 (finns publicerat kurs-PM )',
//   'Kurstillfällesnamn2',
//   'Kurstillfällesnamn3'
// ]

const PageHead = ({ semester, memoName }) => (
  <div className="page-header-wrapper">
    <div className="page-header-container section-50">
      <h4>{messages.page_header_heading_semester}</h4>
      <p className="no-wrap">{seasonStr(langIndex, semester)}</p>
    </div>
    <div className="page-header-container section-50">
      <h4>{messages.page_header_heading_course_round}</h4>
      <p>{memoName}</p>
    </div>
  </div>
)

PageHead.propTypes = {
  semester: PropTypes.string.isRequired,
  memoName: PropTypes.string.isRequired
}

export default PageHead
