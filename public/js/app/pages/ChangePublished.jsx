/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

import PropTypes from 'prop-types'
import { useStore } from '../mobx'

import { SERVICE_URL } from '../util/constants'
import PageHeading from '../components-shared/PageHeading'
import ProgressBar from '../components-shared/ProgressBar'
import ControlPanel from '../components/ControlPanel'
import SectionHeadingAsteriskModal from '../components/SectionHeadingAsteriskModal'
import i18n from '../../../../i18n'

import { combinedCourseName, fetchParameters, seasonStr } from '../util/helpers'

function cleanMemoEndPointInSearchParams(existingDraftEndPoint, semester) {
  if (!existingDraftEndPoint) return
  const { href, search } = window.location
  const matchSearch = `memoEndPoint=${existingDraftEndPoint}&semester=${semester}&`
  if (search && search.includes(matchSearch)) {
    const searchLeftovers = `${search}`.replace(matchSearch, '')
    let url = `${href}`

    if (searchLeftovers === '?') url = url.replace(`?${matchSearch}`, '')
    else url = url.replace(`${matchSearch}`, '')

    window.history.replaceState({}, '', url)
  }
}
function ChangePublished(props) {
  const {
    courseCode,
    memoEndPoint: initialMemoEndPoint,
    miniKoppsObj,
    miniMemos,
    langAbbr: storeLangAbbr,
    langIndex: storeLangIndex,
    semester: initialSemester,
  } = useStore()

  const { langAbbr = storeLangAbbr, langIndex = storeLangIndex } = props
  const [chosenMemo, setMemo] = useState({ existingDraftEndPoint: initialMemoEndPoint || '', memoStatus: '' })
  const [alert, setAlert] = useState({
    type: '', // danger, success, warn
    isOpen: false,
    textName: '',
  })
  const [term, setTerm] = useState(initialSemester)

  const memosToEdit = [
    ...(miniMemos.draftsOfPublishedMemos || []),
    ...(miniMemos.publishedWithNoActiveDraft || []),
    ...(miniMemos.draftsWithNoActivePublishedVer || []),
  ]

  const hasMemos = memosToEdit.length > 0

  const urlParams = fetchParameters(props)

  const eventFromParams = urlParams.event || ''

  const event = 'pm_published'

  const { alerts, info, pagesChangePublishedPm, pageTitles, buttons } = i18n.messages[langIndex]
  const { course, lastTermsInfo: lastTerms = null } = miniKoppsObj

  const termWithPm = lastTerms.filter(t => memosToEdit.find(memo => memo.semester === t.term))

  useEffect(() => {
    const { search } = window.location
    const urlParamsWithinEffect = fetchParameters(window)
    const matchSearch = `event=addedRoundId`
    const eventDelete = `event=deleteUnsavedChanges`
    const eventSavedDraft = `event=savedDraft`
    const { semester, memoEndPoint } = urlParamsWithinEffect

    if (
      (search && search.toString().includes(matchSearch)) ||
      (search && search.toString().includes(eventSavedDraft))
    ) {
      setTerm(semester)
      setMemo({ existingDraftEndPoint: memoEndPoint, memoStatus: 'draft' })
    }
    if (search && search.toString().includes(eventDelete)) setTerm(semester)
    if (semester && memoEndPoint) cleanMemoEndPointInSearchParams(memoEndPoint, semester)
  }, [])

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

  const onRadioChange = (event, status) => {
    const { value } = event.target
    setAlert({ isOpen: false })
    setMemo({ existingDraftEndPoint: value, memoStatus: status })
  }

  const onRemoveDraft = async () => {
    try {
      const resultAfterDelete = await axios.delete(
        `${SERVICE_URL.API}draft-to-remove/${courseCode}/${chosenMemo.existingDraftEndPoint}`
      )
      if (resultAfterDelete.status >= 400) {
        setAlarm('danger', 'errWhileSaving')
        return 'ERROR-CreateNewMemo.jsx-onRemoveDraft -' + resultAfterDelete.status
      }
      const eventFromParams = 'deleteUnsavedChanges'
      const reloadUrl = `${SERVICE_URL.courseMemoAdmin}published/${courseCode}?memoEndPoint=${chosenMemo.existingDraftEndPoint}&semester=${term}&event=${eventFromParams}`
      window.location.replace(reloadUrl)
    } catch (err) {
      setAlarm('danger', 'errWhileSaving')
      if (err.response) {
        throw new Error('CreateNewMemo.jsx-onRemoveDraft-' + err.message)
      }
      throw err
    }
  }

  const onSubmit = async () => {
    if (!hasMemos || chosenMemo.existingDraftEndPoint == '') return setAlarm('danger', 'errNoInPublishedChosen')
    const goToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${chosenMemo.existingDraftEndPoint || ''}`

    const memosProps = await memosToEdit.find(published => published.memoEndPoint === chosenMemo.existingDraftEndPoint)

    if (memosProps && memosProps.status === 'draft') {
      window.location = goToEditorUrl
    } else if (memosProps && memosProps.status === 'published') {
      const body = { memoEndPoint: chosenMemo.existingDraftEndPoint }

      const url = `${SERVICE_URL.API}create-draft/${courseCode}/${chosenMemo.existingDraftEndPoint}`

      try {
        const result = await axios.post(url, body)
        if (result.status >= 400) {
          setAlarm('danger', 'errWhileSaving')
          return 'ERROR-' + result.status
        }
        window.location = goToEditorUrl
      } catch (error) {
        setAlarm('danger', 'errWhileSaving')
      }
    }
  }

  const onFinish = () => {
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  const onChoiceOfSemester = event => {
    const newSemester = event.target.value
    setTerm(newSemester)
  }
  return (
    <Container className="kip-container" style={{ marginBottom: '115px' }} fluid>
      <Row id="scroll-here-if-alert">
        <PageHeading
          heading={pageTitles.published}
          subHeading={course && combinedCourseName(courseCode, course, langAbbr)}
        />
      </Row>

      <ProgressBar current={0} steps={pagesChangePublishedPm} />
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
            {/* CHOOSE SEMESTER */}
            <div>
              <SectionHeadingAsteriskModal
                langAbbr={langAbbr}
                modalId="choose-semester"
                titleAndInfo={info.chooseSemester}
                btnClose={buttons.btnClose}
              />
              <p></p>
              {/* <Label htmlFor="choose-semester">{info.chooseSemester.label}</Label> */}
              {(termWithPm && termWithPm.length > 0 && (
                <Form style={{ width: '20em' }} data-testid="form-select-terms">
                  <FormGroup key="select-semester" id="choose-semester">
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        data-testid="select-terms"
                        id="term-list"
                        onChange={onChoiceOfSemester}
                        defaultValue="PLACEHOLDER"
                        value={term}
                      >
                        {!term && (
                          <option key="no-chosen" defaultValue="PLACEHOLDER" style={{ display: 'none' }}>
                            {info.chooseSemester.label}
                          </option>
                        )}
                        {termWithPm.map(({ term: sem }) => (
                          <option data-testid="select-option" id={`itemFor-${sem}`} key={sem} value={sem}>
                            {seasonStr(langIndex, sem)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormGroup>
                </Form>
              )) || (
                <p>
                  <i>{(termWithPm && info.noSemesterAvailable) || info.errKoppsRounds}</i>
                </p>
              )}
            </div>

            {/* CONTINUE TO EDIT EXISTING DRAFT SO USER HAVE TO CHOOSE ONE */}
            {term && (
              <div className="section-50">
                <SectionHeadingAsteriskModal
                  langAbbr={langAbbr}
                  modalId="choose-course-memo"
                  titleAndInfo={info.chooseMemo}
                  btnClose={buttons.btnClose}
                />
                {(hasMemos && (
                  <>
                    <Label htmlFor="choose-existed-memo">{info.chooseRound.publishedMemos.label}</Label>
                    <Label htmlFor="choose-existed-memo">{info.chooseRound.publishedMemos.infoText}</Label>
                    <Form
                      className={`Existed--Memos ${
                        alert.isOpen && alert.textName === 'errNoInPublishedChosen' ? 'error-area' : ''
                      }`}
                      id="choose-existed-memo"
                    >
                      {memosToEdit
                        .filter(memo => memo.semester === String(term))
                        .map(
                          ({ memoName, memoEndPoint, status }) =>
                            memoEndPoint && (
                              <FormGroup className="form-check" key={'memo' + memoEndPoint}>
                                <Input
                                  type="radio"
                                  id={memoEndPoint}
                                  data-testid="radio-choose-pub-memo"
                                  name="chooseMemo"
                                  value={memoEndPoint}
                                  onClick={event => onRadioChange(event, status)}
                                  defaultChecked={memoEndPoint === chosenMemo.existingDraftEndPoint}
                                />
                                <Label data-testid="label-radio-choose-pub-memo" htmlFor={memoEndPoint}>
                                  {memoName || memoEndPoint + ' (old memo before namegiving)'}
                                  <i>{status === 'draft' ? info.publishedHasDraft : ''}</i>
                                </Label>
                              </FormGroup>
                            )
                        )}
                    </Form>
                  </>
                )) || (
                  <p>
                    <i>{info.noPublishedMemos}</i>
                  </p>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <ControlPanel
        langIndex={langIndex}
        chosenMemoEndPoint={chosenMemo.existingDraftEndPoint}
        onSubmit={onSubmit}
        onRemove={onRemoveDraft}
        onCancel={onFinish}
        isDraftOfPublished
        memoStatus={chosenMemo.memoStatus}
        event={event}
      />
    </Container>
  )
}

ChangePublished.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  langAbbr: PropTypes.oneOf(['sv', 'en']),
  langIndex: PropTypes.oneOf([1, 0]),
}

export default observer(ChangePublished)
