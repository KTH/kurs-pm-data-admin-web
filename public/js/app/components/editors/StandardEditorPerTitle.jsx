import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useStore } from '../../mobx'

import { ContentHead } from '../ContentHead'
import { isRequired, isSubSection } from '../../util/sectionAndHeaderUtils'
import { useSectionContext } from '../../stores/SectionContext'
import HeadingBox from '../layout/HeadingBox'
import EditorWithVisibility from './EditorWithVisibility'

function StandardEditorPerTitle(props) {
  const store = useStore()
  const { langIndex: userLangIndex, memoLangAbbr } = store
  const memoLangIndex = memoLangAbbr === 'sv' ? 1 : 0
  const { contentId, htmlContent, menuId, visibleInMemo, onToggleVisibleInMemo, onSave } = props

  const contentIsRequired = isRequired(contentId)
  const contentIsSubSection = isSubSection(contentId)

  const { getIsEditorOpen, setIsEditorOpen } = useSectionContext()

  const sectionType = contentIsSubSection ? 'subSection' : 'section'

  useEffect(() => {
    // used when visibleInMemo changes or open/close editor (but not when editor content changed, done in updateMemoContent)
    store.setDirtyEditor(contentId)
  }, [getIsEditorOpen(contentId), visibleInMemo])

  const toggleEditor = React.useCallback(() => {
    const isOpenNext = !getIsEditorOpen(contentId)
    if (contentId === 'examinationSubSection') store.setExaminationModules(isOpenNext)

    setIsEditorOpen(contentId, isOpenNext)
  })

  const isReady = useMemo(() => visibleInMemo && htmlContent !== '', [visibleInMemo, htmlContent])

  return (
    <HeadingBox isReady={isReady} onToggleEditor={toggleEditor}>
      <span id={menuId} className={sectionType}>
        {sectionType === 'section' && (
          <ContentHead
            contentId={contentId}
            memoLangIndex={memoLangIndex}
            userLangIndex={userLangIndex}
            isEditorOpen={getIsEditorOpen(contentId)}
            onToggleEditor={toggleEditor}
          />
        )}
      </span>
      <EditorWithVisibility
        htmlContent={htmlContent}
        contentId={contentId}
        toggleVisibleInMemo={onToggleVisibleInMemo}
        sectionType={sectionType}
        userLangIndex={userLangIndex}
        visibleInMemo={visibleInMemo}
        isEditorOpen={getIsEditorOpen(contentId)}
        isRequired={contentIsRequired}
        onSave={onSave}
        onToggleEditor={toggleEditor}
      />
    </HeadingBox>
  )
}

StandardEditorPerTitle.propTypes = {
  contentId: PropTypes.string.isRequired,
  htmlContent: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  onSave: PropTypes.func.isRequired,
}

StandardEditorPerTitle.defaultProps = {
  htmlContent: '',
}

export default StandardEditorPerTitle
