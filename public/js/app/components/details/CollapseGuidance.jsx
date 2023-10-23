/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

const CollapseGuidance = ({ ariaLabel = '', title, details, visibleInMemo }) => (
  <CollapseDetails
    // className="guidance-per-content"
    ariaLabel={ariaLabel || 'Expand this to see a helping text'}
    title={title}
    yellow
    color={(visibleInMemo && 'grey') || 'white'}
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
  visibleInMemo: PropTypes.bool,
}

export default CollapseGuidance
