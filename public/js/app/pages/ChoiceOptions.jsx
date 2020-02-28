/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
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

  allSemesters = this.props.routerStore.allRoundsOfCourseFromKopps.termsWithCourseRounds

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  filterOutUsedRounds = usedRounds => {
    const courseByChosenSemester =
      (this.allSemesters && this.allSemesters.find(objCR => objCR.term === this.state.semester)) ||
      {}
    return (
      (courseByChosenSemester.rounds &&
        courseByChosenSemester.rounds
          .filter(r => !usedRounds.includes(r.ladokRoundId))
          .reverse()) ||
      []
    )
  }

  getDiffMemosBySemester = semester => {
    return axios
      .get(
        '/kursinfoadmin/kurs-pm-data/internal-api/used-rounds/' + this.courseCode + '/' + semester
      )
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
            availableKoppsRoundsObj: this.filterOutUsedRounds(result.data.usedRounds),
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

  onChoice = event => {
    const { checked, value, type } = event.target
    this.setState({ alert: { isOpen: false } })

    const tmpRoundsArr = this.state.chosen.newRounds
    if (type === 'checkbox') {
      if (checked) tmpRoundsArr.push(value)
      else tmpRoundsArr.splice(tmpRoundsArr.indexOf(value), 1)
      this.setState({
        chosen: {
          newRounds: tmpRoundsArr.sort(),
          oneMemo: '',
          action: 'create'
        }
      })
    } else {
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
    const semesterParam = `semester=${this.state.semester}` || ''
    const memoEndPoint = `memoEndPoint=${this.state.chosen.oneMemo}` || ''
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${semesterParam}&${memoEndPoint}` // &${rounds}
    })
  }

  onSubmitNew = () => {
    //   const checkboxForm = new FormData(document.forms[1])
    //   console.log('Form data Existed--Memos--Options', document.forms[1].elements)
    //   console.log('Form data Not--Used--Rounds--Options', document.forms['Not--Used--Rounds--Options'])
    // const { courseCode } = this
    // const { semester, chosen } = this.state
    // if ( chosen.newRounds.length > 0||chosen.memo) {
    //     const body =
    //     chosen.action === 'create' && chosen.newRounds.length > 0
    //         ? {
    //             courseCode,
    //             ladokRoundIds: chosen.newRounds,
    //             memoEndPoint: courseCode + semester + '-' + chosen.newRounds.join('-'),
    //             semester
    //         }
    //         : { memoEndPoint: this.state.chosen.memo }
    //     const url = `/kursinfoadmin/kurs-pm-data/internal-api/create-draft/${body.memoEndPoint}`
    //     console.log('Content is submited, preparing to save changes:', body)
    //     axios.post(url, body).then(() => {
    //     // TO DO: CHECK IT NO ERROR AND THEN REDIRECT
    //     window.location = `/kursinfoadmin/kurs-pm-data/${courseCode}/${semester}/${body.memoEndPoint}`
    //     })
    // } else {
    //     this.setAlarm('danger', 'errNoChosen')
    // }
    //   .then(() => callback())
    //   .catch(error => callback(error))
  }

  render() {
    const { info, pages, pageTitles, buttons } = i18n.messages[1]
    const { course } = this.props.routerStore.allRoundsOfCourseFromKopps
    if (this.state.firstLoad && this.state.semester)
      this.getDiffMemosBySemester(this.state.semester)
    console.log('apiMemosBySemester ', this.state.apiMemosBySemester)
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

        <Container className="sticky-content-section">
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
                {this.state.apiMemosBySemester && this.state.apiMemosBySemester.hasSavedDraft && (
                  <>
                    <p>
                      <b>{info.chooseRound.existedDrafts}</b>
                    </p>
                    <form className="Existed--Memos--Options">
                      <span role="radiogroup" style={{ display: 'flex', flexDirection: 'column' }}>
                        {this.state.apiMemosBySemester.draftMemos.map(
                          ({ ladokRoundIds, memoEndPoint }) => (
                            <label htmlFor={'draft' + memoEndPoint} key={'draft' + memoEndPoint}>
                              <input
                                type="radio"
                                id={'draft' + memoEndPoint}
                                name="chooseDraft"
                                key={'draft' + memoEndPoint}
                                value={memoEndPoint}
                                onClick={this.onChoice}
                                defaultChecked={
                                  this.state.chosen.action === 'copy' &&
                                  memoEndPoint === this.state.chosen.oneMemo
                                }
                              />{' '}
                              {'Kurstillfällesnamn' + ladokRoundIds.join(', Kurstillfällesnamn')}
                            </label>
                          )
                        )}
                      </span>
                    </form>
                  </>
                )}
                {this.state.apiMemosBySemester &&
                  this.state.apiMemosBySemester.availableKoppsRoundsObj && (
                    <>
                      <p>
                        <b>{info.chooseRound.availableRounds}</b>
                      </p>
                      <form className="Not--Used--Rounds--Options">
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                          {this.state.apiMemosBySemester.availableKoppsRoundsObj.map(roundObj => (
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
                                //   onChange={this.onChoice}
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
        <ControlPanel hasSavedDraft={this.state.hasSavedDraft} onSubmit={this.onSubmitNew} />
      </Container>
    )
  }
}

export default ChoiceOptions
