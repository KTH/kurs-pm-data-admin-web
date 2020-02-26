/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
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
    apiMemosBySemester: {} // this.props.apiMemosBySemester.getUsedRounds(this.props.routerStore.semester)
  }

  chosen = {
    newRounds: this.props.routerStore.rounds || [],
    memo: this.props.routerStore.memoEndPoint || '',
    action: this.props.routerStore.memoEndPoint ? 'copy' : 'create'
  }

  courseCode = this.props.routerStore.courseCode

  allSemesters = this.props.routerStore.allRoundsOfCourseFromKopps.termsWithCourseRounds

  //   componentDidUpdate() {
  //     console.log('Update hander')
  //     if (this.state.semester ) this.getUsedRounds(this.state.semester)
  //   }

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

  getUsedRounds = semester => {
    return axios
      .get(
        '/kursinfoadmin/kurs-pm-data/internal-api/used-rounds/' + this.courseCode + '/' + semester
      )
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
        console.log('---------> api getUsedRounds', result.data)
        this.setState({
          apiMemosBySemester: {
            // updates on semester change
            publishedMemos: result.data.publishedMemos,
            draftMemos: result.data.draftMemos,
            usedRounds: result.data.usedRounds,
            availableRounds: this.filterOutUsedRounds(result.data.usedRounds),
            hasSavedDraft: result.data.usedRounds.length > 0
          }
        })
        console.log('After Get Used Rounds ', this.state.apiMemosBySemester)
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.message)
        }
        throw err
      })
  }

  onChoice = event => {
    const { checked, value, type } = event.target
    console.log('type ', type)
    const tmpRoundsArr = this.chosen.newRounds
    if (type === 'checkbox') {
      if (checked) tmpRoundsArr.push(value)
      else tmpRoundsArr.splice(tmpRoundsArr.indexOf(value), 1)
      this.chosen = {
        newRounds: tmpRoundsArr.sort(),
        memo: '',
        action: 'create'
      }
    } else {
      this.chosen = {
        newRounds: [],
        memo: value,
        action: 'copy'
      }
    }
  }

  updateSearchPath = () => {
    const semesterParam = `semester=${this.state.semester}` || ''
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${semesterParam}` // &${rounds}
    })
  }

  onSubmitNew = () => {
    const { courseCode, chosen } = this
    const { semester } = this.state
    const body =
      this.state.action === 'create'
        ? {
            courseCode,
            ladokRoundIds: chosen.newRounds,
            memoEndPoint: courseCode + semester + '-' + chosen.newRounds.join('-'),
            semester
          }
        : { memoEndPoint: this.state.chosenMemo }
    const url = `/kursinfoadmin/kurs-pm-data/internal-api/create-draft/${body.memoEndPoint}`

    console.log('Content is submited, preparing to save changes:', body)
    return axios.post(url, body).then(() => {
      // TO DO: CHECK IT NO ERROR AND THEN REDIRECT
      window.location = `/kursinfoadmin/kurs-pm-data/${courseCode}/${semester}/${body.memoEndPoint}`
    })
    //   .then(() => callback())
    //   .catch(error => callback(error))
  }

  render() {
    const { info, pages, pageTitles, buttons } = i18n.messages[1]
    const { course } = this.props.routerStore.allRoundsOfCourseFromKopps
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
                              this.getUsedRounds(this.state.semester)
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
                    <form className="Picture--Options input-label-row">
                      <span role="radiogroup">
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
                                defaultChecked={memoEndPoint === this.chosen.memo}
                              />{' '}
                              {'Kurstillfällesnamn' + ladokRoundIds.join(', Kurstillfällesnamn')}
                            </label>
                          )
                        )}
                      </span>
                    </form>
                  </>
                )}

                <p>
                  <b>{info.chooseRound.availableRounds}</b>
                </p>
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
