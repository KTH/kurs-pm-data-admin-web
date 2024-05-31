/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'
import { StickyContainer, Sticky } from 'react-sticky'

import PropTypes from 'prop-types'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { FIRST_VERSION, SERVICE_URL, SAVED_NEW_PARAM } from '../util/constants'
import { combinedCourseName, fetchParameters, seasonStr } from '../util/helpers'
import Button from '../components-shared/Button'
import PageHeading from '../components-shared/PageHeading'
import ProgressBar from '../components-shared/ProgressBar'
import AlertDraftOfPublished from '../components/alerts/AlertDraftOfPublished'
import AlertErrorMissingComment from '../components/alerts/AlertErrorMissingComment'
import AlertSuccessCopiedMemo from '../components/alerts/AlertSuccessCopiedMemo'
import AlertSuccessRebuild from '../components/alerts/AlertSuccessRebuild'
import AlertMissingDraft from '../components/alerts/AlertMissingDraft'
import CollapseMemoIntroduction from '../components/details/CollapseMemoIntroduction'
import PageHead from '../components/PageHead'
import CommentChangesTextarea from '../components/editors/CommentChangesTextarea'
import ControlPanel from '../components/ControlPanel'
import ExtraHeadingEditor from '../components/editors/ExtraHeadingEditor'
import StandardSectionOrEditor from '../components/StandardSectionOrEditor'
import TabNav from '../components/TabNav'
import TabContent from '../components/TabContent'
import ProgressTitle from '../components/ProgressTitle'
import { context, getExtraHeaderIdBySectionId } from '../util/fieldsByType'
import SectionMenu from '../components/SectionMenu'

const PROGRESS = 2
const TAB_HEIGHT = 60
const WHITE_SPACE_UNDER_TABS = 30
const PERSONAL_MENU_HEIGHT = 40
const STICKY_TABS_TOP_MARGIN = PERSONAL_MENU_HEIGHT
const STICKY_SECTION_MENU_TOP_MARGIN = `${PERSONAL_MENU_HEIGHT + TAB_HEIGHT + WHITE_SPACE_UNDER_TABS}px`
const STICKY_TOP_OFFSET = 0 - PERSONAL_MENU_HEIGHT

function MemoContainer(props) {
  const toTopRef = useRef(null)
  const store = useStore()
  const {
    courseCode,
    closeEmptyHeadingErrorMessage,
    langIndex: userLangIndex,
    langAbbr: userLangAbbr,
    memoData,
    memoEndPoint,
    memoLangAbbr,
    rebuilDraftFromPublishedVer,
    sections,
    semester,
  } = store

  const { initialActiveTab } = props // used for test
  const [isError, setErrorBool] = useState(false)
  const [alert, setAlert] = useState({ alertIsOpen: false, alertText: '', alertColor: '' })
  const [activeTab, setActiveTab] = useState(initialActiveTab || sections[0].id)
  const [needToCheckAllExtraHeading, setNeedToCheckAllExtraHeading] = useState(false) // check all extra content groups
  const [contentIdWithMissingHeading, setContentIdWithMissingHeading] = useState('') // check specific extra content group
  const [openAlertIdUntilFixed, setOpenAlertIdUntilFixed] = useState('')

  const { commentAboutMadeChanges, memoName, visibleInMemo } = memoData
  const { alertText, alertIsOpen, alertColor } = alert

  const isDraftOfPublished = Number(memoData.version) > FIRST_VERSION
  const [exactDraftCopyOfPublishedFromPrevVersion, setDraftOfPublishedState] = useState(rebuilDraftFromPublishedVer)

  const memoLangIndex = memoLangAbbr === 'sv' ? 1 : 0
  const { sectionsLabels } = i18n.messages[memoLangIndex]
  const { alerts, extraInfo, pagesCreateNewPm, pagesChangePublishedPm, pageTitles } = i18n.messages[userLangIndex]
  const { event: eventFromParams = '' } = fetchParameters(props)

  useEffect(() => {
    // check if it is time to hide red alert about empty titles of extra section
    // console.log('check all sections has title')
    const hasAllExtraHeadingsNamed = store.checkAllSectionsHasTitles()

    if (hasAllExtraHeadingsNamed && !!openAlertIdUntilFixed) {
      setOpenAlertIdUntilFixed('')
    }
  }, [closeEmptyHeadingErrorMessage])

  useEffect(() => {
    const handlePopstate = () => {
      onAutoSave()
      history.go(-1)
    }

    history.pushState({ page: 'current' }, '')

    window.addEventListener('popstate', handlePopstate)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])
  useEffect(() => {
    const { history } = props

    if (history) {
      history.push({
        search: '',
      })
    }
  }, [])

  if (!memoData.applicationCodes)
    return <AlertMissingDraft langAbbr={userLangAbbr} langIndex={userLangIndex} courseCode={courseCode} />

  const scrollToTop = () => {
    const spanElement = toTopRef.current
    if (spanElement) {
      window.scrollTo(0, spanElement.offsetTop)
    }
  }

  const courseSubHeader = () => {
    const { title, titleOther, credits, creditUnitAbbr } = memoData

    const creditsStandard = credits || ''
    const courseTitle = `${courseCode} ${userLangIndex === memoLangIndex ? title : titleOther} ${creditsStandard} ${
      userLangIndex === 1 ? creditUnitAbbr : 'credits'
    }`

    // update course title in case if smth changed in kopps
    store.setCourseTitle(courseTitle)

    return <span>{courseTitle}</span>
  }

  const setUpperAlarm = () => {
    setErrorBool(true)
    const alertElement = document.getElementById('scroll-here-if-alert')
    alertElement.scrollIntoView({ behavior: 'smooth' })
  }

  const onAlert = (alertTranslationId, alertNewColor = 'success', onTimeout = 0) => {
    const translationId =
      isDraftOfPublished && alertTranslationId === 'autoSaved' ? 'autoSavedTemporary' : alertTranslationId
    const newAlertState = { alertIsOpen: true, alertText: alerts[translationId], alertNewColor }
    if (process.env.NODE_ENV !== 'test') {
      setTimeout(() => {
        setAlert(newAlertState)
      }, onTimeout)
    } else setAlert(newAlertState)
  }

  const offAlert = () => {
    setAlert({ alertIsOpen: false, alertText: '', alertColor: '' })
  }

  const onToastAlert = (alertTranslationId, alertNewColor = 'success', onTimeout = 0) => {
    const showUntilFix = alertTranslationId === 'errorEmptyHeading'
    if (showUntilFix && !openAlertIdUntilFixed)
      // initiate semi-permament alert for empty title
      setOpenAlertIdUntilFixed('errorEmptyHeading')
    else if (!showUntilFix) {
      onAlert(alertTranslationId, alertNewColor, onTimeout)
      if (process.env.NODE_ENV !== 'test') {
        setTimeout(() => {
          offAlert()
        }, 5000)
      }
    }
  }

  const toastAlertOnSuccessSave = alertTranslationId => {
    onToastAlert(alertTranslationId)
    setDraftOfPublishedState(false)
  }

  // eslint-disable-next-line consistent-return
  const onSave = async (editorContent, alertTranslationId) => {
    const { syllabusValid, memoCommonLangAbbr, credits, creditUnitAbbr, title, educationalTypeId } = memoData
    const eduTypeId = educationalTypeId ? { educationalTypeId } : {}
    const { validFromTerm, validUntilTerm } = syllabusValid || {}
    if (syllabusValid)
      syllabusValid.textFromTo =
        `${seasonStr(memoLangIndex, validFromTerm)} - ${seasonStr(memoLangIndex, validUntilTerm)}` || ''

    const course = {
      credits,
      creditUnitAbbr,
      title: { [memoCommonLangAbbr]: title },
    }
    const courseTitle = combinedCourseName(courseCode, course, memoCommonLangAbbr)
    const body = { courseCode, memoEndPoint, ...editorContent, syllabusValid, courseTitle, ...eduTypeId } // containt kopps old data, or it is empty first time
    try {
      const result = await store.updateDraft(body)
      if (result.status >= 400) {
        onToastAlert('errWhileSaving', 'danger')

        return 'ERROR-onSave-' + result.status
      }
      toastAlertOnSuccessSave(alertTranslationId)
      return result
    } catch (error) {
      onToastAlert('errWhileSaving', 'danger')
    }
  }

  const onAutoSave = (data = store.memoData) => onSave(data, 'autoSaved') // save precisely this editor content by contentId

  // Function for adding new titles with a content
  const onAddNewExtraContent = extraHeaderTitle => {
    store.setNewEmptyExtraContent(extraHeaderTitle)

    setTimeout(() => {
      window.scrollBy({
        top: 700,
        behavior: 'smooth',
        block: 'center',
      })
    }, 300)
  }

  const onChangeTab = nextSectionId => {
    const extraHeadersId = getExtraHeaderIdBySectionId(activeTab)
    const canBeSwitched = store.checkExtraTitlesForSectionId(extraHeadersId)
    if (canBeSwitched) {
      setActiveTab(nextSectionId)
      scrollToTop(nextSectionId)
      setContentIdWithMissingHeading('')
      store.cleanUpAllEmptyExtraContent(extraHeadersId)
      onAutoSave()
    } else {
      setContentIdWithMissingHeading(extraHeadersId)
      // Show alert below after scroll is done
      onToastAlert('errorEmptyHeading', 'danger', 500)
    }
  }

  // Check visibility for standard headers
  const checkVisibility = (contentId, initialValue) => {
    // first time isInVisibleMemo for those header which have openIfContent=true will be true as well
    const { openIfContent } = context[contentId]
    const isInVisibleMemo = (visibleInMemo && visibleInMemo[contentId]) || false
    if (openIfContent && isInVisibleMemo === 'defaultTrue') {
      // openIfContent is not required
      const isDefaultAndHasContent = initialValue !== '' || false // for some headers: if it has a (default) value it must be opened and included(when created from a scratch)
      store.setVisibilityOfStandard(contentId, isDefaultAndHasContent)
      return isDefaultAndHasContent
    }
    return isInVisibleMemo
  }

  const toggleStandardVisibleInMemo = contentId => {
    const prevVisibleInMemo = { ...store.memoData.visibleInMemo }
    let visible
    if (prevVisibleInMemo) {
      visible = contentId in prevVisibleInMemo ? prevVisibleInMemo[contentId] : false
    } else {
      visible = false
    }
    const newVisibility = !visible
    const returnNewVibisility = store.setVisibilityOfStandard(contentId, newVisibility)
    if (contentId === 'examinationSubSection') store.setExaminationModules(newVisibility)

    onAutoSave({ visibleInMemo: returnNewVibisility })
  }

  /** * Conrol Panel ** */

  /** * User clicked button to save a draft  ** */

  const handleBtnSaveAndMove = async (nextUrl = '') => {
    const hasAllExtraHeadingsNamed = store.checkAllSectionsHasTitles()
    if (!hasAllExtraHeadingsNamed) {
      setNeedToCheckAllExtraHeading(true)
      // Show alert below after scroll is done
      onToastAlert('errorEmptyHeading', 'danger', 500)
      return false
    }

    const resAfterSavingMemoData = await onSave(store.memoData, 'autoSaved')
    if (nextUrl && hasAllExtraHeadingsNamed && resAfterSavingMemoData)
      setTimeout(() => {
        window.location = nextUrl
      }, 500)
    return true
  }

  /** * User clicked button to go to one step back ** */
  const onBack = () => {
    const eventSavedDraft = `savedDraft`
    const nextUrl = `${SERVICE_URL.courseMemoAdmin}${
      isDraftOfPublished ? 'published/' : ''
    }${courseCode}?memoEndPoint=${memoEndPoint}&semester=${semester}&event=${eventSavedDraft}`
    handleBtnSaveAndMove(nextUrl)
  }

  // eslint-disable-next-line consistent-return
  const onCancel = async () => {
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${SAVED_NEW_PARAM}&from=${
      isDraftOfPublished ? 'change' : 'create'
    }&term=${semester}&name=${memoName || memoEndPoint}`

    onAutoSave()

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  const onFinish = () => {
    const startAdminPageUrl = `${SERVICE_URL.courseMemoAdmin}${isDraftOfPublished ? 'published/' : ''}${courseCode}`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  /** * User clicked button to go to next step  ** */
  const onContinueToPreview = () => {
    if (isDraftOfPublished && commentAboutMadeChanges.length === 0) setUpperAlarm()
    else handleBtnSaveAndMove(`${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}/preview`)
  }

  /* Functions for editing/controlling published memos */

  const setChangesAboutDraftOfPublished = event => {
    event.preventDefault()
    setErrorBool(false)
    store.setMemoByContentId('commentAboutMadeChanges', event.target.value.trim())
  }

  /* GENERAL VIEW OF ALL MEMO HEADERS WITH TEXT OR EDITOR */

  const renderTabSections = () => {
    const { buttons } = i18n.messages[userLangIndex]

    return sections.map(({ id, content, extraHeaderTitle }) => (
      <TabContent key={`tab-content-for-section-${id}`} isActive={activeTab === id} sectionId={id}>
        <div id={`section-header-${id}`} ref={toTopRef} />
        {/* load editors for only active tab
          to reduce load and trigger dismount all possible 
          overlay windows from other section's editors */}
        {activeTab === id && (
          <>
            {content.map(contentId => (
              <StandardSectionOrEditor
                key={'standard' + contentId}
                contentId={contentId}
                sectionId={id}
                htmlContent={memoData[contentId]}
                memoLangIndex={memoLangIndex}
                onToggleVisibleInMemo={toggleStandardVisibleInMemo}
                checkVisibility={checkVisibility}
                onSave={onSave}
                userLangIndex={userLangIndex}
              />
            ))}

            {extraHeaderTitle &&
              memoData[extraHeaderTitle] &&
              memoData[extraHeaderTitle].map(({ uKey }, index) => (
                <ExtraHeadingEditor
                  contentId={extraHeaderTitle}
                  currentIndex={index}
                  key={uKey}
                  menuId={`${id}-${extraHeaderTitle}${uKey}`}
                  uKey={uKey}
                  onAlert={onToastAlert}
                  onSave={onSave}
                  showError={contentIdWithMissingHeading === extraHeaderTitle || needToCheckAllExtraHeading}
                />
              ))}
            {extraHeaderTitle && (
              <Button
                data-testid="add-heading-to"
                className="element-50"
                variant="secondary"
                onClick={() => onAddNewExtraContent(extraHeaderTitle)}
              >
                {buttons.btnAddExtra}
                {sectionsLabels[id]}
              </Button>
            )}
          </>
        )}
      </TabContent>
    ))
  }
  return (
    <div className="kip-container">
      <Row key="pageHeader" id="scroll-here-if-alert">
        <PageHeading
          heading={isDraftOfPublished ? pageTitles.published : pageTitles.new}
          subHeading={courseSubHeader()}
        />
      </Row>
      <ProgressBar current={PROGRESS - 1} steps={isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm} />
      <PageHead semester={semester} memoName={memoName} userLangIndex={userLangIndex} />
      {(isDraftOfPublished && !exactDraftCopyOfPublishedFromPrevVersion && (
        <AlertDraftOfPublished userLangIndex={userLangIndex} />
      )) || (
        <AlertSuccessRebuild
          alertMsg={alerts.infoRebuildDraft}
          hasBeenRebuild={exactDraftCopyOfPublishedFromPrevVersion}
        />
      )}
      <AlertSuccessCopiedMemo eventFromParams={eventFromParams} alertMsg={alerts.syllabusUpdated} />
      <AlertErrorMissingComment isError={isError} alertMsg={alerts.warnFillInCommentAboutChanges} />
      <div key="section-of-header" className="sections-headers">
        <ProgressTitle id="progress-title" text={pagesCreateNewPm[PROGRESS - 1]} />
        <CollapseMemoIntroduction
          translate={extraInfo.summaryIntroductionHelp}
          isDraftOfPublished={isDraftOfPublished}
          langAbbr={userLangAbbr}
        />
      </div>
      <StickyContainer className="memo-container">
        <Sticky topOffset={STICKY_TOP_OFFSET}>
          {({ style, isSticky }) => (
            <div
              className={'sticky-tabs-container'}
              style={{
                ...style,
                ...{ marginTop: isSticky ? STICKY_TABS_TOP_MARGIN : '0' },
              }}
            >
              <TabNav
                activeTabId={activeTab}
                onClick={onChangeTab}
                sections={sections}
                sectionsLabels={sectionsLabels}
              />
              <div className="white-space-under-tabs" />
            </div>
          )}
        </Sticky>

        <Row className="memo-content-row">
          <Col lg="9" className="memo-content tab-content" id="memoTabContent">
            {renderTabSections()}
          </Col>
          <Col lg="3" className="sticky-overview">
            <Sticky topOffset={STICKY_TOP_OFFSET}>
              {({ style, isSticky }) => (
                <div
                  className="sticky-section-menu-container"
                  style={{ ...style, marginTop: isSticky ? STICKY_SECTION_MENU_TOP_MARGIN : '0' }}
                >
                  <SectionMenu
                    visiblesOfStandard={visibleInMemo}
                    userLangIndex={userLangIndex}
                    memoLangIndex={memoLangIndex}
                    activeTab={activeTab}
                  >
                    {isDraftOfPublished && (
                      <CommentChangesTextarea
                        isError={isError}
                        labels={extraInfo}
                        memoLangIndex={memoLangIndex}
                        onChange={setChangesAboutDraftOfPublished}
                        textAboutChanges={commentAboutMadeChanges}
                        userLangIndex={userLangIndex}
                      />
                    )}
                  </SectionMenu>
                </div>
              )}
            </Sticky>
          </Col>
        </Row>
      </StickyContainer>
      <ControlPanel
        fixedBottom
        langIndex={userLangIndex}
        onSubmit={onContinueToPreview}
        onSave={onAutoSave}
        onBack={onBack}
        onCancel={onCancel}
        onFinish={onFinish}
        progress={2}
        alertText={alertText}
        alertIsOpen={alertIsOpen}
        alertColor={alertColor || 'success'}
        isDraftOfPublished={isDraftOfPublished}
        openAlertIdUntilFixed={openAlertIdUntilFixed}
      />
    </div>
  )
}

MemoContainer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  initialActiveTab: PropTypes.string,
}

MemoContainer.defaultProps = {
  initialActiveTab: null,
}

export default observer(MemoContainer)
