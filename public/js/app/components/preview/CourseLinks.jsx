/* eslint-disable react/no-danger */
import React from 'react'

import { courseLinks } from '../../util/links'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

const CourseLinks = ({ language, labels }) => (
  <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
    <h3>{labels.linkHeaderTitle}</h3>
    <p>
      <a
        id="link-before-and-during-course"
        title={labels.beforeAndDuringACourse}
        href={courseLinks(language).beforeAndDuringACourse}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.beforeAndDuringACourse}
      </a>
      &nbsp;
      <FaExternalLinkAlt />
      <UncontrolledPopover
        trigger="hover legacy"
        placement="bottom"
        target="link-before-and-during-course"
      >
        <PopoverHeader>{labels.beforeAndDuringACourse}</PopoverHeader>
        <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
      </UncontrolledPopover>
    </p>
    <p>
      <a
        id="link-contact-persons-and-student-counceling"
        title={labels.contactPersonsAndStudentCounselling}
        href={courseLinks(language).contactPersonsAndStudentCounselling}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.contactPersonsAndStudentCounselling}
      </a>
      &nbsp;
      <FaExternalLinkAlt />
      <UncontrolledPopover
        trigger="hover legacy"
        placement="bottom"
        target="link-contact-persons-and-student-counceling"
      >
        <PopoverHeader>{labels.contactPersonsAndStudentCounselling}</PopoverHeader>
        <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
      </UncontrolledPopover>
    </p>
    <p>
      <a
        id="link-rights-and-responsibilities"
        title={labels.rightsAndResponsibilities}
        href={courseLinks(language).rightsAndResponsibilities}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.rightsAndResponsibilities}
      </a>
      &nbsp;
      <FaExternalLinkAlt />
      <UncontrolledPopover
        trigger="hover legacy"
        placement="bottom"
        target="link-rights-and-responsibilities"
      >
        <PopoverHeader>{labels.rightsAndResponsibilities}</PopoverHeader>
        <PopoverBody>Länken kommer att öppnas i ny flik</PopoverBody>
      </UncontrolledPopover>
    </p>
  </div>
)

export default CourseLinks
