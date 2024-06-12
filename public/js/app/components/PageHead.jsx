import React from 'react'
import PropTypes from 'prop-types'

import { seasonStr } from '../utils-shared/helpers'

import i18n from '../../../../i18n'

const PageHead = ({ semester, memoName, userLangIndex }) => {
  const { messages } = i18n.messages[userLangIndex]
  return (
    <div className="page-header-wrapper">
      <div className="page-header-container">
        <h4>{messages.page_header_heading_semester}</h4>
        <p className="no-wrap">{seasonStr(userLangIndex, semester)}</p>
      </div>
      <div className="page-header-container">
        <h4>{messages.page_header_heading_course_round}</h4>
        <p>{memoName}</p>
      </div>
    </div>
  )
}

PageHead.propTypes = {
  semester: PropTypes.string.isRequired,
  memoName: PropTypes.string.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

export default PageHead
