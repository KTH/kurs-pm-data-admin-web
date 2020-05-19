/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../i18n'
import { Collapse } from '@kth/kth-kip-style-react-components'
import { ContentHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import { context } from '../util/fieldsByType'

@inject(['routerStore'])
@observer
class StandardEditorPerTitle extends Component {
  state = {
    isOpen: false,
    firstLoad: true
  }

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  componentDidUpdate() {
    // used when visibleInMemo changes or open/close editor (but not when editor content changed, done in updateMemoContent)
    const { contentId } = this.props
    this.props.routerStore.dirtyEditor = contentId
  }

  updateMemoContent = editorContent => {
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

  render() {
    const { contentId, htmlContent, menuId, visibleInMemo } = this.props
    const { isRequired, openIfContent, hasParentTitle } = context[contentId]
    const contentType = hasParentTitle ? 'subSection' : 'section'
    if (this.state.firstLoad && openIfContent) {
      this.setState({
        isOpen: (openIfContent && htmlContent !== '') || false,
        firstLoad: false
      })
    }

    const { sourceInfo, memoInfoByUserLang } = i18n.messages[this.userLangIndex]

    return (
      <span id={menuId} className={contentType + ' section-50'}>
        {contentType === 'section' && (
          <ContentHead contentId={contentId} memoLangIndex={this.memoLangIndex} />
        )}
        <VisibilityInfo
          contentId={contentId}
          contentType={contentType}
          visibleInMemo={visibleInMemo}
          onToggleVisibleInMemo={this.toggleVisibleInMemo}
          isEditorOpen={this.state.isOpen}
          onToggleVisibleEditor={this.onToggleVisibleEditor}
        />
        {this.state.isOpen && (
          <span>
            <Collapse
              alt="Expand this to see a helping text"
              uLabel={contentId}
              color="white"
              buttonText="Visa vägledning"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    memoInfoByUserLang[contentId].help ||
                    '<p>Hjälptext som vägledar och hjälper</p>'
                }}
              />
            </Collapse>
            <Editor
              id={'editorFor' + contentId}
              initialValue={htmlContent}
              init={{
                // min_height: 100,
                menubar: false,
                plugins: [
                  'advlist autolink autoresize autosave lists link image imagetools charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'table paste code help wordcount'
                ],
                language: i18n.isSwedish() ? 'sv_SE' : null,
                toolbar: `code | undo redo | formatselect | bold italic underline subscript superscript charmap |
                  searchreplace | image | link | restoredraft | fullscreen |
                  table | 
                  bullist numlist outdent indent | removeformat | help`,
                imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
                autosave_interval: '60s',
                autosave_ask_before_unload: true,
                autosave_restore_when_empty: true,
                autosave_retention: '1m',
                block_formats: 'Paragraph=p; Header 4=h4'
              }}
              onEditorChange={this.updateMemoContent}
              onBlur={this.onBlur}
            />
          </span>
        )}

        {!this.state.isOpen &&
          /* isRequired && empty // type && type === 'mandatoryAndEditable' */
          ((isRequired && (
            <span
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
                dangerouslySetInnerHTML={{
                  __html:
                    (htmlContent !== '' && htmlContent) ||
                    `<p><i>${sourceInfo.noInfoYet[contentType]}</i></p>`
                }}
              />
            )) ||
            /* editor has content but is not yet included in pm */
            (htmlContent !== '' && (
              <span>
                <p>
                  <i>{sourceInfo.notIncludedInMemoYet[contentType]}</i>
                </p>
              </span>
            )))}
      </span>
    )
  }
}
export default StandardEditorPerTitle
