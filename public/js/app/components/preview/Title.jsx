import React from 'react'

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

const Title = ({ titleId, header, children }) => {
  return (
    <span className="title-and-info" style={styles.span}>
      <h3 data-testid={titleId + '-heading'} style={styles.h3}>
        {header}
      </h3>
      {children}
    </span>
  )
}

export default Title
