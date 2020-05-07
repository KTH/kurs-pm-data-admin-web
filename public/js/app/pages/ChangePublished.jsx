/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
// import { combineMemoName, seasonStr } from '../util/helpers'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class ChangePublished extends Component {
  state = {
    // semester: this.props.routerStore.semester,
    chosen: {
      memoEndPoint: this.props.routerStore.memoEndPoint || '' // TODO FIX IF IT IS CORRECT MEMOeNDpOPIN
    },
    alert: {
      type: '', // danger, success, warn
      isOpen: false,
      textName: ''
    }
  }

  courseCode = this.props.routerStore.courseCode

  allMemosAfterPublishing = [
    ...this.props.routerStore.existingLatestMemos.draftsOfPublishedMemos,
    ...this.props.routerStore.existingLatestMemos.publishedMemos
  ]

  hasMemos = this.allMemosAfterPublishing.length > 0

  langIndex = this.props.routerStore.langIndex

  langAbbr = i18n.isSwedish() ? 'sv' : 'en'

  allSemesters = this.props.routerStore.slicedTermsByPrevYear.shortSemesterList || null // need to define if kopps in error

  setAlarm = (type, textName, isOpen = true) => {
    this.setState({
      alert: {
        type,
        isOpen,
        textName
      }
    })
    if (isOpen) {
      const alertElement = document.getElementById('scroll-here-if-alert')
      alertElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onRadioChange = event => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this.setState({
      chosen: {
        memoEndPoint: value
      }
    })
  }

  onSubmit = () => {
    const { courseCode } = this
    const { chosen } = this.state
    if (chosen.memoEndPoint) {
      const body = { memoEndPoint: chosen.memoEndPoint }

      const url = `${SERVICE_URL.API}create-draft/${this.courseCode}/${body.memoEndPoint}`

      return axios
        .post(url, body)
        .then(result => {
          // ADDD ERROR HANTERING
          const nextStepUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${body.memoEndPoint}`
          window.location = nextStepUrl
        })
        .catch(error => {
          this.setAlarm('danger', 'errWhileSaving')
        })
    }
    this.setAlarm('danger', 'errNoInPublishedChosen')
  }

  render() {
    const { hasMemos, langAbbr, langIndex, allMemosAfterPublishing } = this
    const { alerts, info, pagesChangePublishedPm, pageTitles } = i18n.messages[langIndex]
    const { course } = this.props.routerStore.slicedTermsByPrevYear
    const { alert, chosen } = this.state

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row id="scroll-here-if-alert">
          <PageTitle id="mainHeading" pageTitle={pageTitles.published}>
            <span>
              {this.courseCode +
                ' ' +
                course.title[langAbbr] +
                ' ' +
                course.credits +
                ' ' +
                (langAbbr === 'sv' ? course.creditUnitAbbr.sv : 'credits')}
            </span>
          </PageTitle>
        </Row>

        <ProgressBar active={1} pages={pagesChangePublishedPm} />
        {alert.isOpen && (
          <Row className="w-100 my-0 mx-auto section-50">
            <Alert color={alert.type} isOpen={!!alert.isOpen}>
              {alerts[alert.textName] || ''}
            </Alert>
          </Row>
        )}

        <Container className="First--Step--Choose--Parameters">
          <Row>
            <Col>
              {/* CONTINUE TO EDIT EXISTING DRAFT SO USER HAVE TO CHOOSE ONE */}
              <div className="section-50">
                <h2>{info.choosePublishedMemo}</h2>
                {(hasMemos && (
                  <>
                    <Label htmlFor="choose-existed-memo">
                      {info.chooseRound.publishedMemos.label}
                    </Label>
                    <Label htmlFor="choose-existed-memo">
                      {info.chooseRound.publishedMemos.infoText}
                    </Label>
                    <Form
                      className={`Existed--Memos ${
                        alert.isOpen && alert.textName === 'errNoInPublishedChosen'
                          ? 'error-area'
                          : ''
                      }`}
                      id="choose-existed-memo"
                    >
                      {allMemosAfterPublishing.map(({ memoName, memoEndPoint, status }) => (
                        <FormGroup className="form-select" key={'memo' + memoEndPoint}>
                          <Input
                            type="radio"
                            id={memoEndPoint}
                            name="chooseMemo"
                            value={memoEndPoint}
                            onClick={this.onRadioChange}
                            defaultChecked={memoEndPoint === chosen.memoEndPoint}
                          />
                          <Label htmlFor={memoEndPoint}>
                            {memoName || memoEndPoint + ' (old memo before namegiving)'}
                            {status === 'draft' ? info.publishedHasDraft : ''}
                          </Label>
                        </FormGroup>
                      ))}
                    </Form>
                  </>
                )) || (
                  <p>
                    <i>{info.noPublishedMemos}</i>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <ControlPanel
          langIndex={langIndex}
          hasChosenMemo={chosen.memoEndPoint}
          onSubmit={this.onSubmit}
        />
      </Container>
    )
  }
}

export default ChangePublished
