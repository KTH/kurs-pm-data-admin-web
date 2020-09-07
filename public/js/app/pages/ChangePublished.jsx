/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import { combinedCourseName, fetchParameters } from '../util/helpers'
import PropTypes from 'prop-types'

@inject(['routerStore'])
@observer
class ChangePublished extends Component {
  state = {
    chosenMemo: this.props.routerStore.memoEndPoint || '',
    alert: {
      type: '', // danger, success, warn
      isOpen: false,
      textName: ''
    }
  }

  courseCode = this.props.routerStore.courseCode

  memosToEdit = [
    ...(this.props.routerStore.miniMemos.draftsOfPublishedMemos || []),
    ...(this.props.routerStore.miniMemos.publishedWithNoActiveDraft || [])
  ]

  hasMemos = this.memosToEdit.length > 0

  langAbbr = this.props.langAbbr || this.props.routerStore.langAbbr

  langIndex = this.props.langIndex || this.props.routerStore.langIndex

  lastTerms = this.props.routerStore.miniKoppsObj.lastTermsInfo || null // need to define if kopps in error

  urlParams = fetchParameters(this.props)

  eventFromParams = this.urlParams.event || ''

  componentDidMount() {
    const { history } = this.props
    if (history) {
      history.push({
        search: ''
      })
    }
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
      const { scrollIntoView } = document.getElementById('scroll-here-if-alert')
      if (scrollIntoView) scrollIntoView({ behavior: 'smooth' })
    }
  }

  onRadioChange = (event) => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this.setState({
      chosenMemo: value
    })
  }

  onSubmit = async () => {
    const { courseCode, hasMemos } = this
    const { chosenMemo } = this.state
    if (!hasMemos) return this.setAlarm('danger', 'errNoInPublishedChosen')
    const goToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${chosenMemo || ''}`

    const memosProps = await this.memosToEdit.find(
      (published) => published.memoEndPoint === this.state.chosenMemo
    )

    if (memosProps && memosProps.status === 'draft') {
      window.location = goToEditorUrl
    } else if (memosProps && memosProps.status === 'published') {
      const body = { memoEndPoint: chosenMemo }

      const url = `${SERVICE_URL.API}create-draft/${this.courseCode}/${chosenMemo}`

      try {
        const result = await axios.post(url, body)
        if (result.status >= 400) {
          this.setAlarm('danger', 'errWhileSaving')
          return 'ERROR-' + result.status
        }
        window.location = goToEditorUrl
      } catch (error) {
        this.setAlarm('danger', 'errWhileSaving')
      }
    }
  }

  onFinish = () => {
    const { courseCode } = this
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  render() {
    const { hasMemos, langAbbr, langIndex, memosToEdit } = this
    const { alerts, info, pagesChangePublishedPm, pageTitles } = i18n.messages[langIndex]
    const { course } = this.props.routerStore.miniKoppsObj
    const { alert, chosenMemo } = this.state
    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row id="scroll-here-if-alert">
          <PageTitle id="mainHeading" pageTitle={pageTitles.published}>
            <span role="heading" aria-level="4">
              {course && combinedCourseName(this.courseCode, course, langAbbr)}
            </span>
          </PageTitle>
        </Row>

        <ProgressBar active={1} pages={pagesChangePublishedPm} />
        {(alert.isOpen || this.eventFromParams) && (
          <Row className="w-100 my-0 mx-auto section-50 upper-alert">
            <Alert color={alert.type || 'success'} isOpen={!!alert.isOpen || true}>
              {alerts[alert.textName]}
              {alerts[alert.textName] && <br />}

              {this.eventFromParams && alerts[this.eventFromParams]
                ? alerts[this.eventFromParams]
                : ''}
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
                      {memosToEdit.map(({ memoName, memoEndPoint, status }) => (
                        <FormGroup className="form-select" key={'memo' + memoEndPoint}>
                          <Input
                            type="radio"
                            id={memoEndPoint}
                            data-testid="radio-choose-pub-memo"
                            name="chooseMemo"
                            value={memoEndPoint}
                            onClick={this.onRadioChange}
                            defaultChecked={memoEndPoint === chosenMemo}
                          />
                          <Label data-testid="label-radio-choose-pub-memo" htmlFor={memoEndPoint}>
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
          chosenMemoEndPoint={chosenMemo}
          onSubmit={this.onSubmit}
          onCancel={this.onFinish}
          isDraftOfPublished
        />
      </Container>
    )
  }
}

ChangePublished.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  langAbbr: PropTypes.string,
  langIndex: PropTypes.number,
  routerStore: PropTypes.func
}

export default ChangePublished
