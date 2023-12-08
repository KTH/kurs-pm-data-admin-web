/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import { adminLink } from '../../util/links'
import Popup from './Popup'

const CourseHeader = ({ courseMemo = '', courseCode = '', courseTitle = '', labels = {}, language = 'sv' }) => {
  const { adminLinkLabel, linkOpensInNewTab, label_edit_link_info } = labels
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
          <a
            id="admin-link"
            className="course-header-admin-link"
            title={label_edit_link_info}
            /* href={adminLink(courseCode, language)}
            target="_blank" */
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
