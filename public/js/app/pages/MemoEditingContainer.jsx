import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Container, Row, Col, Button } from 'reactstrap'
import { StickyContainer, Sticky } from 'react-sticky'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import PropTypes from 'prop-types'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { FIRST_VERSION, SERVICE_URL, REMOVE_PUBLISHED_PARAM, SAVED_NEW_PARAM } from '../util/constants'
import { combinedCourseName, fetchParameters, seasonStr } from '../util/helpers'
import AlertDraftOfPublished from '../components/alerts/AlertDraftOfPublished'
import AlertErrorMissingComment from '../components/alerts/AlertErrorMissingComment'
import AlertSuccessCopiedMemo from '../components/alerts/AlertSuccessCopiedMemo'
import AlertSuccessRebuild from '../components/alerts/AlertSuccessRebuild'
import CollapseMemoIntroduction from '../components/details/CollapseMemoIntroduction'
import PageHead from '../components/PageHead'
import CommentChangesTextarea from '../components/editors/CommentChangesTextarea'
import ControlPanel from '../components/ControlPanel'
import ExtraHeadingEditor from '../components/editors/ExtraHeadingEditor'
import StandardSectionOrEditor from '../components/StandardSectionOrEditor'
import TabNav from '../components/TabNav'
import TabContent from '../components/TabContent'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections, getExtraHeaderIdBySectionId } from '../util/fieldsByType'
import SectionMenu from '../components/SectionMenu'

const PROGRESS = 2
const TAB_HEIGHT = 35
const TAB_TOP_MARGIN = 20
const TAB_HEIGHT_WITH_TOP_PADDING = `${TAB_HEIGHT + TAB_TOP_MARGIN}px`
const PERSONAL_MENU_HEIGHT = 41
const MINUS_PERSONAL_MENU_HEIGHT = 0 - PERSONAL_MENU_HEIGHT
const OVERVIEW_TOP_PADDING = `${TAB_HEIGHT + TAB_TOP_MARGIN + PERSONAL_MENU_HEIGHT + 30}px`
const STICKY_BOTTOM_OFFSEST = 10 // PERSONAL_MENU_HEIGHT +

function MemoContainer(props) {
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
    semester,
  } = store
  const { initialActiveTab } = props // used for test
  const [isError, setErrorBool] = useState(false)
  const [alert, setAlert] = useState({ alertIsOpen: false, alertText: '', alertColor: '' })
  const [activeTab, setActiveTab] = useState(initialActiveTab || sections[0].id)
  const [needToCheckAllExtraHeading, setNeedToCheckAllExtraHeading] = useState(false) // check all extra content groups
  const [contentIdWithMissingHeading, setContentIdWithMissingHeading] = useState('') // check specific extra content group
  const [openAlertIdUntilFixed, setOpenAlertIdUntilFixed] = useState('')

  const { commentAboutMadeChanges, lastPublishedVersionPublishDate, memoName, version, visibleInMemo } = memoData
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
    const { history } = props

    if (history) {
      history.push({
        search: '',
      })
    }
  }, [])

  // useEffect(() => {
  //   if (window.location.hash) {
  //     const id = window.location.hash.replace('#', '')
  //     const { scrollIntoView } = document.getElementById(id)
  //     if (scrollIntoView) {
  //       scrollIntoView({ behavior: 'smooth', block: 'center' })
  //     }
  //   }
  // }, [window.location.hash])

  const courseSubHeader = () => {
    const { title, titleOther, credits, creditUnitAbbr } = memoData

    const creditsStandard = credits || ''
    const courseTitle = `${courseCode} ${userLangIndex === memoLangIndex ? title : titleOther} ${creditsStandard} ${
      userLangIndex === 1 ? creditUnitAbbr : 'credits'
    }`

    // update course title in case if smth changed in kopps
    store.setCourseTitle(courseTitle)

    return (
      <span role="heading" aria-level="4">
        {courseTitle}
      </span>
    )
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

  const onSave = async (editorContent, alertTranslationId) => {
    const { syllabusValid, memoCommonLangAbbr, credits, creditUnitAbbr, title } = memoData
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
    const body = { courseCode, memoEndPoint, ...editorContent, syllabusValid, courseTitle } // containt kopps old data, or it is empty first time
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

  // const onScrollIntoView = () => {
  //   if (window.location.hash) {
  //     const id = window.location.hash.replace('#', '')
  //     const { scrollIntoView } = document.getElementById(id)
  //     if (scrollIntoView) {
  //       scrollIntoView({ behavior: 'smooth', block: 'center' })
  //     }
  //   }
  // }

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

  const toggleStandardVisibleInMemo = contentHeader => {
    const prevVisibleInMemo = { ...store.memoData.visibleInMemo }
    let visible
    if (prevVisibleInMemo) {
      visible = contentHeader in prevVisibleInMemo ? prevVisibleInMemo[contentHeader] : false
    } else {
      visible = false
    }
    const returnNewVibisility = store.setVisibilityOfStandard(contentHeader, !visible)
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
    const nextUrl = `${SERVICE_URL.courseMemoAdmin}${
      isDraftOfPublished ? 'published/' : ''
    }${courseCode}?memoEndPoint=${memoEndPoint}`
    handleBtnSaveAndMove(nextUrl)
  }

  // eslint-disable-next-line consistent-return
  const onCancel = async () => {
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${
      isDraftOfPublished ? REMOVE_PUBLISHED_PARAM : SAVED_NEW_PARAM
    }&term=${semester}&name=${memoName || memoEndPoint}`

    if (!isDraftOfPublished)
      return handleBtnSaveAndMove(`${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}/preview`)

    /* If it is a draft of published version, draft will be deleted */
    try {
      const resultAfterDelete = await axios.delete(`${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`)
      if (resultAfterDelete.status >= 400) {
        onToastAlert('errWhileDeleting', 'danger')

        return 'ERROR-MemoContainer.jsx-onCancel-' + resultAfterDelete.status
      }
      setTimeout(() => {
        window.location = startAdminPageUrl
      }, 500)
    } catch (err) {
      onToastAlert('errWhileDeleting', 'danger')

      if (err.response) {
        throw new Error('MemoContainer.jsx-onCancel-' + err.message)
      }
      throw err
    }
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
      <TabContent key={'tab-content-for-section-' + id} isActive={activeTab === id} sectionId={id}>
        <span id={'section-header-' + id} />
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
                initialValue={memoData[contentId]}
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
                className="element-50"
                color="secondary"
                block
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
    <Container className="kip-container">
      {/* /* style={{ marginBottom: '110px' }} */}
      <Row key="pageHeader" id="scroll-here-if-alert">
        <PageTitle id="mainHeading" pageTitle={isDraftOfPublished ? pageTitles.published : pageTitles.new}>
          {courseSubHeader()}
        </PageTitle>
      </Row>
      <ProgressBar active={PROGRESS} pages={isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm} />
      <PageHead semester={semester} memoName={memoName} userLangIndex={userLangIndex} />
      {(isDraftOfPublished && !exactDraftCopyOfPublishedFromPrevVersion && (
        <AlertDraftOfPublished
          courseCode={courseCode}
          memoEndPoint={memoEndPoint}
          memoVersion={version}
          onAlert={onToastAlert}
          publishDate={lastPublishedVersionPublishDate}
          userLangIndex={userLangIndex}
        />
      )) || (
        <AlertSuccessRebuild
          alertMsg={alerts.infoRebuildDraft}
          hasBeenRebuild={exactDraftCopyOfPublishedFromPrevVersion}
        />
      )}
      <AlertSuccessCopiedMemo eventFromParams={eventFromParams} alertMsg={alerts.syllabusUpdated} />
      <AlertErrorMissingComment isError={isError} alertMsg={alerts.warnFillInCommentAboutChanges} />
      <Row
        key="section-of-header"
        className="sections-headers"
        style={isDraftOfPublished ? { marginBottom: '1.875rem' } : {}}
      >
        <Col lg="7">
          <ProgressTitle id="progress-title" text={pagesCreateNewPm[PROGRESS - 1]} />
          {!isDraftOfPublished && (
            <CollapseMemoIntroduction translate={extraInfo.summaryIntroductionHelp} landAbbr={userLangAbbr} />
          )}
        </Col>
      </Row>
      <StickyContainer className="memo-container">
        <Sticky topOffset={MINUS_PERSONAL_MENU_HEIGHT} bottomOffset={STICKY_BOTTOM_OFFSEST}>
          {({ style, isSticky }) => (
            <div
              style={{
                ...style,
                ...{
                  paddingRight: '0',
                  // paddingBottom: '0',
                  paddingTop: isSticky ? TAB_HEIGHT_WITH_TOP_PADDING : '0',
                  backgroundColor: '#ffffff',
                  zIndex: 1,
                },
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

        <Row>
          <Col lg="8" className="memo-content tab-content" id="memoTabContent">
            {renderTabSections()}
          </Col>
          <Col className="vertical-separator" />
          <Col lg="3" className="sticky-overview">
            <Sticky topOffset={MINUS_PERSONAL_MENU_HEIGHT} bottomOffset={STICKY_BOTTOM_OFFSEST}>
              {({ style, isSticky }) => (
                <div
                  style={{
                    ...style,
                    ...{
                      paddingRight: '0',
                      // paddingBottom: '110px',
                      paddingTop: isSticky ? OVERVIEW_TOP_PADDING : '0',
                    },
                  }}
                >
                  <SectionMenu
                    id="mainMenu"
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
      <Container className="fixed-bottom">
        <ControlPanel
          langIndex={userLangIndex}
          onSubmit={onContinueToPreview}
          onSave={onAutoSave}
          onBack={onBack}
          onCancel={onCancel}
          progress={2}
          alertText={alertText}
          alertIsOpen={alertIsOpen}
          alertColor={alertColor || 'success'}
          isDraftOfPublished={isDraftOfPublished}
          openAlertIdUntilFixed={openAlertIdUntilFixed}
        />
      </Container>
    </Container>
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
