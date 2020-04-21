/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../i18n'
import { Collapse, ActionModalButton } from '@kth/kth-kip-style-react-components'
import { ExtraHeaderHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import { Form, FormGroup, Label, Input } from 'reactstrap'

@inject(['routerStore'])
@observer
class newSectionEditor extends Component {
  state = {
    isOpen: this.props.isEmptyNew || false,
    contentForEditor: this.props.initialValue || '', // this.props.routerStore???
    contentForTitle: this.props.initialTitle || '', // Default value needed
    visibleInMemo: this.props.visibleInMemo,
    isEmptyNew: this.props.isEmptyNew || false
  }

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  updateMemoContent = editorContent => {
    const { uKey, contentId } = this.props
    const extraContent = {
      htmlContent: editorContent
    }
    this.setState({ contentForEditor: editorContent })
    this.props.onEditorChange(extraContent, contentId, uKey)
  }

  setNewTitle = event => {
    event.preventDefault()
    const { uKey, contentId } = this.props
    const extraContent = {
      title: event.target.value
    }
    this.setState({ contentForTitle: event.target.value })
    this.props.onEditorChange(extraContent, contentId, uKey)
  }

  toggleVisibleInMemo = () => {
    // this.props.onToggleVisibleInMemo(this.props.contentId)
    const { uKey, contentId } = this.props
    const visibleInMemo = {
      visibleInMemo: !this.state.visibleInMemo
    }
    this.setState(visibleInMemo)
    this.props.onEditorChange(visibleInMemo, contentId, uKey)
  }

  onToggleVisibleEditor = () => {
    const { uKey, contentId } = this.props
    const extraContent = {
      isEmptyNew: false
    }
    this.props.onEditorChange(extraContent, contentId, uKey)
    this.setState({ isEmptyNew: false, isOpen: !this.state.isOpen })
  }

  render() {
    const { uKey, contentId } = this.props // menuId, visibleInMemo
    console.log('uKey', uKey)

    const { contentForEditor, contentForTitle, isEmptyNew, visibleInMemo } = this.state

    const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[
      this.userLangIndex
    ]

    return (
      <span className="Add--New--Title--And--Info">
        {!this.state.isOpen && !isEmptyNew && (
          <ExtraHeaderHead
            header={contentForTitle}
            contentId={contentId}
            memoLangIndex={this.memoLangIndex}
          />
        )}

        <VisibilityInfo
          contentId={`${contentId}-${uKey}`}
          visibleInMemo={visibleInMemo}
          onToggleVisibleInMemo={this.toggleVisibleInMemo}
          isEditorOpen={this.state.isOpen || isEmptyNew}
          onToggleVisibleEditor={this.onToggleVisibleEditor}
        />
        {(isEmptyNew || this.state.isOpen) && (
          <span>
            <Form>
              <FormGroup className="title">
                <Label htmlFor={`headerFor${contentId}-${uKey}`}>{sourceInfo.addNewTitle}</Label>
                <Input
                  type="text"
                  id={`headerFor${contentId}-${uKey}`}
                  onChange={this.setNewTitle}
                  defaultValue={contentForTitle}
                />
              </FormGroup>
            </Form>
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
              id={`editorFor${contentId}-${uKey}`} // addMoreUNIQUE
              initialValue={contentForEditor}
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
              onBlur={this.props.onBlur}
            />
            <ActionModalButton
              btnLabel={buttons.btnRemoveHeader}
              modalId={`beforeRemoving-${contentId}-${uKey}`}
              type="remove"
              modalLabels={actionModals.newSectionRemove}
              onConfirm={this.props.onRemove}
            />
          </span>
        )}

        {!this.state.isOpen &&
          !isEmptyNew &&
          /* is included in memo, preview text without editor */
          ((visibleInMemo && (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  (contentForEditor !== '' && contentForEditor) ||
                  `<p><i>${sourceInfo.noInfoYet}</i></p>`
              }}
            />
          )) ||
            /* editor has content but is not yet included in pm */
            (contentForEditor !== '' && ( // TODO: add DEFAULT TEXT
              <span>
                <p>
                  {/* <i>{type === 'optionalEditable' ? sourceInfo.notIncludedInMemoYet : sourceInfo.notIncludedInMemoYetOfAddition}</i> */}
                  <i>{sourceInfo.notIncludedInMemoYet}</i>
                </p>
              </span>
            )))}
      </span>
    )
  }
}
export default newSectionEditor
