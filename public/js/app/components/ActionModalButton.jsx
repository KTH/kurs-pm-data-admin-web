// This file if mostly copied from kth-reactstrap but with adjustments for KTH-style 10
// kth-reactstrap: src/components/utbildningsinfo/ActionModalButton.js

import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Button from '../components-shared/Button'

const variantByType = {
  secondary: 'secondary',
  cancel: 'secondary',
  submit: 'success',
  remove: 'error',
  actionLink: 'link',
}

function ActionModalButton({
  children = null,
  disabled = false,
  onConfirm = () => {},
  stayOnModal = false,
  btnLabel = 'Publish',
  type = 'submit',
  modalId = 'modal-to-confirm-before-submit',
  modalLabels,
}) {
  const [isOpen, setIfOpen] = React.useState(false)

  const btnVariant = variantByType[type] || ''
  const { header, btnClose, btnConfirm, body: htmlBody } = modalLabels

  function toggle() {
    setIfOpen(!isOpen)
  }

  function handleConfirm(event) {
    event.preventDefault()
    // return control to parent element function
    onConfirm()
    // close modal
    if (!stayOnModal) toggle()
  }

  return (
    <span>
      <Button variant={btnVariant || 'secondary'} disabled={disabled} onClick={toggle}>
        {btnLabel}
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} id={modalId}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <ModalBody>
          {children}
          {htmlBody && <div dangerouslySetInnerHTML={{ __html: htmlBody }}></div>}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggle}>
            {btnClose}
          </Button>
          {onConfirm && (
            <Button variant="secondary" type={type} onClick={handleConfirm}>
              {btnConfirm}
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </span>
  )
}

export default ActionModalButton
