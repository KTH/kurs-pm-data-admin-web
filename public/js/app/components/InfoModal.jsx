import React from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import Button from '../components-shared/Button'

export function InfoModal(props) {
  const { isOpen, toggle, infoText, id } = props
  const baseUrl = window.location.origin

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} id={id}>
        <div className="modal-header ">
          <h4 className="modal-title">{infoText.header}</h4>
          <button type="button" className="kth-icon-button close" aria-label={infoText.btnClose} onClick={toggle} />
        </div>
        <ModalBody>
          {infoText.htmlBody && (
            <div
              dangerouslySetInnerHTML={{
                __html: infoText.htmlBody.replace('href="empty"', `href="${baseUrl + infoText.link}"`),
              }}
            ></div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggle}>
            {infoText.btnClose}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
