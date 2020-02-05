/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button, Alert } from 'reactstrap'
import Start from './Start'
import PageHead from '../components/PageHead'
import i18n from '../../../../i18n'
import { PageTitle, ProgressBar, ActionModalButton } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class StartRouter extends Component {
  state = { progress: this.props.progress ? Number(this.props.progress) : 1 }

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  componentDidMount() {}

  doUpdateStates = states => {
    if (states) this.setState(states)
  }

  render() {
    const { pages, pageTitles, actionModals, buttons } = i18n.messages[1]
    const { title, credits, creditUnitAbbr } = this.props.routerStore.koppsFreshData

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span>
              {this.courseCode +
                ' ' +
                title +
                ' ' +
                credits +
                ' ' +
                (i18n.isSwedish() ? creditUnitAbbr : 'credits')}
            </span>
          </PageTitle>
        </Row>
        <ProgressBar active={this.state.progress} pages={pages} />
        <PageHead semester={this.props.routerStore.semester} />
        {this.state.progress === 2 && <Start />}
        <Container className="fixed-bottom">
          <Row className="control-buttons">
            <Row className="w-100 my-0 mx-auto">
              <Alert isOpen={!!this.state.alertIsOpen}>
                {this.state.alertText ? this.state.alertText : ''}
              </Alert>
            </Row>
            <Col sm="4" className="step-back">
              {this.state.progress > 1 && (
                <Button
                  onClick={() => this.setState({ progress: this.state.progress - 1 })}
                  className="btn-back"
                  id="back-to-.."
                  alt="BACK"
                >
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
              <Button onClick={this.handleConfirm} color="secondary">
                {buttons.btn_save}
              </Button>
              <Button
                onClick={() => this.setState({ progress: this.state.progress + 1 })}
                id="to-id"
                className="btn-next"
                style={{ marginLeft: '1.25em' }}
                color="success"
                alt={'Go to ' + buttons.btn_preview}
                disabled={false /* this.state.isError */}
              >
                {buttons.btn_preview}
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}

export default StartRouter
