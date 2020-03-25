/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
import { seasonStr, getDateFormat } from '../util/helpers'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar, TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class ChoiceOptions extends Component {
  state = {
    semester: this.props.routerStore.semester,
    chosen: {
      action: this.props.routerStore.memoEndPoint ? 'copy' : 'create',
      memoEndPoint: this.props.routerStore.memoEndPoint || '',
      newMemoName: '',
      newRounds: this.props.routerStore.rounds || []
    },
    alert: {
      type: '', // danger, success, warn
      isOpen: false,
      textName: ''
    },
    availableSemesterRounds: []
  }

  courseCode = this.props.routerStore.courseCode

  existingDraftsByCourseCode = this.props.routerStore.existingLatestMemos.draftMemos

  hasSavedDraft = this.existingDraftsByCourseCode.length > 0

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
      alertElement.scrollIntoView()
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

  _uncheckCheckboxes = () => {
    // move to helper
    const { newRounds } = this.state.chosen
    newRounds.map(ladokRoundId => {
      const checkboxId = 'new' + ladokRoundId
      document.getElementById(checkboxId).checked = false
    })
  }

  _addRoundAndSort = (checked, value) => {
    // move to helper
    const { newRounds } = this.state.chosen
    if (checked) newRounds.push(value)
    else newRounds.splice(newRounds.indexOf(value), 1)
    return newRounds.sort()
  }

  onSemesterChoice = event => {
    const semester = event.target.value
    this.setState({ semester })
    this.showAvailableSemesterRounds(semester)
  }

  onChoiceActions = event => {
    const { checked, value, type } = event.target
    this.setState({ alert: { isOpen: false } })

    if (type === 'checkbox') {
      this._uncheckRadio()
      const newRounds = this._addRoundAndSort(checked, value)
      const newMemoName = newRounds
        .map(ladokRoundId =>
          document.getElementById('new' + ladokRoundId).parentElement.textContent.trim()
        )
        .join(', ')
      this.setState({
        chosen: {
          action: 'create',
          memoEndPoint: '',
          newMemoName,
          newRounds
        }
      })
    } else {
      this._uncheckCheckboxes()
      this.setState({
        chosen: {
          action: 'copy',
          memoEndPoint: value,
          newMemoName: '',
          newRounds: []
        }
      })
    }
  }

  onRemoveDraft = () => {
    return axios
      .delete(`${SERVICE_URL.API}draft-to-remove/${this.state.chosen.memoEndPoint}`)
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
    if (chosen.newRounds.length > 0 || chosen.memoEndPoint) {
      const body =
        chosen.action === 'create'
          ? {
              courseCode,
              memoName: chosen.newMemoName,
              ladokRoundIds: chosen.newRounds,
              languageOfInstructions: chosen.languageOfInstructions,
              memoEndPoint: courseCode + semester + '-' + chosen.newRounds.join('-'),
              semester
            }
          : { memoEndPoint: chosen.memoEndPoint }
      const url = `${SERVICE_URL.API}create-draft/${body.memoEndPoint}`

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
    const { alerts, info, extraInfo, pages, pageTitles, buttons } = i18n.messages[this.langIndex]
    const { course } = this.props.routerStore.slicedTermsByPrevYear
    const { allSemesters, existingDraftsByCourseCode, hasSavedDraft } = this
    const { alert, availableSemesterRounds, chosen, semester } = this.state

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span>
              {this.courseCode +
                ' ' +
                course.title[this.langAbbr] +
                ' ' +
                course.credits +
                ' ' +
                (this.langAbbr === 'sv' ? course.creditUnitAbbr.sv : 'credits')}
            </span>
          </PageTitle>
        </Row>

        <ProgressBar active={1} pages={pages} id="scroll-here-if-alert" />
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
                <h2>{info.chooseSavedDraft}</h2>
                {(hasSavedDraft && (
                  <>
                    <Label htmlFor="choose-existed-memo">
                      {info.chooseRound.existedDrafts.label}
                    </Label>
                    <Label htmlFor="choose-existed-memo">
                      {info.chooseRound.existedDrafts.infoText}
                    </Label>
                    <Form
                      className={`Existed--Memos ${
                        alert.isOpen && alert.textName === 'errNoChosen' ? 'error-area' : ''
                      }`}
                      id="choose-existed-memo"
                    >
                      {existingDraftsByCourseCode.map(({ memoName, memoEndPoint }) => (
                        <FormGroup className="form-select" key={'draft' + memoEndPoint}>
                          <Input
                            type="radio"
                            id={memoEndPoint}
                            name="chooseDraft"
                            value={memoEndPoint}
                            onClick={this.onChoiceActions}
                            defaultChecked={
                              chosen.action === 'copy' && memoEndPoint === chosen.memoEndPoint
                            }
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
                    <i>{info.noSavedDrafts}</i>
                  </p>
                )}
              </div>
              {/* CHOOSE TO CREATE A NEW EMPTY DRAFT OR A NEW ONE COPIED FROM PREVIOUS MEMO */}
              <div className="section-50">
                <h2>{info.createNew}</h2>
                <TitleAndInfoModal
                  modalId="choose-semester"
                  titleAndInfo={info.chooseSemester}
                  btnClose={buttons.btnClose}
                />
                {(allSemesters && allSemesters.length > 0 && (
                  <Form style={{ width: '20em' }}>
                    <FormGroup className="form-select first-15" key="select-semester">
                      <div className="select-wrapper">
                        <select
                          className="custom-select"
                          id="term-list"
                          onChange={this.onSemesterChoice}
                          defaultValue="PLACEHOLDER"
                        >
                          {!semester && (
                            <option
                              key="no-chosen"
                              defaultValue="PLACEHOLDER"
                              style={{ display: 'none' }}
                            >
                              {info.chooseSemester.header}
                            </option>
                          )}
                          {allSemesters.map(({ term }) => (
                            <option id={`itemFor-${term}`} key={term} value={term}>
                              {seasonStr(extraInfo, term)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormGroup>
                  </Form>
                )) || (
                  <p>
                    <i>{(allSemesters && info.noSemesterAvailable) || info.errKoppsRounds}</i>
                  </p>
                )}
              </div>
              {/* CHOOSE COURSE ROUNDS FOR THE CHOOSEN SEMESTER ABOVE */}
              <div
                className="subsection-30"
                style={
                  allSemesters && allSemesters.length > 0 && semester
                    ? { marginTop: '0' }
                    : { display: 'none' }
                }
              >
                <TitleAndInfoModal
                  modalId="choose-course-round"
                  titleAndInfo={info.chooseRound}
                  btnClose={buttons.btnClose}
                />
                {(availableSemesterRounds.length > 0 && (
                  <>
                    <Label className="first-15" htmlFor="choose-from-rounds-list">
                      {info.chooseRound.availableRounds.label}
                    </Label>
                    <Label htmlFor="choose-from-rounds-list">
                      {info.chooseRound.availableRounds.infoText}
                    </Label>
                    <Form
                      className={
                        alert.isOpen && alert.textName === 'errNoChosen' ? 'error-area' : ''
                      }
                    >
                      {availableSemesterRounds.map(
                        ({ firstTuitionDate, ladokRoundId, language, shortName }) => (
                          <FormGroup
                            className="form-check"
                            id="choose-from-rounds-list"
                            key={'new' + ladokRoundId}
                          >
                            <Input
                              type="checkbox"
                              id={'new' + ladokRoundId}
                              name="chooseNew"
                              value={ladokRoundId}
                              onClick={this.onChoiceActions}
                              defaultChecked={false}
                            />
                            <Label htmlFor={'new' + ladokRoundId}>
                              {/* Namegiving to new rounds which will be saved to api */}
                              {shortName
                                ? shortName + ' '
                                : `${seasonStr(extraInfo, semester)}-${ladokRoundId} `}
                              {`(${extraInfo.labelStartDate} ${getDateFormat(
                                firstTuitionDate,
                                language[this.langAbbr]
                              )}, ${language[this.langAbbr]})`}
                            </Label>
                          </FormGroup>
                        )
                      )}
                    </Form>
                  </>
                )) || (
                  <p>
                    <i>{info.noCourseRoundsAvailable}</i>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <ControlPanel
          langIndex={this.langIndex}
          hasChosenMemo={chosen.memoEndPoint}
          onRemove={this.onRemoveDraft}
          onSubmit={this.onSubmitNew}
        />
      </Container>
    )
  }
}

export default ChoiceOptions
