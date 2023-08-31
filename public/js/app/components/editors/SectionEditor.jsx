import React from 'react'
import { useStore } from '../../mobx'
import CollapseGuidance from '../details/CollapseGuidance'
import editorConf from '../../util/editorInitConf'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../../i18n'

export const SectionEditor = ({
  contentId,
  sectionType,
  visibleInMemo,
  userLangIndex,
  htmlContent,
  isEditorOpen,
  isRequired,
  onSave,
}) => {
  const store = useStore()
  const { sourceInfo, memoInfoByUserLang, buttons } = i18n.messages[userLangIndex]

  function updateMemoContent(editorContent) {
    store.setMemoByContentId(contentId, editorContent)
    // if content changed then update dirtyEditor with contentId
    store.setDirtyEditor(contentId)
  }

  function onBlur() {
    const { dirtyEditor } = store
    if (dirtyEditor === contentId) {
      onSave({ [contentId]: store.memoData[contentId] }, 'autoSaved')
    }
    store.setDirtyEditor('')
  }

  return (
    <>
      {isEditorOpen && (
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

      {!isEditorOpen &&
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
                <i
                  dangerouslySetInnerHTML={{
                    __html: (htmlContent !== '' && htmlContent) || `<p><i>${sourceInfo.noInfoYet[sectionType]}</i></p>`,
                  }}
                ></i>
              </p>
            </span>
          )) || <div data-testid="dynamic-empty-content-and-not-included" style={{ display: 'none' }} />)}
    </>
  )
}
