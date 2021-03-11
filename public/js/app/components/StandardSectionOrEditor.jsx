import React from 'react'
import PropTypes from 'prop-types'
import StandardEditorPerTitle from './editors/StandardEditorPerTitle'
import SectionForNonEditable from './SectionForNonEditable'
import { context } from '../util/fieldsByType'

const StandardSectionOrEditor = ({
  contentId,
  initialValue,
  sectionId,
  onToggleVisibleInMemo,
  memoLangIndex,
  onSave,
  userLangIndex,
  checkVisibility,
}) => {
  const menuId = sectionId + '-' + contentId
  // eslint-disable-next-line react/destructuring-assignment
  const { isEditable, isRequired } = context[contentId]
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
  checkVisibility: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired, // PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf]),
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  onSave: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

export default StandardSectionOrEditor
