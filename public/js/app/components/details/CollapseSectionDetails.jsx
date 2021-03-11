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
  details: PropTypes.string,
  title: PropTypes.string
}

export default CollapseSectionDetails
