/* eslint-disable react/no-danger */
import React from 'react'
import { FaRegFilePdf, FaExternalLinkAlt } from 'react-icons/fa'

import { seasonStr } from '../../util/helpers'
import { linkToArchive, linkToMemoPdf, linkToSyllabus } from '../../util/links'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

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
    <div>
      <h4>{labels.versionTitle}</h4>
      <p>{`${labels.latest} ${formatVersion(language, memoVersion)}`}</p>
    </div>
  ) : (
    <div>
      <h4>{labels.versionTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
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
    &nbsp;
    <FaExternalLinkAlt />
    <UncontrolledPopover trigger="hover legacy" placement="bottom" target="archive-link">
      <PopoverHeader>{labels.courseMemoArchiveLabel}</PopoverHeader>
      <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
    </UncontrolledPopover>
  </p>
)

const pdfLink = (labels, courseCode, memoEndPoint) => (
  <div>
    <h4>{labels.courseMemoPdf}</h4>
    <p>
      <a
        id="pdf-link"
        title={memoEndPoint}
        href={linkToMemoPdf(courseCode, memoEndPoint)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {memoEndPoint}
      </a>
      &nbsp;
      <FaRegFilePdf />
      <UncontrolledPopover trigger="hover legacy" placement="bottom" target="pdf-link">
        <PopoverHeader>{labels.courseMemoPdf}</PopoverHeader>
        <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
      </UncontrolledPopover>
    </p>
  </div>
)

const syllabusLink = (language, labels, extraInfo, courseCode, validFromTerm) => {
  const syllabusLinkLabel = `${labels.syllabusLinkStart}${seasonStr(extraInfo, validFromTerm)}${
    labels.syllabusLinkEnd
  }`
  return (
    <div>
      <h4>{labels.syllabus}</h4>
      <p>
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
        </a>
        &nbsp;
        <FaRegFilePdf />
        <UncontrolledPopover trigger="hover legacy" placement="bottom" target="syllabus-link">
          <PopoverHeader>{labels.syllabus}</PopoverHeader>
          <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
        </UncontrolledPopover>
      </p>
    </div>
  )
}

const CourseMemoLinks = ({
  language = 'sv',
  labels = {},
  extraInfo = {},
  memoData = {},
  validFromTerm = ''
}) => (
  <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
    {version(language, labels, memoData.lastChangeDate)}
    {archiveLink(language, labels, memoData.courseCode)}
    {pdfLink(labels, memoData.courseCode, memoData.memoEndPoint)}
    {syllabusLink(language, labels, extraInfo, memoData.courseCode, validFromTerm)}
  </div>
)

export default CourseMemoLinks
