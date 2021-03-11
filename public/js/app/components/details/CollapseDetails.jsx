import React from 'react'
import PropTypes from 'prop-types'

const CollapseDetails = ({ className, color = 'white', children, open = false, title, ariaLabel, yellow = false }) => (
  <details
    style={yellow ? { backgroundColor: '#fcf8e3' } : ''}
    className={className}
    // className={yellow ? `guidance-per-content ${className}` : className}
    open={open}
  >
    <summary className={color} aria-label={ariaLabel}>
      {title}
    </summary>
    <div
      style={
        yellow
          ? {
              marginLeft: '10px',
              marginRight: '10px',
              paddingBottom: '20px',
            }
          : ''
      }
    >
      {children}
    </div>
  </details>
)

CollapseDetails.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(['white', 'blue']),
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
  yellow: PropTypes.bool,
}
CollapseDetails.defaultProps = {
  ariaLabel: '',
  className: '',
  color: 'white',
  open: false,
  yellow: false,
}

export default CollapseDetails
