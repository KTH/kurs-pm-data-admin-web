import React from 'react'
import { HeadingAsteriskModal } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import PropTypes from 'prop-types'
import { context } from '../util/fieldsByType'

import i18n from '../../../../i18n'
import { EditButton } from './editors/EditButton'
import { SectionHeading } from './layout/SectionHeading'
import { OnClickPropagationStopper } from '../components/editors/OnClickPropagationStopper'

const getInfoModalAriaLabel = (langIndex, header) =>
  langIndex === 1 ? `Information om ${header}` : `Information about ${header}`

export const ContentHead = ({ contentId, isEditorOpen, memoLangIndex, onToggleEditor, userLangIndex }) => {
  const { memoTitlesByMemoLang } = i18n.messages[memoLangIndex]

  const { isEditable = false } = context[contentId] || {}

  const contentName =
    memoTitlesByMemoLang[contentId] || memoTitlesByMemoLang[contentId.substring(0, contentId.length - 10)]
  const header = memoTitlesByMemoLang[contentId]

  return (
    <BasicHeaderHead
      contentId={contentId}
      contentName={contentName}
      header={header}
      isEditButtonVisible={isEditable}
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
}) => {
  return (
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
}

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
  const { buttons } = i18n.messages[memoLangIndex]
  const { memoInfoByUserLang } = i18n.messages[userLangIndex]

  const titleAndInfo = {
    header,
    body: memoInfoByUserLang[contentId].body,
  }
  const ariaLabel = getInfoModalAriaLabel(userLangIndex, header)

  const editButtonContentId = contentIdAndUKey || contentId

  return (
    <SectionHeading>
      <OnClickPropagationStopper>
        <HeadingAsteriskModal
          modalBtnAriaLabel={ariaLabel}
          modalId={contentId}
          titleAndInfo={titleAndInfo}
          btnClose={buttons.btnClose}
          withModal
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
