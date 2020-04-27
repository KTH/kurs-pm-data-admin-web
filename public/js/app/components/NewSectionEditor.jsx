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
class NewSectionEditor extends Component {
  state = {
    memoData: this.props.routerStore.memoData || {},
    isOpen: false,
    currentIndex: this.props.routerStore.memoData[this.props.contentId].findIndex(
      item => item.uKey === this.props.uKey
    ),
    hasEmptyTitle: false
  }

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  componentDidMount() {
    const { contentId } = this.props
    const { currentIndex } = this.state
    this.setState({ isOpen: this.props.routerStore.memoData[contentId][currentIndex].isEmptyNew })
  }

  updateMemoContent = editorContent => {
    const { contentId, uKey } = this.props
    const { currentIndex } = this.state
    // const { memoData } = this.props.routerStore
    this.props.routerStore.dirtyEditor = uKey
    this.props.routerStore.memoData[contentId][currentIndex].htmlContent = editorContent
  }

  setNewTitle = event => {
    event.preventDefault()
    const { contentId, uKey } = this.props
    const { currentIndex } = this.state
    const { memoData } = this.props.routerStore
    this.props.routerStore.dirtyEditor = uKey
    this.props.onBlur(uKey)
    memoData[contentId][currentIndex].title = event.target.value
  }

  onRemoveNewSection = () => {
    // const { memoData } = this.props.routerStore
    const { contentId } = this.props
    const { currentIndex } = this.state
    const arrayToReduce = [...this.props.routerStore.memoData[contentId]]
    arrayToReduce.splice(currentIndex, 1)
    /* Remove direct from routerStore to keep state and initialValue for editor but still update both of them after removal */
    this.props.routerStore.memoData[contentId] = arrayToReduce
    // this.props.onAutoSave()
  }

  toggleVisibleInMemo = () => {
    const { contentId, uKey } = this.props
    const { currentIndex } = this.state
    const { memoData } = this.props.routerStore
    const { visibleInMemo } = memoData[contentId][currentIndex]
    this.props.routerStore.dirtyEditor = uKey
    this.props.routerStore.memoData[contentId][currentIndex].visibleInMemo = !visibleInMemo
    // this.props.onSave({[contentId]: memoData[contentId]}, 'autoSaved')
  }

  onToggleVisibleEditor = () => {
    const { contentId, uKey } = this.props
    const { currentIndex, isOpen } = this.state
    const { memoData } = this.props.routerStore
    if (
      Object.prototype.hasOwnProperty.call(memoData[contentId][currentIndex], 'title') &&
      memoData[contentId][currentIndex].title.trim().length === 0
    ) {
      this.setState({ hasEmptyTitle: true })
      this.props.onAlert('warnNameNewSection', 'danger')
      return false
    }
    if (!isOpen) this.props.routerStore.dirtyEditor = uKey
    this.props.routerStore.memoData[contentId][currentIndex].isEmptyNew = false
    this.setState({ isOpen: !isOpen, hasEmptyTitle: false })
    // this.props.onSave({[contentId]: memoData[contentId]}, 'autoSaved')
    return true
  }

  render() {
    const { uKey, contentId } = this.props

    const { htmlContent, title, isEmptyNew, visibleInMemo } = this.state.memoData[contentId][
      this.state.currentIndex
    ]

    const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[
      this.userLangIndex
    ]

    return (
      <span className="Add--New--Title--And--Info">
        {!this.state.isOpen && !isEmptyNew && (
          <ExtraHeaderHead
            header={title}
            contentId={contentId}
            memoLangIndex={this.memoLangIndex}
          />
        )}

        <VisibilityInfo
          contentId={`${contentId}-${uKey}`}
          contentType="section"
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
                  defaultValue={title}
                />
                {this.state.hasEmptyTitle && (
                  <Label htmlFor={`headerFor${contentId}-${uKey}`} className="error-label">
                    {sourceInfo.errorEmptyTitle}
                  </Label>
                )}
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
              onBlur={this.props.onBlur}
            />
            <ActionModalButton
              btnLabel={buttons.btnRemoveHeader}
              modalId={`beforeRemoving-${contentId}-${uKey}`}
              type="remove"
              modalLabels={actionModals.newSectionRemove}
              onConfirm={this.onRemoveNewSection}
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
                  (htmlContent !== '' && htmlContent) ||
                  `<p><i>${sourceInfo.noInfoYet.section}</i></p>`
              }}
            />
          )) ||
            /* editor has content but is not yet included in pm */
            (htmlContent !== '' && ( // TODO: add DEFAULT TEXT
              <span>
                <p>
                  <i>{sourceInfo.notIncludedInMemoYet.section}</i>
                </p>
              </span>
            )))}
      </span>
    )
  }
}
export default NewSectionEditor
