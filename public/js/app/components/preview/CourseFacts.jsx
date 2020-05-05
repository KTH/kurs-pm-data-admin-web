/* eslint-disable react/no-danger */
import React from 'react'

import { linkToSchool } from '../../util/links'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Popup from './Popup'

const offeredBy = (language, labels, department) =>
  department.name ? (
    <div>
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
      <h4>{labels.offeredByTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const languageOfInstruction = (labels, memoLanguageOfInstructions) =>
  memoLanguageOfInstructions ? (
    <div>
      <h4>{labels.languageOfInstructionTitle}</h4>
      <p>{memoLanguageOfInstructions}</p>
    </div>
  ) : (
    <div>
      <h4>{labels.languageOfInstructionTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

const CourseFacts = ({ language = 'sv', labels = {}, department = {}, memoData = {} }) => (
  <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
    {offeredBy(language, labels, department)}
    {languageOfInstruction(labels, memoData.languageOfInstructions)}
  </div>
)

export default CourseFacts
