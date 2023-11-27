/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { useStore } from '../../mobx'

const store = useStore()

const CollapseGuidance = ({ ariaLabel = '', title, details, visibleInMemo, contentId, content }) => (
  <CollapseDetails
    // className="guidance-per-content"
    ariaLabel={ariaLabel || 'Expand this to see a helping text'}
    title={title}
    yellow
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
