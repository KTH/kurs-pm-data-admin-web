import React from 'react'
import PropTypes from 'prop-types'

const CoursePresentation = ({ courseImageUrl = '', introText = '', labels }) => {
  const { imageAltText, imageTitleText } = labels
  return (
    <div className="course-presentation">
      <img
        id="course-presentation-image"
        className="float-sm-start"
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
