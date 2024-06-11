import React from 'react'
import PropTypes from 'prop-types'

import Popup from './Popup'

const formatVersion = (language = 'sv', version) => {
  const unixTime = Date.parse(version)
  if (unixTime) {
    if (language === 'sv') {
      return new Date(unixTime).toLocaleString('sv-SE')
    } else {
      const options = { day: 'numeric', month: 'short', year: 'numeric' }
      return new Date(unixTime).toLocaleDateString('en-GB', options)
    }
  }
  return null
}

const version = (language, labels, memoVersion) =>
  memoVersion ? (
    <>
      <h3>{labels.versionTitle}</h3>
      <p>{`${labels.latest} ${formatVersion(language, memoVersion)}`}</p>
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
    {version(language, labels, memoData.lastChangeDate)}
    {pdfLink(labels)}
  </div>
)

CourseMemoLinks.propTypes = {
  memoData: PropTypes.shape({
    lastChangeDate: PropTypes.string,
    courseCode: PropTypes.string.isRequired,
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
  syllabusValid: PropTypes.shape({
    validFromTerm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    validUntilTerm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
}

CourseMemoLinks.defaultProps = {
  syllabusValid: {
    validFromTerm: '',
    validUntilTerm: '',
  },
}

export default CourseMemoLinks
