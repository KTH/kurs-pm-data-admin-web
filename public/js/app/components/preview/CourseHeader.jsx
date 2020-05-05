/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'

import Popup from './Popup'

import { adminLink } from '../../util/links'
import { Row, Col } from 'reactstrap'

const formatCredits = (credits, creditUnitAbbr, language) => {
  const localeCredits =
    language === 'sv' ? credits.toLocaleString('sv-SE') : credits.toLocaleString('en-US')
  const creditUnit = language === 'sv' ? creditUnitAbbr : 'credits'
  return `${localeCredits} ${creditUnit}`
}

const CourseHeader = ({
  courseMemo = '',
  courseCode = '',
  title = '',
  credits = '',
  creditUnitAbbr = '',
  labels = {},
  language = 'sv'
}) => {
  const { courseHeaderTitle, adminLinkLabel, linkOpensInNewTab } = labels
  return (
    <>
      <Row className="w-100" style={{ marginLeft: '0', marginRight: '0' }}>
        <Col style={{ paddingLeft: '0' }}>
          <h1 className="course-header-title">{`${courseHeaderTitle} ${courseMemo}`}</h1>
        </Col>
      </Row>
      <Row className="w-100" style={{ marginLeft: '0', marginRight: '0' }}>
        <Col className="text-left pb-4" style={{ paddingLeft: '0' }}>
          <b>
            {courseCode} {title} {formatCredits(credits, creditUnitAbbr, language)}
          </b>
        </Col>
        <Col className="text-right pb-4" style={{ paddingRight: '0' }}>
          <a
            id="admin-link"
            title={adminLinkLabel}
            href={adminLink(courseCode, language)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {adminLinkLabel}
          </a>
          <Popup header={adminLinkLabel} body={linkOpensInNewTab} targetId="admin-link" />
        </Col>
      </Row>
    </>
  )
}

export default CourseHeader
