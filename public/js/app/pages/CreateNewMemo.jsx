/* eslint-disable react/require-default-props */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { SERVICE_URL } from '../util/constants'
import {
  combinedCourseName,
  combineMemoName,
  emptyCheckboxesByIds,
  seasonStr,
  sortRoundAndKoppsInfo,
  removeAndSortRoundAndInfo,
  uncheckRadioById,
  fetchParameters
} from '../util/helpers'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import SectionTitleAndInfoModal from '../components/SectionTitleAndInfoModal'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import PropTypes from 'prop-types'

@inject(['routerStore'])
@observer
class CreateNewMemo extends Component {
  state = {
    action: this.props.routerStore.memoEndPoint ? 'continue' : '',
    semester: this.props.routerStore.semester,
    copyFromMemoEndPoint: '',
    chosen: {
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

  urlParams = fetchParameters(this.props)

  eventFromParams = this.urlParams.event || ''

  courseCode = this.props.routerStore.courseCode

  existingDrafts = this.props.routerStore.miniMemos.draftsWithNoActivePublishedVer

  allPublishedCourseMemos = this.props.routerStore.miniMemos.sortedPublishedForAllYears

  hasSavedDraft = this.existingDrafts.length > 0

  langAbbr = this.props.langAbbr || this.props.routerStore.langAbbr

  langIndex = this.props.langIndex || this.props.routerStore.langIndex

  lastTerms = this.props.routerStore.miniKoppsObj.lastTermsInfo || null // need to define if kopps in error

  componentDidMount() {
    const { history } = this.props
    if (history) {
      history.push({
        search: ''
      })
    }
  }

  onChoiceOfSemester = async (event) => {
    const semester = event.target.value
    const { existingDraftEndPoint } = this.state.chosen
    this.setState({ semester })
    this._cleanUpCheckboxesState(existingDraftEndPoint)
    const availableSemesterRounds = await this.props.routerStore.showAvailableSemesterRounds(
      semester
    )
    this.setState({
      availableSemesterRounds
    })
  }

  _roundsCommonLanguages = (sortedKoppsInfo) => {
    /* Get memo language, if at least one round has 'English' as a languageOfInstructions then memo language is English,
    otherwise, if all f.e., have swedish then Swedish. Saved as 'sv', en', used to extract syllabus by this lang */
    const allRoundsLanguages = sortedKoppsInfo.map((round) => round.language.en)
    const uniqueLanguages = Array.from(new Set(allRoundsLanguages))
    const memoLanguage = uniqueLanguages.length === 1 ? uniqueLanguages[0] : 'English'
    const memoCommonLangAbbr = memoLanguage === 'Swedish' ? 'sv' : 'en'
    /* After we get a language of memo, we need to extract string for a student view by chosen above memo language,
    if rounds have different lang, then join those languages ex, Swedish/English */
    const uniqueCourseLanguagesByMemoLang = Array.from(
      new Set(sortedKoppsInfo.map((round) => round.language[memoCommonLangAbbr]))
    )
    const languageOfInstructions = uniqueCourseLanguagesByMemoLang.join('/')
    return { memoCommonLangAbbr, languageOfInstructions }
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

  onChoiceOfAvailableRounds = (event, chosenRoundObj) => {
    const { checked, value } = event.target
    const { semester } = this.state
    const { existingDraftEndPoint } = this.state.chosen
    if (existingDraftEndPoint) uncheckRadioById(existingDraftEndPoint)
    const { sortedRoundIds, sortedKoppsInfo } = checked
      ? sortRoundAndKoppsInfo(chosenRoundObj, this.state.chosen)
      : removeAndSortRoundAndInfo(value, this.state.chosen)

    const { memoCommonLangAbbr, languageOfInstructions } = this._roundsCommonLanguages(
      sortedKoppsInfo
    )
    const newMemoName = sortedKoppsInfo // remove
      .map((round) => combineMemoName(round, semester, memoCommonLangAbbr)) // document.getElementById('new' + round).parentElement.textContent.trim()
      .join(', ')
    this.setState({
      action: 'create',
      alert: { isOpen: false },
      chosen: {
        languageOfInstructions,
        memoCommonLangAbbr,
        existingDraftEndPoint: '',
        newMemoName,
        sortedRoundIds,
        sortedKoppsInfo
      }
    })
  }

  _cleanUpCheckboxesState = (memoEndPoint) => {
    const { sortedRoundIds } = this.state.chosen
    emptyCheckboxesByIds(sortedRoundIds, 'new')
    this.setState({
      action: memoEndPoint ? 'continue' : '',
      chosen: {
        existingDraftEndPoint: memoEndPoint || '',
        newMemoName: '',
        sortedRoundIds: [],
        sortedKoppsInfo: []
      }
    })
  }

  onChoiceOfExistingDraft = (event) => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this._cleanUpCheckboxesState(value)
  }

  onChoiceOfToCopyOrCreateEmpty = (event) => {
    const { value } = event.target
    this.setState({
      action: value === 'basedOnAnotherMemo' ? 'copy' : 'create', // /'copy'
      copyFromMemoEndPoint: ''
    })
  }

  onChoiceOfMemoToCopy = (event) => {
    const { value } = event.target
    this.setState({ alert: { isOpen: false } })
    this.setState({
      copyFromMemoEndPoint: value
    })
  }

  onRemoveDraft = async () => {
    try {
      const resultAfterDelete = await axios.delete(
        `${SERVICE_URL.API}draft-to-remove/${this.courseCode}/${this.state.chosen.existingDraftEndPoint}`
      )
      if (resultAfterDelete.status >= 400) {
        this.setAlarm('danger', 'errWhileSaving')
        return 'ERROR-CreateNewMemo.jsx-onRemoveDraft -' + resultAfterDelete.status
      }
      window.location.reload()
    } catch (err) {
      this.setAlarm('danger', 'errWhileSaving')
      if (err.response) {
        throw new Error('CreateNewMemo.jsx-onRemoveDraft-' + err.message)
      }
      throw err
    }
  }

  onSubmitNew = async () => {
    const { courseCode } = this
    const { course } = this.props.routerStore.miniKoppsObj
    const { action, semester, chosen, copyFromMemoEndPoint } = this.state
    const { newMemoName, memoCommonLangAbbr, sortedRoundIds } = chosen

    if (action === 'copy' && !copyFromMemoEndPoint) {
      // if chosen to copy but not a template to copy from
      this.setAlarm('danger', 'errNoChosenTemplate')
    } else if (action === 'continue' && chosen.existingDraftEndPoint) {
      // Draft exists just go to next step
      const continueToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${chosen.existingDraftEndPoint}`
      window.location = continueToEditorUrl
    } else if (sortedRoundIds.length > 0 && !chosen.existingDraftEndPoint) {
      const courseTitle = combinedCourseName(courseCode, course, memoCommonLangAbbr)

      // Create new draft from chosen semester rounds
      const body = {
        courseCode,
        courseTitle,
        memoName: newMemoName,
        memoCommonLangAbbr,
        ladokRoundIds: sortedRoundIds,
        languageOfInstructions: chosen.languageOfInstructions,
        memoEndPoint: courseCode + semester + '-' + sortedRoundIds.join('-'),
        semester
      }

      try {
        const result = await this.props.routerStore.postNewMemo(action, copyFromMemoEndPoint, body)
        if (result.status >= 400) {
          this.setAlarm('danger', 'errWhileSaving')
          return 'ERROR-' + result.status
        }
        const goToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${body.memoEndPoint}${
          action === 'copy' ? '?event=copy' : ''
        }`
        window.location = goToEditorUrl
        return result
      } catch (error) {
        this.setAlarm('danger', 'errWhileSaving')
      }
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
    const { lastTerms, existingDrafts, hasSavedDraft, langAbbr, langIndex } = this
    const { alerts, info, pagesCreateNewPm, pageTitles, buttons } = i18n.messages[langIndex]
    const { course } = this.props.routerStore.miniKoppsObj

    const { action, alert, availableSemesterRounds, chosen, semester } = this.state

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row id="scroll-here-if-alert">
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span role="heading" aria-level="4">
              {course && combinedCourseName(this.courseCode, course, langAbbr)}
            </span>
          </PageTitle>
        </Row>

        <ProgressBar active={1} pages={pagesCreateNewPm} />
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
                      {existingDrafts.map(({ memoName, memoEndPoint }) => (
                        <FormGroup
                          className="form-select"
                          key={'draftType' + (memoEndPoint || Math.random())}
                        >
                          <Input
                            type="radio"
                            data-testid="radio-choose-saved-draft"
                            id={memoEndPoint}
                            name="chooseDraft"
                            value={memoEndPoint}
                            onClick={this.onChoiceOfExistingDraft}
                            defaultChecked={
                              action === 'continue' && memoEndPoint === chosen.existingDraftEndPoint
                            }
                          />
                          <Label htmlFor={memoEndPoint} data-testid="label-saved-draft-radio">
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
              {/* CHOOSE COURSE OFFERING WITH NO MEMOS */}
              <div>
                <Label htmlFor="choose-semester">{info.chooseSemester.label}</Label>
                {(lastTerms && lastTerms.length > 0 && (
                  <Form style={{ width: '20em' }} data-testid="form-select-terms">
                    <FormGroup className="form-select" key="select-semester" id="choose-semester">
                      <div className="select-wrapper">
                        <select
                          className="custom-select"
                          data-testid="select-terms"
                          id="term-list"
                          onChange={this.onChoiceOfSemester}
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
                          {lastTerms.map(({ term }) => (
                            <option
                              data-testid="select-option"
                              id={`itemFor-${term}`}
                              key={term}
                              value={term}
                            >
                              {seasonStr(langIndex, term)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormGroup>
                  </Form>
                )) || (
                  <p>
                    <i>{(lastTerms && info.noSemesterAvailable) || info.errKoppsRounds}</i>
                  </p>
                )}
              </div>
              {/* CHOOSE COURSE ROUNDS FOR THE CHOOSEN SEMESTER ABOVE */}
              <div
                data-testid="new-course-offering"
                className="first-15"
                style={
                  lastTerms && lastTerms.length > 0 && semester
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
                      {availableSemesterRounds.map((round) => (
                        <FormGroup
                          data-testid="form-choose-new"
                          className="form-check"
                          id="choose-from-rounds-list"
                          key={'new' + round.ladokRoundId}
                        >
                          <Input
                            type="checkbox"
                            data-testid="checkbox-choose-available-round"
                            id={'new' + round.ladokRoundId}
                            name="chooseNew"
                            value={round.ladokRoundId}
                            onClick={(event) => this.onChoiceOfAvailableRounds(event, round)}
                            defaultChecked={false}
                          />
                          <Label
                            htmlFor={'new' + round.ladokRoundId}
                            data-testid="label-checkbox-choose-available-round"
                          >
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
            {chosen.sortedRoundIds.length > 0 && action !== 'continue' && (
              <Col className="right-block-for-extra">
                {/* CREATE FROM EMPTY OF COPY FROM */}
                <div className="Start--Creating--From--Template--Or--Copy">
                  <Label htmlFor="choose-action">{info.createFrom.labelBasedOn}</Label>
                  <Form id="choose-action">
                    {['basedOnStandard', 'basedOnAnotherMemo'].map((templateType) => (
                      <FormGroup className="form-select" key={templateType}>
                        <Input
                          type="radio"
                          id={templateType}
                          data-testid="copy-radio"
                          name="copyOrCreateEmpty"
                          value={templateType}
                          onClick={this.onChoiceOfToCopyOrCreateEmpty}
                          defaultChecked={action === 'create' && templateType === 'basedOnStandard'}
                        />
                        <Label data-testid="label-copy-radio" htmlFor={templateType}>
                          {info.createFrom[templateType]}
                        </Label>
                      </FormGroup>
                    ))}
                  </Form>
                </div>
                {action === 'copy' &&
                  ((this.allPublishedCourseMemos.length > 0 && (
                    <div className="first-15 Start--Creating--From--Copy">
                      <Label className="first-15" htmlFor="choose-previously-published-memo">
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
                    </div>
                  )) || (
                    <p className="subsection-30">
                      <i>{info.noPrevPublishedAvailable}</i>
                    </p>
                  ))}
              </Col>
            )}
          </Row>
        </Container>
        <ControlPanel
          langIndex={langIndex}
          chosenMemoEndPoint={chosen.existingDraftEndPoint}
          onCancel={this.onFinish}
          onRemove={this.onRemoveDraft}
          onSubmit={this.onSubmitNew}
        />
        <div data-testid="test-data" style={{ display: 'none' }}>
          <p data-testid="actionType">{action}</p>
          <p data-testid="newMemoName">{chosen.newMemoName}</p>
          <p data-testid="memoCommonLangAbbr">{chosen.memoCommonLangAbbr}</p>
          <p data-testid="sortedRoundIds">{chosen.sortedRoundIds.join(',')}</p>
        </div>
      </Container>
    )
  }
}

CreateNewMemo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  langAbbr: PropTypes.string,
  langIndex: PropTypes.number,
  miniKoppsObj: PropTypes.exact({
    course: PropTypes.string.isRequired,
    lastTermsInfo: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired
  }),
  routerStore: PropTypes.func
}

export default CreateNewMemo
