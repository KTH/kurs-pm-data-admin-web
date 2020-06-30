/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import i18n from '../../../../i18n'
import { inject, observer } from 'mobx-react'
import { Alert, Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'
import {
  combineMemoName,
  emptyCheckboxesByIds,
  seasonStr,
  sortRoundAndKoppsInfo,
  removeAndSortRoundAndInfo,
  uncheckRadioById
} from '../util/helpers'
import { FIRST_VERSION, SERVICE_URL } from '../util/constants'
import axios from 'axios'

const canMerge = (memoLangAbbr, round) => {
  const roundLangAbbr = round.language.en === 'Swedish' ? 'sv' : 'en'
  return memoLangAbbr === 'en' || memoLangAbbr === roundLangAbbr || false
}

@inject(['routerStore'])
@observer
class ActionModalCourseRounds extends Component {
  state = {
    chosenMemoEndPoint: this.props.chosenMemoEndPoint || '', // version, published/draft?, semester
    stayOnModal: true, 
    availableRounds: []
  }
  uniqueMemos = [
    ...this.props.routerStore.miniMemos.draftsOfPublishedMemos,
    ...this.props.routerStore.miniMemos.publishedWithNoActiveDraft,
    ...this.props.routerStore.miniMemos.draftsWithNoActivePublishedVer
  ]

  langAbbr = i18n.isSwedish() ? 'sv' : 'en'
  langIndex = this.props.routerStore.langIndex
  memo = this.uniqueMemos.find(memo => memo.memoEndPoint === this.state.chosenMemoEndPoint)
  isPublished = this.memo.status === 'published' || Number(this.memo.version) > FIRST_VERSION

  
  lastTerms = this.props.routerStore.miniKoppsObj.lastTermsInfo || null
  thisTermInfo = this.lastTerms.find(({ term }) => term === this.memo.semester)


  componentDidMount() {
    const { semester } = this.memo
    if(semester) this.onSemesterChoice(semester)
  }

  onSemesterChoice = async (semester) => {
    const availableRounds = await this.props.routerStore.showAvailableSemesterRounds(semester)
    this.setState({
      availableRounds 
    })
  }

  setAlarm = (type, textName, isOpen) => {
    this.setState({
      alert: {
        type,
        isOpen: isOpen || true,
        textName
      }
    })
  }

  onSave = () => {
    const { ladokRoundIds, memoCommonLangAbbr, memoEndPoint, memoName, semester, status, version } = this.memo
    const { courseCode } = this.props.routerStore
    const { thisTermInfo } = this
    let checkedRounds = []
      
    const checks = document.getElementsByClassName('addNewRounds')
    for(var i=0; i<checks.length; i++){
      if(checks[i].checked){
        checkedRounds.push(checks[i].value)
      } 
    }
    console.log('checkedRounds', checkedRounds.length)

    //check if version is a new draft or published
    //if published then add round to memoName
    // otherwise only to array
    if (checkedRounds.length > 0) {
      const sortedRoundIds = [...ladokRoundIds, ...checkedRounds].sort()
      let sortedKoppsInfo = []

      for(var i=0; i<sortedRoundIds.length; i++){
        sortedKoppsInfo.push(thisTermInfo.rounds.find(({ ladokRoundId }) => sortedRoundIds[i] === ladokRoundId))
      }

      const newMemoName = sortedKoppsInfo
        .map(round => combineMemoName(round, semester, memoCommonLangAbbr))
        .join(', ')
      const canChange = version === FIRST_VERSION && status === 'draft'
      const newMemoEndPoint = canChange ? courseCode + semester + '-' + sortedRoundIds.join('-') : memoEndPoint

      const newInfo = { 
        courseCode,
        memoName: newMemoName,
        memoEndPoint: newMemoEndPoint, 
        ladokRoundIds: sortedRoundIds 
      }
      
      return axios
      .post(
        '/kursinfoadmin/kurs-pm-data/internal-api/draft-updates/' + courseCode + '/' + memoEndPoint,
        newInfo
      )
      .then(newResult => {
        if (newResult.status >= 400) {
          this.setAlarm('danger', 'errWhileSaving')
          return 'ERROR-' + newResult.status
        }
        const eventFromParams = 'addedRoundId'
        const reload = `${SERVICE_URL.courseMemoAdmin}${
          this.isPublished ? 'published/' : ''
          }${courseCode}?memoEndPoint=${newMemoEndPoint}&event=${eventFromParams}`
        window.location = reload
        // this.onAlert(alertTranslationId)
      })
      .catch(error => {
        if (error.response) {
          // test it
          throw new Error(error.message)
        }
        throw error
      })
    } // alert error}
    else return this.setAlarm('danger', 'errNoChosen')
  }

  render() {
    const { messages, actionModals, info, extraInfo } = i18n.messages[this.langIndex]
    const { availableRounds, stayOnModal } = this.state
    const { semester, memoName, memoCommonLangAbbr } = this.memo

    return (
      <ActionModalButton
        btnLabel={actionModals.changeLadokRoundIds.header}
        modalId="addingRounds"
        color="secondary"
        stayOnModal={stayOnModal}
        modalLabels={actionModals.changeLadokRoundIds}
        onConfirm={availableRounds && availableRounds.length > 0 && this.onSave || null}
      >
        <span><Label>{messages.page_header_heading_semester}:</Label> {seasonStr(extraInfo, semester)}</span>
        <span><Label>{messages.page_header_heading_course_round}:</Label> {memoName}</span>
        <span><Label>{extraInfo.memoLanguage.label}:</Label> {extraInfo.memoLanguage[memoCommonLangAbbr]}</span>
        <span><p>{extraInfo.aboutMemoLanguage[memoCommonLangAbbr]}</p></span>
        {(availableRounds && availableRounds.length > 0 && (
          <div className="section-50">
            <Label htmlFor="choose-rounds-list">
              {info.chooseRound.addRounds.label}
            </Label>
            <Label htmlFor="choose-rounds-list">
              {info.chooseRound.addRounds.infoText}
            </Label>
            <Form
              className={`Available--Rounds--To--Add ${
                        alert.isOpen && alert.textName === 'errNoChosen'
                          ? 'error-area'
                          : ''
                      }`}
            >
              {availableRounds.map(round => (
                <FormGroup
                  className="form-check"
                  id="choose-rounds-list"
                  key={'add' + round.ladokRoundId}
                >
                  <Input
                    type="checkbox"
                    id={'addNew' + round.ladokRoundId}
                    name="addNew"
                    className="addNewRounds"
                    value={round.ladokRoundId}
                    defaultChecked={false}
                    disabled={!canMerge(memoCommonLangAbbr, round)}
                  />
                  <Label htmlFor={'addNew' + round.ladokRoundId}>
                    {`${combineMemoName(round, semester, this.langAbbr)} ${!canMerge(memoCommonLangAbbr, round) ? extraInfo.cannotMergeLanguage : ''}`
                    }
                  </Label>
                </FormGroup>
              ))}
            </Form>
          </div>
        )) || (
          <p className="noAvailableRounds">
            <i>{info.noRoundsToAdd}</i>
          </p>
        )}
      </ActionModalButton>
      )
  }
}

export default ActionModalCourseRounds
