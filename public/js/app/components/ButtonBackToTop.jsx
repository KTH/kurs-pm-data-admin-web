import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowCircleUp } from 'react-icons/fa'
const styles = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '50px',
  fontSize: '0.9rem'
}
const ButtonBackToTop = ({ id }) => {
  function goToTabs(event) {
    event.preventDefault()
    const topElement = document.getElementById(id)
    topElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return (
    <div
      id="goBackToTop"
      role="link"
      tabIndex="0"
      onClick={goToTabs}
      style={styles}
      aria-label="Upp till nästa avsnitt"
      onKeyPress={goToTabs}
      className="mx-auto"
    >
      <FaArrowCircleUp
        style={{
          color: '#62922e',
          alignSelf: 'center',
          height: '2.5em',
          width: '2.5em',
          marginBottom: '5px'
        }}
      />
      <a style={{ alignSelf: 'center', decoration: 'none' }} href={`#${id}`}>
        Fler rubriker
      </a>
    </div>
  )
}
ButtonBackToTop.propTypes = {
  id: PropTypes.string
}

export default ButtonBackToTop
