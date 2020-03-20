/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React from 'react'
import i18n from '../../../../i18n'
import { Alert, Row, Col, Button } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'

const ControlPanel = props => {
  const { canContinue, hasChosenMemo, langIndex, onRemove, onSubmit } = props // onSubmit = onForward
  const { alertIsOpen, alertText, onBack, onSave } = props
  const { actionModals, buttons } = i18n.messages[langIndex]
  const progress = Number(props.progress) || 1

  return (
    <Row className="control-buttons">
      <Row className="w-100 my-0 mx-auto">
        <Alert isOpen={!!alertIsOpen}>{alertText || ''}</Alert>
      </Row>
      <Col sm="4" className="step-back">
        {progress > 1 && (
          <Button onClick={onBack} className="btn-back" alt="BACK">
            {buttons.goToRounds}
          </Button>
        )}
        {hasChosenMemo && (
          <ActionModalButton
            btnLabel={buttons.btnRemove}
            modalId="cancelStep2"
            type="remove"
            modalLabels={actionModals.infoRemove} // TODO: CHANGE
            onConfirm={onRemove}
          />
        )}
      </Col>
      <Col sm="4" className="btn-cancel">
        <ActionModalButton
          btnLabel={buttons.cancel}
          modalId="cancelStep2"
          type="cancel"
          modalLabels={actionModals.infoCancel}
          onConfirm={() => console.log('Cancelled')}
        />
      </Col>
      <Col sm="4" className="step-forward">
        {progress === 2 && (
          <Button onClick={onSave} color="secondary">
            {buttons.save}
          </Button>
        )}
        <Button
          onClick={onSubmit}
          id="to-id"
          className="btn-next"
          style={{ marginLeft: '1.25em' }}
          color="success"
          alt="Go to ..."
          disabled={!canContinue}
        >
          {
            {
              1: buttons.edit,
              2: buttons.preview,
              3: buttons.publish
            }[progress]
          }
        </Button>
      </Col>
    </Row>
  )
}

export default ControlPanel
