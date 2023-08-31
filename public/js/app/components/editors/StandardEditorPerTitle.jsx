/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import React, { useEffect, useMemo } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import { useStore } from '../../mobx'

import i18n from '../../../../../i18n'
import { ContentHead } from '../ContentHead'
import CollapseGuidance from '../details/CollapseGuidance'
import VisibilityInfo from '../VisibilityInfo'
import { context } from '../../util/fieldsByType'
import editorConf from '../../util/editorInitConf'
import { useSectionContext } from '../../stores/SectionContext'
import HeadingBox from '../layout/HeadingBox'
import EditorWithVisibility from './EditorWithVisibility'

function StandardEditorPerTitle(props) {
  const store = useStore()
  const { langIndex: userLangIndex, memoLangAbbr } = store
  const memoLangIndex = memoLangAbbr === 'sv' ? 1 : 0
  const { contentId, htmlContent, menuId, visibleInMemo, onToggleVisibleInMemo, onSave } = props

  const { isRequired, hasParentTitle, openIfContent } = context[contentId]

  const { getIsEditorOpen, setIsEditorOpen } = useSectionContext()

  const sectionType = hasParentTitle ? 'subSection' : 'section'
  const { sourceInfo, memoInfoByUserLang, buttons } = i18n.messages[userLangIndex]

  useEffect(() => {
    // used when visibleInMemo changes or open/close editor (but not when editor content changed, done in updateMemoContent)
    store.setDirtyEditor(contentId)
  }, [getIsEditorOpen(contentId), visibleInMemo])

  function toggleEditor() {
    const isOpenNext = !getIsEditorOpen(contentId)
    if (contentId === 'examinationSubSection') store.setExaminationModules(isOpenNext)

    setIsEditorOpen(contentId, isOpenNext)
  }

  const isReady = useMemo(() => {
    return visibleInMemo && htmlContent !== ''
  }, [visibleInMemo, htmlContent])

  return (
    <HeadingBox isReady={isReady}>
      <span id={menuId} className={sectionType + ' section-50'}>
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
        isRequired={isRequired}
        onSave={onSave}
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
