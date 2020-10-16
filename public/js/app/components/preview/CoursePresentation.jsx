/* eslint-disable react/no-danger */
import React from 'react'

const CoursePresentation = ({ courseImageUrl = '', introText = '', labels }) => {
  const { imageAltText, imageTitleText } = labels
  return (
    <div style={{ minHeight: '160px' }}>
      <img
        // >= lg : float left, x margins spacer * .5
        // < lg : x margins auto, display block
        className="float-lg-left mr-lg-4 mb-lg-3 mx-sm-auto d-sm-block"
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

export default CoursePresentation
