import React from 'react'
import PropTypes from 'prop-types'
import ButtonBackToTop from './ButtonBackToTop'

const TabContent = ({ children, isActive, sectionId, scrollUp = false }) => (
  <div
    className={`tab-pane fade ${isActive ? 'show active' : ''} row`}
    id={'tab-content-for-' + sectionId}
    key={'tab-content-for-' + sectionId}
    role="tabpanel"
    aria-labelledby={sectionId + '-tab'}
  >
    <div id={`go-to-${sectionId}`} />
    {children}
    {scrollUp && <ButtonBackToTop id={`go-to-${sectionId}`} />}
  </div>
)

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  scrollUp: PropTypes.bool,
}
TabContent.defaultProps = {
  scrollUp: false,
}

export default TabContent
