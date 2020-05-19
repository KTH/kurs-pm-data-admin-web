/* eslint-disable react/no-danger */
import React from 'react'

import { courseLinks } from '../../util/links'
import { FaExternalLinkAlt } from 'react-icons/fa'

import Popup from './Popup'

const CourseLinks = ({ language, labels }) => (
  <div className="preview-info-box text-break">
    <h4>{labels.linkHeaderTitle}</h4>
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
      <FaExternalLinkAlt className="external-link-icon" />
      <Popup
        header={labels.beforeAndDuringACourse}
        body={labels.linkOpensInNewTab}
        targetId="link-before-and-during-course"
      />
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
      <FaExternalLinkAlt className="external-link-icon" />
      <Popup
        header={labels.contactPersonsAndStudentCounselling}
        body={labels.linkOpensInNewTab}
        targetId="link-contact-persons-and-student-counceling"
      />
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
      <FaExternalLinkAlt className="external-link-icon" />
      <Popup
        header={labels.rightsAndResponsibilities}
        body={labels.linkOpensInNewTab}
        targetId="link-rights-and-responsibilities"
      />
    </p>
  </div>
)

export default CourseLinks
