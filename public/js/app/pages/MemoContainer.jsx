/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button } from 'reactstrap'
import { StickyContainer, Sticky } from 'react-sticky'
import i18n from '../../../../i18n'
import axios from 'axios'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
// import { Switch,Route } from 'react-router-dom'
import PageHead from '../components/PageHead'
import ControlPanel from '../components/ControlPanel'
import NewSectionEditor from '../components/NewSectionEditor'
import StandardEditorPerTitle from '../components/StandardEditorPerTitle'
import Section from '../components/Section'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections } from '../util/fieldsByType'
// import axios from 'axios'
import SideMenu from '../components/SideMenu'

const ADMIN = '/kursinfoadmin/kurs-pm-data/'
const PROGRESS = 2

@inject(['routerStore'])
@observer
class MemoContainer extends Component {
  state = this.props.routerStore.memoData || {}

  courseCode = this.props.routerStore.courseCode

  memoEndPoint = this.props.routerStore.memoEndPoint

  semester = this.props.routerStore.semester

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  componentDidMount() {
    this.scrollIntoView()
  }

  /* General functions */
  onAlert = (alertTranslationId, alertColor = 'success') => {
    const { alerts } = i18n.messages[this.userLangIndex]
    this.setState({ alertIsOpen: true, alertText: alerts[alertTranslationId], alertColor })
    setTimeout(() => {
      this.setState({ alertIsOpen: false, alertText: '', alertColor: '' })
    }, 2000)
  }

  onSave = (editorContent, alertTranslationId) => {
    const { courseCode, memoEndPoint } = this
    const body = { courseCode, memoEndPoint, ...editorContent } // containt kopps old data, or it is empty first time
    console.log('Hey saving', JSON.stringify(body))
    return axios
      .post(
        '/kursinfoadmin/kurs-pm-data/internal-api/draft-updates/' + courseCode + '/' + memoEndPoint,
        body
      )
      .then(() => this.onAlert(alertTranslationId))
      .catch(error => console.log(error)) // alert error
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
    const { courseCode, memoEndPoint } = this
    this.handleBtnSave().then(
      setTimeout(() => {
        window.location = `${ADMIN}${courseCode}?memoEndPoint=${memoEndPoint}`
      }, 500)
    )
  }

  /** * User clicked button to go to next step  ** */
  onContinue = () => {
    const { courseCode, memoEndPoint } = this
    // SAVE BEFORE GOT TO NEXT?
    this.handleBtnSave().then(
      setTimeout(() => {
        window.location = `${ADMIN}${courseCode}/${memoEndPoint}/preview`
      }, 500)
    )
  }

  renderScrollView = () => {
    const { memoData } = this.props.routerStore
    const { sectionsLabels, buttons } = i18n.messages[this.memoLangIndex]

    return sections.map(({ id, content, extraHeaderTitle }) => (
      <span key={id}>
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
      </span>
    ))
  }

  render() {
    const { extraInfo, pages, pageTitles } = i18n.messages[this.userLangIndex]
    const { memoName, title, credits, creditUnitAbbr } = this.state

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
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
        <ProgressBar active={2} pages={pages} />
        <PageHead semester={this.semester} memoName={memoName} />
        <StickyContainer className="memo-container">
          <Row className="sections-headers">
            <Col lg="7">
              <ProgressTitle id="progress-title" text={pages[PROGRESS - 1]} />
            </Col>
            <Col className="separator" />
            <Col lg="3">
              <ProgressTitle id="select-header" text={extraInfo.contentHeaders} />
            </Col>
          </Row>
          <hr className="header-content-separation" />
          <Row className="mb-4">
            <Col lg="7" className="memo-content">
              {this.renderScrollView()}
            </Col>
            <Col className="separator" />
            <Col lg="3">
              <Sticky topOffset={-31}>
                {({ style, isSticky }) => (
                  <SideMenu
                    id="mainMenu"
                    style={{
                      ...style,
                      ...{
                        paddingRight: '0',
                        paddingBottom: '115px',
                        paddingTop: isSticky ? '30px' : '0'
                      }
                    }}
                    visibleInMemo={this.state.visibleInMemo}
                    memoLangIndex={this.memoLangIndex}
                  />
                )}
              </Sticky>
            </Col>
          </Row>
        </StickyContainer>
        <Container className="fixed-bottom">
          <ControlPanel
            langIndex={this.userLangIndex}
            onSubmit={this.onContinue}
            onSave={this.handleBtnSave}
            onBack={this.onBack}
            progress={2}
            alertText={this.state.alertText}
            alertIsOpen={this.state.alertIsOpen}
            alertColor={this.state.alertColor || 'success'}
          />
        </Container>
      </Container>
    )
  }
}

export default MemoContainer
