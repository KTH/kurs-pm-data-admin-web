import React from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import Popup from './Popup'

const CourseHeader = ({ courseMemo = '', courseTitle = '', labels = {} }) => {
  const { adminLinkLabel, label_edit_link_info } = labels
  return (
    <>
      <Row>
        <Col>
          <h1 className="preview-course-header-title">{courseMemo}</h1>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col className="text-start" xs="12" lg="6">
          <h4 className="secondTitle">{courseTitle}</h4>
        </Col>
        <Col className="text-lg-right" xs="12" lg="6">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            id="admin-link"
            className="course-header-admin-link"
            title={label_edit_link_info}
            rel="noopener noreferrer"
          >
            {adminLinkLabel}
          </a>
          <Popup header={adminLinkLabel} body={label_edit_link_info} targetId="admin-link" />
        </Col>
      </Row>
    </>
  )
}

CourseHeader.propTypes = {
  courseMemo: PropTypes.string,
  courseCode: PropTypes.string,
  courseTitle: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.string),
  language: PropTypes.oneOf(['sv', 'en']),
}

CourseHeader.defaultProps = {
  courseMemo: '',
  courseCode: '',
  courseTitle: '',
  labels: {},
  language: 'sv',
}

export default CourseHeader
