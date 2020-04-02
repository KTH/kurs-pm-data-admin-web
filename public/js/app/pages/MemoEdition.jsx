/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col, Button } from 'reactstrap'
import { Route } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'

import EditorPerTitle from '../components/Editor'
import Section from '../components/Section'
import ProgressTitle from '../components/ProgressTitle'
import { context, sections } from '../util/fieldsByType'
// import axios from 'axios'
import SideMenu from '../components/SideMenu'
import i18n from '../../../../i18n'

const PROGRESS = 2

@inject(['routerStore'])
@observer
class MemoEdition extends Component {
  state = this.props.routerStore.memoData || {}

  koppsFreshData = this.props.routerStore.koppsFreshData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  componentDidMount() {
    console.log('MemoEdition state', this.state)
    this.scrollIntoView()
  }

  componentDidUpdate() {
    console.log('Update parent state')
    this.props.onChange({ updatedMemo: this.state })
  }

  handleEditorChange = (editorContent, contentHeader) => {
    console.log('editorContent ', editorContent)
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

  handleAutoSave = () => {
    this.props.onSave(this.state, 'autoSaved') // .then(() => this.props.onChange({ updatedMemo: body }))
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
        userLangIndex={this.userLangIndex}
        memoLangIndex={this.memoLangIndex}
        menuId={menuId}
        contentId={contentId}
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={this.toggleVisibleInMemo}
        html={koppsFreshData[contentId]}
      />
    )
  }

  renderScrollView = () => {
    const { koppsFreshData } = this.props.routerStore
    const { sectionsLabels } = i18n.messages[this.memoLangIndex]

    return sections.map(({ id, content }) => (
      <span key={id}>
        <h2 id={id} key={'header-' + id}>
          {sectionsLabels[id]}
        </h2>
        {content.map(contentId => {
          const menuId = id + '-' + contentId
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
              userLangIndex={this.userLangIndex}
              memoLangIndex={this.memoLangIndex}
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={this.toggleVisibleInMemo}
              html={koppsFreshData[contentId]}
            />
          )
        })}
      </span>
    ))
  }

  render() {
    const { buttons, extraInfo, pages } = i18n.messages[this.userLangIndex]

    return (
      <StickyContainer className="memo-container">
        <Row className="sections-headers">
          <Col lg="5">
            <ProgressTitle id="progress-title" text={pages[PROGRESS - 1]} />
          </Col>
          <Col lg="3" className="change-view">
            <Button
              className="mt-1 mb-0 mr-3"
              onClick={this.toggleViewMode}
              color="secondary"
              size="sm"
            >
              {this.state.singleMode
                ? buttons.btn_switch_view_scroll
                : buttons.btn_switch_view_single}
            </Button>
          </Col>
          <Col lg="4">
            <ProgressTitle id="select-header" text={extraInfo.contentHeaders} />
          </Col>
        </Row>
        <hr className="header-content-separation" />
        <Row className="mb-4">
          <Col lg="8" className="memo-content">
            {this.state.singleMode ? (
              <Route render={this.renderSingleView} />
            ) : (
              this.renderScrollView()
            )}
          </Col>
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
                  memoLangIndex={this.memoLangIndex}
                />
              )}
            </Sticky>
          </Col>
        </Row>
      </StickyContainer>
    )
  }
}

export default MemoEdition
