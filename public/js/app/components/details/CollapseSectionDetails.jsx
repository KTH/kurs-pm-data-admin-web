import React from 'react'
import PropTypes from 'prop-types'
import CollapseDetails from './CollapseDetails'

const CollapseSectionDetails = ({ ariaLabel = '', title, details }) => (
  <CollapseDetails
    className="details-about-each-section"
    ariaLabel={ariaLabel || title}
    title={title}
    open
  >
    {details}
  </CollapseDetails>
)

CollapseSectionDetails.propTypes = {
  ariaLabel: PropTypes.string,
  details: PropTypes.string,
  title: PropTypes.string
}

export default CollapseSectionDetails
