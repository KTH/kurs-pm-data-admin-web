/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { linkToSchool } from '../../util/links'
import { seasonStr } from '../../util/helpers'
import i18n from '../../../../../i18n'
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

const formatRoundsShort = memoData => {
  // Split rounds with comma after end parentheses and then add '),' in display
  const langIndex = memoData.languageOfInstructions === 'en' ? 0 : 1
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
              <li>{`${seasonStr(i18n.messages[langIndex].extraInfo, memoData.semester)}-${
                memoData.applicationCodes[thisIndex]
              }`}</li>
            </ul>
          )
        }
        return (
          <ul key={round}>
            <li>{`${shortName} ${seasonStr(i18n.messages[langIndex].extraInfo, memoData.semester)}-${
              memoData.applicationCodes[thisIndex]
            }`}</li>
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

const startDate = (labels, memoName) => {
  const splitMemoName = memoName.split('(')
  const startdate = splitMemoName[1].split(',')
  const sd = startdate[0].split(' ')
  return sd[1] ? (
    <>
      <h4>{labels.startdate}</h4>
      <p>{sd[1]}</p>
    </>
  ) : (
    <>
      <h4>{labels.startdate}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )
}
const CourseFacts = ({ labels, departmentName = '', memoData = {} }) => (
  <div className="preview-info-box text-break">
    {startDate(labels, memoData.memoName)}
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
