/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
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
import PageHead from '../components/PageHead'
import CommentChangesTextarea from '../components/editors/CommentChangesTextarea'
import ControlPanel from '../components/ControlPanel'
import NewSectionEditor from '../components/editors/NewSectionEditor'
import StandardEditorPerTitle from '../components/editors/StandardEditorPerTitle'
import SectionForNonEditable from '../components/SectionForNonEditable'
import TabPanel from '../components/TabPanel'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections } from '../util/fieldsByType'
import SectionMenu from '../components/SectionMenu'
import PropTypes from 'prop-types'

const PROGRESS = 2

@inject(['routerStore'])
@observer
class MemoContainer extends Component {
  state = {
    ...(this.props.routerStore.memoData || {}),
    isError: false,
    alertIsOpen: false,
    alertText: '',
    alertColor: '',
    activeTab: sections[0].id
  }

  isDraftOfPublished = Number(this.props.routerStore.memoData.version) > FIRST_VERSION

  courseCode = this.props.routerStore.courseCode

  memoEndPoint = this.props.routerStore.memoEndPoint

  semester = this.props.routerStore.semester

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  rebuilDraftFromPublishedVer = this.props.routerStore.rebuilDraftFromPublishedVer

  componentDidMount() {
    const { event } = fetchParameters(this.props)
    const { history } = this.props

    this.eventFromParams = event || ''
    if (history) {
      history.push({
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
    const alertElement = document.getElementById('scroll-here-if-alert')
    alertElement.scrollIntoView({ behavior: 'smooth' })
  }

  /* General functions */
  onAlert = (alertTranslationId, alertColor = 'success') => {
    const translationId =
      this.isDraftOfPublished && alertTranslationId === 'autoSaved'
        ? 'autoSavedTemporary'
        : alertTranslationId

    const { alerts } = i18n.messages[this.userLangIndex]
    this.setState({ alertIsOpen: true, alertText: alerts[translationId], alertColor })
    if (process.env.NODE_ENV !== 'test')
      setTimeout(() => {
        this.setState({ alertIsOpen: false, alertText: '', alertColor: '' })
      }, 2000)
  }

  alertOnSuccessSave = (alertTranslationId) => {
    this.onAlert(alertTranslationId)
    this.rebuilDraftFromPublishedVer = false
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
        this.onAlert('errWhileSaving', 'danger')

        return 'ERROR-' + result.status
      }
      this.alertOnSuccessSave(alertTranslationId)
      return result
    } catch (error) {
      this.onAlert('errWhileSaving', 'danger')
    }
  }

  onAutoSave = () => {
    this.onSave(this.props.routerStore.memoData, 'autoSaved') // save precisily this editor content by contentId
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
    this.onSave({ visibleInMemo: this.props.routerStore.memoData.visibleInMemo }, 'autoSaved')
  }

  /** * Conrol Panel ** */

  /** * User clicked button to save a draft  ** */
  handleBtnSave = () => {
    const resAfterSavingMemoData = this.onSave(this.props.routerStore.memoData, 'autoSaved')
    return resAfterSavingMemoData
  }

  /** * User clicked button to go to one step back ** */
  onBack = () => {
    const { courseCode, memoEndPoint, isDraftOfPublished } = this
    const nextUrl = `${SERVICE_URL.courseMemoAdmin}${
      isDraftOfPublished ? 'published/' : ''
    }${courseCode}?memoEndPoint=${memoEndPoint}`
    this.handleBtnSave().then(
      setTimeout(() => {
        window.location = nextUrl
      }, 500)
    )
  }

  onFinish = async () => {
    const { courseCode, semester, isDraftOfPublished, memoEndPoint } = this
    const { memoName } = this.state
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${
      isDraftOfPublished ? REMOVE_PUBLISHED_PARAM : SAVED_NEW_PARAM
    }&term=${semester}&name=${memoName || memoEndPoint}`

    if (!isDraftOfPublished)
      return this.handleBtnSave().then(
        setTimeout(() => {
          window.location = startAdminPageUrl
        }, 500)
      )

    try {
      const resultAfterDelete = await axios.delete(
        `${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`
      )
      if (resultAfterDelete.status >= 400) {
        this.onAlert('errWhileDeleting', 'danger')

        return 'ERROR-MemoContainer.jsx-onFinish-' + resultAfterDelete.status
      }
      setTimeout(() => {
        window.location = startAdminPageUrl
      }, 500)
    } catch (err) {
      this.onAlert('errWhileDeleting', 'danger')

      if (err.response) {
        throw new Error('MemoContainer.jsx-onFinish-' + err.message)
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
      this.handleBtnSave().then(
        setTimeout(() => {
          window.location = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}/preview`
        }, 500)
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
    const { buttons } = i18n.messages[this.userLangIndex]

    return sections.map(({ id, content, extraHeaderTitle }) => (
      // <div key={id} className="sections-list-80">
      <div
        className={`tab-pane fade ${this.state.activeTab === id ? 'show active' : ''}`}
        id={'tab-content-for-' + id}
        key={'tab-content-for-' + id}
        role="tabpanel"
        aria-labelledby={id + '-tab'}
      >
        <h2 id={'header-' + id} key={'header-' + id}>
          {sectionsLabels[id]}
        </h2>
        {content.map((contentId) => {
          const menuId = id + '-' + contentId
          const { isEditable, isRequired } = context[contentId]
          const initialValue = memoData[contentId]
          const visibleInMemo = isRequired ? true : this.checkVisibility(contentId, initialValue)

          return isEditable ? (
            <StandardEditorPerTitle
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              htmlContent={initialValue}
              onToggleVisibleInMemo={this.toggleStandardVisibleInMemo}
              visibleInMemo={visibleInMemo}
              onSave={this.onSave}
            />
          ) : (
            <SectionForNonEditable
              memoLangIndex={this.memoLangIndex}
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={this.toggleStandardVisibleInMemo}
              html={initialValue}
              userLangIndex={this.userLangIndex}
            />
          )
        })}
        {extraHeaderTitle &&
          memoData[extraHeaderTitle] &&
          memoData[extraHeaderTitle].map(({ uKey }) => {
            return (
              <NewSectionEditor
                contentId={extraHeaderTitle}
                key={uKey}
                menuId={id + '-' + extraHeaderTitle + uKey}
                uKey={uKey}
                onAlert={this.onAlert}
                onSave={this.onSave}
              />
            )
          })}
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
      </div>
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
      alertColor
    } = this.state
    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row key="pageHeader" id="scroll-here-if-alert">
          <PageTitle
            id="mainHeading"
            pageTitle={this.isDraftOfPublished ? pageTitles.published : pageTitles.new}
          >
            {this.courseSubHeader()}
          </PageTitle>
        </Row>
        <ProgressBar
          active={2}
          pages={this.isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm}
        />
        <PageHead semester={this.semester} memoName={memoName} userLangIndex={userLangIndex} />
        {(this.isDraftOfPublished && !this.rebuilDraftFromPublishedVer && (
          <AlertDraftOfPublished
            courseCode={this.courseCode}
            memoEndPoint={this.memoEndPoint}
            memoVersion={version}
            onAlert={this.onAlert}
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
          </Col>
        </Row>
        <TabPanel
          activeTabId={activeTab}
          onClick={(sectionId) => this.setState({ activeTab: sectionId })}
          sections={sections}
          sectionsLabels={i18n.messages[memoLangIndex].sectionsLabels}
        />
        <StickyContainer className="memo-container">
          <Row className="mb-4">
            <Col lg="7" className="memo-content tab-content" id="memoTabContent">
              {this.renderScrollView()}
            </Col>
            <Col className="separator" />
            <Col lg="3" className="sticky-overview">
              <Sticky topOffset={-41}>
                {({ style, isSticky }) => (
                  <div
                    style={{
                      ...style,
                      ...{
                        paddingRight: '0',
                        paddingBottom: '115px',
                        paddingTop: isSticky ? '41px' : '0'
                      }
                    }}
                  >
                    <SectionMenu
                      id="mainMenu"
                      visibilities={visibleInMemo}
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
                        // <Form className={isError ? 'error-area' : ''}>
                        //   <FormGroup className="title">
                        //     <ContentHead
                        //       contentId="commentAboutMadeChanges"
                        //       memoLangIndex={memoLangIndex}
                        //       userLangIndex={userLangIndex}
                        //     />
                        //     <Label htmlFor="commentChanges">{extraInfo.commentChanges}</Label>
                        //     <Input
                        //       type="textarea"
                        //       name="text"
                        //       id="commentChanges"
                        //       onChange={this.setChangesAboutDraftOfPublished}
                        //       defaultValue={commentAboutMadeChanges}
                        //     />
                        //   </FormGroup>
                        // </Form>
                      )}
                    </SectionMenu>
                    <div id="back-to-top" role="link" aria-label="To page to" />
                    {/* <button></button>
                    <a href=""></a> */}
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
            onSave={this.handleBtnSave}
            onBack={this.onBack}
            onCancel={this.onFinish}
            progress={2}
            alertText={alertText}
            alertIsOpen={alertIsOpen}
            alertColor={alertColor || 'success'}
            isDraftOfPublished={this.isDraftOfPublished}
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
