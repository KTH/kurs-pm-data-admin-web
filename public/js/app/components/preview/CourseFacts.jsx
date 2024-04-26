import React from 'react'
import PropTypes from 'prop-types'

import { linkToSchool } from '../../util/links'
import { seasonStr, getDateFormat } from '../../util/helpers'
import Popup from './Popup'

const formatRoundsShort = memoData => {
  // Split rounds with comma after end parentheses and then add '),' in display
  const { languageOfInstructions, semester, applicationCodes } = memoData
  let langIndex = 1
  if (
    languageOfInstructions === 0 ||
    languageOfInstructions === 'Engelska' ||
    languageOfInstructions === 'English' ||
    languageOfInstructions === 'en'
  ) {
    langIndex = 0
  }
  const { memoName } = memoData
  const splitRounds = memoName.split('),')
  const pattern = /[a-zA-Z]\w*\s\d{4}[-]\d{1,5}/

  return (
    <>
      {splitRounds.map((round, thisIndex) => {
        const shortName = round.split('(')[0].trim().replaceAll('m.fl.', '')

        if (pattern.test(shortName)) {
          return (
            <ul key={round}>
              <li>{`${seasonStr(langIndex, semester)}-${applicationCodes[thisIndex]}`}</li>
            </ul>
          )
        }
        return (
          <ul key={round}>
            <li>{`${shortName} ${seasonStr(langIndex, semester)}-${applicationCodes[thisIndex]}`}</li>
          </ul>
        )
      })}
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

const rounds = (labels, memoData) =>
  memoData.memoName ? (
    <>
      <h4>{labels.roundsTitle}</h4>
      <p>{formatRoundsShort(memoData)}</p>
    </>
  ) : (
    <>
      <h4>{labels.roundsTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const startDate = (labels, memoData) =>
  memoData.roundsStartDate ? (
    <>
      <h4>{labels.startdate}</h4>
      <p>{getDateFormat(memoData.roundsStartDate[0])}</p>
    </>
  ) : (
    <>
      <h4>{labels.startdate}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const CourseFacts = ({ labels, departmentName = '', memoData = {} }) => (
  <div className="preview-info-box text-break">
    {startDate(labels, memoData)}
    {rounds(labels, memoData)}
    {languageOfInstruction(labels, memoData.languageOfInstructions)}
    {offeredBy(labels, departmentName)}
  </div>
)

CourseFacts.propTypes = {
  departmentName: PropTypes.string,
  memoData: PropTypes.shape({
    memoName: PropTypes.string,
    languageOfInstructions: PropTypes.oneOf(['', 'Swedish', 'Svenska', 'English', 'Engelska']),
  }),
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
}

CourseFacts.defaultProps = { departmentName: '', memoData: {} }

export default CourseFacts
