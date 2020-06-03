/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../i18n'
import { Collapse, ActionModalButton } from '@kth/kth-kip-style-react-components'
import { ExtraHeaderHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import editorConf from '../util/editorInitConf'

@inject(['routerStore'])
@observer
class NewSectionEditor extends Component {
  state = {
    extraContentArr: this.props.routerStore.memoData[this.props.contentId] || [],
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

  componentDidUpdate() {
    const { uKey } = this.props
    this.props.routerStore.dirtyEditor = uKey
  }

  componentWillUnmount() {
    this.onSaveByThisContentId()
  }

  updateMemoContent = editorContent => {
    const { contentId } = this.props
    const { currentIndex } = this.state
    this.props.routerStore.memoData[contentId][currentIndex].htmlContent = editorContent
  }

  setNewTitle = event => {
    event.preventDefault()
    const { contentId } = this.props
    const { currentIndex } = this.state
    const { memoData } = this.props.routerStore
    const title = event.target.value.trim()
    memoData[contentId][currentIndex].title = title // || (this.memoLangIndex === 1 ? 'Egna rubrik ' + currentIndex : 'New heading ' + currentIndex)
    this.setState({ hasEmptyTitle: !title })
  }

  onRemoveNewSection = () => {
    const { contentId, uKey } = this.props
    const { currentIndex } = this.state
    const arrayToReduce = [...this.props.routerStore.memoData[contentId]]
    arrayToReduce.splice(currentIndex, 1)
    this.props.routerStore.dirtyEditor = uKey
    /* Remove direct from routerStore to keep state and initialValue for editor but still update both of them after removal */
    this.props.routerStore.memoData[contentId] = arrayToReduce
  }

  toggleVisibleInMemo = () => {
    const { contentId } = this.props
    const { currentIndex } = this.state
    const { memoData } = this.props.routerStore
    const { visibleInMemo } = memoData[contentId][currentIndex]
    // this.props.routerStore.dirtyEditor = uKey
    this.props.routerStore.memoData[contentId][currentIndex].visibleInMemo = !visibleInMemo
    this.onSaveByThisContentId()
  }

  onSaveByThisContentId = () => {
    const { contentId, uKey } = this.props
    const { dirtyEditor } = this.props.routerStore
    // const { title } = this.props.routerStore.memoData[contentId]
    // if (!title || title === '') this.props.onAlert('warnNameNewSection', 'danger') // TODO: Add condition if not removing IMPROVE ALERT MAYBE MOVE ALERT TEXT TO ROUTER STORE
    if (dirtyEditor === uKey) {
      this.props.onSave({ [contentId]: this.props.routerStore.memoData[contentId] }, 'autoSaved')
    }
    this.props.routerStore.dirtyEditor = ''
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
    return true
  }

  render() {
    const { uKey, contentId, menuId } = this.props

    const { htmlContent, title, isEmptyNew, visibleInMemo } = this.state.extraContentArr[
      this.state.currentIndex
    ]

    const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[
      this.userLangIndex
    ]

    return (
      <span id={menuId} className="Add--New--Title--And--Info">
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
                  onBlur={this.onSaveByThisContentId}
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
              buttonText={buttons.showGuidance}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: memoInfoByUserLang[contentId].help || `<p>${sourceInfo.dummyHelpText}</p>`
                }}
              />
            </Collapse>
            <Editor
              id={`editorFor${contentId}-${uKey}`}
              initialValue={htmlContent}
              init={editorConf(i18n.isSwedish() ? 'sv_SE' : null)}
              onEditorChange={this.updateMemoContent}
              onBlur={this.onSaveByThisContentId}
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
