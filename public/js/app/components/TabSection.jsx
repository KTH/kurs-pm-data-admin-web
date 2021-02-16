import React from 'react'
import PropTypes from 'prop-types'
import ButtonBackToTop from './ButtonBackToTop'
const TabSection = ({ children, isActive, sectionId, scrollUp = false }) => (
  <div
    className={`tab-pane fade ${isActive ? 'show active' : ''}`}
    id={'tab-content-for-' + sectionId}
    key={'tab-content-for-' + sectionId}
    role="tabpanel"
    aria-labelledby={sectionId + '-tab'}
  >
    <span id={`go-to-${sectionId}`} />
    {children}
    {scrollUp && <ButtonBackToTop id={`go-to-${sectionId}`} />}
  </div>
)

TabSection.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  sectionId: PropTypes.string,
  scrollUp: PropTypes.bool
}

export default TabSection
