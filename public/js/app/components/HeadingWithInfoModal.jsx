import React from 'react'
import PropTypes from 'prop-types'
import { InfoModal } from './InfoModal'

const HeadingWithInfoModal = ({ modalId, titleAndInfo, btnClose, modalBtnAriaLabel, headingTag: HeadingTag }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  const { header, body = '', link } = titleAndInfo

  const modalProps = {
    id: modalId,
    isOpen: modalOpen,
    toggle: toggleModal,
    infoText: {
      header,
      btnClose,
      htmlBody: body,
      link,
    },
  }
  return (
    <HeadingTag>
      {header}
      <button type="button" className="btn-info-modal" onClick={() => toggleModal()} aria-label={modalBtnAriaLabel} />
      <InfoModal {...modalProps} />
    </HeadingTag>
  )
}

HeadingWithInfoModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  titleAndInfo: PropTypes.PropTypes.shape({
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  btnClose: PropTypes.string,
  headingTag: PropTypes.oneOf(['h1', 'h2', 'h3']),
}

HeadingWithInfoModal.defaultProps = {
  btnClose: 'Close',
  headingTag: 'h2',
}

export default HeadingWithInfoModal
