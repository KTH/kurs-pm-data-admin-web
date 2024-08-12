import React from 'react'
import PropTypes from 'prop-types'
import { context } from '../util/fieldsByType'
import StandardEditorPerTitle from './editors/StandardEditorPerTitle'
import SectionForNonEditable from './SectionForNonEditable'
import SectionWithSubSection from './SectionWithSubSection'

const StandardSectionOrEditor = ({
  contentId,
  htmlContent,
  sectionId,
  onToggleVisibleInMemo,
  memoLangIndex,
  onSave,
  userLangIndex,
  checkVisibility,
}) => {
  const menuId = sectionId + '-' + contentId
  // eslint-disable-next-line react/destructuring-assignment
  const { isEditable, subSection, hasParentTitle } = context[contentId]

  if (hasParentTitle) return null // Subsections are included in SectionWithSubSection

  const visibleInMemo = checkVisibility(contentId)

  if (isEditable) {
    return (
      <StandardEditorPerTitle
        contentId={contentId}
        menuId={menuId}
        key={contentId}
        htmlContent={htmlContent}
        onToggleVisibleInMemo={onToggleVisibleInMemo}
        visibleInMemo={visibleInMemo}
        onSave={onSave}
      />
    )
  } else if (subSection) {
    return (
      <SectionWithSubSection
        memoLangIndex={memoLangIndex}
        contentId={contentId}
        menuId={menuId}
        key={contentId}
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={onToggleVisibleInMemo}
        html={htmlContent}
        userLangIndex={userLangIndex}
        checkVisibility={checkVisibility}
        onSave={onSave}
      />
    )
  }

  return (
    <SectionForNonEditable
      memoLangIndex={memoLangIndex}
      contentId={contentId}
      menuId={menuId}
      key={contentId}
      visibleInMemo={visibleInMemo}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
      html={htmlContent}
      userLangIndex={userLangIndex}
    />
  )
}
StandardSectionOrEditor.propTypes = {
  checkVisibility: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired,
  htmlContent: PropTypes.string.isRequired, // PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf]),
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  onSave: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

export default StandardSectionOrEditor
