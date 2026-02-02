import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  span: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnInfoModal: {
    // /specific for this project
    marginTop: '.7em',
  },
}

const ProgressTitle = (
  { id, text } // style, withInfoModal
) => (
  <span style={styles.span} className="progress-title">
    <h2 id={id}>{text.title}</h2>
  </span>
)

ProgressTitle.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.shape({
    title: PropTypes.string,
    intro: PropTypes.string,
    info: PropTypes.string,
  }).isRequired,
}

export default ProgressTitle
