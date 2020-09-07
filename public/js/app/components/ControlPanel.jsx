/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React from 'react'
import i18n from '../../../../i18n'
import { Alert, Row, Col, Button } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'
import ActionModalCourseRounds from './ActionModalCourseRounds'
import PropTypes from 'prop-types'

const colWidthByProgress = {
  1: { firstCol: '6', secondCol: '0', thirdCol: '6' },
  2: { firstCol: '3', secondCol: '4', thirdCol: '5' },
  3: { firstCol: '6', secondCol: '0', thirdCol: '6' }
}

const ControlPanel = (props) => {
  const { chosenMemoEndPoint, langIndex, onCancel, onRemove, onSubmit, progress } = props // onSubmit = onForward
  const { alertIsOpen, alertText, alertColor, onBack, onSave, isDraftOfPublished } = props
  const { actionModals, buttons } = i18n.messages[langIndex]
  const progressNum = Number(progress) || 1

  return (
    <Row className="control-buttons subsection-30">
      <Row className="w-100 my-0 mx-auto">
        <Alert color={alertColor} isOpen={!!alertIsOpen}>
          {alertText}
        </Alert>
      </Row>
      <Col sm={colWidthByProgress[progressNum].firstCol} className="btns-helpers">
        {progressNum === 2 && (
          <Button
            onClick={onBack}
            className="btn-back"
            alt="Back to step 1, choose course memo or choose course round"
          >
            {isDraftOfPublished
              ? i18n.messages[langIndex].pagesChangePublishedPm[0].title
              : buttons.goToRounds}
          </Button>
        )}
        {progressNum === 3 && (
          <Button onClick={onBack} className="btn-back" alt="Back to step 2, edit memo">
            {buttons.edit}
          </Button>
        )}
        {progressNum === 1 && chosenMemoEndPoint && onRemove && (
          <ActionModalButton
            btnLabel={buttons.btnRemove}
            modalId="removeCourseRound"
            type="remove"
            modalLabels={actionModals.infoRemove} // TODO: CHANGE
            onConfirm={onRemove}
          />
        )}
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
          <Button onClick={onSave} color="secondary">
            {isDraftOfPublished ? buttons.save : buttons.saveDraft}
          </Button>
        </Col>
      )}
      <Col sm={colWidthByProgress[progressNum].thirdCol} className="step-forward">
        {/* Cancel and remove / Just cancel */}
        {(isDraftOfPublished &&
          ((progressNum === 1 && (
            <Button id="cancelWithoutAction" color="secondary" onClick={onCancel}>
              {buttons.cancel}
            </Button>
          )) || (
            <ActionModalButton
              btnLabel={buttons.cancel}
              modalId="cancelThisActionAndRemoveChanges"
              type="cancel"
              modalLabels={actionModals.infoCancel}
              onConfirm={onCancel}
            />
          ))) || (
          <ActionModalButton
            btnLabel={progressNum === 1 ? buttons.btnFinish : buttons.btnSaveAndFinish}
            modalId="cancelThisAction"
            type="cancel"
            modalLabels={
              progressNum === 1 ? actionModals.infoFinish : actionModals.infoSaveAndFinish
            }
            onConfirm={onCancel}
          />
        )}
        {/* Redigera / Granska */}
        {progressNum < 3 && (
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
            modalLabels={actionModals.infoPublish}
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
  isDraftOfPublished: PropTypes.bool
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
  progress: 1
}

export default ControlPanel
