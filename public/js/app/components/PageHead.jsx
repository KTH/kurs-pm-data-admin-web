import React from 'react'
import { seasonStr } from '../util/helpers'
import i18n from '../../../../i18n'

const { messages, extraInfo } = i18n.messages[Number(i18n.isSwedish())]

// const testDataCourseRounds = [
//   'Kurstillfällesnamn1 (finns publicerat kurs-PM )',
//   'Kurstillfällesnamn2',
//   'Kurstillfällesnamn3'
// ]

const PageHead = ({ semester, memoName }) => (
  <div className="page-header-wrapper">
    <div className="page-header-container">
      <h4>{messages.page_header_heading_semester}</h4>
      <p className="no-wrap">{seasonStr(extraInfo, semester)}</p>
    </div>
    <div className="page-header-container">
      <h4>{messages.page_header_heading_course_round}</h4>
      <p>{memoName}</p>
    </div>
  </div>
)

export default PageHead
