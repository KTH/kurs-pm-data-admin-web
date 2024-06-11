import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

const CollapseGuidance = ({ ariaLabel = '', title, details, visibleInMemo, content }) => (
  <CollapseDetails
    ariaLabel={ariaLabel || 'Expand this to see a helping text'}
    title={title}
    color={visibleInMemo ? (content != '' ? 'white' : 'grey') : 'grey'}
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
