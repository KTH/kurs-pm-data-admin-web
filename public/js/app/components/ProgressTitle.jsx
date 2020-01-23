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
    verticalAlign: 'middle',
    marginBottom: '0'
  }
}

const ProgressTitle = ({ id, text, infoModalLabels }) => (
  <span style={styles.span} className="progress-title">
    <h2 id={id}>{text}</h2>
    <InfoModalButton
      style={styles.btnInfoModal}
      modalId={id + '-infoModal'}
      modalLabels={infoModalLabels}
    />
  </span>
)

export default ProgressTitle
