/* eslint-disable react/no-danger */
import React from 'react'
import { FaAsterisk } from 'react-icons/fa'
import { seasonStr } from '../../util/helpers'
import { linkToArchive, linkToSyllabus } from '../../util/links'
import pdfLink from './PrintPdfLink'
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
    <Popup
      header={labels.courseMemoArchiveLabel}
      body={labels.linkOpensInNewTab}
      targetId="archive-link"
    />
  </p>
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

export default CourseMemoLinks
