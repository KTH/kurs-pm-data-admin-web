import React from 'react'
import PropTypes from 'prop-types'

const HeadingBox = ({ children, isReady, plain }) => {
  const classNames = ['heading-box']
  if (!plain) {
    classNames.push('padding')
  }
  if (isReady) {
    classNames.push('ready')
  }

  return <section className={classNames.join(' ')}>{children}</section>
}

HeadingBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isReady: PropTypes.bool,
  plain: PropTypes.bool,
}

export default HeadingBox
