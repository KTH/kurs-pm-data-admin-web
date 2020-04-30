/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
import { combineMemoName, seasonStr } from '../util/helpers'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar, TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class ChangePublished extends Component {
  state = {
    semester: this.props.routerStore.semester,
    chosen: {
      action: this.props.routerStore.memoEndPoint ? 'copy' : 'create',
      memoEndPoint: this.props.routerStore.memoEndPoint || '',
      newMemoName: '',
      sortedRoundIds: this.props.routerStore.rounds || [],
      sortedKoppsInfo: [] // use it for next step
    },
    alert: {
      type: '', // danger, success, warn
      isOpen: false,
      textName: ''
    },
    availableSemesterRounds: []
  }

  courseCode = this.props.routerStore.courseCode

  publishedMemosWithActiveDraft = this.props.routerStore.existingLatestMemos
    .publishedMemosWithActiveDraft

  publishedMemosNoDraft = this.props.routerStore.existingLatestMemos.publishedMemos

  hasMemos = this.publishedMemosWithActiveDraft.length > 0 || this.publishedMemosNoDraft.length > 0

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

  _filterOutUsedRounds = usedRoundsThisSemester => {
    const thisSemester =
      (this.allSemesters && this.allSemesters.find(({ term }) => term === this.state.semester)) ||
      {}
    return (
      (thisSemester &&
        thisSemester.rounds &&
        thisSemester.rounds
          .filter(r => !usedRoundsThisSemester.includes(r.ladokRoundId))
          .reverse()) ||
      []
    )
  }

  showAvailableSemesterRounds = semester => {
    return axios
      .get(`${SERVICE_URL.API}used-rounds/${this.courseCode}/${semester}`)
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        const { usedRoundsThisSemester } = result.data
        this.setState({
          // updates on semester change
          availableSemesterRounds: this._filterOutUsedRounds(usedRoundsThisSemester)
        })
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.message)
        }
        throw err
      })
  }

  _uncheckRadio = () => {
    // move to helper
    const { memoEndPoint } = this.state.chosen
    const memoElem = document.getElementById(memoEndPoint)
    this.props.history.push({ search: '' })
    if (memoEndPoint && memoElem && memoElem.checked)
      document.getElementById(memoEndPoint).checked = false
  }

  onRadioChange = event => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this._uncheckCheckboxes()
    this.setState({
      chosen: {
        action: 'copy',
        memoEndPoint: value,
        newMemoName: '',
        sortedRoundIds: [],
        sortedKoppsInfo: []
      }
    })
  }

  onRemoveDraft = () => {
    return axios
      .delete(
        `${SERVICE_URL.API}draft-to-remove/${this.courseCode}/${this.state.chosen.memoEndPoint}`
      )
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        this.props.history.push({ search: '' })
        window.location.reload()
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.message)
        }
        throw err
      })
  }

  onSubmitNew = () => {
    const { courseCode } = this
    const { semester, chosen } = this.state
    console.log('on submit chosen ', this.state)
    console.log('body', chosen.languageOfInstructions)
    if (chosen.sortedRoundIds.length > 0 || chosen.memoEndPoint) {
      const body =
        chosen.action === 'create'
          ? {
              courseCode,
              memoName: chosen.newMemoName,
              memoCommonLangAbbr: chosen.memoCommonLangAbbr,
              ladokRoundIds: chosen.sortedRoundIds,
              languageOfInstructions: chosen.languageOfInstructions,
              memoEndPoint: courseCode + semester + '-' + chosen.sortedRoundIds.join('-'),
              semester
            }
          : { memoEndPoint: chosen.memoEndPoint }

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
    this.setAlarm('danger', 'errNoChosen')
  }

  render() {
    const {
      hasMemos,
      langAbbr,
      langIndex,
      publishedMemosWithActiveDraft,
      publishedMemosNoDraft
    } = this
    const { alerts, info, extraInfo, pagesChangePublishedPm, pageTitles, buttons } = i18n.messages[
      langIndex
    ]
    const { course } = this.props.routerStore.slicedTermsByPrevYear
    const { alert, chosen, semester } = this.state

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
                        alert.isOpen && alert.textName === 'errNoChosen' ? 'error-area' : ''
                      }`}
                      id="choose-existed-memo"
                    >
                      {publishedMemosWithActiveDraft.map(({ memoName, memoEndPoint }) => (
                        <FormGroup className="form-select" key={'draftForPublished' + memoEndPoint}>
                          <Input
                            type="radio"
                            id={memoEndPoint}
                            name="chooseMemo"
                            value={memoEndPoint}
                            onClick={this.onRadioChange}
                            // defaultChecked={
                            //   chosen.action === 'copy' && memoEndPoint === chosen.memoEndPoint
                            // }
                          />
                          <Label htmlFor={memoEndPoint}>
                            {memoName || memoEndPoint + ' (old memo before namegiving)'}
                          </Label>
                        </FormGroup>
                      ))}
                      {publishedMemosNoDraft.map(({ memoName, memoEndPoint }) => (
                        <FormGroup className="form-select" key={'publishedMemo' + memoEndPoint}>
                          <Input
                            type="radio"
                            id={memoEndPoint}
                            name="chooseMemo"
                            value={memoEndPoint}
                            onClick={this.onRadioChange}
                            // defaultChecked={
                            //   chosen.action === 'copy' && memoEndPoint === chosen.memoEndPoint
                            // }
                          />
                          <Label htmlFor={memoEndPoint}>
                            {memoName || memoEndPoint + ' (old memo before namegiving)'}
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
          onRemove={this.onRemoveDraft}
          onSubmit={this.onSubmitNew}
        />
      </Container>
    )
  }
}

export default ChangePublished
