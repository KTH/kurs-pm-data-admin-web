/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import { ActionModalButton } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import PropTypes from 'prop-types'

import { useStore } from '../../mobx'

import i18n from '../../../../../i18n'
import CollapseGuidance from '../details/CollapseGuidance'
import { ExtraHeaderHead } from '../ContentHead'
import VisibilityInfo from '../VisibilityInfo'
import editorConf from '../../util/editorInitConf'
import { SectionHeading } from '../layout/SectionHeading'
import { EditButton } from './EditButton'
import HeadingBox from '../layout/HeadingBox'
import { SaveAndCloseButton } from './SaveAndCloseButton'
import { OnClickPropagationStopper } from './OnClickPropagationStopper'

function ExtraHeadingEditor(props) {
  const store = useStore()
  // observer needed for dirtyEditor
  // and when heading is added/deleted
  const { langIndex: userLangIndex, memoLangAbbr, memoData, dirtyEditor } = store

  const { currentIndex, contentId, menuId, showError, uKey } = props

  const [localExtraContent, setLocalExtraContent] = useState(memoData[contentId][currentIndex] || {})
  const { title = '', htmlContent = '', visibleInMemo } = localExtraContent

  const hasEmptyHeading = !!(title.length === 0)
  const hasEmptyText = !!(htmlContent.length === 0)

  const [isOpen, setOpenStatus] = useState(false)
  const [showEmptyHeadingErrorLabel, setEmptyHeadingErrorLabel] = useState(false)

  const memoLangIndex = memoLangAbbr === 'sv' ? 1 : 0
  const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[userLangIndex]

  useEffect(() => {
    // fast reaction to parent prop showError change when user clicked switch tab/submit
    if (showError && showEmptyHeadingErrorLabel) {
      const sectionElement = document.getElementById(menuId)
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showEmptyHeadingErrorLabel])

  useEffect(() => {
    // check if hasEmptyHeading error is fixed and update state
    setEmptyHeadingErrorLabel(hasEmptyHeading && !hasEmptyText)
  }, [showError, title, htmlContent])

  useEffect(() => {
    // decides to (keep) editor open if title it empty
    if (hasEmptyHeading) setOpenStatus(true)
  }, [hasEmptyHeading])

  useEffect(() => {
    store.setExtraContentProps(contentId, currentIndex, hasEmptyHeading, hasEmptyText)
  }, [title, htmlContent])

  const onSaveByThisContentId = () => {
    const latestMemoData = store.memoData[contentId]

    if (dirtyEditor === uKey) {
      props.onSave({ [contentId]: latestMemoData }, 'autoSaved')
    }
    store.setDirtyEditor('')
  }

  useEffect(() => {
    store.setDirtyEditor(uKey)
    // store.setMemoExtraContent(contentId, currentIndex, localExtraContent)

    // return () => onSaveByThisContentId()
  }, [title, htmlContent, visibleInMemo])

  const setNewContent = editorContent => {
    const newState = { ...localExtraContent, htmlContent: editorContent.trim() }
    setLocalExtraContent(newState)
    store.setMemoExtraContent(contentId, currentIndex, 'htmlContent', editorContent.trim())
  }

  const setNewHeading = event => {
    event.preventDefault()
    const newTitle = event.target.value.trim()
    const newState = { ...localExtraContent, title: newTitle }
    setLocalExtraContent(newState)

    store.setMemoExtraContent(contentId, currentIndex, 'title', newTitle)
  }

  const onRemoveThisContent = (wasEmpty = false) => {
    store.setDirtyEditor(uKey)
    store.removeExtraContent(contentId, currentIndex)
    onSaveByThisContentId()
    if (wasEmpty) props.onAlert('removedEmptyHeading', 'success', 500)
    else props.onAlert('removedAddedHeading', 'success', 500)
  }

  const toggleVisibleInMemo = () => {
    const newState = { ...localExtraContent, visibleInMemo: !visibleInMemo }
    setLocalExtraContent(newState)

    store.setMemoExtraContent(contentId, currentIndex, 'visibleInMemo', !visibleInMemo)
    onSaveByThisContentId()
  }

  function toggleEditor() {
    if (isOpen) {
      if (hasEmptyHeading && hasEmptyText) {
        onRemoveThisContent(true)

        return false
      }
      if (hasEmptyHeading) {
        setEmptyHeadingErrorLabel(true)
        props.onAlert('errorEmptyHeading', 'danger')

        return false
      }
    } else store.setDirtyEditor(uKey)

    setOpenStatus(!isOpen)
    return true
  }

  const isReady = React.useMemo(() => {
    return visibleInMemo && htmlContent !== ''
  }, [visibleInMemo, htmlContent])

  return (
    <HeadingBox isReady={isReady} onToggleEditor={toggleEditor}>
      <span id={menuId} className="Added--New--Title--And--Info editor">
        {!isOpen && (
          <>
            <ExtraHeaderHead
              header={title}
              contentId={contentId}
              memoLangIndex={memoLangIndex}
              userLangIndex={userLangIndex}
              contentName={title}
              isEditorOpen={isOpen}
              onToggleEditor={toggleEditor}
              uKey={uKey}
            />
            <VisibilityInfo
              contentId={`${contentId}-${uKey}`}
              sectionType="section"
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={toggleVisibleInMemo}
              userLangIndex={userLangIndex}
            />
          </>
        )}

        {isOpen && (
          <span data-testid={`extra-content-editor-${contentId}-${uKey}`} className="editor">
            <SectionHeading>
              <Form className={showEmptyHeadingErrorLabel ? 'error-area' : ''}>
                <FormGroup className="title">
                  <Label className="form-control-label" htmlFor={`headerFor${contentId}-${uKey}`}>
                    {sourceInfo.addNewHeading}
                  </Label>
                  <OnClickPropagationStopper>
                    <Input
                      className="form-control"
                      type="text"
                      id={`headerFor${contentId}-${uKey}`}
                      onChange={setNewHeading}
                      onBlur={onSaveByThisContentId}
                      defaultValue={title}
                    />
                  </OnClickPropagationStopper>
                  {showEmptyHeadingErrorLabel && (
                    <Label htmlFor={`headerFor${contentId}-${uKey}`} className="error-label">
                      {sourceInfo.errorEmptyHeading}
                    </Label>
                  )}
                </FormGroup>
              </Form>
              <EditButton
                buttons={buttons}
                contentId={`${contentId}-${uKey}`}
                contentName={title}
                isEditButtonVisible
                isEditorOpen
                onToggleEditor={toggleEditor}
                extraHeadingEditor="true"
              />
            </SectionHeading>
            <VisibilityInfo
              contentId={`${contentId}-${uKey}`}
              sectionType="section"
              visibleInMemo={visibleInMemo}
              onToggleVisibleInMemo={toggleVisibleInMemo}
              userLangIndex={userLangIndex}
            />
            <OnClickPropagationStopper>
              <CollapseGuidance title={buttons.showGuidance} details={memoInfoByUserLang[contentId].help} />
            </OnClickPropagationStopper>
            <OnClickPropagationStopper>
              <Editor
                id={`editor-for-${contentId}-${uKey}`}
                value={htmlContent}
                init={editorConf(userLangIndex === 1 ? 'sv_SE' : null)}
                onEditorChange={setNewContent}
                onBlur={onSaveByThisContentId}
              />
            </OnClickPropagationStopper>
            <div className="extra-heading-buttons" data-testid="remove-added-heading">
              <ActionModalButton
                btnLabel={buttons.btnRemoveHeading}
                modalId={`beforeRemoving-${contentId}-${uKey}`}
                type="remove"
                modalLabels={actionModals.newSectionRemove}
                onConfirm={onRemoveThisContent}
              />
              <SaveAndCloseButton onSaveAndClose={toggleEditor} text={buttons.saveAndCloseEditor} />
            </div>
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
            (htmlContent !== '' && (
              <span>
                <p>
                  <i
                    className="no-visible-in-memo"
                    dangerouslySetInnerHTML={{
                      __html: (htmlContent !== '' && htmlContent) || `<p><i>${sourceInfo.noInfoYet.section}</i></p>`,
                    }}
                  ></i>
                </p>
              </span>
            )))}
      </span>
    </HeadingBox>
  )
}

ExtraHeadingEditor.propTypes = {
  contentId: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  menuId: PropTypes.string.isRequired,
  onAlert: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  uKey: PropTypes.string.isRequired,
}

ExtraHeadingEditor.defaultProps = {
  showError: false,
}

export default observer(ExtraHeadingEditor)
