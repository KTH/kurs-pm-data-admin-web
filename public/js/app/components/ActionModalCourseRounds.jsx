/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import i18n from '../../../../i18n'
import { inject, observer } from 'mobx-react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'
import { combineMemoName, fetchThisTermRounds, seasonStr } from '../util/helpers'
import { FIRST_VERSION, SERVICE_URL } from '../util/constants'
import axios from 'axios'
import PropTypes from 'prop-types'

const roundLangAbbr = (round) => (round.language.en === 'Swedish' ? 'sv' : 'en')

const canMerge = (memoLangAbbr, round) => {
  const abbr = roundLangAbbr(round)

  return memoLangAbbr === 'en' || memoLangAbbr === abbr || false
}

async function isLangCompatible(availableRounds, memo) {
  // availableRounds
  const { memoCommonLangAbbr } = memo
  const compatibles = availableRounds.filter(
    (round) => canMerge(memoCommonLangAbbr, round) === true
  )
  const isCompatible = memoCommonLangAbbr && compatibles.length > 0
  return isCompatible
}

@inject(['routerStore'])
@observer
class ActionModalCourseRounds extends Component {
  state = {
    showSaveBtn: false,
    chosenMemoEndPoint: this.props.chosenMemoEndPoint || '', // version, published/draft?, semester
    stayOnModal: true,
    allRounds: [],
    availableRounds: []
  }

  uniqueMemos = [
    ...(this.props.routerStore.miniMemos.draftsOfPublishedMemos || []),
    ...(this.props.routerStore.miniMemos.publishedWithNoActiveDraft || []),
    ...(this.props.routerStore.miniMemos.draftsWithNoActivePublishedVer || [])
  ]

  langAbbr = this.props.langAbbr || this.props.routerStore.langAbbr

  langIndex = this.props.langIndex || this.props.routerStore.langIndex

  memo = this.uniqueMemos.find((memo) => memo.memoEndPoint === this.state.chosenMemoEndPoint)

  isPublished = this.memo.status === 'published' || Number(this.memo.version) > FIRST_VERSION

  componentDidMount() {
    const { semester } = this.memo
    if (semester) this.updateState(semester)
  }

  updateState = async (semester) => {
    const availableRounds = await this.props.routerStore.showAvailableSemesterRounds(semester)
    const allRounds = await fetchThisTermRounds(this.props.routerStore.miniKoppsObj, this.memo)
    const compatible = await isLangCompatible(availableRounds, this.memo)
    const showSaveBtn = availableRounds && availableRounds.length > 0 && compatible
    this.setState({
      showSaveBtn,
      allRounds,
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

  _checkedRounds = () => {
    const checkedRounds = []
    const checks = document.getElementsByClassName('addNewRounds')
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        checkedRounds.push(checks[i].value)
      }
    }
    return checkedRounds
  }

  _koppsInfoForChecked = (sortedRoundIds) => {
    const sortedKoppsInfo = []
    const { allRounds } = this.state
    for (let i = 0; i < sortedRoundIds.length; i++) {
      sortedKoppsInfo.push(allRounds.find(({ ladokRoundId }) => sortedRoundIds[i] === ladokRoundId))
    }
    return sortedKoppsInfo
  }

  onSave = async () => {
    const { ladokRoundIds, memoCommonLangAbbr, memoEndPoint, semester, status, version } = this.memo
    const { courseCode } = this.props.routerStore
    const checkedRounds = await this._checkedRounds()

    if (checkedRounds.length > 0) {
      const sortedRoundIds = await [...ladokRoundIds, ...checkedRounds].sort()
      const sortedKoppsInfo = await this._koppsInfoForChecked(sortedRoundIds)

      const newMemoName = sortedKoppsInfo
        .map((round) => combineMemoName(round, semester, memoCommonLangAbbr))
        .join(', ')
      console.log('newMemoName ', newMemoName)
      const firstDraft = version === FIRST_VERSION && status === 'draft'
      const newMemoEndPoint = firstDraft
        ? courseCode + semester + '-' + sortedRoundIds.join('-')
        : memoEndPoint

      const newInfo = {
        courseCode,
        memoName: newMemoName,
        memoEndPoint: newMemoEndPoint,
        ladokRoundIds: sortedRoundIds
      }
      const apiAction = status === 'published' ? 'create-draft' : 'draft-updates'
      const urlUpdateOrCreate = `${SERVICE_URL.API}${apiAction}/${courseCode}/${memoEndPoint}`

      try {
        const newResult = await axios.post(urlUpdateOrCreate, newInfo)
        if (newResult.status >= 400) {
          this.setAlarm('danger', 'errWhileSaving')
          return 'ERROR- ActionModalCourseRounds - onSave -' + newResult.status
        }

        const eventFromParams = 'addedRoundId'

        const reloadUrl = `${SERVICE_URL.courseMemoAdmin}${
          this.isPublished ? 'published/' : ''
        }${courseCode}?memoEndPoint=${newMemoEndPoint}&event=${eventFromParams}`
        window.location = reloadUrl
      } catch (error) {
        if (error.response) {
          throw new Error('ActionModalCourseRounds - onSave - ' + error.message)
        }
        throw error
      }
    } else return this.setAlarm('danger', 'errNoChosen')
  }

  render() {
    const { extraInfo, messages, actionModals, info } = i18n.messages[this.langIndex]
    const { availableRounds, alert, stayOnModal, showSaveBtn } = this.state
    const { semester, memoName, memoCommonLangAbbr } = this.memo

    return (
      <ActionModalButton
        btnLabel={actionModals.changeLadokRoundIds.header}
        modalId="addingRounds"
        color="secondary"
        stayOnModal={stayOnModal}
        modalLabels={actionModals.changeLadokRoundIds}
        onConfirm={(showSaveBtn && this.onSave) || null}
      >
        <span>
          <Label>{messages.page_header_heading_semester}:</Label>{' '}
          {seasonStr(this.langIndex, semester)}
        </span>
        <span>
          <Label>{messages.page_header_heading_course_round}:</Label> {memoName}
        </span>
        <span>
          <Label>{extraInfo.memoLanguage.label}:</Label>{' '}
          {extraInfo.memoLanguage[memoCommonLangAbbr]}
        </span>
        <span>
          <p>{extraInfo.aboutMemoLanguage[memoCommonLangAbbr]}</p>
        </span>
        {(availableRounds && availableRounds.length > 0 && (
          <div className="section-50">
            <Label htmlFor="choose-rounds-list">{info.chooseRound.addRounds.label}</Label>
            <Label htmlFor="choose-rounds-list">{info.chooseRound.addRounds.infoText}</Label>
            <Form
              className={`Available--Rounds--To--Add ${alert && alert.isOpen ? 'error-area' : ''}`}
            >
              {availableRounds.map((round) => (
                <FormGroup
                  className="form-check"
                  id="choose-rounds-list"
                  key={'add' + round.ladokRoundId}
                >
                  <Input
                    data-testid="checkbox-add-rounds-to-saved-memo"
                    type="checkbox"
                    id={'addNew' + round.ladokRoundId}
                    name="addNew"
                    className="addNewRounds"
                    value={round.ladokRoundId}
                    defaultChecked={false}
                    disabled={!canMerge(memoCommonLangAbbr, round)}
                  />
                  <Label
                    data-testid="label-checkbox-add-rounds-to-saved-memo"
                    htmlFor={'addNew' + round.ladokRoundId}
                  >
                    {combineMemoName(round, semester, this.langAbbr)}.
                    {(!canMerge(memoCommonLangAbbr, round) && (
                      <i>{extraInfo.cannotMergeLanguage}</i>
                    )) ||
                      ''}
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

ActionModalCourseRounds.propTypes = {
  chosenMemoEndPoint: PropTypes.string, // version, published/draft?, semester
  langAbbr: PropTypes.string,
  langIndex: PropTypes.number,
  miniKoppsObj: PropTypes.exact({
    course: PropTypes.string.isRequired,
    lastTermsInfo: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired,
    syllabusDatesSorted: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  // eslint-disable-next-line react/require-default-props
  routerStore: PropTypes.func
}

// ActionModalCourseRounds.defaultProps = {
//   chosenMemoEndPoint: '',
//   miniKoppsObj: null
// }

export default ActionModalCourseRounds
