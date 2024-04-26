import PropTypes from 'prop-types'
import React from 'react'

import { observer } from 'mobx-react'
import i18n from '../../../../i18n'
import { useStore } from '../mobx'
import { useSectionContext } from '../stores/SectionContext'
import { typeOfHeader } from '../util/fieldsByType'
import { ContentHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import { EditButton } from './editors/EditButton'
import { SectionEditor } from './editors/SectionEditor'
import HeadingBox from './layout/HeadingBox'

const SectionWithSubSection = ({
  contentId,
  menuId,
  visibleInMemo,
  onToggleVisibleInMemo,
  html,
  memoLangIndex,
  userLangIndex,
  checkVisibility,
  onSave,
}) => {
  const { nothingFetched } = i18n.messages[userLangIndex].sourceInfo
  const { buttons, memoTitlesByMemoLang } = i18n.messages[memoLangIndex]
  const typeOfThisHeader = typeOfHeader(contentId)
  const store = useStore()
  const { memoData } = store
  const subSectionContentId = contentId + 'SubSection'
  const subSectionHtmlContent = memoData[subSectionContentId]
  const subSectionVisibleInMemo = checkVisibility(subSectionContentId, subSectionHtmlContent)
  const { getIsEditorOpen, setIsEditorOpen } = useSectionContext()
  const contentName =
    memoTitlesByMemoLang[contentId] || memoTitlesByMemoLang[contentId.substring(0, contentId.length - 10)]

  const toggleEditor = React.useCallback(() => {
    const isOpenNext = !getIsEditorOpen(subSectionContentId)
    if (subSectionContentId === 'examinationSubSection') store.setExaminationModules(isOpenNext)

    setIsEditorOpen(subSectionContentId, isOpenNext)
  }, [getIsEditorOpen, subSectionContentId, store, setIsEditorOpen])

  const isSubSectionReady = React.useMemo(
    () => subSectionVisibleInMemo && subSectionHtmlContent !== '',
    [subSectionVisibleInMemo, subSectionHtmlContent]
  )

  return (
    <HeadingBox isReady withNested onToggleEditor={toggleEditor}>
      <section>
        <span
          id={menuId}
          key={contentId}
          className="main-text-section section-50"
          data-testid={`section-${typeOfThisHeader}-${contentId}`}
        >
          <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} userLangIndex={userLangIndex} />
          <VisibilityInfo
            contentId={contentId}
            sectionType="section"
            visibleInMemo={visibleInMemo}
            onToggleVisibleInMemo={onToggleVisibleInMemo}
            userLangIndex={userLangIndex}
          />

          <span
            data-testid={`text-for-memo-${typeOfThisHeader}-${subSectionContentId}`}
            style={visibleInMemo ? {} : { display: 'none' }}
            dangerouslySetInnerHTML={{
              __html: html || `<p data-testid='msg-text-about-empty'><i>${nothingFetched[typeOfThisHeader]}</i></p>`,
            }}
          />
        </span>
      </section>
      <HeadingBox isReady={isSubSectionReady}>
        <VisibilityInfo
          contentId={subSectionContentId}
          sectionType={'subSection'}
          visibleInMemo={subSectionVisibleInMemo}
          onToggleVisibleInMemo={onToggleVisibleInMemo}
          userLangIndex={userLangIndex}
          onToggleEditor={toggleEditor}
        >
          <EditButton
            buttons={buttons}
            contentId={subSectionContentId}
            contentName={contentName}
            isEditButtonVisible={true}
            isEditorOpen={getIsEditorOpen(subSectionContentId)}
            onToggleEditor={toggleEditor}
          />
        </VisibilityInfo>
        <SectionEditor
          htmlContent={subSectionHtmlContent}
          contentId={subSectionContentId}
          toggleVisibleInMemo={onToggleVisibleInMemo}
          sectionType={'subSection'}
          userLangIndex={userLangIndex}
          visibleInMemo={subSectionVisibleInMemo}
          isEditorOpen={getIsEditorOpen(subSectionContentId)}
          isRequired={false}
          onSave={onSave}
          onToggleEditor={toggleEditor}
        />
      </HeadingBox>
    </HeadingBox>
  )
}
SectionWithSubSection.propTypes = {
  contentId: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  html: PropTypes.string, // add default
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired, // add default
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

SectionWithSubSection.defaultProps = {
  html: null,
}

export default observer(SectionWithSubSection)
