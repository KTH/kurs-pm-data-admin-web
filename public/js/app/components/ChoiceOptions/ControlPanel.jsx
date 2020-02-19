/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../../i18n'
import { Row, Col, Button } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'

const ADMIN = '/kursinfoadmin/kurs-pm-data/'

@inject(['routerStore'])
@observer
class ControlPanel extends Component {
  semester = this.props.semester

  rounds = this.props.rounds

  courseCode = this.props.routerStore.courseCode

  componentDidMount() {}

  forwardTo = event => {
    window.location = `${ADMIN}${this.courseCode}/${this.semester}?rounds=${this.rounds.join(',')}`
  }

  render() {
    const { actionModals, buttons } = i18n.messages[1]

    return (
      <Row className="control-buttons">
        <Col sm="4" className="step-back">
          {this.props.hasSavedDraft && (
            <ActionModalButton
              btnLabel={buttons.btnRemove}
              modalId="cancelStep2"
              type="remove"
              modalLabels={actionModals.infoRemove} // TODO: CHANGE
              onConfirm={() => console.log('Deleted')}
            />
          )}
        </Col>
        <Col sm="4" className="btn-cancel">
          <ActionModalButton
            btnLabel={buttons.btn_cancel}
            modalId="cancelStep2"
            type="cancel"
            modalLabels={actionModals.infoCancel}
            onConfirm={() => console.log('Cancelled')}
          />
        </Col>
        <Col sm="4" className="step-forward">
          <Button
            onClick={this.props.onSubmit}
            id="to-id"
            className="btn-next"
            style={{ marginLeft: '1.25em' }}
            color="success"
            alt="Go to ..."
            // disabled={this.props.rounds.length === 0}
          >
            {buttons.btn_edit}
          </Button>
        </Col>
      </Row>
    )
  }
}

export default ControlPanel
