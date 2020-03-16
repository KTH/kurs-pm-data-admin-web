/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
import {
  Alert,
  Col,
  Container,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar, TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class ChoiceOptions extends Component {
  state = {
    semester: this.props.routerStore.semester,
    dropdownOpen: false,
    chosen: {
      action: this.props.routerStore.memoEndPoint ? 'copy' : 'create',
      apiMemo: this.props.routerStore.memoEndPoint || '',
      newMemoName: '',
      newRounds: this.props.routerStore.rounds || []
    },
    alert: {
      type: '', // danger, success, warn
      isOpen: false,
      text: ''
    },
    firstLoad: true,
    availableSemesterRounds: [] // this.props.infoBySemester.getUsedRounds(this.props.routerStore.semester)
  }

  courseCode = this.props.routerStore.courseCode

  existingDraftsByCourseCode = this.props.routerStore.existingLatestMemos.draftMemos

  hasSavedDraft = this.existingDraftsByCourseCode.length > 0

  langIndex = this.props.routerStore.langIndex

  langAbbr = i18n.isSwedish() ? 'sv' : 'en'

  allSemesters = this.props.routerStore.slicedTermsByPrevYear.shortSemesterList

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  _filterOutUsedRounds = usedRoundsThisSemester => {
    console.log('use usedRoundsThisSemester', usedRoundsThisSemester)
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

  existingMemosForThisSemester = semester => {
    // move to helper steg 1
    return axios
      .get(`${SERVICE_URL.API}used-rounds/${this.courseCode}/${semester}`)
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        console.log('---------> api existingMemosForThisSemester', result.data)
        const { usedRoundsThisSemester } = result.data
        this.setState({
          firstLoad: false,
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

  setAlarm = (type, textIndex, isOpen = true) => {
    const { alerts } = i18n.messages[this.langIndex]
    this.setState({
      alert: {
        type,
        isOpen,
        text: alerts[textIndex]
      }
    })
  }

  _uncheckRadio = () => {
    // move to helper
    const { apiMemo } = this.state.chosen
    const memoElem = document.getElementById(apiMemo)
    if (apiMemo && memoElem && memoElem.checked) document.getElementById(apiMemo).checked = false
  }

  _uncheckCheckboxes = () => {
    // move to helper
    const { newRounds } = this.state.chosen
    newRounds.map(ladokRoundId => {
      const checkboxId = 'new' + ladokRoundId
      document.getElementById(checkboxId).checked = false
    })
  }

  _sortedRoundsArray = (checked, value) => {
    // move to helper
    const tmpRoundsArr = this.state.chosen.newRounds
    if (checked) tmpRoundsArr.push(value)
    else tmpRoundsArr.splice(tmpRoundsArr.indexOf(value), 1)
    return tmpRoundsArr.sort()
  }

  onSemesterChoice = event => {
    const semester = event.target.value
    console.log(semester)
    this.setState(
      { semester },
      this.updateSearchPath('semester', semester),
      this.existingMemosForThisSemester(semester)
    )
  }

  onChoiceActions = event => {
    const { checked, value, type } = event.target
    this.setState({ alert: { isOpen: false } })

    if (type === 'checkbox') {
      this._uncheckRadio()
      const newRounds = this._sortedRoundsArray(checked, value)
      const newMemoName = newRounds
        .map(ladokRoundId =>
          document.getElementById('new' + ladokRoundId).parentElement.textContent.trim()
        )
        .join(', ')
      console.log('newMemoName', newMemoName)
      this.setState(
        {
          chosen: {
            action: 'create',
            apiMemo: '',
            newMemoName,
            newRounds
          }
        },
        this.updateSearchPath('semester', this.state.semester)
      )
    } else {
      this._uncheckCheckboxes()
      this.setState(
        {
          chosen: {
            action: 'copy',
            apiMemo: value,
            newMemoName: '',
            newRounds: []
          }
        },
        this.setAlarm('info', 'warnReplacePm'),
        this.updateSearchPath('memoEndPoint', value)
      )
    }
  }

  getDateFormat = (date, language) => {
    // move to helpers functions
    if (language === 'Svenska' || language === 'Engelska' || language === 1 || language === 'sv') {
      return date
    }
    const splitDate = date.split('-')
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
  }

  updateSearchPath = (parameter, value) => {
    // move to helpers functions
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${parameter}=${value}` // &${rounds}
    })
  }

  onSubmitNew = () => {
    const { courseCode } = this
    const { semester, chosen } = this.state
    console.log('on submit chosen ', this.state)
    if (chosen.newRounds.length > 0 || chosen.apiMemo) {
      const body =
        chosen.action === 'create'
          ? {
              courseCode,
              memoName: chosen.newMemoName,
              ladokRoundIds: chosen.newRounds,
              memoEndPoint: courseCode + semester + '-' + chosen.newRounds.join('-'),
              semester
            }
          : { memoEndPoint: this.state.chosen.apiMemo }
      const url = `${SERVICE_URL.API}create-draft/${body.memoEndPoint}`

      axios
        .post(url, body)
        .then(result => {
          console.log('Submitted', result)
          const nextStepUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${semester}/${body.memoEndPoint}`
          window.location = nextStepUrl
        })
        .catch(error => {
          this.setAlarm('danger', 'errWhileSaving')
        })
    } else {
      this.setAlarm('danger', 'errNoChosen')
    }
    //   .then(() => callback())
  }

  render() {
    const { info, extraInfo, pages, pageTitles, buttons } = i18n.messages[this.langIndex]
    const { course } = this.props.routerStore.slicedTermsByPrevYear
    if (this.state.firstLoad && this.state.semester)
      this.existingMemosForThisSemester(this.state.semester)

    const { availableSemesterRounds } = this.state
    console.log('******availableSemesterRounds ', availableSemesterRounds)
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

        <ProgressBar active={1} pages={pages} />
        <Row className="w-100 my-0 mx-auto">
          <Alert color={this.state.alert.type} isOpen={!!this.state.alert.isOpen}>
            {this.state.alert.text || ''}
          </Alert>
        </Row>

        <Container className="First--Step--Choose--Parameters">
          <Row>
            <Col>
              {/* CONTINUE TO EDIT EXISTING DRAFT SO USER HAVE TO CHOOSE ONE */}
              <span>
                <h2>{info.chooseSavedDraft}</h2>
                {(this.hasSavedDraft && (
                  <>
                    <p>
                      <b>{info.chooseRound.existedDrafts}</b>
                    </p>
                    <form className="Existed--Memos--Options">
                      <span role="radiogroup" style={{ display: 'flex', flexDirection: 'column' }}>
                        {this.existingDraftsByCourseCode.map(({ memoName, memoEndPoint }) => (
                          <label htmlFor={memoEndPoint} key={'draft' + memoEndPoint}>
                            <input
                              type="radio"
                              id={memoEndPoint}
                              name="chooseDraft"
                              key={'draft' + memoEndPoint}
                              value={memoEndPoint}
                              onClick={this.onChoiceActions}
                              defaultChecked={
                                this.state.chosen.action === 'copy' &&
                                memoEndPoint === this.state.chosen.apiMemo
                              }
                            />
                            {memoName || memoEndPoint + ' (old memo before namegiving)'}
                          </label>
                        ))}
                      </span>
                    </form>
                  </>
                )) || (
                  <p>
                    <i>{info.noSavedDrafts}</i>
                  </p>
                )}
              </span>
              {/* CHOOSE TO CREATE A NEW EMPTY DRAFT OR A NEW ONE COPIED FROM PREVIOUS MEMO */}
              <span>
                <h2>{info.createNew}</h2>
                <TitleAndInfoModal
                  modalId="choose-semester"
                  titleAndInfo={info.chooseSemester}
                  btnClose={buttons.btnClose}
                />
                {(this.allSemesters.length > 0 && (
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    className="select-semester"
                  >
                    <DropdownToggle caret>
                      {this.state.semester ? 'Vald termin: ' + this.state.semester : 'Välj termin'}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.allSemesters.map(({ term }) => (
                        <DropdownItem
                          id={`itemFor-${term}`}
                          key={term}
                          onClick={this.onSemesterChoice}
                          value={term}
                        >
                          {term}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )) || (
                  <p>
                    <i>{info.noSemesterAvailable}</i>
                  </p>
                )}
              </span>
              {/* CHOOSE COURSE ROUNDS FOR THE CHOOSEN SEMESTER ABOVE */}
              <span
                style={
                  this.allSemesters.length > 0 && this.state.semester
                    ? { marginTop: '50' }
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
                    <p>
                      <b>{info.chooseRound.availableRounds}</b>
                    </p>
                    <form className="Not--Used--Rounds--Options">
                      <span style={{ display: 'flex', flexDirection: 'column' }}>
                        {availableSemesterRounds.map(
                          ({ firstTuitionDate, ladokRoundId, language, shortName }) => (
                            <label htmlFor={'new' + ladokRoundId} key={'new' + ladokRoundId}>
                              <input
                                type="checkbox"
                                id={'new' + ladokRoundId}
                                name="chooseNew"
                                key={'new' + ladokRoundId}
                                value={ladokRoundId}
                                onClick={this.onChoiceActions}
                                defaultChecked={false}
                              />
                              {/* Namegiving to new rounds which will be saved to api */}
                              {shortName
                                ? shortName + ' '
                                : `${
                                    extraInfo.courseShortSemester[
                                      this.state.semester.toString().match(/.{1,4}/g)[1]
                                    ]
                                  } 
                                ${
                                  this.state.semester.toString().match(/.{1,4}/g)[0]
                                }-${ladokRoundId} `}
                              {`(${extraInfo.labelStartDate} ${this.getDateFormat(
                                firstTuitionDate,
                                language[this.langAbbr]
                              )}, ${language[this.langAbbr]})`}
                            </label>
                          )
                        )}
                      </span>
                    </form>
                  </>
                )) || (
                  <p>
                    <i>{info.noCourseRoundsAvailable}</i>
                  </p>
                )}
              </span>
            </Col>
          </Row>
        </Container>
        <ControlPanel hasSavedDraft={this.hasSavedDraft} onSubmit={this.onSubmitNew} />
      </Container>
    )
  }
}

export default ChoiceOptions
