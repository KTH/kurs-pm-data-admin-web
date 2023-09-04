import React from 'react'
import PropTypes from 'prop-types'

const HeadingBox = ({ children, isReady, withNested }) => {
  const classNames = ['heading-box']
  if (isReady) {
    classNames.push('ready')
  }
  if (withNested) {
    classNames.push('with-nested')
  }

  return <section className={classNames.join(' ')}>{children}</section>
}

HeadingBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isReady: PropTypes.bool,
  plain: PropTypes.bool,
}

export default HeadingBox
