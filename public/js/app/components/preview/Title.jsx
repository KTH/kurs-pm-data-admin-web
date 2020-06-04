// TODO Remove component
import React from 'react'
import { FaAsterisk } from 'react-icons/fa'

const styles = {
  span: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  h3: {
    // marginTop: '15px',
    marginBottom: '0'
  }
}

const Title = ({ titleId, header, fromSyllabus, children }) => (
  <span className="title-and-info" style={styles.span}>
    <h3 data-testid={titleId + '-heading'} style={styles.h3}>
      {header}
      {fromSyllabus && (
        <sup>
          <FaAsterisk className="syllabus-marker-icon" />
        </sup>
      )}
    </h3>
    {children}
  </span>
)

export default Title
