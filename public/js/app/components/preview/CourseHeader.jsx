/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'
import { Row, Col, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

import { adminLink } from '../../util/links'

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
  const { courseHeaderTitle, adminLinkLabel } = labels
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
          <UncontrolledPopover trigger="hover legacy" placement="bottom" target="admin-link">
            <PopoverHeader>{adminLinkLabel}</PopoverHeader>
            <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
          </UncontrolledPopover>
        </Col>
      </Row>
    </>
  )
}

export default CourseHeader
