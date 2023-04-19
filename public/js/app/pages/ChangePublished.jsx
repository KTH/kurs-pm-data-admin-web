/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { ProgressBar } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import PropTypes from 'prop-types'
import { useStore } from '../mobx'

import { SERVICE_URL } from '../util/constants'
import ControlPanel from '../components/ControlPanel'
import SectionHeadingAsteriskModal from '../components/SectionHeadingAsteriskModal'
import i18n from '../../../../i18n'

import { combinedCourseName, fetchParameters } from '../util/helpers'

function ChangePublished(props) {
  const {
    courseCode,
    memoEndPoint: initialMemoEndPoint,
    miniKoppsObj,
    miniMemos,
    langAbbr: storeLangAbbr,
    langIndex: storeLangIndex,
  } = useStore()
  const { langAbbr = storeLangAbbr, langIndex = storeLangIndex } = props
  const [chosenMemo, setMemo] = useState(() => initialMemoEndPoint || '')
  const [alert, setAlert] = useState({
    type: '', // danger, success, warn
    isOpen: false,
    textName: '',
  })
  const memosToEdit = [...(miniMemos.draftsOfPublishedMemos || []), ...(miniMemos.publishedWithNoActiveDraft || [])]

  const hasMemos = memosToEdit.length > 0

  const urlParams = fetchParameters(props)

  const eventFromParams = urlParams.event || ''

  const { alerts, info, pagesChangePublishedPm, pageTitles, buttons } = i18n.messages[langIndex]
  const { course } = miniKoppsObj

  useEffect(() => {
    const { history } = props
    if (history) {
      history.push({
        search: '',
      })
    }
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

  const onRadioChange = event => {
    const { value } = event.target
    setAlert({ isOpen: false })
    setMemo(value)
  }

  const onSubmit = async () => {
    if (!hasMemos || chosenMemo == '') return setAlarm('danger', 'errNoInPublishedChosen')
    const goToEditorUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${chosenMemo || ''}`

    const memosProps = await memosToEdit.find(published => published.memoEndPoint === chosenMemo)

    if (memosProps && memosProps.status === 'draft') {
      window.location = goToEditorUrl
    } else if (memosProps && memosProps.status === 'published') {
      const body = { memoEndPoint: chosenMemo }

      const url = `${SERVICE_URL.API}create-draft/${courseCode}/${chosenMemo}`

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
  return (
    <Container className="kip-container" style={{ marginBottom: '115px' }} fluid>
      <Row id="scroll-here-if-alert">
        <PageHeading id="mainHeading" subHeading={course && combinedCourseName(courseCode, course, langAbbr)}>
          {pageTitles.published}
        </PageHeading>
      </Row>

      <ProgressBar active={1} pages={pagesChangePublishedPm} />
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
            <div className="section-50">
              <SectionHeadingAsteriskModal
                langAbbr={langAbbr}
                modalId="choose-course-memo"
                titleAndInfo={info.chooseMemo}
                btnClose={buttons.btnClose}
              />
              <p></p>
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
                    {memosToEdit.map(({ memoName, memoEndPoint, status }) => (
                      <FormGroup className="form-check" key={'memo' + memoEndPoint}>
                        <Input
                          type="radio"
                          id={memoEndPoint}
                          data-testid="radio-choose-pub-memo"
                          name="chooseMemo"
                          value={memoEndPoint}
                          onClick={onRadioChange}
                          defaultChecked={memoEndPoint === chosenMemo}
                        />
                        <Label data-testid="label-radio-choose-pub-memo" htmlFor={memoEndPoint}>
                          {memoName || memoEndPoint + ' (old memo before namegiving)'}
                          {status === 'draft' ? info.publishedHasDraft : ''}
                        </Label>
                      </FormGroup>
                    ))}
                  </Form>
                </>
              )) || (
                <p>
                  <i>{info.noPublishedMemos}</i>
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <ControlPanel
        langIndex={langIndex}
        chosenMemoEndPoint={chosenMemo}
        onSubmit={onSubmit}
        onCancel={onFinish}
        isDraftOfPublished
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
