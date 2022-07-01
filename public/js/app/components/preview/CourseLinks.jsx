/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { courseLinks } from '../../util/links'

import Popup from './Popup'

const CourseLinks = ({ language, labels }) => (
  <aside className="preview-info-box text-break">
    <h4>{labels.linkHeaderTitle}</h4>
    {['rightsAndResponsibilities', 'courseAndExamination', 'administrateYouStudy'].map(linkTitle => (
      <p key={`paragraph-for-link-{linkTitle}`}>
        <a
          id={`link-${linkTitle}`}
          title={labels[linkTitle]}
          href={courseLinks(language)[linkTitle]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {labels[linkTitle]}
        </a>
        <Popup header={labels[linkTitle]} body={labels.linkOpensInNewTab} targetId={`link-${linkTitle}`} />
      </p>
    ))}
  </aside>
)

CourseLinks.propTypes = {
  labels: PropTypes.shape({
    administrateYouStudy: PropTypes.string.isRequired,
    courseAndExamination: PropTypes.string.isRequired,
    linkHeaderTitle: PropTypes.string.isRequired,
    rightsAndResponsibilities: PropTypes.string.isRequired,
    linkOpensInNewTab: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.oneOf(['sv', 'en']).isRequired,
}

export default CourseLinks
