/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { linkToSchool } from '../../util/links'
import Popup from './Popup'

const formatRounds = rounds => {
  // Split rounds with comma after end parentheses and then add '),' in display
  const splitRounds = rounds.split('), ')
  const lastIndex = splitRounds.length - 1

  return (
    <>
      {splitRounds.map((round, thisIndex) => (
        <span key={round}>
          {`${round}${thisIndex === lastIndex ? '' : ')'}`}
          <br />
        </span>
      ))}
    </>
  )
}

const offeredBy = (labels, departmentName) =>
  departmentName ? (
    <>
      <h4>{labels.offeredByTitle}</h4>
      <p>
        <a
          id="link-department-name"
          title={departmentName}
          href={linkToSchool(departmentName)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {departmentName}
        </a>
        <Popup header={departmentName} body={labels.linkOpensInNewTab} targetId="link-department-name" />
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

const CourseFacts = ({ labels, departmentName = '', memoData = {} }) => (
  <div className="preview-info-box text-break">
    {offeredBy(labels, departmentName)}
    {languageOfInstruction(labels, memoData.languageOfInstructions)}
    {rounds(labels, memoData.memoName)}
  </div>
)

CourseFacts.propTypes = {
  departmentName: PropTypes.string,
  memoData: PropTypes.shape({
    memoName: PropTypes.string,
    languageOfInstructions: PropTypes.oneOf(['Swedish', 'Svenska', 'English', 'Engelska']),
  }),
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
}

CourseFacts.defaultProps = { departmentName: '', memoData: {} }

export default CourseFacts
