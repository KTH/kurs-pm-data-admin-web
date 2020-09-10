/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../i18n'
import { Collapse } from '@kth/kth-kip-style-react-components'
import { ContentHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import { context } from '../util/fieldsByType'
import editorConf from '../util/editorInitConf'
import PropTypes from 'prop-types'

@inject(['routerStore'])
@observer
class StandardEditorPerTitle extends Component {
  state = {
    isOpen: false,
    firstLoad: true
  }

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  static getDerivedStateFromProps(props, state) {
    const { contentId, htmlContent } = props
    const { openIfContent } = context[contentId]
    if (state.firstLoad && openIfContent) {
      return { isOpen: (openIfContent && htmlContent !== '') || false, firstLoad: false }
    }
    return {}
  }

  componentDidUpdate() {
    // used when visibleInMemo changes or open/close editor (but not when editor content changed, done in updateMemoContent)
    const { contentId } = this.props
    this.props.routerStore.dirtyEditor = contentId
  }

  updateMemoContent = (editorContent) => {
    const { contentId } = this.props
    this.props.routerStore.memoData[contentId] = editorContent
    // if content changed then update dirtyEditor with contentId
    this.props.routerStore.dirtyEditor = contentId
  }

  onBlur = () => {
    const { contentId } = this.props
    const { dirtyEditor } = this.props.routerStore
    if (dirtyEditor === contentId) {
      this.props.onSave({ [contentId]: this.props.routerStore.memoData[contentId] }, 'autoSaved')
    }
    this.props.routerStore.dirtyEditor = ''
  }

  toggleVisibleInMemo = () => {
    this.props.onToggleVisibleInMemo(this.props.contentId)
  }

  onToggleVisibleEditor = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  openMandatoryEditable() {
    const { contentId, htmlContent } = this.props
    const { openIfContent } = context[contentId]
    if (this.state.firstLoad && openIfContent) {
      this.setState({
        isOpen: (openIfContent && htmlContent !== '') || false,
        firstLoad: false
      })
    }
  }

  render() {
    const { contentId, htmlContent, menuId, visibleInMemo } = this.props
    const { isRequired, hasParentTitle } = context[contentId]
    const { userLangIndex } = this
    const sectionType = hasParentTitle ? 'subSection' : 'section'
    const { sourceInfo, memoInfoByUserLang, buttons } = i18n.messages[userLangIndex]

    return (
      <span id={menuId} className={sectionType + ' section-50'}>
        {sectionType === 'section' && (
          <ContentHead
            contentId={contentId}
            memoLangIndex={this.memoLangIndex}
            userLangIndex={userLangIndex}
          />
        )}
        <VisibilityInfo
          contentId={contentId}
          sectionType={sectionType}
          visibleInMemo={visibleInMemo}
          onToggleVisibleInMemo={this.toggleVisibleInMemo}
          isEditorOpen={this.state.isOpen}
          onToggleVisibleEditor={this.onToggleVisibleEditor}
          userLangIndex={userLangIndex}
        />
        {this.state.isOpen && (
          <span data-testid="standard-editor">
            <Collapse
              alt="Expand this to see a helping text"
              uLabel={contentId}
              color="white"
              buttonText={buttons.showGuidance}
            >
              <span
                data-testid="help-text"
                dangerouslySetInnerHTML={{
                  __html: memoInfoByUserLang[contentId].help || `<p>${sourceInfo.dummyHelpText}</p>`
                }}
              />
            </Collapse>
            <Editor
              id={'editorFor' + contentId}
              initialValue={htmlContent}
              init={editorConf(userLangIndex === 1 ? 'sv_SE' : null)}
              onEditorChange={this.updateMemoContent}
              onBlur={this.onBlur}
            />
          </span>
        )}

        {!this.state.isOpen &&
          /* isRequired && empty // type && type === 'mandatoryAndEditable' */
          ((isRequired && (
            <span
              data-testid={`text-for-memo-mandatoryAndEditable-${contentId}`} // "text-for-memo-mandatoryAndEditable"
              dangerouslySetInnerHTML={{
                __html:
                  (htmlContent !== '' && htmlContent) ||
                  `<p><i>${sourceInfo.nothingFetched.mandatoryAndEditable}</i></p>`
              }}
            />
          )) ||
            /* is included in memo, preview text without editor */
            (visibleInMemo && (
              <span
                data-testid={`text-for-memo-optionalEditable-${contentId}`} // "text-for-memo-optionalEditable"
                dangerouslySetInnerHTML={{
                  __html:
                    (htmlContent !== '' && htmlContent) ||
                    `<p><i>${sourceInfo.noInfoYet[sectionType]}</i></p>`
                }}
              />
            )) ||
            /* editor has content but is not yet included in pm */
            (htmlContent !== '' && (
              <span data-testid="dynamic-optional-and-not-included-but-with-content">
                <p
                  data-testid={`optional-and-excluded-but-with-content-${sectionType}-${contentId}`}
                >
                  <i>{sourceInfo.notIncludedInMemoYet[sectionType]}</i>
                </p>
              </span>
            )) || (
              <div
                data-testid="dynamic-empty-content-and-not-included"
                style={{ display: 'none' }}
              />
            ))}
      </span>
    )
  }
}

StandardEditorPerTitle.propTypes = {
  contentId: PropTypes.string.isRequired,
  htmlContent: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  onSave: PropTypes.func.isRequired,
  routerStore: PropTypes.func
}

StandardEditorPerTitle.defaultProps = {
  htmlContent: ''
}

export default StandardEditorPerTitle
