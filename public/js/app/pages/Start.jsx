/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button, Alert } from 'reactstrap'
import { Route } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'

import EditorPerTitle from '../components/Editor'
import Section from '../components/Section'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections } from '../util/fieldsByType'
import axios from 'axios'
import SideMenu from '../components/SideMenu'
import i18n from '../../../../i18n'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = this.props.routerStore.memoData ? this.props.routerStore.memoData : {}

  isApiExisted = !this.props.routerStore.memoData

  koppsFreshData = this.props.routerStore.koppsFreshData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  componentDidMount() {
    this.scrollIntoView()
  }

  handleEditorChange = (editorContent, contentHeader) => {
    this.setState({
      [contentHeader]: editorContent,
      dirtyEditor: contentHeader
    })
  }

  toggleVisibleInMemo = contentHeader => {
    this.setState(previousState => {
      let visible
      if (previousState.visibleInMemo) {
        visible =
          contentHeader in previousState.visibleInMemo
            ? previousState.visibleInMemo[contentHeader]
            : false
      } else {
        visible = false
      }
      return {
        visibleInMemo: {
          ...previousState.visibleInMemo,
          ...{
            [contentHeader]: !visible
          }
        }
      }
    })
  }

  handleSave = callback => {
    const { courseCode, semester } = this
    const start = {
      // It will be needed at the stage when we get 'fresh' data from Kopps
      _id: courseCode + semester,
      courseCode,
      semester
    }
    const body = this.isApiExisted
      ? this.state
      : { ...start, ...this.props.routerStore.koppsFreshData, ...this.state }

    console.log('Content is submited, preparing to save changes:', this.state)
    return axios
      .post(
        '/kursinfoadmin/kurs-pm-data/internal-api/' + this.courseCode + '/' + this.semester,
        body
      ) // this.props.routerStore.doUpsertItem(body, 'SF1624', '20191')
      .then(() => this.props.routerStore.tempMemoData(body))
      .then(() => callback())
      .catch(error => callback(error))
  }

  handleAutoSave = () => {
    const { alerts } = i18n.messages[1]
    this.handleSave(() => this.handleAlert(alerts.autoSaved))
  }

  handleAlert = alertText => {
    this.setState({ alertIsOpen: true, alertText })
    setTimeout(() => {
      this.setState({ alertIsOpen: false, alertText: '' })
    }, 2000)
  }

  handleConfirm = () => {
    // TODO: Refactor and change name of handleAutoSave when handleConfirm is further developed.
    // It will be used probably when we develop version handling draft or published
    this.handleAutoSave()
  }

  toggleViewMode = () => {
    this.handleAutoSave()
    this.setState(state => ({ singleMode: !state.singleMode }), this.scrollIntoView)
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

  checkVisibility = (isRequired, contentId) => {
    return isRequired
      ? true
      : (this.state.visibleInMemo && this.state.visibleInMemo[contentId]) || false // todo: check what happening with state if it came felaktig
  }

  renderSingleView = ({ location }) => {
    const { koppsFreshData } = this.props.routerStore
    const menuId = location.hash.substr(1)
    const contentId = menuId.split('-')[1]
    const sectionConfig = context[contentId]
    if (!sectionConfig) return null
    const { isEditable, isRequired } = context[contentId]
    const visibleInMemo = this.checkVisibility(isRequired, contentId)

    return isEditable ? (
      <EditorPerTitle
        contentId={contentId}
        key={contentId}
        menuId={menuId}
        onEditorChange={this.handleEditorChange}
        onToggleVisibleInMemo={this.toggleVisibleInMemo}
        visibleInMemo={visibleInMemo}
      />
    ) : (
      <Section
        menuId={menuId}
        contentId={contentId}
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={this.toggleVisibleInMemo}
        html={koppsFreshData[contentId]}
        isRequired={sectionConfig.isRequired}
      />
    )
  }

  renderScrollView = () => {
    const { koppsFreshData } = this.props.routerStore

    return sections.map(section => (
      <span key={section.id}>
        <h2 id={section.id} key={'header-' + section.id}>
          {section.title}
        </h2>
        {section.content.map(contentId => {
          const menuId = section.id + '-' + contentId
          const { isEditable, isRequired } = context[contentId]
          const visibleInMemo = this.checkVisibility(isRequired, contentId)

          return isEditable ? (
            <EditorPerTitle
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              onEditorChange={this.handleEditorChange}
              onToggleVisibleInMemo={this.toggleVisibleInMemo}
              visibleInMemo={visibleInMemo}
              onBlur={() => {
                if (this.state.dirtyEditor === contentId) {
                  this.handleAutoSave()
                }
                this.setState({ dirtyEditor: '' })
              }}
            />
          ) : (
            <Section
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={this.toggleVisibleInMemo}
              html={koppsFreshData[contentId]}
              isRequired={isRequired}
            />
          )
        })}
      </span>
    ))
  }

  render() {
    const { pages, buttons } = i18n.messages[1]

    return (
      <Container className="memo-container">
        <Row className="mb-4">
          <Col lg="9">
            <ProgressTitle
              id="progress-title"
              text={pages[this.state.progress - 1].title}
              infoModalLabels={{
                header: pages[this.state.progress - 1].title,
                body: pages[this.state.progress - 1].intro,
                btnClose: 'Close'
              }}
            />
          </Col>
          <Col lg="3" className="change-view">
            <Button className="mt-0 mb-0" onClick={this.toggleViewMode} color="primary" size="sm">
              {this.state.singleMode
                ? buttons.btn_switch_view_scroll
                : buttons.btn_switch_view_single}
            </Button>
          </Col>
        </Row>
        <StickyContainer className="sticky-content-section">
          <Row>
            <Col lg="4">
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
                  />
                )}
              </Sticky>
            </Col>
            <Col lg="8" className="memo-content">
              {this.state.singleMode ? (
                <Route render={this.renderSingleView} />
              ) : (
                this.renderScrollView()
              )}
            </Col>
          </Row>
        </StickyContainer>
      </Container>
    )
  }
}

export default Start
