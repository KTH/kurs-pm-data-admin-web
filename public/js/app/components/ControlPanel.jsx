import React from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../../i18n'

import { legacyAlertColorToType } from '../util/legacyAlertColorToType'
import Button from '../components-shared/Button'
import FadeAlert from './FadeAlert'
import ActionModalButton from './ActionModalButton'
import ActionModalCourseRounds from './ActionModalCourseRounds'

const ControlPanel = ({
  alertIsOpen = false,
  alertText = 'Success!',
  alertColor = 'success',
  onBack = null,
  onSave = null,
  onCancel,
  onRemove = null,
  onSubmit = null,

  event = '',
  isDraftOfPublished = false,
  openAlertIdUntilFixed = '',
  chosenMemoEndPoint = null,
  langIndex,
  progress = 1,
  memoStatus,
  fixedBottom,
}) => {
  const { actionModals, alerts, buttons } = i18n.messages[langIndex]
  const progressNum = Number(progress) || 1

  return (
    <div className={`control-panel ${fixedBottom ? 'fixed-bottom' : ''}`}>
      <div className={fixedBottom ? 'kth-content' : undefined}>
        <FadeAlert data-testid="alert-empty-data" type="warning" isOpen={!!openAlertIdUntilFixed}>
          {alerts[openAlertIdUntilFixed] || ''}
        </FadeAlert>
        <FadeAlert data-testid="alert-save-data" type={legacyAlertColorToType(alertColor)} isOpen={!!alertIsOpen}>
          {alertText}
        </FadeAlert>
        <div className="control-buttons" data-testid="buttons-control-panel">
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
      </div>
    </div>
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

export default ControlPanel
