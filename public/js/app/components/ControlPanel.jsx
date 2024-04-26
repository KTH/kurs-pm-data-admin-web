/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react'

import { Alert, Row, Col, Button } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import PropTypes from 'prop-types'
import i18n from '../../../../i18n'
import ActionModalCourseRounds from './ActionModalCourseRounds'

const colWidthByProgress = {
  1: { firstCol: '6', secondCol: '0', thirdCol: '6' },
  2: { firstCol: '3', secondCol: '4', thirdCol: '5' },
  3: { firstCol: '6', secondCol: '0', thirdCol: '6' },
}

const ControlPanel = props => {
  const { chosenMemoEndPoint, langIndex, onCancel, onRemove, onSubmit, progress, openAlertIdUntilFixed, memoStatus } =
    props // onSubmit = onForward
  const { alertIsOpen, alertText, alertColor, onBack, onSave, isDraftOfPublished, event = '' } = props
  const { actionModals, alerts, buttons } = i18n.messages[langIndex]
  const progressNum = Number(progress) || 1

  return (
    <Row className="control-buttons subsection-30" data-testid="buttons-control-panel">
      <Row className="w-100 my-0 mx-auto">
        <Alert data-testid="alert-empty-data" color="danger" isOpen={!!openAlertIdUntilFixed}>
          {alerts[openAlertIdUntilFixed] || ''}
        </Alert>
        <Alert data-testid="alert-save-data" color={alertColor} isOpen={!!alertIsOpen}>
          {alertText}
        </Alert>
      </Row>
      <Col sm={colWidthByProgress[progressNum].firstCol} className="btns-helpers">
        {progressNum === 2 && (
          <Button onClick={onBack} className="back" alt="Back to step 1, choose course memo or choose course round">
            {isDraftOfPublished ? i18n.messages[langIndex].pagesChangePublishedPm[0].title : buttons.goToRounds}
          </Button>
        )}
        {progressNum === 3 && (
          <Button onClick={onBack} className="back" alt="Back to step 2, edit memo">
            {buttons.edit}
          </Button>
        )}
        {progressNum === 1 &&
          chosenMemoEndPoint &&
          onRemove &&
          (event === 'pm_published' ? (
            memoStatus === 'draft' && (
              <ActionModalButton
                btnLabel={buttons.btnRemoveUnpublishedChanges}
                modalId="removeCourseRound"
                type="remove"
                modalLabels={actionModals.infoRemove}
                onConfirm={onRemove}
              />
            )
          ) : (
            <ActionModalButton
              btnLabel={buttons.btnRemove}
              modalId="removeCourseRound"
              type="remove"
              modalLabels={actionModals.infoRemove}
              onConfirm={onRemove}
            />
          ))}
        {progressNum === 1 && chosenMemoEndPoint && (
          <ActionModalCourseRounds
            chosenMemoEndPoint={chosenMemoEndPoint}
            langAbbr={langIndex === 1 ? 'sv' : 'en'}
            langIndex={langIndex}
          />
        )}
      </Col>
      {progressNum === 2 && (
        <Col sm={colWidthByProgress[progressNum].secondCol} className="btn-middle">
          <Button onClick={() => onSave()} color="secondary">
            {isDraftOfPublished ? buttons.save : buttons.saveDraft}
          </Button>
        </Col>
      )}
      <Col sm={colWidthByProgress[progressNum].thirdCol} className="step-forward">
        {/* Cancel and remove / Just cancel */}
        {(isDraftOfPublished &&
          ((progressNum === 1 && (
            <Button id="cancelWithoutAction" color="secondary" onClick={onCancel}>
              {buttons.btnFinish}
            </Button>
          )) || (
            <ActionModalButton
              btnLabel={buttons.cancel}
              modalId="cancelThisActionAndRemoveChanges"
              type="cancel"
              modalLabels={actionModals.infoCancel}
              onConfirm={progressNum === 3 ? onCancel : onCancel}
            />
          ))) ||
          (progressNum === 1 && (
            <Button id="cancelWithoutAction" color="secondary" onClick={onCancel}>
              {buttons.btnFinish}
            </Button>
          )) || (
            <ActionModalButton
              aria-label={buttons.cancel}
              btnLabel={buttons.cancel}
              modalId="cancelThisAction"
              type="cancel"
              modalLabels={actionModals.infoSaveAndFinish}
              onConfirm={onCancel}
            />
          )}
        {/* Redigera / Granska */}
        {progressNum < 3 && (
          <Button onClick={onSubmit} id="to-id" className="next" style={{ marginLeft: '1.25em' }} color="success">
            {
              {
                1: buttons.edit,
                2: buttons.preview,
              }[progressNum]
            }
          </Button>
        )}
        {/* Publish */}
        {progressNum === 3 && (
          <ActionModalButton
            btnLabel={buttons.publish}
            modalId="publish"
            type="submit"
            modalLabels={isDraftOfPublished ? actionModals.infoPublished : actionModals.infoPublish}
            onConfirm={onSubmit}
          />
        )}
      </Col>
    </Row>
  )
}

ControlPanel.propTypes = {
  chosenMemoEndPoint: PropTypes.string,
  langIndex: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
  alertIsOpen: PropTypes.bool,
  alertText: PropTypes.string,
  alertColor: PropTypes.string,
  onBack: PropTypes.func,
  isDraftOfPublished: PropTypes.bool,
  openAlertIdUntilFixed: PropTypes.oneOf(['', 'errorEmptyHeading']),
}

ControlPanel.defaultProps = {
  alertIsOpen: false,
  alertText: 'Success!',
  alertColor: 'success',
  chosenMemoEndPoint: null,
  isDraftOfPublished: false,
  onBack: null,
  onRemove: null,
  onSave: null,
  onSubmit: null,
  progress: 1,
  openAlertIdUntilFixed: '',
}

export default ControlPanel
