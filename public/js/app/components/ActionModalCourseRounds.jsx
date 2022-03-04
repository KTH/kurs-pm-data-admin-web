/* eslint-disable react/require-default-props */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { combineMemoName, fetchThisTermRounds, seasonStr } from '../util/helpers'
import { FIRST_VERSION, SERVICE_URL } from '../util/constants'

const roundLangAbbr = round => (round.language.en === 'Swedish' ? 'sv' : 'en')

const canMerge = (memoLangAbbr, round) => {
  const abbr = roundLangAbbr(round)

  return memoLangAbbr === 'en' || memoLangAbbr === abbr || false
}

async function isLangCompatible(availableRounds, memoCommonLangAbbr) {
  const compatibles = availableRounds.filter(round => canMerge(memoCommonLangAbbr, round) === true)
  const isCompatible = memoCommonLangAbbr && compatibles.length > 0
  return isCompatible
}

function ActionModalCourseRounds(props) {
  const store = useStore()
  const { courseCode, langAbbr: storeLangAbbr, langIndex: storeLangIndex, miniKoppsObj, miniMemos } = store
  const uniqueMemos = [
    ...(miniMemos.draftsOfPublishedMemos || []),
    ...(miniMemos.publishedWithNoActiveDraft || []),
    ...(miniMemos.draftsWithNoActivePublishedVer || []),
  ]
  const { chosenMemoEndPoint, langAbbr = storeLangAbbr, langIndex = storeLangIndex } = props
  const [alert, setAlert] = useState({
    type: '', // danger, success, warn
    isOpen: false,
    textName: '',
  })

  const [memo, setMemo] = useState(() => uniqueMemos.find(m => m.memoEndPoint === chosenMemoEndPoint) || {})
  const { ladokRoundIds, memoCommonLangAbbr, memoEndPoint, memoName, semester, status, version } = memo

  const [roundGroups, setRoundsGroup] = useState({ allRounds: [], availableRounds: [], showSaveBtn: false })
  const { allRounds, availableRounds, showSaveBtn } = roundGroups

  const stayOnModal = true

  const { extraInfo, messages, actionModals, info } = i18n.messages[langIndex]

  useEffect(() => {
    const mathingMemo = uniqueMemos.find(m => m.memoEndPoint === chosenMemoEndPoint)
    setMemo(mathingMemo)
    // eslint-disable-next-line no-use-before-define
    fetchMatchingRounds(mathingMemo)
  }, [chosenMemoEndPoint])

  const setAlarm = (type, textName, isOpen) => {
    setAlert({
      type,
      isOpen: isOpen || true,
      textName,
    })
  }

  async function fetchMatchingRounds(newMemo) {
    const { semester } = newMemo
    const newAvailableRounds = await store.showAvailableSemesterRounds(semester)
    const allNewRounds = await fetchThisTermRounds(miniKoppsObj, newMemo || memo)
    const compatible = await isLangCompatible(newAvailableRounds, memoCommonLangAbbr)
    const checkIfShowSaveBtn = newAvailableRounds && newAvailableRounds.length > 0 && compatible
    setRoundsGroup({
      allRounds: allNewRounds,
      availableRounds: newAvailableRounds,
      showSaveBtn: checkIfShowSaveBtn,
    })
  }

  const _checkedRounds = () => {
    const checkedRounds = []
    const checks = document.getElementsByClassName('addNewRounds')
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        checkedRounds.push(checks[i].value)
      }
    }
    return checkedRounds
  }

  const _koppsInfoForChecked = sortedRoundIds => {
    const sortedKoppsInfo = []
    for (let i = 0; i < sortedRoundIds.length; i++) {
      sortedKoppsInfo.push(allRounds.find(({ ladokRoundId }) => sortedRoundIds[i] === ladokRoundId))
    }
    return sortedKoppsInfo
  }

  const onSave = async () => {
    const checkedRounds = await _checkedRounds()
    const isPublished = status === 'published' || Number(version) > FIRST_VERSION

    if (checkedRounds.length > 0) {
      const sortedRoundIds = await [...ladokRoundIds, ...checkedRounds].sort()
      const sortedKoppsInfo = await _koppsInfoForChecked(sortedRoundIds)

      const newMemoName = sortedKoppsInfo.map(round => combineMemoName(round, semester, memoCommonLangAbbr)).join(', ')
      const firstDraft = version === FIRST_VERSION && status === 'draft'
      const newMemoEndPoint = firstDraft ? courseCode + semester + '-' + sortedRoundIds.join('-') : memoEndPoint

      const newInfo = {
        courseCode,
        memoName: newMemoName,
        memoEndPoint: newMemoEndPoint,
        ladokRoundIds: sortedRoundIds,
      }
      const apiAction = isPublished ? 'create-draft' : 'draft-updates'
      const urlUpdateOrCreate = `${SERVICE_URL.API}${apiAction}/${courseCode}/${memoEndPoint}`

      try {
        const newResult = await axios.post(urlUpdateOrCreate, newInfo)
        if (newResult.status >= 400) {
          setAlarm('danger', 'errWhileSaving')
          return 'ERROR- ActionModalCourseRounds - onSave -' + newResult.status
        }

        const eventFromParams = 'addedRoundId'

        const reloadUrl = `${SERVICE_URL.courseMemoAdmin}${
          isPublished ? 'published/' : ''
        }${courseCode}?memoEndPoint=${newMemoEndPoint}&event=${eventFromParams}`
        window.location = reloadUrl
      } catch (error) {
        if (error.response) {
          throw new Error('ActionModalCourseRounds - onSave - ' + error.message)
        }
        throw error
      }
    } else return setAlarm('danger', 'errNoChosen')
  }

  return (
    <ActionModalButton
      btnLabel={actionModals.changeLadokRoundIds.header}
      modalId="addingRounds"
      color="secondary"
      stayOnModal={stayOnModal}
      modalLabels={actionModals.changeLadokRoundIds}
      onConfirm={(showSaveBtn && onSave) || null}
    >
      <span>
        <Label>{`${messages.page_header_heading_semester}:`}</Label>
        {` ${seasonStr(langIndex, semester)}`}
      </span>
      <span>
        <Label>{`${messages.page_header_heading_course_round}:`}</Label>
        {` ${memoName}`}
      </span>
      <span>
        <Label>{`${extraInfo.memoLanguage.label}:`}</Label>
        {` ${extraInfo.memoLanguage[memoCommonLangAbbr]}`}
      </span>
      <span>
        <p>{extraInfo.aboutMemoLanguage[memoCommonLangAbbr]}</p>
      </span>
      {(availableRounds && availableRounds.length > 0 && (
        <div className="section-50">
          <Label htmlFor="choose-rounds-list">{info.chooseRound.addRounds.label}</Label>
          <Label htmlFor="choose-rounds-list">{info.chooseRound.addRounds.infoText}</Label>
          <Form className={`Available--Rounds--To--Add ${alert && alert.isOpen ? 'error-area' : ''}`}>
            {availableRounds.map(round => (
              <FormGroup className="form-check" id="choose-rounds-list" key={'add' + round.ladokRoundId}>
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
                <Label data-testid="label-checkbox-add-rounds-to-saved-memo" htmlFor={'addNew' + round.ladokRoundId}>
                  {`${combineMemoName(round, semester, langAbbr)}.`}
                  {(!canMerge(memoCommonLangAbbr, round) && <i>{extraInfo.cannotMergeLanguage}</i>) || ''}
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

ActionModalCourseRounds.propTypes = {
  chosenMemoEndPoint: PropTypes.string, // version, published/draft?, semester
  langAbbr: PropTypes.oneOf(['sv', 'en']),
  langIndex: PropTypes.oneOf([1, 0]),
  miniKoppsObj: PropTypes.exact({
    // eslint-disable-next-line react/no-unused-prop-types
    course: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    lastTermsInfo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
      .isRequired,
  }),
}

export default ActionModalCourseRounds
