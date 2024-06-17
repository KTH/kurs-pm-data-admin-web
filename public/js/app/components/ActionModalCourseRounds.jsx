/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { combineMemoName, fetchThisTermRounds } from '../util/helpers'
import { seasonStr } from '../utils-shared/helpers'
import { FIRST_VERSION, SERVICE_URL } from '../util/constants'
import ActionModalButton from './ActionModalButton'

const roundLangAbbr = round => (round.language.en === 'Swedish' ? 'sv' : 'en')

const canMerge = (memoLangAbbr, round) => {
  const abbr = roundLangAbbr(round)

  return memoLangAbbr === 'en' || memoLangAbbr === abbr || false
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
  const { applicationCodes, memoCommonLangAbbr, memoEndPoint, memoName, semester, status, version } = memo

  const [roundGroups, setRoundsGroup] = useState({ allRounds: [], availableRounds: [] })
  const { allRounds, availableRounds } = roundGroups

  const stayOnModal = true

  const { extraInfo, messages, actionModals, info } = i18n.messages[langIndex]

  const getTempSavedCourseInstances = () => {
    if (status === 'draft') {
      const tempApplicationCodes = applicationCodes.slice(1)
      const tempSavedCourseInstances = allRounds.filter(round => tempApplicationCodes.includes(round.applicationCode))
      return tempSavedCourseInstances.map(round => ({ ...round, checked: true }))
    }
    return []
  }

  const combinedAvailableAndTempSavedCourseInstances = [
    ...getTempSavedCourseInstances(),
    ...availableRounds.map(round => ({ ...round, checked: false })),
  ]

  async function fetchMatchingRounds(newMemo) {
    const { semester: memoSemester } = newMemo
    const newAvailableRounds = await store.showAvailableSemesterRounds(memoSemester)
    const allNewRounds = await fetchThisTermRounds(miniKoppsObj, newMemo || memo)

    setRoundsGroup({
      allRounds: allNewRounds,
      availableRounds: newAvailableRounds,
    })
  }

  useEffect(() => {
    const mathingMemo = uniqueMemos.find(m => m.memoEndPoint === chosenMemoEndPoint)
    if (mathingMemo) {
      setMemo(mathingMemo)
      fetchMatchingRounds(mathingMemo)
    }
  }, [chosenMemoEndPoint])

  const setAlarm = (type, textName, isOpen) => {
    setAlert({
      type,
      isOpen: isOpen || true,
      textName,
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

  const _uncheckedRounds = () => {
    const uncheckedRounds = []
    const checks = document.getElementsByClassName('addNewRounds')
    for (let i = 0; i < checks.length; i++) {
      if (!checks[i].checked) {
        uncheckedRounds.push(checks[i].value)
      }
    }
    return uncheckedRounds
  }

  const _koppsInfoForChecked = sortedApplicationCodes => {
    const sortedKoppsInfo = []
    for (let i = 0; i < sortedApplicationCodes.length; i++) {
      sortedKoppsInfo.push(allRounds.find(round => sortedApplicationCodes[i] === round.applicationCode))
    }
    return sortedKoppsInfo
  }

  const onSave = async () => {
    const checkedRounds = _checkedRounds()
    const uncheckedRounds = _uncheckedRounds()
    const isPublished = status === 'published'
    const isDraft = status === 'draft'
    const isDraftOfPublished = isDraft && Number(version) > FIRST_VERSION

    if (checkedRounds.length > 0 || uncheckedRounds.length > 0) {
      const sortedApplicationCodes = [...applicationCodes, ...checkedRounds].sort()
      const updatedSortedApplicationCodes = sortedApplicationCodes
        .filter(code => !uncheckedRounds.includes(code))
        .filter((value, index, self) => self.indexOf(value) === index)
      const sortedKoppsInfo = _koppsInfoForChecked(updatedSortedApplicationCodes)

      const newMemoName = sortedKoppsInfo.map(round => combineMemoName(round, semester, memoCommonLangAbbr)).join(', ')
      const firstDraft = version === FIRST_VERSION && status === 'draft'
      const newMemoEndPoint = firstDraft
        ? courseCode + semester + '-' + updatedSortedApplicationCodes.join('-')
        : courseCode + semester + '-' + updatedSortedApplicationCodes.join('-')

      const newInfo = {
        courseCode,
        memoName: newMemoName,
        memoEndPoint: newMemoEndPoint,
        applicationCodes: updatedSortedApplicationCodes,
      }
      const apiAction = isDraft ? 'draft-updates' : 'create-draft'
      const urlUpdateOrCreate = `${SERVICE_URL.API}${apiAction}/${courseCode}/${memoEndPoint}`

      try {
        const newResult = await axios.post(urlUpdateOrCreate, newInfo)
        if (newResult.status >= 400) {
          setAlarm('danger', 'errWhileSaving')
          return 'ERROR- ActionModalCourseRounds - onSave -' + newResult.status
        }

        const eventFromParams = 'addedRoundId'

        const reloadUrl = `${SERVICE_URL.courseMemoAdmin}${
          isDraftOfPublished || isPublished ? 'published/' : ''
        }${courseCode}?memoEndPoint=${newMemoEndPoint}&semester=${semester}&event=${eventFromParams}`

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
      btnLabel={actionModals.changeLadokRoundApplicationCodes.header}
      modalId="addingRounds"
      color="secondary"
      stayOnModal={stayOnModal}
      modalLabels={actionModals.changeLadokRoundApplicationCodes}
      onConfirm={onSave || null}
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
      {(combinedAvailableAndTempSavedCourseInstances && combinedAvailableAndTempSavedCourseInstances.length > 0 && (
        <div>
          <Label htmlFor="choose-rounds-list">{info.chooseRound.addRounds.label}</Label>
          <Label htmlFor="choose-rounds-list">{info.chooseRound.addRounds.infoText}</Label>
          <Form className={`Available--Rounds--To--Add ${alert && alert.isOpen ? 'error-area' : ''}`}>
            {combinedAvailableAndTempSavedCourseInstances.map(round => (
              <FormGroup className="form-check" id="choose-rounds-list" key={'add' + round.applicationCode}>
                <Input
                  data-testid="checkbox-add-rounds-to-saved-memo"
                  type="checkbox"
                  id={'addNew' + round.applicationCode}
                  name="addNew"
                  className="addNewRounds"
                  value={round.applicationCode}
                  defaultChecked={round.checked}
                  disabled={!canMerge(memoCommonLangAbbr, round)}
                />
                <Label data-testid="label-checkbox-add-rounds-to-saved-memo" htmlFor={'addNew' + round.applicationCode}>
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
