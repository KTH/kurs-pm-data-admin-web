/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import { useStore } from '../../mobx'

import i18n from '../../../../../i18n'
import { ContentHead } from '../ContentHead'
import CollapseGuidance from '../details/CollapseGuidance'
import VisibilityInfo from '../VisibilityInfo'
import { context } from '../../util/fieldsByType'
import editorConf from '../../util/editorInitConf'

function StandardEditorPerTitle(props) {
  const store = useStore()
  const { langIndex: userLangIndex, memoLangAbbr } = store
  const memoLangIndex = memoLangAbbr === 'sv' ? 1 : 0
  const { contentId, htmlContent, menuId, visibleInMemo } = props

  const { isRequired, hasParentTitle, openIfContent } = context[contentId]

  const [firstLoad, setFirstLoad] = useState(true)
  const [isOpen, setOpenStatus] = useState(false)

  function _openMandatoryEditable() {
    if (firstLoad && openIfContent) {
      setOpenStatus((openIfContent && htmlContent !== '') || false)
      setFirstLoad(false)
    }
  }
  _openMandatoryEditable()

  const sectionType = hasParentTitle ? 'subSection' : 'section'
  const { sourceInfo, memoInfoByUserLang, buttons } = i18n.messages[userLangIndex]

  useEffect(() => {
    // used when visibleInMemo changes or open/close editor (but not when editor content changed, done in updateMemoContent)
    store.setDirtyEditor(contentId)
  }, [isOpen, visibleInMemo])

  function updateMemoContent(editorContent) {
    store.setMemoByContentId(contentId, editorContent)
    // if content changed then update dirtyEditor with contentId
    store.setDirtyEditor(contentId)
  }

  const onBlur = () => {
    const { dirtyEditor } = store
    if (dirtyEditor === contentId) {
      props.onSave({ [contentId]: store.memoData[contentId] }, 'autoSaved')
    }
    store.setDirtyEditor('')
  }

  const toggleVisibleInMemo = () => {
    props.onToggleVisibleInMemo(contentId)
  }

  const onToggleVisibleEditor = () => {
    setOpenStatus(!isOpen)
  }

  return (
    <span id={menuId} className={sectionType + ' section-50'}>
      {sectionType === 'section' && (
        <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} userLangIndex={userLangIndex} />
      )}
      <VisibilityInfo
        contentId={contentId}
        sectionType={sectionType}
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={toggleVisibleInMemo}
        isEditorOpen={isOpen}
        onToggleVisibleEditor={onToggleVisibleEditor}
        userLangIndex={userLangIndex}
      />
      {isOpen && (
        <span data-testid={`standard-editor-${contentId}`}>
          <CollapseGuidance title={buttons.showGuidance} details={memoInfoByUserLang[contentId].help} />
          <Editor
            id={'editor-for-' + contentId}
            value={htmlContent}
            init={editorConf(userLangIndex === 1 ? 'sv_SE' : null)}
            onEditorChange={updateMemoContent}
            onBlur={onBlur}
          />
        </span>
      )}

      {!isOpen &&
        /* isRequired && empty // type && type === 'mandatoryAndEditable' */
        ((isRequired && (
          <span
            data-testid={`text-for-memo-mandatoryAndEditable-${contentId}`} // "text-for-memo-mandatoryAndEditable"
            dangerouslySetInnerHTML={{
              __html:
                (htmlContent !== '' && htmlContent) ||
                `<p><i>${sourceInfo.nothingFetched.mandatoryAndEditable}</i></p>`,
            }}
          />
        )) ||
          /* is included in memo, preview text without editor */
          (visibleInMemo && (
            <span
              data-testid={`text-for-memo-optionalEditable-${contentId}`} // "text-for-memo-optionalEditable"
              dangerouslySetInnerHTML={{
                __html: (htmlContent !== '' && htmlContent) || `<p><i>${sourceInfo.noInfoYet[sectionType]}</i></p>`,
              }}
            />
          )) ||
          /* editor has content but is not yet included in pm */
          (htmlContent !== '' && (
            <span data-testid="dynamic-optional-and-not-included-but-with-content">
              <p data-testid={`optional-and-excluded-but-with-content-${sectionType}-${contentId}`}>
                <i>{sourceInfo.notIncludedInMemoYet[sectionType]}</i>
              </p>
            </span>
          )) || <div data-testid="dynamic-empty-content-and-not-included" style={{ display: 'none' }} />)}
    </span>
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
