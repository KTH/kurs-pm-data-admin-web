/* eslint-disable react/no-danger */
import React from 'react'

import i18n from '../../../../../i18n'
import { courseLinks } from '../../util/links'

const CourseLinks = ({ language, labels }) => (
  <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
    <h3>{labels.linkHeaderTitle}</h3>
    <p>
      <a
        title={labels.beforeAndDuringACourse}
        href={courseLinks.beforeAndDuringACourse}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.beforeAndDuringACourse}
      </a>
    </p>
    <p>
      <a
        title={labels.contactPersonsAndStudentCounselling}
        href={courseLinks.contactPersonsAndStudentCounselling}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.contactPersonsAndStudentCounselling}
      </a>
    </p>
    <p>
      <a
        title={labels.rightsAndResponsibilities}
        href={courseLinks.rightsAndResponsibilities[language]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.rightsAndResponsibilities}
      </a>
    </p>
  </div>
)

export default CourseLinks
