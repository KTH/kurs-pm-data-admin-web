/* eslint-disable react/no-danger */
import React from 'react'
import { FaRegFilePdf, FaAsterisk } from 'react-icons/fa'

import { seasonStr } from '../../util/helpers'
import { linkToArchive, /* linkToMemoPdf, */ linkToSyllabus } from '../../util/links'

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

const pdfLink = (labels /* courseCode, memoEndPoint */) => (
  <>
    <h4>{labels.courseMemoPdf}</h4>
    <p>
      <i>{labels.inDevelopment}</i>
      {/* <a
        id="pdf-link"
        title={memoEndPoint}
        href={linkToMemoPdf(courseCode, memoEndPoint)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {memoEndPoint}
        <FaRegFilePdf className="pdf-icon" />
      </a>
      <Popup header={labels.courseMemoPdf} body={labels.linkOpensInNewTab} targetId="pdf-link" /> */}
    </p>
  </>
)

const syllabusLink = (language, labels, extraInfo, courseCode, validFromTerm) => {
  const syllabusLinkLabel = `${labels.syllabusLinkStart}${seasonStr(extraInfo, validFromTerm)}${
    labels.syllabusLinkEnd
  }`
  return (
    <>
      <h4>{labels.syllabus}</h4>
      <p>
        <FaAsterisk className="syllabus-marker-icon" />
        {labels.syllabusInformation}
        <br />
        <a
          id="syllabus-link"
          title={syllabusLinkLabel}
          href={linkToSyllabus(courseCode, validFromTerm, language)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {syllabusLinkLabel}
          <FaRegFilePdf className="pdf-icon" />
        </a>
        <Popup header={labels.syllabus} body={labels.linkOpensInNewTab} targetId="syllabus-link" />
      </p>
    </>
  )
}

const CourseMemoLinks = ({ language, labels, extraInfo, memoData = {}, validFromTerm = '' }) => (
  <div className="preview-info-box">
    {version(language, labels, memoData.lastChangeDate)}
    {archiveLink(language, labels, memoData.courseCode)}
    {pdfLink(labels, memoData.courseCode, memoData.memoEndPoint)}
    {syllabusLink(language, labels, extraInfo, memoData.courseCode, validFromTerm)}
  </div>
)

export default CourseMemoLinks
