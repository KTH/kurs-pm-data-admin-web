/* eslint-disable react/no-danger */
import React from 'react'

const CoursePresentation = ({ courseImageUrl = '', introText = '', title = '' }) => {
  return (
    <div style={{ minHeight: '160px' }}>
      <img
        // >= lg : float left, x margins spacer * .5
        // < lg : x margins auto, display block
        className="float-lg-left mx-lg-2 mx-sm-auto d-sm-block"
        height="150px"
        width="200px"
        src={courseImageUrl}
        alt={title}
        title={title}
      />
      <div dangerouslySetInnerHTML={{ __html: introText }} />
    </div>
  )
}

export default CoursePresentation
