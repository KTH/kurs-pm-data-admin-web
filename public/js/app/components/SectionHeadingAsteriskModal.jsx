import React from 'react'
import { HeadingAsteriskModal } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import PropTypes from 'prop-types'

const SectionHeadingAsteriskModal = ({ langAbbr, modalId, titleAndInfo, btnClose, children }) => (
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
