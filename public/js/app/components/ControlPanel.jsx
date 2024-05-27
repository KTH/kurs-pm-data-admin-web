import React from 'react'
import { Alert, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import i18n from '../../../../i18n'

import Button from '../components-shared/Button'
import ActionModalButton from './ActionModalButton'
import ActionModalCourseRounds from './ActionModalCourseRounds'

const ControlPanel = props => {
  const { chosenMemoEndPoint, langIndex, onCancel, onRemove, onSubmit, progress, openAlertIdUntilFixed, memoStatus } =
    props // onSubmit = onForward
  const { alertIsOpen, alertText, alertColor, onBack, onSave, isDraftOfPublished, event = '' } = props
  const { actionModals, alerts, buttons } = i18n.messages[langIndex]
  const progressNum = Number(progress) || 1

  return (
    <Row className="subsection-30" data-testid="buttons-control-panel">
      <Row className="w-100 my-0 mx-auto">
        <Alert data-testid="alert-empty-data" color="danger" isOpen={!!openAlertIdUntilFixed}>
          {alerts[openAlertIdUntilFixed] || ''}
        </Alert>
        <Alert data-testid="alert-save-data" color={alertColor} isOpen={!!alertIsOpen}>
          {alertText}
        </Alert>
      </Row>
      <div className="control-buttons">
        <div>
          {progressNum === 2 && (
            <Button onClick={onBack} variant="previous">
              {isDraftOfPublished ? i18n.messages[langIndex].pagesChangePublishedPm[0].title : buttons.goToRounds}
            </Button>
          )}
          {progressNum === 3 && (
            <Button onClick={onBack} variant="previous">
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
        </div>
        <div>
          {progressNum === 2 && (
            <Button onClick={() => onSave()} variant="secondary">
              {isDraftOfPublished ? buttons.save : buttons.saveDraft}
            </Button>
          )}
        </div>
        <div>
          {/* Cancel and remove / Just cancel */}
          {(isDraftOfPublished &&
            ((progressNum === 1 && (
              <Button id="cancelWithoutAction" variant="secondary" onClick={onCancel}>
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
              <Button id="cancelWithoutAction" variant="secondary" onClick={onCancel}>
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
            <Button onClick={onSubmit} id="to-id" variant="next">
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
        </div>
      </div>
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
