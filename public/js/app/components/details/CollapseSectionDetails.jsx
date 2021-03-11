import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'

const CollapseSectionDetails = ({ ariaLabel = '', title, details }) => (
  <CollapseDetails
    className="details-about-each-section"
    ariaLabel={ariaLabel || title}
    title={title}
    yellow
    // open
  >
    {details}
  </CollapseDetails>
)

CollapseSectionDetails.propTypes = {
  ariaLabel: PropTypes.string,
  details: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

CollapseSectionDetails.defaultProps = {
  ariaLabel: '',
}

export default CollapseSectionDetails
