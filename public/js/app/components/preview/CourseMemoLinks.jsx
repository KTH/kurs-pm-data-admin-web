/* eslint-disable react/no-danger */
import React from 'react'
import { FaAsterisk, FaPrint } from 'react-icons/fa'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

import { seasonStr } from '../../util/helpers'
import { linkToArchive, linkToSyllabus } from '../../util/links'
import Popup from './Popup'

const formatVersion = (language = 'sv', version) => {
  const unixTime = Date.parse(version)
  if (unixTime) {
    const locale = language === 'sv' ? 'sv-SE' : 'en-US'
    return new Date(unixTime).toLocaleString(locale)
  }
  return null
}

const version = (language, labels, memoVersion) =>
  memoVersion ? (
    <>
      <h4>{labels.versionTitle}</h4>
      <p>{`${labels.latest} ${formatVersion(language, memoVersion)}`}</p>
    </>
  ) : (
    <>
      <h4>{labels.versionTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const archiveLink = (language, labels, courseCode) => (
  <p>
    <a
      id="archive-link"
      title={labels.courseMemoArchiveLabel}
      href={linkToArchive(courseCode, language)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {labels.courseMemoArchiveLabel}
    </a>
    <Popup header={labels.courseMemoArchiveLabel} body={labels.linkOpensInNewTab} targetId="archive-link" />
  </p>
)

const pdfLink = labels => (
  <span id="print-link-with-popup">
    <h4>{labels.courseMemoPrint}</h4>
    <Button id="print-pm-link" color="link">
      {labels.linkCourseMemoPrint}
    </Button>
    {/* <ActionModalButton
      type="actionLink"
      modalId="print-link"
      btnLabel={labels.courseMemoPrint}
      modalLabels={{
        header: labels.courseMemoPrint,
        body: labels.courseMemoModal,
        btnClose: labels.btnCloseModal
      }}
    /> */}
    <FaPrint className="pdf-icon" />
    <Popup header={labels.courseMemoPrint} body={labels.courseMemoModal} targetId="print-pm-link" />
  </span>
)

const syllabusLink = (language, labels, courseCode, syllabusValid) => {
  const { validFromTerm, validUntilTerm } = syllabusValid
  const syllabusLinkLabel = `${labels.syllabusLinkStart} ${courseCode} (${seasonStr(
    language,
    validFromTerm || ''
  )}-${seasonStr(language, validUntilTerm || '')})`
  return (
    <>
      <h4>{labels.syllabus}</h4>
      <p>
        <FaAsterisk className="syllabus-marker-icon" />
        {labels.syllabusInformation}
        <br />
        <a
          className="pdf-post-link"
          id="syllabus-link"
          title={'PDF ' + syllabusLinkLabel}
          href={linkToSyllabus(courseCode, validFromTerm, language)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {syllabusLinkLabel}
        </a>
        <Popup header={labels.syllabus} body={labels.linkOpensInNewTab} targetId="syllabus-link" />
      </p>
    </>
  )
}

const CourseMemoLinks = ({ language, labels, memoData = {}, syllabusValid = {} }) => (
  <div className="preview-info-box">
    {version(language, labels, memoData.lastChangeDate)}
    {archiveLink(language, labels, memoData.courseCode)}
    {pdfLink(labels)}
    {syllabusLink(language, labels, memoData.courseCode, syllabusValid)}
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
