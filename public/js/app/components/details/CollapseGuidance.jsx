/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'

const CollapseGuidance = ({ ariaLabel = '', title, details }) => (
  <CollapseDetails
    // className="guidance-per-content"
    ariaLabel={ariaLabel || 'Expand this to see a helping text'}
    title={title}
    yellow
  >
    <span
      data-testid="help-text"
      dangerouslySetInnerHTML={{
        __html: details || '',
      }}
    />
  </CollapseDetails>
)

CollapseGuidance.propTypes = {
  ariaLabel: PropTypes.string,
  details: PropTypes.string,
  title: PropTypes.string,
}

export default CollapseGuidance
