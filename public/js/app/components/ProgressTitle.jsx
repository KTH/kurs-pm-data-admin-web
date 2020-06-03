import React from 'react'
import { InfoModalButton } from '@kth/kth-kip-style-react-components'

const styles = {
  span: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  btnInfoModal: {
    // /specific for this project
    marginTop: '.7em'
  }
}

const ProgressTitle = ({ id, text }) => (
  <span style={styles.span} className="progress-title">
    <h2 id={id}>{text.title}</h2>
    <InfoModalButton
      style={styles.btnInfoModal}
      modalId={id + '-infoModal'}
      modalLabels={{
        header: text.title,
        body: text.intro || text.info,
        btnClose: 'Close'
      }}
    />
  </span>
)

export default ProgressTitle
