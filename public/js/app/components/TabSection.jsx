import React from 'react'
import PropTypes from 'prop-types'

const TabSection = ({ children, isActive, sectionId }) => (
  <div
    className={`tab-pane fade ${isActive ? 'show active' : ''}`}
    id={'tab-content-for-' + sectionId}
    key={'tab-content-for-' + sectionId}
    role="tabpanel"
    aria-labelledby={sectionId + '-tab'}
  >
    {children}
  </div>
)
TabSection.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  sectionId: PropTypes.string
}

export default TabSection
