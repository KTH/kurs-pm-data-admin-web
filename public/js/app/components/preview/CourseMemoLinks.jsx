import React from 'react'
import PropTypes from 'prop-types'

import { getDateFormat } from '../../util/helpers'
import Popup from './Popup'

const formatVersionDateAndTime = (language = 'sv', lastChangedDateTime) => {
  const unixTime = Date.parse(lastChangedDateTime)
  if (unixTime) {
    const date = new Date(unixTime)
    const time = date.toLocaleTimeString()
    return `${getDateFormat(date, language)}  ${time}`
  }
  return null
}

const version = (language, labels, lastChangedDateTime, memoData) =>
  lastChangedDateTime ? (
    <>
      <h3>{labels.versionTitle}</h3>
      <p>{`Ver ${memoData.version} -  ${formatVersionDateAndTime(language, lastChangedDateTime)}`}</p>
    </>
  ) : (
    <>
      <h3>{labels.versionTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const pdfLink = labels => (
  <span id="print-link-with-popup">
    <h3>{labels.courseMemoPrint}</h3>
    <button className="print-link" id="print-pm-link">
      {labels.linkCourseMemoPrint}
    </button>
    <Popup header={labels.courseMemoPrint} body={labels.courseMemoModal} targetId="print-pm-link" />
  </span>
)

const CourseMemoLinks = ({ language, labels, memoData = {} }) => (
  <div className="info-box">
    {version(language, labels, memoData.lastChangeDate, memoData)}
    {pdfLink(labels)}
  </div>
)

CourseMemoLinks.propTypes = {
  memoData: PropTypes.shape({
    lastChangeDate: PropTypes.string,
    version: PropTypes.string,
  }).isRequired,
  labels: PropTypes.shape({
    versionTitle: PropTypes.string.isRequired,
    linkOpensInNewTab: PropTypes.string.isRequired,
    courseMemoArchiveLabel: PropTypes.string.isRequired,
    linkCourseMemoPrint: PropTypes.string.isRequired,
    syllabusLinkStart: PropTypes.string.isRequired,
    latest: PropTypes.string.isRequired,
    courseMemoModal: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.oneOf(['sv', 'en']).isRequired,
}

export default CourseMemoLinks
