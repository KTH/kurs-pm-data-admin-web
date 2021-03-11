/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { courseLinks } from '../../util/links'

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
      <Popup
        header={labels.rightsAndResponsibilities}
        body={labels.linkOpensInNewTab}
        targetId="link-rights-and-responsibilities"
      />
    </p>
  </div>
)

CourseLinks.propTypes = {
  labels: PropTypes.shape({
    contactPersonsAndStudentCounselling: PropTypes.string.isRequired,
    beforeAndDuringACourse: PropTypes.string.isRequired,
    linkHeaderTitle: PropTypes.string.isRequired,
    rightsAndResponsibilities: PropTypes.string.isRequired,
    linkOpensInNewTab: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.oneOf(['sv', 'en']).isRequired,
}

export default CourseLinks
