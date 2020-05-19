/* eslint-disable react/no-danger */
import React from 'react'

import { linkToSchool } from '../../util/links'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Popup from './Popup'

const formatRounds = rounds => {
  // Split rounds with look behind, so only comma after end parentheses matches
  const splitRounds = rounds.split(/(?<=\)), /g)
  return (
    <>
      {splitRounds.map(round => (
        <span key={round}>
          {round}
          <br />
        </span>
      ))}
    </>
  )
}

const offeredBy = (language, labels, department) =>
  department.name ? (
    <>
      <h4>{labels.offeredByTitle}</h4>
      <p>
        <a
          id="link-department-name"
          title={department.name}
          href={linkToSchool(department.name)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {department.name}
        </a>
        <FaExternalLinkAlt className="external-link-icon" />
        <Popup
          header={department.name}
          body={labels.linkOpensInNewTab}
          targetId="link-department-name"
        />
      </p>
    </>
  ) : (
    <>
      <h4>{labels.offeredByTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const languageOfInstruction = (labels, memoLanguageOfInstructions) =>
  memoLanguageOfInstructions ? (
    <>
      <h4>{labels.languageOfInstructionTitle}</h4>
      <p>{memoLanguageOfInstructions}</p>
    </>
  ) : (
    <>
      <h4>{labels.languageOfInstructionTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const rounds = (labels, memoName) =>
  memoName ? (
    <>
      <h4>{labels.roundsTitle}</h4>
      <p>{formatRounds(memoName)}</p>
    </>
  ) : (
    <>
      <h4>{labels.roundsTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const CourseFacts = ({ language, labels, department = {}, memoData = {} }) => (
  <div className="preview-info-box text-break">
    {offeredBy(language, labels, department)}
    {languageOfInstruction(labels, memoData.languageOfInstructions)}
    {rounds(labels, memoData.memoName)}
  </div>
)

export default CourseFacts
