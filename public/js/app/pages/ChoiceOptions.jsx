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
      newRounds: this.props.routerStore.rounds || [],
      oneMemo: this.props.routerStore.memoEndPoint || '',
      action: this.props.routerStore.memoEndPoint ? 'copy' : 'create'
    },
    alert: {
      type: '', // danger, success, warn
      isOpen: false,
      text: ''
    },
    firstLoad: true,
    apiMemosBySemester: {} // this.props.apiMemosBySemester.getUsedRounds(this.props.routerStore.semester)
  }

  courseCode = this.props.routerStore.courseCode

  allSemesters = this.props.routerStore.slicedTermsByPrevYear.shortSemesterList

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  _filterOutUsedRounds = usedRounds => {
    const courseByChosenSemester =
      (this.allSemesters && this.allSemesters.find(objCR => objCR.term === this.state.semester)) ||
      {}
    return (
      (courseByChosenSemester &&
        courseByChosenSemester.rounds &&
        courseByChosenSemester.rounds
          .filter(r => !usedRounds.includes(r.ladokRoundId))
          .reverse()) ||
      []
    )
  }

  getDiffMemosBySemester = semester => {
    console.log(
      '************>>>>>>>>>>*>>>>>>*>*>*>*>*>*>*><*<*<*<>*>*>******* SERVICE_URL ',
      SERVICE_URL
    )
    return axios
      .get(`${SERVICE_URL.API}used-rounds/${this.courseCode}/${semester}`)
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        console.log('---------> api getDiffMemosBySemester', result.data)
        this.setState({
          firstLoad: false,
          apiMemosBySemester: {
            // updates on semester change
            publishedMemos: result.data.publishedMemos,
            draftMemos: result.data.draftMemos,
            usedRounds: result.data.usedRounds,
            availableKoppsRoundsObj: this._filterOutUsedRounds(result.data.usedRounds),
            hasSavedDraft: result.data.usedRounds.length > 0
          }
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
    const { alerts } = i18n.messages[1]
    this.setState({
      alert: {
        type,
        isOpen,
        text: alerts[textIndex]
      }
    })
  }

  _uncheckRadio = () => {
    const { oneMemo } = this.state.chosen
    const memoElem = document.getElementById(oneMemo)
    if (oneMemo && memoElem && memoElem.checked) document.getElementById(oneMemo).checked = false
  }

  _uncheckCheckboxes = () => {
    const { newRounds } = this.state.chosen
    newRounds.map(ladokRoundId => {
      const checkboxId = 'new' + ladokRoundId
      document.getElementById(checkboxId).checked = false
    })
  }

  _sortedRoundsArray = (checked, value) => {
    const tmpRoundsArr = this.state.chosen.newRounds
    if (checked) tmpRoundsArr.push(value)
    else tmpRoundsArr.splice(tmpRoundsArr.indexOf(value), 1)
    return tmpRoundsArr.sort()
  }

  onChoice = event => {
    const { checked, value, type } = event.target
    this.setState({ alert: { isOpen: false } })

    if (type === 'checkbox') {
      this._uncheckRadio()
      const newRounds = this._sortedRoundsArray(checked, value)
      this.setState({
        chosen: {
          newRounds,
          oneMemo: '',
          action: 'create'
        }
      })
    } else {
      this._uncheckCheckboxes()
      this.setState(
        {
          chosen: {
            newRounds: [],
            oneMemo: value,
            action: 'copy'
          }
        },
        this.setAlarm('info', 'warnReplacePm')
      )
    }
  }

  updateSearchPath = () => {
    const semesterParam = (this.state.semester && `semester=${this.state.semester}`) || ''
    const memoEndPoint =
      (this.state.chosen.oneMemo && `memoEndPoint=${this.state.chosen.oneMemo}`) || ''
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${semesterParam}&${memoEndPoint}` // &${rounds}
    })
  }

  onSubmitNew = () => {
    const { courseCode } = this
    const { semester, chosen } = this.state
    console.log('on submit chosen ', this.state)
    if (chosen.newRounds.length > 0 || chosen.oneMemo) {
      const body =
        chosen.action === 'create' && chosen.newRounds.length > 0
          ? {
              courseCode,
              ladokRoundIds: chosen.newRounds,
              memoEndPoint: courseCode + semester + '-' + chosen.newRounds.join('-'),
              semester
            }
          : { memoEndPoint: this.state.chosen.oneMemo }
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
    const { info, extraInfo, pages, pageTitles, buttons } = i18n.messages[1]
    const { course } = this.props.routerStore.slicedTermsByPrevYear
    if (this.state.firstLoad && this.state.semester)
      this.getDiffMemosBySemester(this.state.semester)

    const {
      availableKoppsRoundsObj,
      hasSavedDraft,
      draftMemos,
      publishedMemos
    } = this.state.apiMemosBySemester
    console.log('SERVICE_URL apiMemosBySemester ', SERVICE_URL.API, this.state.apiMemosBySemester)
    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span>
              {this.courseCode +
                ' ' +
                course.title.sv +
                ' ' +
                course.credits +
                ' ' +
                (i18n.isSwedish() ? course.creditUnitAbbr.sv : 'credits')}
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
              <span>
                <TitleAndInfoModal
                  modalId="choose-semester"
                  titleAndInfo={info.chooseSemester}
                  btnClose={buttons.btnClose}
                />
                <Dropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                  className="select-semester"
                >
                  <DropdownToggle caret>
                    {this.state.semester ? 'Vald termin: ' + this.state.semester : 'Välj termin'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.allSemesters &&
                      this.allSemesters.map(obj => (
                        <DropdownItem
                          id={`itemFor-${obj.term}`}
                          key={obj.term}
                          onClick={() => {
                            this.setState(
                              { semester: obj.term },
                              this.updateSearchPath,
                              this.getDiffMemosBySemester(obj.term)
                            )
                          }}
                        >
                          {obj.term}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </span>
              <span style={this.state.semester ? { marginTop: '50' } : { display: 'none' }}>
                <TitleAndInfoModal
                  modalId="choose-course-round"
                  titleAndInfo={info.chooseRound}
                  btnClose={buttons.btnClose}
                />
                {hasSavedDraft && (
                  <>
                    <p>
                      <b>{info.chooseRound.existedDrafts}</b>
                    </p>
                    <form className="Existed--Memos--Options">
                      <span role="radiogroup" style={{ display: 'flex', flexDirection: 'column' }}>
                        {[...draftMemos, ...publishedMemos].map(
                          ({ ladokRoundIds, memoEndPoint, status }) => (
                            <label htmlFor={memoEndPoint} key={'draft' + memoEndPoint}>
                              <input
                                type="radio"
                                id={memoEndPoint}
                                name="chooseDraft"
                                key={'draft' + memoEndPoint}
                                value={memoEndPoint}
                                onClick={this.onChoice}
                                defaultChecked={
                                  this.state.chosen.action === 'copy' &&
                                  memoEndPoint === this.state.chosen.oneMemo
                                }
                              />{' '}
                              {'Kurstillfällesnamn' + ladokRoundIds.join(', Kurstillfällesnamn')}{' '}
                              {status === 'published' ? ` (${extraInfo.hasSavedDraft})` : ''}
                            </label>
                          )
                        )}
                      </span>
                    </form>
                  </>
                )}
                {availableKoppsRoundsObj && (
                  <>
                    <p>
                      <b>{info.chooseRound.availableRounds}</b>
                    </p>
                    <form className="Not--Used--Rounds--Options">
                      <span style={{ display: 'flex', flexDirection: 'column' }}>
                        {availableKoppsRoundsObj.map(roundObj => (
                          <label
                            htmlFor={'new' + roundObj.ladokRoundId}
                            key={'new' + roundObj.ladokRoundId}
                          >
                            <input
                              type="checkbox"
                              id={'new' + roundObj.ladokRoundId}
                              name="chooseNew"
                              key={'new' + roundObj.ladokRoundId}
                              value={roundObj.ladokRoundId}
                              onClick={this.onChoice}
                              defaultChecked={false}
                            />{' '}
                            {'Kurstillfällesnamn' +
                              roundObj.ladokRoundId +
                              ' ' +
                              roundObj.shortName}
                          </label>
                        ))}
                      </span>
                    </form>
                  </>
                )}
              </span>
            </Col>
          </Row>
        </Container>
        <ControlPanel hasSavedDraft={hasSavedDraft} onSubmit={this.onSubmitNew} />
      </Container>
    )
  }
}

export default ChoiceOptions
