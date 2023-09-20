import React from 'react'
import PropTypes from 'prop-types'

export const SectionHeading = ({ children }) => {
  return <span className="section-heading">{children}</span>
}

SectionHeading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onToggleEditor: PropTypes.func.isRequired,
}
