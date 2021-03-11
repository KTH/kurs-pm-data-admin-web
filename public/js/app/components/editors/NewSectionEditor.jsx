/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStore } from '../../mobx'

import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../../i18n'
import { ActionModalButton } from '@kth/kth-kip-style-react-components'
import CollapseGuidance from '../details/CollapseGuidance'
import { ExtraHeaderHead } from '../ContentHead'
import VisibilityInfo from '../VisibilityInfo'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import editorConf from '../../util/editorInitConf'
import PropTypes from 'prop-types'

function NewSectionEditor(props) {
  const store = useStore()
  const { langIndex: userLangIndex, memoLangAbbr, memoData, dirtyEditor } = store

  const { currentIndex, contentId, menuId, showError, uKey } = props

  const extraContent = memoData[contentId][currentIndex] || []
  const { title, htmlContent, visibleInMemo } = extraContent

  const hasEmptyTitle = !!(title.length === 0)
  const hasEmptyText = !!(htmlContent.length === 0)

  const [isOpen, setOpenStatus] = useState(false)
  const [showEmptyTitleErrorLabel, setEmptyTitleErrorLabel] = useState(false)

  const memoLangIndex = memoLangAbbr === 'sv' ? 1 : 0
  const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[userLangIndex]

  useEffect(() => {
    //fast reaction to parent prop showError change when user clicked switch tab/submit
    if (showError && !showEmptyTitleErrorLabel) {
      setEmptyTitleErrorLabel(true)
      const sectionElement = document.getElementById(menuId)
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showError, showEmptyTitleErrorLabel])

  useEffect(() => {
    // check if hasEmptyTitle error is fixed and update state
    setEmptyTitleErrorLabel(hasEmptyTitle && !hasEmptyText)
  }, [title, htmlContent])

  useEffect(() => {
    // decides to (keep) editor open if title it empty
    console.log('new editor hall it open')
    if (hasEmptyTitle) setOpenStatus(true)
  }, [hasEmptyTitle])

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    console.log('save new section data')
    store.checkTitleExist(contentId, currentIndex, hasEmptyTitle, hasEmptyText)
  }, [title])

  useEffect(() => {
    store.setDirtyEditor(uKey)
  }, [title, htmlContent, visibleInMemo])

  const setNewContent = editorContent => {
    store.setMemoExtraContent(contentId, currentIndex, 'htmlContent', editorContent.trim())
  }

  const setNewTitle = event => {
    event.preventDefault()
    const title = event.target.value.trim()
    store.setMemoExtraContent(contentId, currentIndex, 'title', title) // || (this.memoLangIndex === 1 ? 'Egna rubrik ' + currentIndex : 'New heading ' + currentIndex)
  }

  const onRemoveThisContent = (wasEmpty = false) => {
    store.setDirtyEditor(uKey)
    store.removeExtraContent(contentId, currentIndex)
    if (wasEmpty) props.onAlert('removedEmptyContent', 'success', 500)
    else props.onAlert('removedAddedContent', 'success', 500)
    //onSaveByThisContentId
  }

  const onSaveByThisContentId = () => {
    const latestMemoData = store.memoData[contentId]
    // thisSectionExist is needed to know if section was deleted before unmounting
    const thisSectionExist = !!store.memoData[contentId].length > currentIndex

    if (dirtyEditor === uKey) {
      props.onSave({ [contentId]: latestMemoData }, 'autoSaved')
    }
    store.setDirtyEditor('')
  }

  const toggleVisibleInMemo = () => {
    store.setMemoExtraContent(contentId, currentIndex, 'visibleInMemo', !visibleInMemo)
    onSaveByThisContentId()
  }

  const onToggleVisibleEditor = () => {
    if (isOpen) {
      if (hasEmptyTitle && hasEmptyText) {
        onRemoveThisContent(true)

        return false
      }
      if (hasEmptyTitle) {
        setEmptyTitleErrorLabel(true)
        props.onAlert('errorEmptyHeading', 'danger')

        return false
      }
    } else store.setDirtyEditor(uKey)

    setOpenStatus(!isOpen)
    return true
  }

  return (
    <span id={menuId} className="Added--New--Title--And--Info">
      {!isOpen && (
        <ExtraHeaderHead
          header={title}
          contentId={contentId}
          memoLangIndex={memoLangIndex}
          userLangIndex={userLangIndex}
        />
      )}

      <VisibilityInfo
        contentId={`${contentId}-${uKey}`}
        sectionType="section"
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={toggleVisibleInMemo}
        isEditorOpen={isOpen}
        onToggleVisibleEditor={onToggleVisibleEditor}
        userLangIndex={userLangIndex}
      />
      {isOpen && (
        <span>
          <Form className={showEmptyTitleErrorLabel ? 'error-area' : ''}>
            <FormGroup className="title">
              <Label className="form-control-label" htmlFor={`headerFor${contentId}-${uKey}`}>
                {sourceInfo.addNewHeading}
              </Label>
              <Input
                className="form-control"
                type="text"
                id={`headerFor${contentId}-${uKey}`}
                onChange={setNewTitle}
                onBlur={onSaveByThisContentId}
                defaultValue={title}
              />
              {showEmptyTitleErrorLabel && (
                <Label htmlFor={`headerFor${contentId}-${uKey}`} className="error-label">
                  {sourceInfo.errorEmptyHeading}
                </Label>
              )}
            </FormGroup>
          </Form>
          <CollapseGuidance title={buttons.showGuidance} details={memoInfoByUserLang[contentId].help} />
          <Editor
            id={`editorFor${contentId}-${uKey}`}
            initialValue={htmlContent}
            init={editorConf(userLangIndex === 1 ? 'sv_SE' : null)}
            onEditorChange={setNewContent}
            onBlur={onSaveByThisContentId}
          />
          <ActionModalButton
            btnLabel={buttons.btnRemoveHeading}
            modalId={`beforeRemoving-${contentId}-${uKey}`}
            type="remove"
            modalLabels={actionModals.newSectionRemove}
            onConfirm={onRemoveThisContent}
          />
        </span>
      )}

      {!isOpen &&
        /* is included in memo, preview text without editor */
        ((visibleInMemo && (
          <span
            dangerouslySetInnerHTML={{
              __html: (htmlContent !== '' && htmlContent) || `<p><i>${sourceInfo.noInfoYet.section}</i></p>`,
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

NewSectionEditor.propTypes = {
  contentId: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  htmlContent: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool,
  onAlert: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  uKey: PropTypes.string.isRequired,
}

NewSectionEditor.defaultProps = {
  htmlContent: '',
}

export default observer(NewSectionEditor)
