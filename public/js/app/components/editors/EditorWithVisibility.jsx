import React from 'react'
import VisibilityInfo from '../VisibilityInfo'
import { SectionEditor } from './SectionEditor'

const EditorWithVisibility = ({
  contentId,
  sectionType,
  visibleInMemo,
  toggleVisibleInMemo,
  userLangIndex,
  htmlContent,
  isEditorOpen,
  isRequired,
  onSave,
  onToggleEditor,
}) => {
  function onToggleVisibleInMemo() {
    toggleVisibleInMemo(contentId)
  }

  return (
    <>
      <VisibilityInfo
        contentId={contentId}
        sectionType={sectionType}
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={onToggleVisibleInMemo}
        userLangIndex={userLangIndex}
        onToggleEditor={onToggleEditor}
      />
      <SectionEditor
        contentId={contentId}
        htmlContent={htmlContent}
        isEditorOpen={isEditorOpen}
        isRequired={isRequired}
        sectionType={sectionType}
        userLangIndex={userLangIndex}
        visibleInMemo={visibleInMemo}
        onSave={onSave}
        onToggleEditor={onToggleEditor}
      />
    </>
  )
}

export default EditorWithVisibility
