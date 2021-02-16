/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button } from 'reactstrap'
import { StickyContainer, Sticky } from 'react-sticky'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import {
  FIRST_VERSION,
  SERVICE_URL,
  REMOVE_PUBLISHED_PARAM,
  SAVED_NEW_PARAM
} from '../util/constants'
import { combinedCourseName, fetchParameters, seasonStr } from '../util/helpers'
import AlertDraftOfPublished from '../components/alerts/AlertDraftOfPublished'
import AlertErrorMissingComment from '../components/alerts/AlertErrorMissingComment'
import AlertSuccessCopiedMemo from '../components/alerts/AlertSuccessCopiedMemo'
import AlertSuccessRebuild from '../components/alerts/AlertSuccessRebuild'
import CollapseMemoIntroduction from '../components/details/CollapseMemoIntroduction'
import CollapseSectionDetails from '../components/details/CollapseSectionDetails'
import PageHead from '../components/PageHead'
import CommentChangesTextarea from '../components/editors/CommentChangesTextarea'
import ControlPanel from '../components/ControlPanel'
import NewSectionEditor from '../components/editors/NewSectionEditor'
import StandardSectionOrEditor from '../components/StandardSectionOrEditor'

import TabPanel from '../components/TabPanel'
import TabSection from '../components/TabSection'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections, getExtraHeaderIdBySectionId } from '../util/fieldsByType'
import SectionMenu from '../components/SectionMenu'
import PropTypes from 'prop-types'

const PROGRESS = 2
const TAB_HEIGHT = 35
const TAB_TOP_MARGIN = 20
const TAB_HEIGHT_WITH_TOP_PADDING = `${TAB_HEIGHT + TAB_TOP_MARGIN}px`
const PERSONAL_MENU_HEIGHT = 41
const MINUS_PERSONAL_MENU_HEIGHT = 0 - PERSONAL_MENU_HEIGHT
const OVERVIEW_TOP_PADDING = `${TAB_HEIGHT + TAB_TOP_MARGIN + PERSONAL_MENU_HEIGHT + 4}px`
const STICKY_BOTTOM_OFFSEST = PERSONAL_MENU_HEIGHT + 10

@inject(['routerStore'])
@observer
class MemoContainer extends Component {
  state = {
    ...(this.props.routerStore.memoData || {}),
    isError: false,
    alertIsOpen: false,
    alertText: '',
    alertColor: '',
    activeTab: sections[0].id,
    checkAllExtra: false,
    checkOnlyContentId: '',
    openAlertIdUntilFixed: ''
  }

  isDraftOfPublished = Number(this.props.routerStore.memoData.version) > FIRST_VERSION

  courseCode = this.props.routerStore.courseCode

  memoEndPoint = this.props.routerStore.memoEndPoint

  semester = this.props.routerStore.semester

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  rebuilDraftFromPublishedVer = this.props.routerStore.rebuilDraftFromPublishedVer

  static getDerivedStateFromProps(props, state) {
    const hasAllExtraSectionsTitle = props.routerStore.checkAllSectionsHasTitles()
    const { openAlertIdUntilFixed } = state

    // check if it is time to hide red alert about empty titles of extra section
    if (hasAllExtraSectionsTitle && !!openAlertIdUntilFixed) {
      return { openAlertIdUntilFixed: '' }
    }
    return {}
  }

  componentDidMount() {
    const { event } = fetchParameters(this.props)
    const { history, location } = this.props

    this.eventFromParams = event || ''
    if (history) {
      history.push({
        // hash: location.hash, need to fix scroll view hash of sections and hash of tabs
        search: ''
      })
    }
    this.scrollIntoView()
  }

  courseSubHeader = () => {
    const { title, titleOther, credits, creditUnitAbbr } = this.state
    const { courseCode, userLangIndex, memoLangIndex } = this

    const creditsStandard = credits || ''
    const courseTitle = `${courseCode} ${
      userLangIndex === memoLangIndex ? title : titleOther
    } ${creditsStandard} ${userLangIndex === 1 ? creditUnitAbbr : 'credits'}`

    // update course title in case if smth changed in kopps
    this.props.routerStore.memoData.courseTitle = courseTitle

    return (
      <span role="heading" aria-level="4">
        {courseTitle}
      </span>
    )
  }

  setUpperAlarm = () => {
    this.setState({ isError: true })
    // this.scrollIntoView('scroll-here-if-alert')
    const alertElement = document.getElementById('scroll-here-if-alert')
    alertElement.scrollIntoView({ behavior: 'smooth' })
  }

  offAlert = () => {
    this.setState({ alertIsOpen: false, alertText: '', alertColor: '' })
  }

  /* General functions */
  onAlert = (alertTranslationId, alertColor = 'success', onTimeout = 0) => {
    const translationId =
      this.isDraftOfPublished && alertTranslationId === 'autoSaved'
        ? 'autoSavedTemporary'
        : alertTranslationId

    const { alerts } = i18n.messages[this.userLangIndex]
    setTimeout(() => {
      this.setState({ alertIsOpen: true, alertText: alerts[translationId], alertColor })
    }, onTimeout)
  }

  onToastAlert = (alertTranslationId, alertColor = 'success', onTimeout = 0) => {
    const showUntilFix = alertTranslationId === 'errorEmptyTitle'
    if (showUntilFix && !this.state.openAlertIdUntilFixed)
      // initiate semi-permament alert for empty title
      this.setState({ openAlertIdUntilFixed: 'errorEmptyTitle' })
    else if (!showUntilFix) {
      this.onAlert(alertTranslationId, alertColor, onTimeout)
      if (process.env.NODE_ENV !== 'test') {
        setTimeout(() => {
          this.offAlert()
        }, 5000)
      }
    }
  }

  alertOnSuccessSave = (alertTranslationId) => {
    this.onToastAlert(alertTranslationId)
    this.rebuilDraftFromPublishedVer = false
  }

  onAutoSave = (data = this.props.routerStore.memoData) => {
    this.onSave(data, 'autoSaved') // save precisily this editor content by contentId
  }

  onSave = async (editorContent, alertTranslationId) => {
    const { courseCode, memoEndPoint, memoLangIndex } = this
    const { syllabusValid, memoCommonLangAbbr, credits, creditUnitAbbr, title } = this.state
    const { validFromTerm, validUntilTerm } = syllabusValid || {}
    if (syllabusValid)
      syllabusValid.textFromTo =
        `${seasonStr(memoLangIndex, validFromTerm)} - ${seasonStr(
          memoLangIndex,
          validUntilTerm
        )}` || ''

    const course = {
      credits,
      creditUnitAbbr,
      title: { [memoCommonLangAbbr]: title }
    }
    const courseTitle = combinedCourseName(courseCode, course, memoCommonLangAbbr)
    const body = { courseCode, memoEndPoint, ...editorContent, syllabusValid, courseTitle } // containt kopps old data, or it is empty first time
    try {
      const result = await this.props.routerStore.updateDraft(body)
      if (result.status >= 400) {
        this.onToastAlert('errWhileSaving', 'danger')

        return 'ERROR-onSave-' + result.status
      }
      this.alertOnSuccessSave(alertTranslationId)
      return result
    } catch (error) {
      this.onToastAlert('errWhileSaving', 'danger')
    }
  }

  scrollIntoView = () => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const { scrollIntoView } = document.getElementById(id)
      if (scrollIntoView) {
        scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  // Function for adding new titles with a content
  onAddNewSection = (extraHeaderTitle) => {
    const newSection = {
      uKey: Math.random().toString(), // react requires unique key to add/remove items
      title: '',
      htmlContent: '',
      visibleInMemo: true,
      isEmptyNew: true
    }
    this.props.routerStore.dirtyEditor = newSection.uKey
    this.props.routerStore.memoData[extraHeaderTitle].push(newSection)
  }

  onChangeTab = (nextSectionId) => {
    const { activeTab } = this.state
    const extraHeadersId = getExtraHeaderIdBySectionId(activeTab)
    const canBeSwitched = this.props.routerStore.checkExtraTitlesForSectionId(extraHeadersId)
    if (canBeSwitched) {
      this.setState({ activeTab: nextSectionId, checkOnlyContentId: '' })
      setTimeout(() => {
        const startOfSection = document.getElementById(`section-header-${nextSectionId}`)
        if (startOfSection) {
          startOfSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 400)

      this.onAutoSave()
    } else {
      this.setState({ checkOnlyContentId: extraHeadersId })
      // Show alert below after scroll is done
      this.onToastAlert('errorEmptyTitle', 'danger', 500)
    }
  }

  // Check visibility for standard headers
  checkVisibility = (contentId, initialValue) => {
    // first time isInVisibleMemo for those header which have openIfContent=true will be true as well
    const { openIfContent } = context[contentId]
    const isInVisibleMemo =
      (this.state.visibleInMemo && this.state.visibleInMemo[contentId]) || false
    if (openIfContent && isInVisibleMemo === 'defaultTrue') {
      // openIfContent is not required
      const isDefaultAndHasContent = initialValue !== '' || false // for some headers: if it has a (default) value it must be opened and included(when created from a scratch)
      this.props.routerStore.memoData.visibleInMemo[contentId] = isDefaultAndHasContent
      return isDefaultAndHasContent
    }
    return isInVisibleMemo
  }

  toggleStandardVisibleInMemo = (contentHeader) => {
    const prevVisibleInMemo = { ...this.props.routerStore.memoData.visibleInMemo }
    let visible
    if (prevVisibleInMemo) {
      visible = contentHeader in prevVisibleInMemo ? prevVisibleInMemo[contentHeader] : false
    } else {
      visible = false
    }
    this.props.routerStore.memoData.visibleInMemo[contentHeader] = !visible
    this.onAutoSave({ visibleInMemo: this.props.routerStore.memoData.visibleInMemo })
  }

  /** * Conrol Panel ** */

  /** * User clicked button to save a draft  ** */

  handleBtnSaveAndMove = async (nextUrl = '') => {
    const hasAllExtraSectionsTitle = this.props.routerStore.checkAllSectionsHasTitles()
    if (!hasAllExtraSectionsTitle) {
      this.setState({ checkAllExtra: true })
      // Show alert below after scroll is done
      this.onToastAlert('errorEmptyTitle', 'danger', 500)
      return false
    }

    const resAfterSavingMemoData = await this.onSave(this.props.routerStore.memoData, 'autoSaved')
    if (nextUrl && hasAllExtraSectionsTitle && resAfterSavingMemoData)
      setTimeout(() => {
        window.location = nextUrl
      }, 500)
    return true
  }

  /** * User clicked button to go to one step back ** */
  onBack = () => {
    const { courseCode, memoEndPoint, isDraftOfPublished } = this
    const nextUrl = `${SERVICE_URL.courseMemoAdmin}${
      isDraftOfPublished ? 'published/' : ''
    }${courseCode}?memoEndPoint=${memoEndPoint}`
    this.handleBtnSaveAndMove(nextUrl)
  }

  onCancel = async () => {
    const { courseCode, semester, isDraftOfPublished, memoEndPoint } = this
    const { memoName } = this.state
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${
      isDraftOfPublished ? REMOVE_PUBLISHED_PARAM : SAVED_NEW_PARAM
    }&term=${semester}&name=${memoName || memoEndPoint}`

    if (!isDraftOfPublished)
      return this.handleBtnSaveAndMove(
        `${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}/preview`
      )

    /* If it is a draft of published version, draft will be deleted */
    try {
      const resultAfterDelete = await axios.delete(
        `${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`
      )
      if (resultAfterDelete.status >= 400) {
        this.onToastAlert('errWhileDeleting', 'danger')

        return 'ERROR-MemoContainer.jsx-onCancel-' + resultAfterDelete.status
      }
      setTimeout(() => {
        window.location = startAdminPageUrl
      }, 500)
    } catch (err) {
      this.onToastAlert('errWhileDeleting', 'danger')

      if (err.response) {
        throw new Error('MemoContainer.jsx-onCancel-' + err.message)
      }
      throw err
    }
  }

  /** * User clicked button to go to next step  ** */
  onContinueToPreview = () => {
    const { courseCode, memoEndPoint, isDraftOfPublished } = this
    const { commentAboutMadeChanges } = this.state
    if (isDraftOfPublished && commentAboutMadeChanges.length === 0) this.setUpperAlarm()
    else
      this.handleBtnSaveAndMove(
        `${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}/preview`
      )
  }

  /* Functions for editing/controlling published memos */

  setChangesAboutDraftOfPublished = (event) => {
    event.preventDefault()
    this.setState({ isError: false, commentAboutMadeChanges: event.target.value.trim() })
    this.props.routerStore.memoData.commentAboutMadeChanges = event.target.value.trim()
  }

  /* GENERAL VIEW OF ALL MEMO HEADERS WITH TEXT OR EDITOR */

  renderScrollView = () => {
    const { memoData } = this.props.routerStore
    const { sectionsLabels } = i18n.messages[this.memoLangIndex]
    const { buttons, sectionsLabels: sectionsLabelsInUserLang, sectionsSummary } = i18n.messages[
      this.userLangIndex
    ]

    return sections.map(({ id, content, extraHeaderTitle }) => (
      <TabSection
        key={'tab-content-for-section-' + id}
        isActive={this.state.activeTab === id}
        sectionId={id}
        scrollUp
      >
        <h2 id={'section-header-' + id} key={'section-header-' + id}>
          {sectionsLabels[id]}
        </h2>
        <CollapseSectionDetails
          title={`${sectionsSummary.about} ${sectionsLabelsInUserLang[id]}`}
          details={sectionsSummary[id]}
        />
        {/* <p className="details-about-each-section">{sectionsSummary[id]}</p> */}
        {content.map((contentId) => (
          <StandardSectionOrEditor
            key={'standard' + contentId}
            contentId={contentId}
            sectionId={id}
            initialValue={memoData[contentId]}
            memoLangIndex={this.memoLangIndex}
            onToggleVisibleInMemo={this.toggleStandardVisibleInMemo}
            checkVisibility={this.checkVisibility}
            onSave={this.onSave}
            userLangIndex={this.userLangIndex}
          />
        ))}
        {extraHeaderTitle &&
          memoData[extraHeaderTitle] &&
          memoData[extraHeaderTitle].map(({ uKey }, index) => (
            <NewSectionEditor
              contentId={extraHeaderTitle}
              currentIndex={index}
              key={uKey}
              menuId={`${id}-${extraHeaderTitle}${uKey}`}
              uKey={uKey}
              onAlert={this.onToastAlert}
              onSave={this.onSave}
              showError={
                this.state.checkOnlyContentId === extraHeaderTitle || this.state.checkAllExtra
              }
            />
          ))}
        {extraHeaderTitle && (
          <Button
            className="element-50"
            color="secondary"
            block
            onClick={() => this.onAddNewSection(extraHeaderTitle)}
          >
            {buttons.btnAddExtra}
            {sectionsLabels[id]}
          </Button>
        )}
      </TabSection>
    ))
  }

  render() {
    const { memoLangIndex, userLangIndex } = this
    const {
      alerts,
      extraInfo,
      pagesCreateNewPm,
      pagesChangePublishedPm,
      pageTitles
    } = i18n.messages[userLangIndex]
    const {
      activeTab,
      isError,
      memoName,
      lastPublishedVersionPublishDate,
      version,
      visibleInMemo,
      commentAboutMadeChanges,
      alertText,
      alertIsOpen,
      alertColor,
      openAlertIdUntilFixed
    } = this.state
    return (
      <Container className="kip-container">
        {/* /* style={{ marginBottom: '110px' }} */}
        <Row key="pageHeader" id="scroll-here-if-alert">
          <PageTitle
            id="mainHeading"
            pageTitle={this.isDraftOfPublished ? pageTitles.published : pageTitles.new}
          >
            {this.courseSubHeader()}
          </PageTitle>
        </Row>
        <ProgressBar
          active={PROGRESS}
          pages={this.isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm}
        />
        <PageHead semester={this.semester} memoName={memoName} userLangIndex={userLangIndex} />
        {(this.isDraftOfPublished && !this.rebuilDraftFromPublishedVer && (
          <AlertDraftOfPublished
            courseCode={this.courseCode}
            memoEndPoint={this.memoEndPoint}
            memoVersion={version}
            onAlert={this.onToastAlert}
            publishDate={lastPublishedVersionPublishDate}
            userLangIndex={userLangIndex}
          />
        )) || (
          <AlertSuccessRebuild
            alertMsg={alerts.infoRebuildDraft}
            hasBeenRebuild={this.rebuilDraftFromPublishedVer}
          />
        )}
        <AlertSuccessCopiedMemo
          eventFromParams={this.eventFromParams}
          alertMsg={alerts.syllabusUpdated}
        />
        <AlertErrorMissingComment
          isError={isError}
          alertMsg={alerts.warnFillInCommentAboutChanges}
        />
        <Row key="section-of-header" className="sections-headers">
          <Col lg="7">
            <ProgressTitle
              id="progress-title"
              text={pagesCreateNewPm[PROGRESS - 1]}
              style={{ marginBottom: '30px' }}
            />
            <CollapseMemoIntroduction translate={extraInfo.summaryIntroductionHelp} />
          </Col>
        </Row>
        {/* <TabPanel
          activeTabId={activeTab}
          onClick={this.onChangeTab}
          sections={sections}
          sectionsLabels={i18n.messages[memoLangIndex].sectionsLabels}
        /> */}
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
                    zIndex: 1
                  }
                }}
              >
                <TabPanel
                  activeTabId={activeTab}
                  onClick={this.onChangeTab}
                  sections={sections}
                  sectionsLabels={i18n.messages[memoLangIndex].sectionsLabels}
                />
                <div className="white-space-under-tabs" />
              </div>
            )}
          </Sticky>

          <Row>
            <Col lg="8" className="memo-content tab-content" id="memoTabContent">
              {this.renderScrollView()}
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
                        paddingTop: isSticky ? OVERVIEW_TOP_PADDING : '0'
                      }
                    }}
                  >
                    <SectionMenu
                      id="mainMenu"
                      visiblesOfStandard={visibleInMemo}
                      userLangIndex={userLangIndex}
                      memoLangIndex={memoLangIndex}
                      activeTab={activeTab}
                    >
                      {this.isDraftOfPublished && (
                        <CommentChangesTextarea
                          isError={isError}
                          labels={extraInfo}
                          memoLangIndex={memoLangIndex}
                          onChange={this.setChangesAboutDraftOfPublished}
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
            onSubmit={this.onContinueToPreview}
            onSave={this.onAutoSave}
            onBack={this.onBack}
            onCancel={this.onCancel}
            progress={2}
            alertText={alertText}
            alertIsOpen={alertIsOpen}
            alertColor={alertColor || 'success'}
            isDraftOfPublished={this.isDraftOfPublished}
            openAlertIdUntilFixed={openAlertIdUntilFixed}
          />
        </Container>
      </Container>
    )
  }
}

MemoContainer.propTypes = {
  routerStore: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default MemoContainer
