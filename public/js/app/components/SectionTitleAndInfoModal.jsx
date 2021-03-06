import React from 'react'
import { InfoModalButton } from '@kth/kth-kip-style-react-components'
import PropTypes from 'prop-types'

const styles = {
  span: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnInfoModal: {
    // /specific for this project
    verticalAlign: 'middle',
  },
  h2: {
    marginBottom: '0',
  },
}
const SectionTitleAndInfoModal = ({ modalId, titleAndInfo, btnClose, children }) => {
  const { header } = titleAndInfo
  const infoModalLabels = {
    ...titleAndInfo,
    btnClose,
  }
  return (
    <span className="section-title-and-info" style={styles.span}>
      <h2 data-testid={modalId + '-section-heading'} style={styles.h2}>
        {header}
        <InfoModalButton
          style={styles.btnInfoModal}
          modalId={modalId + '-section-infoModal'}
          modalLabels={infoModalLabels}
        />
      </h2>
      {children}
    </span>
  )
}

SectionTitleAndInfoModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  titleAndInfo: PropTypes.PropTypes.shape({
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  btnClose: PropTypes.string,
  children: PropTypes.node,
}

SectionTitleAndInfoModal.defaultProps = {
  children: '',
  btnClose: 'Close',
}

export default SectionTitleAndInfoModal
