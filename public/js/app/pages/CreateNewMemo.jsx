/* eslint-disable react/require-default-props */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import { SERVICE_URL } from '../util/constants'
import {
  combinedCourseName,
  combineMemoName,
  emptyCheckboxesByIds,
  seasonStr,
  sortRoundAndKoppsInfo,
  removeAndSortRoundAndInfo,
  uncheckRadioById,
  fetchParameters,
} from '../util/helpers'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import SectionTitleAndInfoModal from '../components/SectionTitleAndInfoModal'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import PropTypes from 'prop-types'

function CreateNewMemo(props) {
  const store = useStore()
  const {
    courseCode,
    memoEndPoint: initialMemoEndPoint,
    miniKoppsObj,
    miniMemos,
    langAbbr: storeLangAbbr,
    langIndex: storeLangIndex,
    rounds,
    semester: initialSemester,
  } = store

  const [semester, setSemester] = useState(initialSemester)
  const [action, setAction] = useState(initialMemoEndPoint ? 'continue' : '')
  const [copyFromMemoEndPoint, setTemplateMemoEndPoint] = useState('')
  const [chosenSemesterAvailableRounds, setAvailableRounds] = useState([])

  const [chosen, setChosen] = useState({
    existingDraftEndPoint: initialMemoEndPoint || '',
    newMemoName: '',
    sortedRoundIds: rounds || [],
    sortedKoppsInfo: [], // use it for next step
  })
  const [alert, setAlert] = useState({
    type: '', // danger, success, warn
    isOpen: false,
    textName: '',
  })

  console.log('chosenSemesterAvailableRounds', chosenSemesterAvailableRounds)

  const urlParams = fetchParameters(props)
  const eventFromParams = urlParams.event || ''

  const allPublishedCourseMemos = miniMemos.sortedPublishedForAllYears

  const existingDrafts = miniMemos.draftsWithNoActivePublishedVer
  const hasSavedDraft = existingDrafts.length > 0

  const langAbbr = props.langAbbr || storeLangAbbr
  const langIndex = props.langIndex || storeLangIndex

  const { course, lastTermsInfo: lastTerms = null } = miniKoppsObj

  const { alerts, info, pagesCreateNewPm, pageTitles, buttons } = i18n.messages[langIndex]

  useEffect(() => {
    const { history } = props
    if (history) {
      history.push({
        search: '',
      })
    }
  }, [])

  useEffect(() => {
    if (!semester) {
      return
    }
    store.showAvailableSemesterRounds(semester).then(setAvailableRounds)
  }, [semester])

  const onChoiceOfSemester = event => {
    const newSemester = event.target.value
    const { existingDraftEndPoint } = chosen
    setSemester(newSemester)
    _cleanUpPrevCheckboxesState(existingDraftEndPoint)
  }

  const _roundsCommonLanguages = sortedKoppsInfo => {
    /* Get memo language, if at least one round has 'English' as a languageOfInstructions then memo language is English,
    otherwise, if all f.e., have swedish then Swedish. Saved as 'sv', en', used to extract syllabus by this lang */
    const allRoundsLanguages = sortedKoppsInfo.map(round => round.language.en)
    const uniqueLanguages = Array.from(new Set(allRoundsLanguages))
    const memoLanguage = uniqueLanguages.length === 1 ? uniqueLanguages[0] : 'English'
    const memoCommonLangAbbr = memoLanguage === 'Swedish' ? 'sv' : 'en'
    /* After we get a language of memo, we need to extract string for a student view by chosen above memo language,
    if rounds have different lang, then join those languages ex, Swedish/English */
    const uniqueCourseLanguagesByMemoLang = Array.from(
      new Set(sortedKoppsInfo.map(round => round.language[memoCommonLangAbbr]))
    )
    const languageOfInstructions = uniqueCourseLanguagesByMemoLang.join('/')
    return { memoCommonLangAbbr, languageOfInstructions }
  }

  function setAlarm(type, textName, isOpen = true) {
    setAlert({
      type,
      isOpen,
      textName,
    })
    if (isOpen) {
      const { scrollIntoView } = document.getElementById('scroll-here-if-alert')
      if (scrollIntoView) scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onChoiceOfAvailableRounds = (event, chosenRoundObj) => {
    const { checked, value } = event.target
    const { existingDraftEndPoint } = chosen
    if (existingDraftEndPoint) uncheckRadioById(existingDraftEndPoint)
    const { sortedRoundIds, sortedKoppsInfo } = checked
      ? sortRoundAndKoppsInfo(chosenRoundObj, chosen)
      : removeAndSortRoundAndInfo(value, chosen)

    const { memoCommonLangAbbr, languageOfInstructions } = _roundsCommonLanguages(sortedKoppsInfo)
    const newMemoName = sortedKoppsInfo // remove
      .map(round => combineMemoName(round, semester, memoCommonLangAbbr)) // document.getElementById('new' + round).parentElement.textContent.trim()
      .join(', ')
    setAction('create')
    setAlert({ isOpen: false })
    setChosen({
      languageOfInstructions,
      memoCommonLangAbbr,
      existingDraftEndPoint: '',
      newMemoName,
      sortedRoundIds,
      sortedKoppsInfo,
    })
  }

  const _cleanUpPrevCheckboxesState = memoEndPoint => {
    const { sortedRoundIds } = chosen
    emptyCheckboxesByIds(sortedRoundIds, 'new')
    setAction(memoEndPoint ? 'continue' : '')
    setChosen({
      existingDraftEndPoint: memoEndPoint || '',
      newMemoName: '',
      sortedRoundIds: [],
      sortedKoppsInfo: [],
    })
  }

  const onChoiceOfExistingDraft = event => {
    const { value } = event.target
    setAlert({ isOpen: false })
    _cleanUpPrevCheckboxesState(value)
  }

  const onChoiceOfToCopyOrCreateEmpty = event => {
    const { value } = event.target
    setAction(value === 'basedOnAnotherMemo' ? 'copy' : 'create')
    setTemplateMemoEndPoint('')
  }

  const onChoiceOfMemoToCopy = event => {
    const { value } = event.target
    setAlert({ isOpen: false })
    setTemplateMemoEndPoint(value)
  }

  const onRemoveDraft = async () => {
    try {
      const resultAfterDelete = await axios.delete(
        `${SERVICE_URL.API}draft-to-remove/${courseCode}/${chosen.existingDraftEndPoint}`
      )
      if (resultAfterDelete.status >= 400) {
        setAlarm('danger', 'errWhileSaving')
        return 'ERROR-CreateNewMemo.jsx-onRemoveDraft -' + resultAfterDelete.status
      }
      window.location.reload()
    } catch (err) {
      setAlarm('danger', 'errWhileSaving')
      if (err.response) {
        throw new Error('CreateNewMemo.jsx-onRemoveDraft-' + err.message)
      }
      throw err
    }
  }

  const onSubmitNew = async () => {
    const { existingDraftEndPoint, newMemoName, memoCommonLangAbbr, sortedRoundIds } = chosen

    if (action === 'copy' && !copyFromMemoEndPoint) {
      // if chosen to copy but not a template to copy from
      setAlarm('danger', 'errNoChosenTemplate')
    } else if (action === 'continue' && existingDraftEndPoint) {
      // Draft exists just go to next step
      const continueToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${existingDraftEndPoint}`
      window.location = continueToEditorUrl
    } else if (sortedRoundIds.length > 0 && !existingDraftEndPoint) {
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
        semester,
      }

      try {
        const result = await store.postNewMemo(action, copyFromMemoEndPoint, body)
        if (result.status >= 400) {
          setAlarm('danger', 'errWhileSaving')
          return 'ERROR-' + result.status
        }
        const goToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${body.memoEndPoint}${
          action === 'copy' ? '?event=copy' : ''
        }`
        window.location = goToEditorUrl
        return result
      } catch (error) {
        setAlarm('danger', 'errWhileSaving')
      }
    } else setAlarm('danger', 'errNoChosen')
  }

  const onFinish = () => {
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  return (
    <Container className="kip-container" style={{ marginBottom: '115px' }}>
      <Row id="scroll-here-if-alert">
        <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
          <span role="heading" aria-level="4">
            {course && combinedCourseName(courseCode, course, langAbbr)}
          </span>
        </PageTitle>
      </Row>

      <ProgressBar active={1} pages={pagesCreateNewPm} />
      {(alert.isOpen || eventFromParams) && (
        <Row className="w-100 my-0 mx-auto section-50 upper-alert">
          <Alert color={alert.type || 'success'} isOpen={!!alert.isOpen || true}>
            {alerts[alert.textName]}
            {alerts[alert.textName] && <br />}

            {eventFromParams && alerts[eventFromParams] ? alerts[eventFromParams] : ''}
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
                  <Label htmlFor="choose-existed-memo">{info.chooseRound.existedDrafts.label}</Label>
                  <Label htmlFor="choose-existed-memo">{info.chooseRound.existedDrafts.infoText}</Label>
                  <Form
                    className={`Existed--Memos ${alert.isOpen && alert.textName === 'errNoChosen' ? 'error-area' : ''}`}
                    id="choose-existed-memo"
                  >
                    {existingDrafts.map(({ memoName, memoEndPoint }) => (
                      <FormGroup className="form-select" key={'draftType' + (memoEndPoint || Math.random())}>
                        <Input
                          type="radio"
                          data-testid="radio-choose-saved-draft"
                          id={memoEndPoint}
                          name="chooseDraft"
                          value={memoEndPoint}
                          onClick={onChoiceOfExistingDraft}
                          defaultChecked={action === 'continue' && memoEndPoint === chosen.existingDraftEndPoint}
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
                        onChange={onChoiceOfSemester}
                        defaultValue="PLACEHOLDER"
                      >
                        {!semester && (
                          <option key="no-chosen" defaultValue="PLACEHOLDER" style={{ display: 'none' }}>
                            {info.chooseSemester.label}
                          </option>
                        )}
                        {lastTerms.map(({ term }) => (
                          <option data-testid="select-option" id={`itemFor-${term}`} key={term} value={term}>
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
              style={lastTerms && lastTerms.length > 0 && semester ? { marginTop: '0' } : { display: 'none' }}
            >
              {(chosenSemesterAvailableRounds.length > 0 && (
                <>
                  <Label className="first-15" htmlFor="choose-from-rounds-list">
                    {info.chooseRound.availableRounds.label}
                  </Label>
                  <Label htmlFor="choose-from-rounds-list">{info.chooseRound.availableRounds.infoText}</Label>
                  <Form className={alert.isOpen && alert.textName === 'errNoChosen' ? 'error-area' : ''}>
                    {chosenSemesterAvailableRounds.map(round => (
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
                          onClick={event => onChoiceOfAvailableRounds(event, round)}
                          defaultChecked={false}
                        />
                        <Label htmlFor={'new' + round.ladokRoundId} data-testid="label-checkbox-choose-available-round">
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
                  {['basedOnStandard', 'basedOnAnotherMemo'].map(templateType => (
                    <FormGroup className="form-select" key={templateType}>
                      <Input
                        type="radio"
                        id={templateType}
                        data-testid="copy-radio"
                        name="copyOrCreateEmpty"
                        value={templateType}
                        onClick={onChoiceOfToCopyOrCreateEmpty}
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
                ((allPublishedCourseMemos.length > 0 && (
                  <div className="first-15 Start--Creating--From--Copy">
                    <Label className="first-15" htmlFor="choose-previously-published-memo">
                      {info.createFrom.labelAllPrevMemos}
                    </Label>
                    <Label htmlFor="choose-previously-published-memo">{info.createFrom.infoTextForMemos}</Label>
                    <Form
                      className={`Existing--Published--Memos ${
                        alert.isOpen && alert.textName === 'errNoChosenTemplate' ? 'error-area' : ''
                      }`}
                      id="choose-previously-published-memo"
                    >
                      {allPublishedCourseMemos.map(({ memoName, memoEndPoint }) => (
                        <FormGroup className="form-select" key={'published' + memoEndPoint}>
                          <Input
                            type="radio"
                            id={memoEndPoint}
                            name="choosePublished"
                            value={memoEndPoint}
                            onClick={onChoiceOfMemoToCopy}
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
        onCancel={onFinish}
        onRemove={onRemoveDraft}
        onSubmit={onSubmitNew}
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

CreateNewMemo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  langAbbr: PropTypes.string,
  langIndex: PropTypes.number,
  miniKoppsObj: PropTypes.exact({
    course: PropTypes.string.isRequired,
    lastTermsInfo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
      .isRequired,
  }),
}

export default CreateNewMemo
