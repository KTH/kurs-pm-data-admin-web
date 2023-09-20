import React from 'react'
import PropTypes from 'prop-types'

const HeadingBox = ({ children, isReady, withNested, onToggleEditor }) => {
  const classNames = ['heading-box']
  if (isReady) {
    classNames.push('ready')
  }
  if (withNested) {
    classNames.push('with-nested')
  }
  if (onToggleEditor) {
    classNames.push('clickable')
  }

  return (
    <section className={classNames.join(' ')} onClick={onToggleEditor}>
      {children}
    </section>
  )
}

HeadingBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isReady: PropTypes.bool,
  plain: PropTypes.bool,
}

export default HeadingBox
