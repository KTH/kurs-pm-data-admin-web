import React from 'react'
import PropTypes from 'prop-types'

const TabContent = ({ children, isActive, sectionId }) => (
  <div
    className={`tab-pane fade ${isActive ? 'show active' : ''} row`}
    id={'tab-content-for-' + sectionId}
    key={'tab-content-for-' + sectionId}
    role="tabpanel"
    aria-labelledby={sectionId + '-tab'}
  >
    <div id={`go-to-${sectionId}`} />
    {children}
  </div>
)

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
}

export default TabContent
