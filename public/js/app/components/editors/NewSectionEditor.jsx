/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../../i18n'
import { Collapse, ActionModalButton } from '@kth/kth-kip-style-react-components'
import { ExtraHeaderHead } from '../ContentHead'
import VisibilityInfo from '../VisibilityInfo'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import editorConf from '../../util/editorInitConf'
import PropTypes from 'prop-types'

@inject(['routerStore'])
@observer
class NewSectionEditor extends Component {
  state = {
    extraContentArr: this.props.routerStore.memoData[this.props.contentId] || [],
    isOpen: false,
    currentIndex: this.props.routerStore.memoData[this.props.contentId].findIndex(
      (item) => item.uKey === this.props.uKey
    ),
    hasEmptyTitleAlert: false
  }

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  componentDidMount() {
    const { contentId, routerStore } = this.props
    const { currentIndex } = this.state
    this.setState({ isOpen: routerStore.memoData[contentId][currentIndex].isEmptyNew })
  }

  componentDidUpdate() {
    const { uKey } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    this.props.routerStore.dirtyEditor = uKey
  }

  componentWillUnmount() {
    this.onSaveByThisContentId()
  }

  setNewContent = (editorContent) => {
    const { contentId } = this.props
    const { currentIndex } = this.state
    this.props.routerStore.memoData[contentId][currentIndex].htmlContent = editorContent.trim()
  }

  setNewTitle = (event) => {
    event.preventDefault()
    const { contentId } = this.props
    const { currentIndex } = this.state
    const { memoData } = this.props.routerStore
    const title = event.target.value.trim()
    memoData[contentId][currentIndex].title = title // || (this.memoLangIndex === 1 ? 'Egna rubrik ' + currentIndex : 'New heading ' + currentIndex)
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

  onSaveByThisContentId = () => {
    const { contentId, uKey } = this.props
    const { currentIndex } = this.state
    const { dirtyEditor } = this.props.routerStore
    const latestMemoData = this.props.routerStore.memoData[contentId]
    // thisSectionExist is needed to know if section was deleted before unmounting
    const thisSectionExist = !!this.props.routerStore.memoData[contentId][currentIndex]

    if (dirtyEditor === uKey) {
      this.props.onSave({ [contentId]: latestMemoData }, 'autoSaved')
    }
    this.props.routerStore.dirtyEditor = ''

    if (thisSectionExist)
      this.props.routerStore.memoData[contentId][currentIndex].isEmptyNew = false
  }

  toggleVisibleInMemo = () => {
    const { contentId } = this.props
    const { currentIndex } = this.state
    const { memoData } = this.props.routerStore
    const { visibleInMemo } = memoData[contentId][currentIndex]
    this.props.routerStore.memoData[contentId][currentIndex].visibleInMemo = !visibleInMemo
    this.onSaveByThisContentId()
  }

  onToggleVisibleEditor = () => {
    const { contentId, uKey } = this.props
    const { currentIndex, isOpen } = this.state
    const { memoData } = this.props.routerStore
    const { title, htmlContent } = memoData[contentId][currentIndex]
    const hasEmptyTitle = !!(title.length === 0)
    const hasEmptyText = !!(htmlContent.length === 0)
    if (isOpen) {
      if (
        hasEmptyTitle && // memoData[contentId][currentIndex].title.trim().length === 0 &&
        hasEmptyText
      ) {
        this.onRemoveNewSection()
        return false
      }
      if (hasEmptyTitle) {
        this.setState({ hasEmptyTitleAlert: true })
        return false
      }
      this.props.routerStore.memoData[contentId][currentIndex].isEmptyNew = false
    } else this.props.routerStore.dirtyEditor = uKey

    this.setState({ isOpen: !isOpen })
    return true
  }

  render() {
    const { uKey, contentId, menuId } = this.props
    const { userLangIndex } = this
    const { currentIndex, extraContentArr, hasEmptyTitleAlert, isOpen } = this.state
    const { htmlContent, title, isEmptyNew, visibleInMemo } = extraContentArr[currentIndex]

    const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[userLangIndex]

    return (
      <span id={menuId} className="Add--New--Title--And--Info">
        {!isOpen && !isEmptyNew && (
          <ExtraHeaderHead
            header={title}
            contentId={contentId}
            memoLangIndex={this.memoLangIndex}
            userLangIndex={userLangIndex}
          />
        )}

        <VisibilityInfo
          contentId={`${contentId}-${uKey}`}
          sectionType="section"
          visibleInMemo={visibleInMemo}
          onToggleVisibleInMemo={this.toggleVisibleInMemo}
          isEditorOpen={isOpen || isEmptyNew}
          onToggleVisibleEditor={this.onToggleVisibleEditor}
          userLangIndex={userLangIndex}
        />
        {(isEmptyNew || isOpen) && (
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
                {hasEmptyTitleAlert && (
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
              init={editorConf(userLangIndex === 1 ? 'sv_SE' : null)}
              onEditorChange={this.setNewContent}
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

        {!isOpen &&
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

NewSectionEditor.propTypes = {
  contentId: PropTypes.string.isRequired,
  htmlContent: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  routerStore: PropTypes.func,
  uKey: PropTypes.string.isRequired
}

NewSectionEditor.defaultProps = {
  htmlContent: ''
}

export default NewSectionEditor
