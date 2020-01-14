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
import { context, sections } from '../util/fieldsByType'
import axios from 'axios'
import SideMenu from '../components/SideMenu'
import i18n from '../../../../i18n'
import { PageTitle, ProgressBar, ActionModalButton } from '@kth/kth-kip-style-react-components'

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
            : true
      } else {
        visible = true
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
    this.handleAutoSave()
    // this.handleSave(error => {
    //   if (error) {
    //     alert('Successfully saved ' + error)
    //   } else {
    //     alert('Successfully saved ')
    //   }
    // })
  }

  toggleViewMode = () => {
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

  renderSingleView = ({ location }) => {
    const { koppsFreshData } = this.props.routerStore

    const sectionId = location.hash.substr(1)
    const sectionConfig = context[sectionId]
    if (!sectionConfig) return null

    let visibleInMemo
    if (this.state.visibleInMemo) {
      visibleInMemo =
        sectionId in this.state.visibleInMemo ? this.state.visibleInMemo[sectionId] : true
    } else {
      visibleInMemo = true
    }

    return sectionConfig.isFromSyllabus ? (
      <Section
        title={sectionId}
        visibleInMemo={visibleInMemo}
        toggleVisibleInMemo={this.toggleVisibleInMemo}
        html={koppsFreshData[sectionConfig.kopps]}
      />
    ) : (
      <EditorPerTitle
        id={sectionId}
        key={sectionId}
        onEditorChange={this.handleEditorChange}
        toggleVisibleInMemo={this.toggleVisibleInMemo}
        visibleInMemo={this.state.visibleInMemo}
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
        {section.content.map(apiTitle => {
          let visibleInMemo
          if (this.state.visibleInMemo) {
            visibleInMemo =
              apiTitle in this.state.visibleInMemo ? this.state.visibleInMemo[apiTitle] : true
          } else {
            visibleInMemo = true
          }

          return context[apiTitle].isFromSyllabus ? (
            <Section
              key={apiTitle}
              title={apiTitle}
              visibleInMemo={visibleInMemo}
              toggleVisibleInMemo={this.toggleVisibleInMemo}
              html={koppsFreshData[context[apiTitle].kopps]}
            />
          ) : (
            <EditorPerTitle
              id={apiTitle}
              key={apiTitle}
              onEditorChange={this.handleEditorChange}
              toggleVisibleInMemo={this.toggleVisibleInMemo}
              visibleInMemo={this.state.visibleInMemo}
              onBlur={() => {
                if (this.state.dirtyEditor === apiTitle) {
                  this.handleAutoSave()
                }
                this.setState({ dirtyEditor: '' })
              }}
            />
          )
        })}
      </span>
    ))
  }

  render() {
    const { pages, actionModals, buttons } = i18n.messages[1]
    const progress = 2 // TODO: Change progress as a state
    const { title, credits } = this.koppsFreshData

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle
            id="mainHeading"
            className="step-2-title"
            pageTitle={pages[progress - 1].title}
          >
            <span>{this.courseCode + ' ' + title + ' ' + credits + ' hp'}</span>
          </PageTitle>
          <Col lg="2">
            <Button
              onClick={this.toggleViewMode}
              color="info"
              size="sm"
              style={{ marginTop: '1em' }}
            >
              {this.state.singleMode ? 'Switch to Scroll View' : 'Switch to Single View'}
            </Button>
          </Col>
        </Row>
        <ProgressBar active={2} pages={pages} />
        <StickyContainer>
          <Row>
            <Col lg="4">
              <Sticky>
                {({ style }) => (
                  <SideMenu
                    id="mainMenu"
                    style={{ ...style, ...{ paddingTop: '30px', paddingBottom: '115px' } }}
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
        <Row
          className="fixed-bottom control-buttons"
          style={{ backgroundColor: 'white', padding: '0px 73px 0px 73px' }}
        >
          <Row style={{ width: '100%', margin: '0 auto' }}>
            <Alert isOpen={!!this.state.alertIsOpen}>
              {this.state.alertText ? this.state.alertText : ''}
            </Alert>
          </Row>
          <Col sm="4" className="step-back">
            <Button onClick={() => alert('back')} className="btn-back" id="back-to-.." alt="BACK">
              {buttons.btn_back}
            </Button>
          </Col>
          <Col sm="4" className="btn-cancel">
            <ActionModalButton
              btnLabel={buttons.btn_cancel}
              modalId="cancelStep2"
              type="cancel"
              modalLabels={actionModals.infoCancel}
              onConfirm={() => console.log('Cancelled')}
            />
          </Col>
          <Col sm="4" className="step-forward">
            <Button onClick={this.handleConfirm} color="secondary" style={{ marginRight: '10px' }}>
              {buttons.btn_save}
            </Button>
            <Button
              onClick={() => alert('Go to granska')}
              id="to-peview"
              className="btn-next"
              color="success"
              alt={'Go to ' + buttons.btn_preview}
              disabled={false /* this.state.isError */}
            >
              {buttons.btn_preview}
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Start
