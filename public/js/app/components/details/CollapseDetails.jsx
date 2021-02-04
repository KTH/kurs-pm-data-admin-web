import React from 'react'
import PropTypes from 'prop-types'

const CollapseDetails = ({ className, color = 'white', children, title, ariaLabel }) => (
  <details className={className}>
    <summary className={color} aria-label={ariaLabel}>
      {title}
    </summary>
    <div>{children}</div>
  </details>
)

CollapseDetails.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
}

export default CollapseDetails
