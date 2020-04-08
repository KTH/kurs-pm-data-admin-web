/* eslint-disable react/no-danger */
import React from 'react'

const linkToSchool = (name = '') => `https://www.kth.se/${name.toLowerCase().split('/')[0]}`

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
      <h3>{labels.versionTitle}</h3>
      <p>{formatVersion(language, memoVersion)}</p>
    </div>
  ) : (
    <div>
      <h3>{labels.versionTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const offeredBy = (labels, department) =>
  department.name ? (
    <div>
      <h3>{labels.offeredByTitle}</h3>
      <p>
        <a href={linkToSchool(department.name)}>{department.name}</a>
      </p>
    </div>
  ) : (
    <div>
      <h3>{labels.offeredByTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const languageOfInstruction = (labels, memoLanguageOfInstructions) =>
  memoLanguageOfInstructions ? (
    <div>
      <h3>{labels.languageOfInstructionTitle}</h3>
      <p>{memoLanguageOfInstructions}</p>
    </div>
  ) : (
    <div>
      <h3>{labels.languageOfInstructionTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const CourseFacts = ({ language = 'sv', labels, department, memoData = {} }) => (
  <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
    {version(language, labels, memoData.lastChangeDate)}
    {offeredBy(labels, department)}
    {languageOfInstruction(labels, memoData.languageOfInstructions)}
  </div>
)

export default CourseFacts
