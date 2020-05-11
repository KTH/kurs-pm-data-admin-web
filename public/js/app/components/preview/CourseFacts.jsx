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
    <div>
      <h4 style={{ marginTop: '0' }}>{labels.offeredByTitle}</h4>
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
        &nbsp;
        <FaExternalLinkAlt />
        <Popup
          header={department.name}
          body={labels.linkOpensInNewTab}
          targetId="link-department-name"
        />
      </p>
    </div>
  ) : (
    <div>
      <h4 style={{ marginTop: '0' }}>{labels.offeredByTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const languageOfInstruction = (labels, memoLanguageOfInstructions) =>
  memoLanguageOfInstructions ? (
    <div>
      <h4>{labels.languageOfInstructionTitle}</h4>
      <p style={{ marginBottom: '0' }}>{memoLanguageOfInstructions}</p>
    </div>
  ) : (
    <div>
      <h4>{labels.languageOfInstructionTitle}</h4>
      <p style={{ marginBottom: '0' }}>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const rounds = (labels, memoName) =>
  memoName ? (
    <div>
      <h4>{labels.roundsTitle}</h4>
      <p style={{ marginBottom: '0' }}>{formatRounds(memoName)}</p>
    </div>
  ) : (
    <div>
      <h4>{labels.roundsTitle}</h4>
      <p style={{ marginBottom: '0' }}>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const CourseFacts = ({ language = 'sv', labels = {}, department = {}, memoData = {} }) => (
  <div
    className="text-break"
    style={{ backgroundColor: '#f4f4f4', padding: '20px 10px 20px 20px' }}
  >
    {offeredBy(language, labels, department)}
    {languageOfInstruction(labels, memoData.languageOfInstructions)}
    {rounds(labels, memoData.memoName)}
  </div>
)

export default CourseFacts
