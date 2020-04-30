/* eslint-disable react/no-danger */
import React from 'react'

import { linkToSchool } from '../../util/links'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
import { FaExternalLinkAlt } from 'react-icons/fa'

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
        &nbsp; &nbsp;
        <FaExternalLinkAlt />
        <UncontrolledPopover
          trigger="hover legacy"
          placement="bottom"
          target="link-department-name"
        >
          <PopoverHeader>{department.name}</PopoverHeader>
          <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
        </UncontrolledPopover>
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
