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
import { fetchParameters } from '../util/helpers'

@inject(['routerStore'])
@observer
class ChangePublished extends Component {
  state = {
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

  uniqueMemosAfterPublishing = [
    ...this.props.routerStore.miniMemos.draftsOfPublishedMemos,
    ...this.props.routerStore.miniMemos.publishedWithNoActiveDraft
  ]

  hasMemos = this.uniqueMemosAfterPublishing.length > 0

  langIndex = this.props.routerStore.langIndex

  langAbbr = i18n.isSwedish() ? 'sv' : 'en'

  lastTerms = this.props.routerStore.miniKoppsObj.lastTermsInfo || null // need to define if kopps in error

  urlParams = fetchParameters(this.props)
  
  eventFromParams = this.urlParams.event || ''

  componentDidMount() {
    this.props.history.push({
      search: ''
    })
  }

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
      const memo = this.uniqueMemosAfterPublishing.find(memo => memo.memoEndPoint === chosen.memoEndPoint)
      
      if (memo && memo.status === 'draft') {
        const nextStepUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${chosen.memoEndPoint}`
        window.location = nextStepUrl
      } else {
        const body = { memoEndPoint: chosen.memoEndPoint }

        const url = `${SERVICE_URL.API}create-draft/${this.courseCode}/${chosen.memoEndPoint}`

        return axios
          .post(url, body)
          .then(result => {
            // ADDD ERROR HANTERING
            const nextStepUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${chosen.memoEndPoint}`
            window.location = nextStepUrl
          })
          .catch(error => {
            this.setAlarm('danger', 'errWhileSaving')
          })
      }
    }
    else this.setAlarm('danger', 'errNoInPublishedChosen')
  }

  onFinish = () => {
    const { courseCode } = this
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  render() {
    const { hasMemos, langAbbr, langIndex, uniqueMemosAfterPublishing } = this
    const { alerts, info, pagesChangePublishedPm, pageTitles } = i18n.messages[langIndex]
    const { course } = this.props.routerStore.miniKoppsObj
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
        {alert.isOpen || this.eventFromParams && (
          <Row className="w-100 my-0 mx-auto section-50">
            <Alert color={alert.type || 'success'} isOpen={!!alert.isOpen || true}>
              {alerts[alert.textName] || alerts[this.eventFromParams] ||''}
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
                      {uniqueMemosAfterPublishing.map(({ memoName, memoEndPoint, status }) => (
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
          chosenMemoEndPoint={chosen.memoEndPoint}
          onSubmit={this.onSubmit}
          onCancel={this.onFinish}
          isDraftOfPublished
        />
      </Container>
    )
  }
}

export default ChangePublished
