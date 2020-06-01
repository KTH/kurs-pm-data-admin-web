/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { StickyContainer, Sticky } from 'react-sticky'
import i18n from '../../../../i18n'
import axios from 'axios'
import { ActionModalButton, PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import {
  SERVICE_URL,
  ADMIN_COURSE_PM_DATA,
  REMOVE_PUBLISHED_PARAM,
  SAVED_NEW_PARAM
} from '../util/constants'
// import { Switch,Route } from 'react-router-dom'
import PageHead from '../components/PageHead'
import ControlPanel from '../components/ControlPanel'
import NewSectionEditor from '../components/NewSectionEditor'
import StandardEditorPerTitle from '../components/StandardEditorPerTitle'
import Section from '../components/Section'
import { ContentHead } from '../components/ContentHead'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections } from '../util/fieldsByType'
// import axios from 'axios'
import ContentOverviewMenu from '../components/ContentOverviewMenu'

const PROGRESS = 2

@inject(['routerStore'])
@observer
class MemoContainer extends Component {
  state = {
    ...(this.props.routerStore.memoData || {}),
    isError: false
  }

  isDraftOfPublished = Number(this.props.routerStore.memoData.version) > 1

  courseCode = this.props.routerStore.courseCode

  memoEndPoint = this.props.routerStore.memoEndPoint

  semester = this.props.routerStore.semester

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  rebuilDraftFromPublishedVer = this.props.routerStore.rebuilDraftFromPublishedVer

  componentDidMount() {
    this.props.history.push({
      search: ''
    })
    this.scrollIntoView()
    console.log('window.localStorage', window.localStorage)
    console.log('window.sessionStorage', window.sessionStorage)
  }

  setUpperAlarm = () => {
    this.setState({ isError: true })
    const alertElement = document.getElementById('scroll-here-if-alert')
    alertElement.scrollIntoView({ behavior: 'smooth' })
    // setTimeout(() => {
    //   this.setState({ isError: false })
    // }, 2000)
  }

  /* General functions */
  onAlert = (alertTranslationId, alertColor = 'success') => {
    const translationId =
      this.isDraftOfPublished && alertTranslationId === 'autoSaved'
        ? 'autoSavedTemporary'
        : alertTranslationId

    const { alerts } = i18n.messages[this.userLangIndex]
    this.setState({ alertIsOpen: true, alertText: alerts[translationId], alertColor })
    setTimeout(() => {
      this.setState({ alertIsOpen: false, alertText: '', alertColor: '' })
    }, 2000)
  }

  onSave = (editorContent, alertTranslationId) => {
    const { courseCode, memoEndPoint } = this
    const body = { courseCode, memoEndPoint, ...editorContent } // containt kopps old data, or it is empty first time

    return axios
      .post(
        '/kursinfoadmin/kurs-pm-data/internal-api/draft-updates/' + courseCode + '/' + memoEndPoint,
        body
      )
      .then(newResult => {
        if (newResult.status >= 400) {
          this.setAlarm('danger', 'errWhileSaving')
          return 'ERROR-' + newResult.status
        }
        this.onAlert(alertTranslationId)
      })
      .then(() => {
        this.rebuilDraftFromPublishedVer = false
      })
      .catch(error => {
        this.onAlert('errWhileSaving', 'danger')
        if (error.response) {
          // test it
          throw new Error(error.message)
        }
        throw error
      }) // alert error
  }

  onAutoSave = () => {
    this.onSave(this.props.routerStore.memoData, 'autoSaved') // save precisily this editor content by contentId
  }

  scrollIntoView = () => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  // Function for adding new titles with a content
  onAddNewSection = extraHeaderTitle => {
    const newSection = {
      uKey: Math.random().toString(),
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

  toggleStandardVisibleInMemo = contentHeader => {
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
    const nextUrl = `${ADMIN_COURSE_PM_DATA}${
      isDraftOfPublished ? 'published/' : ''
    }${courseCode}?memoEndPoint=${memoEndPoint}`
    this.handleBtnSave().then(
      setTimeout(() => {
        window.location = nextUrl
      }, 500)
    )
  }

  onFinish = () => {
    const { courseCode, semester, isDraftOfPublished, memoEndPoint } = this
    const { memoName } = this.state
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${
      isDraftOfPublished ? REMOVE_PUBLISHED_PARAM : SAVED_NEW_PARAM
    }&term=${semester}&name=${memoName || memoEndPoint}`

    // ADD ERROR IF IT WAS NOT SAVED THEN STOP

    if (isDraftOfPublished)
      return axios
        .delete(`${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`)
        .then(result => {
          if (result.status >= 400) {
            this.onAlert('errWhileDeleting', 'danger')
            return 'ERROR-' + result.status
          }
          setTimeout(() => {
            window.location = startAdminPageUrl
          }, 500)
        })
        .catch(err => {
          if (err.response) {
            throw new Error(err.message)
          }
          throw err
        })
    return this.handleBtnSave().then(
      setTimeout(() => {
        window.location = startAdminPageUrl
      }, 500)
    )
  }

  /** * User clicked button to go to next step  ** */
  onContinueToPreview = () => {
    const { courseCode, memoEndPoint, isDraftOfPublished } = this
    const { commentAboutMadeChanges } = this.state
    if (isDraftOfPublished && commentAboutMadeChanges.length === 0) this.setUpperAlarm()
    else
      this.handleBtnSave().then(
        setTimeout(() => {
          window.location = `${ADMIN_COURSE_PM_DATA}${courseCode}/${memoEndPoint}/preview`
        }, 500)
      )
  }

  /* Functions for editing/controlling published memos */

  setChangesAboutDraftOfPublished = event => {
    event.preventDefault()
    this.setState({ isError: false, commentAboutMadeChanges: event.target.value.trim() })
    this.props.routerStore.memoData.commentAboutMadeChanges = event.target.value.trim()
  }

  rebuildDraftOfPublished = () => {
    const { courseCode, memoEndPoint } = this
    return axios
      .delete(`${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`)
      .then(result => {
        if (result.status >= 400) {
          this.onAlert('errWhileDeleting', 'danger')
          return 'ERROR-' + result.status
        }
        const body = { memoEndPoint }
        const newDraftUrl = `${SERVICE_URL.API}create-draft/${courseCode}/${memoEndPoint}`
        return axios
          .post(newDraftUrl, body)
          .then(newResult => {
            if (newResult.status >= 400) {
              this.onAlert('errWhileSaving', 'danger')
              return 'ERROR-' + newResult.status
            }
            // ADDD ERROR HANTERING
            const thisUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}?action=rebuild`
            window.location = thisUrl
          })
          .catch(error => {
            if (error.response) {
              throw new Error(error.message)
            }
            throw error
          })
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.message)
        }
        throw err
      })
  }

  /* GENERAL VIEW OF ALL MEMO HEADERS WITH TEXT OR EDITOR */

  renderScrollView = () => {
    const { memoData } = this.props.routerStore
    const { sectionsLabels } = i18n.messages[this.memoLangIndex]
    const { buttons } = i18n.messages[this.userLangIndex]

    return sections.map(({ id, content, extraHeaderTitle }) => (
      <div key={id} className="sections-list-80">
        <h2 id={id} key={'header-' + id}>
          {sectionsLabels[id]}
        </h2>
        {content.map(contentId => {
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
            <Section
              memoLangIndex={this.memoLangIndex}
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={this.toggleStandardVisibleInMemo}
              html={initialValue}
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
    const {
      actionModals,
      alerts,
      extraInfo,
      pagesCreateNewPm,
      pagesChangePublishedPm,
      pageTitles
    } = i18n.messages[this.userLangIndex]
    const {
      isError,
      memoName,
      title,
      credits,
      creditUnitAbbr,
      lastPublishedVersionPublishDate,
      version
    } = this.state

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row key="pageHeader" id="scroll-here-if-alert">
          <PageTitle
            id="mainHeading"
            pageTitle={this.isDraftOfPublished ? pageTitles.published : pageTitles.new}
          >
            <span>
              {this.courseCode +
                ' ' +
                title +
                ' ' +
                credits +
                ' ' +
                (i18n.isSwedish() ? creditUnitAbbr : 'credits')}
            </span>
          </PageTitle>
        </Row>
        <ProgressBar
          active={2}
          pages={this.isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm}
        />
        <PageHead semester={this.semester} memoName={memoName} />
        {(this.isDraftOfPublished && !this.rebuilDraftFromPublishedVer && (
          <Row key="upper-alert" className="w-100 my-0 mx-auto upper-alert">
            <Alert key="infoAboutNewData" color="info">
              {alerts.infoAboutFreshData || ''}
            </Alert>
            <Alert key="infoAboutStartingAgain" color="info">
              {alerts.infoStartAgain}{' '}
              <ActionModalButton
                btnLabel={`${alerts.linkToRefreshData} (${new Date(
                  lastPublishedVersionPublishDate
                ).toLocaleString(this.userLangIndex === 0 ? 'en-US' : 'sv-SE') ||
                  'version:' + version})`}
                modalId="cancelThisAction"
                type="actionLink"
                modalLabels={actionModals.rebuildDraftOfPublished}
                onConfirm={this.rebuildDraftOfPublished}
              />
            </Alert>
          </Row>
        )) ||
          (this.rebuilDraftFromPublishedVer && (
            <Row key="success-upper-alert" className="w-100 my-0 mx-auto upper-alert">
              <Alert color="success">{alerts.infoRebuildDraft}</Alert>
            </Row>
          ))}
        {isError && (
          <Row key="success-upper-alert" className="w-100 my-0 mx-auto upper-alert">
            <Alert color="danger">{alerts.warnFillInCommentAboutChanges}</Alert>
          </Row>
        )}
        <Row key="section-of-header" className="sections-headers">
          <Col lg="7">
            <ProgressTitle id="progress-title" text={pagesCreateNewPm[PROGRESS - 1]} />
          </Col>
          <Col className="separator" />
          <Col lg="3">
            <ProgressTitle id="select-header" text={extraInfo.contentHeaders} />
          </Col>
        </Row>
        <StickyContainer className="memo-container">
          <Row className="mb-4 space-around-border">
            <Col lg="7" className="memo-content">
              {this.renderScrollView()}
            </Col>
            <Col className="separator" />
            <Col lg="3" className="sticky-overview">
              <Sticky topOffset={-41}>
                {({ style, isSticky }) => (
                  // TODO: Remove wrapping div element and change ContentOverviewMenu to handle style property
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
                    <ContentOverviewMenu
                      id="mainMenu"
                      visibleInMemo={this.state.visibleInMemo}
                      memoLangIndex={this.memoLangIndex}
                    >
                      {this.isDraftOfPublished && (
                        <Form className={isError ? 'error-area' : ''}>
                          <FormGroup className="title">
                            <ContentHead
                              contentId="commentAboutMadeChanges"
                              memoLangIndex={this.memoLangIndex}
                            />
                            <Label htmlFor="commentChanges">{extraInfo.commentChanges}</Label>
                            <Input
                              type="textarea"
                              name="text"
                              id="commentChanges"
                              onChange={this.setChangesAboutDraftOfPublished}
                              defaultValue={this.state.commentAboutMadeChanges}
                            />
                          </FormGroup>
                        </Form>
                      )}
                      {this.isDraftOfPublished && (
                        <span className={isError ? 'error-label' : ''}>
                          <p>
                            <sup>*</sup>
                            {extraInfo.mandatory}
                          </p>
                        </span>
                      )}
                    </ContentOverviewMenu>
                  </div>
                )}
              </Sticky>
            </Col>
          </Row>
        </StickyContainer>
        <Container className="fixed-bottom">
          <ControlPanel
            langIndex={this.userLangIndex}
            onSubmit={this.onContinueToPreview}
            onSave={this.handleBtnSave}
            onBack={this.onBack}
            onCancel={this.onFinish}
            progress={2}
            alertText={this.state.alertText}
            alertIsOpen={this.state.alertIsOpen}
            alertColor={this.state.alertColor || 'success'}
            isDraftOfPublished={this.isDraftOfPublished}
          />
        </Container>
      </Container>
    )
  }
}

export default MemoContainer
