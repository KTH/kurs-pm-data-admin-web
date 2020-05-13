/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React from 'react'
import i18n from '../../../../i18n'
import { Alert, Row, Col, Button } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'

const ControlPanel = props => {
  const { hasChosenMemo, langIndex, onCancel, onCancelAndRemove, onRemove, onSubmit } = props // onSubmit = onForward
  const { alertIsOpen, alertText, alertColor, onBack, onSave, isDraftOfPublished } = props
  const { actionModals, buttons } = i18n.messages[langIndex]
  const progress = Number(props.progress) || 1

  return (
    <Row className="control-buttons subsection-30">
      <Row className="w-100 my-0 mx-auto">
        <Alert color={alertColor || 'success'} isOpen={!!alertIsOpen}>
          {alertText || ''}
        </Alert>
      </Row>
      <Col sm="4" className="step-back">
        {progress === 2 && (
          <Button onClick={onBack} className="btn-back" alt="BACK">
            {buttons.goToRounds}
          </Button>
        )}
        {progress === 3 && (
          <Button onClick={onBack} className="btn-back" alt="BACK">
            {buttons.edit}
          </Button>
        )}
        {hasChosenMemo && onRemove && (
          <ActionModalButton
            btnLabel={buttons.btnRemove}
            modalId="removeCourseRound"
            type="remove"
            modalLabels={actionModals.infoRemove} // TODO: CHANGE
            onConfirm={onRemove}
          />
        )}
      </Col>
      <Col sm="4" className="btn-cancel">
        {((isDraftOfPublished || onCancelAndRemove) && (
          <ActionModalButton
            btnLabel={buttons.cancel}
            modalId="cancelThisActionAndRemoveChanges"
            type="cancel"
            modalLabels={actionModals.infoCancel}
            onConfirm={onCancelAndRemove || onCancel}
          />
        )) || (
          <ActionModalButton
            btnLabel={progress === 1 ? buttons.btnFinish : buttons.btnSaveAndFinish}
            modalId="cancelThisAction"
            type="cancel"
            modalLabels={progress === 1 ? actionModals.infoFinish : actionModals.infoSaveAndFinish}
            onConfirm={onCancel}
          />
        )}
      </Col>
      <Col sm="4" className="step-forward">
        {progress === 2 && (
          <Button onClick={onSave} color="secondary">
            {isDraftOfPublished ? buttons.save : buttons.saveDraft}
          </Button>
        )}
        {progress < 3 && (
          <Button
            onClick={onSubmit}
            id="to-id"
            className="btn-next"
            style={{ marginLeft: '1.25em' }}
            color="success"
            alt="Go to ..."
          >
            {
              {
                1: buttons.edit,
                2: buttons.preview
              }[progress]
            }
          </Button>
        )}
        {progress === 3 && (
          <ActionModalButton
            btnLabel={buttons.publish}
            modalId="publish"
            type="submit"
            modalLabels={actionModals.infoPublish}
            onConfirm={onSubmit}
          />
        )}
      </Col>
    </Row>
  )
}

export default ControlPanel
