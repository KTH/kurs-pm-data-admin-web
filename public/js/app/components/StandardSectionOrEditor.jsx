import React from 'react'
import PropTypes from 'prop-types'
import StandardEditorPerTitle from './editors/StandardEditorPerTitle'
import SectionForNonEditable from './SectionForNonEditable'
import { context } from '../util/fieldsByType'

const StandardSectionOrEditor = ({
  contentId,
  memoData,
  sectionId,
  onToggleVisibleInMemo,
  memoLangIndex,
  onSave,
  userLangIndex,
  checkVisibility
}) => {
  const menuId = sectionId + '-' + contentId
  // eslint-disable-next-line react/destructuring-assignment
  const { isEditable, isRequired } = context[contentId]
  const initialValue = memoData[contentId]
  const visibleInMemo = isRequired ? true : checkVisibility(contentId, initialValue)

  return isEditable ? (
    <StandardEditorPerTitle
      contentId={contentId}
      menuId={menuId}
      key={contentId}
      htmlContent={initialValue}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
      visibleInMemo={visibleInMemo}
      onSave={onSave}
    />
  ) : (
    <SectionForNonEditable
      memoLangIndex={memoLangIndex}
      contentId={contentId}
      menuId={menuId}
      key={contentId}
      visibleInMemo={visibleInMemo}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
      html={initialValue}
      userLangIndex={userLangIndex}
    />
  )
}
StandardSectionOrEditor.propTypes = {
  checkVisibility: PropTypes.func,
  contentId: PropTypes.string,
  memoData: PropTypes.func,
  memoLangIndex: PropTypes.number,
  onSave: PropTypes.func,
  sectionId: PropTypes.string,
  onToggleVisibleInMemo: PropTypes.func,
  userLangIndex: PropTypes.number
}

export default StandardSectionOrEditor
