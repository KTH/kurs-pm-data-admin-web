/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Container, Row } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import DropdownSemesters from '../components/ChoiceOptions/DropdownSemesters'
import CourseRoundsCheckboxes from '../components/ChoiceOptions/CourseRoundsCheckboxes'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar, TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class ChoiceOptions extends Component {
  state = {
    semester: this.props.routerStore.semester,
    rounds: this.props.routerStore.rounds,
    memoEndPoint: this.props.routerStore.memoEndPoint,
    memoStatus: 'new', // TODO: 'published', 'draft', 'new'
    hasSavedDraft: false
  }

  courseCode = this.props.routerStore.courseCode

  usedRounds = []

  componentWillMount() {
    if (this.state.semester) this.getUsedRounds(this.courseCode, this.state.semester)
  }

  componentDidUpdate() {
    console.log('Update hander')
    if (this.state.semester) this.getUsedRounds(this.courseCode, this.state.semester)
  }

  updateSearchPath = () => {
    const semesterParam = `semester=${this.state.semester}` || ''
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${semesterParam}` // &${rounds}
    })
  }

  getUsedRounds = (courseCode, semester) => {
    return axios
      .get('/kursinfoadmin/kurs-pm-data/internal-api/used-rounds/' + courseCode + '/' + semester)
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        console.log('---------> component get getUsedRounds', result.data)
        this.usedRounds = result.data
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
    const { rounds, semester } = this.state
    const start = {
      courseCode,
      ladokRoundIds: rounds,
      memoEndPoint:
        this.state.memoStatus === 'new'
          ? courseCode + semester + '-' + rounds.join('-')
          : this.state.memoEndPoint,
      semester
    }
    const body = this.state.memoStatus === 'new' ? { ...start } : {}
    const url = `/kursinfoadmin/kurs-pm-data/internal-api/create-draft/${start.memoEndPoint}`

    console.log('Content is submited, preparing to save changes:', start)
    return axios.post(url, body).then(() => {
      window.location = `${this.props.history.location.pathname}/${start.semester}/${start.memoEndPoint}`
    })
    //   .then(() => this.props.routerStore.tempMemoData(body))
    //   .then(() => callback())
    //   .catch(error => callback(error))
    // }
  }

  onUpdateSemester = oneState => {
    this.setState({ ...oneState, rounds: [] }, this.updateSearchPath)
    // .then(()=> this.setState())
    console.log('this state', this.state)
  }

  onUpdateChosenRounds = roundsArr => {
    this.setState(roundsArr)
    this.updateSearchPath()
  }

  render() {
    const { info, pages, pageTitles, buttons } = i18n.messages[1]
    const { course, termsWithCourseRounds } = this.props.routerStore.allRoundsOfCourseFromKopps

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

        <Container className="sticky-content-section">
          <Row>
            <Col>
              <span>
                <TitleAndInfoModal
                  modalId="choose-semester"
                  titleAndInfo={info.chooseSemester}
                  btnClose={buttons.btnClose}
                />
                <DropdownSemesters
                  items={termsWithCourseRounds}
                  semester={this.state.semester}
                  onChoice={this.onUpdateSemester}
                />
              </span>
              <span style={this.state.semester ? { marginTop: '50' } : { display: 'none' }}>
                <TitleAndInfoModal
                  modalId="choose-course-round"
                  titleAndInfo={info.chooseRound}
                  btnClose={buttons.btnClose}
                />
                <p>
                  <b>{info.chooseRound.shortInstructions}</b>
                </p>
                <CourseRoundsCheckboxes
                  items={termsWithCourseRounds}
                  semester={this.state.semester}
                  rounds={this.state.rounds} // TODO: SLOW REACTION ON ROUNDS STATE CHANGE
                  onChoice={this.onUpdateChosenRounds}
                />
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
