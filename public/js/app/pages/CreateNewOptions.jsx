/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
import { combineMemoName, emptyCheckboxesByIds, seasonStr, uncheckRadioById } from '../util/helpers'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import SectionTitleAndInfoModal from '../components/SectionTitleAndInfoModal'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class CreateNewOptions extends Component {
  state = {
    semester: this.props.routerStore.semester,
    copyFromMemoEndPoint: '',
    chosen: {
      action: this.props.routerStore.memoEndPoint ? 'continue' : 'create',
      existingDraftEndPoint: this.props.routerStore.memoEndPoint || '',
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

  existingDraftsByCourseCode = this.props.routerStore.existingLatestMemos
    .draftsWithNoActivePublishedVer

  allPublishedCourseMemos = this.props.routerStore.existingLatestMemos.sortedPublishedForAllYears

  hasSavedDraft = this.existingDraftsByCourseCode.length > 0

  langIndex = this.props.routerStore.langIndex

  langAbbr = i18n.isSwedish() ? 'sv' : 'en'

  allSemesters = this.props.routerStore.slicedTermsByPrevYear.shortSemesterList || null // need to define if kopps in error

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

  _addRoundAndInfo = chosenRoundObj => {
    // move to helper
    // const { firstTuitionDate, ladokRoundId, language, shortName } = chosenRoundObj
    const { ladokRoundId } = chosenRoundObj
    const { sortedRoundIds, sortedKoppsInfo } = this.state.chosen
    sortedRoundIds.push(ladokRoundId)
    const sortedRounds = sortedRoundIds.sort()
    const addIndex = sortedRounds.indexOf(ladokRoundId)
    sortedKoppsInfo.splice(addIndex, 0, chosenRoundObj)
    return { sortedRoundIds, sortedKoppsInfo }
  }

  _removeRoundAndInfo = ladokRoundId => {
    const { sortedRoundIds, sortedKoppsInfo } = this.state.chosen
    const removeIndex = sortedRoundIds.indexOf(ladokRoundId)
    sortedRoundIds.splice(removeIndex, 1)
    sortedKoppsInfo.splice(removeIndex, 1)
    return { sortedRoundIds, sortedKoppsInfo }
  }

  _roundsCommonLanguages = sortedKoppsInfo => {
    /* Get memo language, if at least one round has 'English' as a languageOfInstructions then memo language is English,
    otherwise, if all f.e., have swedish then Swedish. Saved as 'sv', en', used to extract syllabus by this lang */
    const allRoundsLanguages = sortedKoppsInfo.map(round => round.language.en)
    const uniqueLanguages = Array.from(new Set(allRoundsLanguages))
    const memoLanguageInEnglish = uniqueLanguages.length === 1 ? uniqueLanguages[0] : 'English'
    const memoCommonLangAbbr = memoLanguageInEnglish === 'Swedish' ? 'sv' : 'en'
    /* After we get a language of memo, we need to extract string for a student view by chosen above memo language,
    if rounds have different lang, then join those languages ex, Swedish/English */
    const uniqueCourseLanguagesByMemoLang = Array.from(
      new Set(sortedKoppsInfo.map(round => round.language[memoCommonLangAbbr]))
    )
    const languageOfInstructions = uniqueCourseLanguagesByMemoLang.join('/')
    return { memoCommonLangAbbr, languageOfInstructions }
  }

  onSemesterChoice = event => {
    const semester = event.target.value
    const { existingDraftEndPoint } = this.state.chosen
    this.setState({ semester })
    this._cleanUpCheckboxesState(existingDraftEndPoint)
    this.showAvailableSemesterRounds(semester)
  }

  onCheckboxChange = (event, chosenRoundObj) => {
    const { checked, value } = event.target
    const { semester } = this.state
    const { existingDraftEndPoint } = this.state.chosen
    if (existingDraftEndPoint) uncheckRadioById(existingDraftEndPoint) // hhhhheheheh
    const { sortedRoundIds, sortedKoppsInfo } = checked
      ? this._addRoundAndInfo(chosenRoundObj)
      : this._removeRoundAndInfo(value)
    const { memoCommonLangAbbr, languageOfInstructions } = this._roundsCommonLanguages(
      sortedKoppsInfo
    )
    const newMemoName = sortedKoppsInfo // remove
      .map(round => combineMemoName(round, semester, memoCommonLangAbbr)) // document.getElementById('new' + round).parentElement.textContent.trim()
      .join(', ')
    this.setState({
      alert: { isOpen: false },
      chosen: {
        action: 'create',
        languageOfInstructions,
        memoCommonLangAbbr,
        existingDraftEndPoint: '',
        newMemoName,
        sortedRoundIds,
        sortedKoppsInfo
      }
    })
  }

  _cleanUpCheckboxesState = memoEndPoint => {
    console.log('checkbox, ', memoEndPoint)
    const { sortedRoundIds } = this.state.chosen
    emptyCheckboxesByIds(sortedRoundIds, 'new')
    this.setState({
      chosen: {
        action: memoEndPoint ? 'continue' : '', // /'copy'
        existingDraftEndPoint: memoEndPoint || '',
        newMemoName: '',
        sortedRoundIds: [],
        sortedKoppsInfo: []
      }
    })
  }

  onRadioChange = event => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this._cleanUpCheckboxesState(value)
  }

  onCopyOrCreateEmptyChoice = event => {
    const { value } = event.target
    this.setState(
      prevState => ({
        ...prevState,
        chosen: {
          ...prevState.chosen,
          ...{ action: value === 'basedOnAnotherMemo' ? 'copy' : 'create' }
        },
        copyFromMemoEndPoint: ''
      }),
      console.log('state nenenenenenenen', this.state.chosen)
    )
  }

  onChoiceOfMemoToCopy = event => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this.setState({
      copyFromMemoEndPoint: value
    })
  }

  onRemoveDraft = () => {
    return axios
      .delete(
        `${SERVICE_URL.API}draft-to-remove/${this.courseCode}/${this.state.chosen.existingDraftEndPoint}`
      )
      .then(result => {
        if (result.status >= 400) {
          return 'ERROR-' + result.status
        }
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
    const { semester, chosen, copyFromMemoEndPoint } = this.state
    console.log('chosen', chosen.existingDraftEndPoint)
    if (chosen.action === 'copy' && !copyFromMemoEndPoint) {
      this.setAlarm('danger', 'errNoChosenTemplate')
    } else if (chosen.sortedRoundIds.length > 0 || chosen.existingDraftEndPoint) {
      const body =
        chosen.action === 'continue'
          ? { memoEndPoint: chosen.existingDraftEndPoint }
          : {
              courseCode,
              memoName: chosen.newMemoName,
              memoCommonLangAbbr: chosen.memoCommonLangAbbr,
              ladokRoundIds: chosen.sortedRoundIds,
              languageOfInstructions: chosen.languageOfInstructions,
              memoEndPoint: courseCode + semester + '-' + chosen.sortedRoundIds.join('-'),
              semester
            }
      console.log('body', body)

      const url = `${SERVICE_URL.API}create-draft/${this.courseCode}/${body.memoEndPoint}/${
        chosen.action === 'copy' ? 'copyFrom/' + copyFromMemoEndPoint : ''
      }`

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
    } else this.setAlarm('danger', 'errNoChosen')
  }

  onFinish = () => {
    const { courseCode } = this
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  render() {
    const { allSemesters, existingDraftsByCourseCode, hasSavedDraft, langAbbr, langIndex } = this
    const { alerts, info, extraInfo, pagesCreateNewPm, pageTitles, buttons } = i18n.messages[
      langIndex
    ]
    const { course } = this.props.routerStore.slicedTermsByPrevYear
    const { alert, availableSemesterRounds, chosen, semester } = this.state

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row id="scroll-here-if-alert">
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
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

        <ProgressBar active={1} pages={pagesCreateNewPm} />
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
              <div className="subsection-30">
                <SectionTitleAndInfoModal
                  modalId="choose-course-round"
                  titleAndInfo={info.chooseRound}
                  btnClose={buttons.btnClose}
                />
                <h3>{info.chooseSavedDraft}</h3>
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
                            onClick={this.onRadioChange}
                            defaultChecked={
                              chosen.action === 'continue' &&
                              memoEndPoint === chosen.existingDraftEndPoint
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
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>{info.createNew}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* CHOOSE TO CREATE A NEW EMPTY DRAFT OR A NEW ONE COPIED FROM PREVIOUS MEMO */}
              <div>
                <Label htmlFor="choose-semester">{info.chooseSemester.label}</Label>
                {(allSemesters && allSemesters.length > 0 && (
                  <Form style={{ width: '20em' }}>
                    <FormGroup className="form-select" key="select-semester" id="choose-semester">
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
                              {info.chooseSemester.label}
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
                className="first-15"
                style={
                  allSemesters && allSemesters.length > 0 && semester
                    ? { marginTop: '0' }
                    : { display: 'none' }
                }
              >
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
                      {availableSemesterRounds.map(round => (
                        <FormGroup
                          className="form-check"
                          id="choose-from-rounds-list"
                          key={'new' + round.ladokRoundId}
                        >
                          <Input
                            type="checkbox"
                            id={'new' + round.ladokRoundId}
                            name="chooseNew"
                            value={round.ladokRoundId}
                            onClick={event => this.onCheckboxChange(event, round)}
                            defaultChecked={false}
                          />
                          <Label htmlFor={'new' + round.ladokRoundId}>
                            {/* Namegiving according to user interface language */}
                            {combineMemoName(round, semester, langAbbr)}
                          </Label>
                        </FormGroup>
                      ))}
                    </Form>
                  </>
                )) || (
                  <p>
                    <i>{info.noCourseRoundsAvailable}</i>
                  </p>
                )}
              </div>
            </Col>
            {chosen.sortedRoundIds.length > 0 && chosen.action !== 'continue' && (
              <Col>
                {/* CREATE FROM EMPTY OF COPY FROM */}
                <div>
                  <Label htmlFor="choose-action">{info.createFrom.labelBasedOn}</Label>
                  <Form id="choose-action">
                    {['basedOnStandard', 'basedOnAnotherMemo'].map(templateType => (
                      <FormGroup className="form-select" key={templateType}>
                        <Input
                          type="radio"
                          id={templateType}
                          name="copyOrCreateEmpty"
                          value={templateType}
                          onClick={this.onCopyOrCreateEmptyChoice}
                          defaultChecked={
                            chosen.action === 'create' && templateType === 'basedOnStandard'
                          }
                        />
                        <Label htmlFor={templateType}>{info.createFrom[templateType]}</Label>
                      </FormGroup>
                    ))}
                  </Form>
                </div>
                {chosen.action === 'copy' &&
                  ((this.allPublishedCourseMemos.length > 0 && (
                    <>
                      <Label htmlFor="choose-previously-published-memo">
                        {info.createFrom.labelAllPrevMemos}
                      </Label>
                      <Label htmlFor="choose-previously-published-memo">
                        {info.createFrom.infoTextForMemos}
                      </Label>
                      <Form
                        className={`Existing--Published--Memos ${
                          alert.isOpen && alert.textName === 'errNoChosenTemplate'
                            ? 'error-area'
                            : ''
                        }`}
                        id="choose-previously-published-memo"
                      >
                        {this.allPublishedCourseMemos.map(({ memoName, memoEndPoint }) => (
                          <FormGroup className="form-select" key={'published' + memoEndPoint}>
                            <Input
                              type="radio"
                              id={memoEndPoint}
                              name="choosePublished"
                              value={memoEndPoint}
                              onClick={this.onChoiceOfMemoToCopy}
                              defaultChecked={false}
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
                      <i>{info.noPrevPublishedAvailable}</i>
                    </p>
                  ))}
              </Col>
            )}
          </Row>
        </Container>
        <ControlPanel
          langIndex={langIndex}
          hasChosenMemo={chosen.existingDraftEndPoint}
          onCancel={this.onFinish}
          onRemove={this.onRemoveDraft}
          onSubmit={this.onSubmitNew}
        />
      </Container>
    )
  }
}

export default CreateNewOptions
