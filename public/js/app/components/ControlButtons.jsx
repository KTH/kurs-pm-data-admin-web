/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'
import { Container, Row, Col, Button, Alert } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'
const ADMIN = '/kursinfoadmin/kurs-pm-data/'
@inject(['routerStore'])
@observer
class ControlButtons extends Component {
  semester = this.props.semester || this.props.routerStore.semester

  courseCode = this.props.routerStore.courseCode

  componentDidMount() {}

  backTo = event => {
    if (this.props.progress === 2)
      window.location = `${ADMIN}${this.courseCode}?chosen=${this.semester}`
    else this.props.onClick({ progress: this.props.progress - 1 })
  }

  forwardTo = event => {
    if (this.props.progress === 1) window.location = `${ADMIN}${this.courseCode}/${this.semester}`
    else this.props.onClick({ progress: this.props.progress + 1 })
  }

  render() {
    const { actionModals, buttons } = i18n.messages[1]
    const { alertIsOpen, alertText, progress } = this.props

    return (
      // <Container className="fixed-bottom">
      <Row className="control-buttons">
        <Row className="w-100 my-0 mx-auto">
          <Alert isOpen={!!alertIsOpen}>{alertText || ''}</Alert>
        </Row>
        <Col sm="4" className="step-back">
          {progress > 1 && (
            <Button onClick={this.backTo} className="btn-back" id="back-to-.." alt="BACK">
              {buttons.btn_back}
            </Button>
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
          {progress === 2 && (
            <Button onClick={this.handleConfirm} color="secondary">
              {buttons.btn_save}
            </Button>
          )}
          <Button
            onClick={this.forwardTo}
            id="to-id"
            className="btn-next"
            style={{ marginLeft: '1.25em' }}
            color="success"
            alt="Go to "
            disabled={false /* this.state.isError */}
          >
            {
              {
                1: buttons.btn_edit,
                2: buttons.btn_preview,
                3: buttons.btn_publish
              }[progress]
            }
          </Button>
        </Col>
      </Row>
      // </Container>
    )
  }
}

export default ControlButtons
