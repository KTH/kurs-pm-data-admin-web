/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col, Button } from 'reactstrap'
import { StickyContainer, Sticky } from 'react-sticky'
import NewSectionEditor from '../components/NewSectionEditor'
import StandardEditorPerTitle from '../components/StandardEditorPerTitle'
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

  // koppsFreshData = this.props.routerStore.koppsFreshData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  componentDidMount() {
    // console.log('MemoEdition state', this.state)
    this.scrollIntoView()
  }

  componentDidUpdate() {
    this.props.onChange(this.state)
  }

  onStandardEditorChange = (editorContent, contentHeader) => {
    this.setState({
      [contentHeader]: editorContent,
      dirtyEditor: contentHeader
    })
  }

  onExtraSectionEditorChange = (extraContent, contentHeader, uKey) => {
    const prevArrayOfExtraHeaders = [...this.state[contentHeader]]
    if (
      Object.prototype.hasOwnProperty.call(extraContent, 'isEmptyNew') &&
      Object.prototype.hasOwnProperty.call(extraContent, 'title') &&
      extraContent.title.trim().length === 0
    ) {
      this.props.onAlert('warnNameNewSection', 'danger')
      return false
    }

    const currentIndex = prevArrayOfExtraHeaders.findIndex(item => item.uKey === uKey)
    prevArrayOfExtraHeaders[currentIndex] = {
      ...prevArrayOfExtraHeaders[currentIndex],
      ...extraContent
    }
    this.setState({
      [contentHeader]: prevArrayOfExtraHeaders, // maaybe better to use object?
      dirtyEditor: uKey
    })
    return true
  }

  onAddNewSection = (memoData, extraHeaderTitle) => {
    const prevArrayOfExtraHeaders = [...this.state[extraHeaderTitle]]
    const newSection = {
      uKey: Math.random().toString(),
      title: '',
      htmlContent: '',
      visibleInMemo: true,
      isEmptyNew: true
    }
    memoData[extraHeaderTitle].push(newSection)
    prevArrayOfExtraHeaders.push(newSection)
    this.setState({
      [extraHeaderTitle]: prevArrayOfExtraHeaders, // maaybe better to use object?
      dirtyEditor: newSection.uKey
    })
  }

  onBlur = contentId => {
    if (this.state.dirtyEditor === contentId) {
      this.handleAutoSave()
    }
    this.setState({ dirtyEditor: '' })
  }

  onRemoveNewSection = (contentHeader, uKey) => {
    const { memoData } = this.props.routerStore
    const currentIndex = memoData[contentHeader].findIndex(item => item.uKey === uKey)

    console.log('current index, uKey', uKey)
    /* Remove direct from routerStore to keep state and initialValue for editor but still update both of them after removal */
    memoData[contentHeader].splice(currentIndex, 1)
    this.handleAutoSave()
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
    this.props.onSave(this.state, 'autoSaved') // save precisily this editor content by contentId
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

  checkVisibility = (contentId, initialValue) => {
    // first time isInVisibleMemo for those header which have openIfContent=true will be true as well
    const { openIfContent } = context[contentId]
    const isInVisibleMemo =
      (this.state.visibleInMemo && this.state.visibleInMemo[contentId]) || false
    if (openIfContent && isInVisibleMemo === 'defaultTrue') {
      // openIfContent is not required
      const isDefaultAndHasContent = initialValue !== '' || false // for some headers: if it has a (default) value it must be opened and included(when created from a scratch)
      this.setState(previousState => {
        return {
          visibleInMemo: {
            ...previousState.visibleInMemo,
            ...{
              [contentId]: isDefaultAndHasContent
            }
          }
        }
      })
      return isDefaultAndHasContent
    }
    return isInVisibleMemo
  }

  renderScrollView = () => {
    const { memoData, defaultValues } = this.props.routerStore
    const { sectionsLabels, buttons } = i18n.messages[this.memoLangIndex]

    return sections.map(({ id, content, extraHeaderTitle }) => (
      <span key={id}>
        <h2 id={id} key={'header-' + id}>
          {sectionsLabels[id]}
        </h2>
        {content.map(contentId => {
          const menuId = id + '-' + contentId
          const { isEditable, isRequired } = context[contentId]
          const initialValue = memoData[contentId] || defaultValues[contentId] || ''
          const visibleInMemo = isRequired ? true : this.checkVisibility(contentId, initialValue)

          return isEditable ? (
            <StandardEditorPerTitle
              contentId={contentId}
              menuId={menuId} // remove
              initialValue={initialValue}
              key={contentId}
              onEditorChange={this.onStandardEditorChange}
              onToggleVisibleInMemo={this.toggleVisibleInMemo}
              visibleInMemo={visibleInMemo}
              onBlur={() => this.onBlur(contentId)}
            />
          ) : (
            <Section
              memoLangIndex={this.memoLangIndex}
              contentId={contentId}
              menuId={menuId}
              key={contentId}
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={this.toggleVisibleInMemo}
              html={initialValue}
            />
          )
        })}
        {extraHeaderTitle &&
          memoData[extraHeaderTitle] &&
          memoData[extraHeaderTitle].map(
            ({ title, htmlContent, visibleInMemo, isEmptyNew, uKey }) => {
              return (
                <NewSectionEditor
                  contentId={extraHeaderTitle}
                  key={uKey}
                  initialTitle={title}
                  initialValue={htmlContent}
                  visibleInMemo={visibleInMemo}
                  isEmptyNew={isEmptyNew}
                  uKey={uKey}
                  onEditorChange={this.onExtraSectionEditorChange}
                  onBlur={() => this.onBlur(uKey)}
                  onRemove={() => this.onRemoveNewSection(extraHeaderTitle, uKey)}
                />
              )
            }
          )}
        {extraHeaderTitle && (
          <Button
            className="element-50"
            color="secondary"
            block
            onClick={() => this.onAddNewSection(memoData, extraHeaderTitle)}
          >
            {buttons.btnAddExtra}
            {sectionsLabels[id]}
          </Button>
        )}
      </span>
    ))
  }

  render() {
    const { extraInfo, pages } = i18n.messages[this.userLangIndex]

    return (
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
    )
  }
}

export default MemoEdition
