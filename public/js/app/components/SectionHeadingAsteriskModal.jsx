import React from 'react'
import { HeadingAsteriskModal } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
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
const SectionHeadingAsteriskModal = ({ langAbbr, modalId, titleAndInfo, btnClose, children }) => {
  return (
    <HeadingAsteriskModal
      headingTag="h2"
      langAbbr={langAbbr}
      modalId={modalId}
      titleAndInfo={titleAndInfo}
      btnClose={btnClose}
      withModal
    >
      {children}
    </HeadingAsteriskModal>
  )
}

SectionHeadingAsteriskModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  titleAndInfo: PropTypes.PropTypes.shape({
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  btnClose: PropTypes.string,
  children: PropTypes.node,
}

SectionHeadingAsteriskModal.defaultProps = {
  children: '',
  btnClose: 'Close',
}

export default SectionHeadingAsteriskModal
