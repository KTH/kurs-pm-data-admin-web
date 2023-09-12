import React from 'react'
import PropTypes from 'prop-types'

export const SectionHeading = ({ children, onToggleEditor }) => {
  return (
    <span className="section-heading" onClick={onToggleEditor}>
      {children}
    </span>
  )
}

SectionHeading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onToggleEditor: PropTypes.func.isRequired,
}
