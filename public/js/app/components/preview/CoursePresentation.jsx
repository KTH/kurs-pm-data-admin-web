/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

const CoursePresentation = ({ courseImageUrl = '', introText = '', labels }) => {
  const { imageAltText, imageTitleText } = labels
  return (
    <div style={{ minHeight: '160px' }}>
      <img
        // >= lg : float left, x margins spacer * .5
        // < lg : x margins auto, display block
        className="float-lg-start me-lg-4 mb-lg-3 mx-sm-auto d-sm-block"
        height="auto"
        width="150px"
        src={courseImageUrl}
        alt={imageAltText}
        title={imageTitleText}
      />
      <div dangerouslySetInnerHTML={{ __html: introText }} />
    </div>
  )
}

CoursePresentation.propTypes = {
  courseImageUrl: PropTypes.string,
  introText: PropTypes.string,
  labels: PropTypes.shape({
    imageAltText: PropTypes.string.isRequired,
    imageTitleText: PropTypes.string.isRequired,
  }).isRequired,
}

CoursePresentation.defaultProps = {
  courseImageUrl: '',
  introText: '',
}

export default CoursePresentation
