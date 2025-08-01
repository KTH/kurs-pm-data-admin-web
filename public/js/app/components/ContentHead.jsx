import PropTypes from 'prop-types'
import React from 'react'
import { isEditable } from '../util/sectionAndHeaderUtils'

import i18n from '../../../../i18n'
import { OnClickPropagationStopper } from '../components/editors/OnClickPropagationStopper'
import { useStore } from '../mobx'
import HeadingWithInfoModal from './HeadingWithInfoModal'
import { EditButton } from './editors/EditButton'
import { SectionHeading } from './layout/SectionHeading'

const createHtmlWithDynamicLink = (userLangIndex, contentId, courseCode) => {
  const { memoInfoByUserLang } = i18n.messages[userLangIndex]
  const baseUrl = window.location.origin

  const rawLink = `${memoInfoByUserLang[contentId].link}` ?? ''
  const dynamicLink = rawLink.replace('<REPLACE_WITH_COURSECODE>', courseCode)
  const html = memoInfoByUserLang[contentId].body.replace(
    'href="REPLACE_WITH_ABOUT_COURSE_ADMIN_LINK"',
    `href="${baseUrl + dynamicLink}"`
  )

  return html
}

const getInfoModalAriaLabel = (langIndex, header) =>
  langIndex === 1 ? `Information om ${header}` : `Information about ${header}`

export const ContentHead = ({ contentId, isEditorOpen, memoLangIndex, onToggleEditor, userLangIndex }) => {
  const { memoTitlesByMemoLang } = i18n.messages[memoLangIndex]

  const contentIsEditable = isEditable(contentId)

  const contentName =
    memoTitlesByMemoLang[contentId] || memoTitlesByMemoLang[contentId.substring(0, contentId.length - 10)]
  const header = memoTitlesByMemoLang[contentId]

  return (
    <BasicHeaderHead
      contentId={contentId}
      contentName={contentName}
      header={header}
      isEditButtonVisible={contentIsEditable}
      isEditorOpen={isEditorOpen}
      memoLangIndex={memoLangIndex}
      onToggleEditor={onToggleEditor}
      userLangIndex={userLangIndex}
    />
  )
}

export const ExtraHeaderHead = ({
  contentId,
  isEditorOpen,
  memoLangIndex,
  onToggleEditor,
  userLangIndex,
  contentName,
  header,
  uKey,
}) => (
  <BasicHeaderHead
    contentId={contentId}
    contentName={contentName}
    header={header}
    isEditButtonVisible
    isEditorOpen={isEditorOpen}
    memoLangIndex={memoLangIndex}
    onToggleEditor={onToggleEditor}
    userLangIndex={userLangIndex}
    contentIdAndUKey={`${contentId}-${uKey}`}
  />
)

const BasicHeaderHead = ({
  contentId,
  userLangIndex,
  memoLangIndex,
  header,
  isEditButtonVisible,
  isEditorOpen,
  contentName,
  onToggleEditor,
  contentIdAndUKey,
}) => {
  const store = useStore()
  const { courseCode } = store
  const { buttons } = i18n.messages[memoLangIndex]
  const html = createHtmlWithDynamicLink(userLangIndex, contentId, courseCode)

  const titleAndInfo = {
    header,
    body: html,
  }
  const ariaLabel = getInfoModalAriaLabel(userLangIndex, header)

  const editButtonContentId = contentIdAndUKey || contentId

  return (
    <SectionHeading>
      <OnClickPropagationStopper>
        <HeadingWithInfoModal
          headingTag="h3"
          modalBtnAriaLabel={ariaLabel}
          modalId={contentId}
          titleAndInfo={titleAndInfo}
          btnClose={buttons.btnClose}
        />
      </OnClickPropagationStopper>
      {isEditButtonVisible && (
        <EditButton
          buttons={buttons}
          contentId={editButtonContentId}
          contentName={contentName}
          isEditButtonVisible={isEditButtonVisible}
          isEditorOpen={isEditorOpen}
          onToggleEditor={onToggleEditor}
        />
      )}
    </SectionHeading>
  )
}

BasicHeaderHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  header: PropTypes.string.isRequired,
  isEditButtonVisible: PropTypes.bool,
  isEditorOpen: PropTypes.bool,
  contentName: PropTypes.string,
  onToggleEditor: PropTypes.func,
  contentIdAndUKey: PropTypes.bool,
}
BasicHeaderHead.defaultProps = {
  contentName: '',
  isEditButtonVisible: false,
  isEditorOpen: false,
  onToggleEditor: null,
}

ContentHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  isEditorOpen: PropTypes.bool,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  onToggleEditor: PropTypes.func,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}
ContentHead.defaultProps = {
  isEditorOpen: false,
  onToggleEditor: null,
}

ExtraHeaderHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  isEditorOpen: PropTypes.bool.isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  onToggleEditor: PropTypes.func.isRequired,
  contentName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  uKey: PropTypes.bool.isRequired,
}
