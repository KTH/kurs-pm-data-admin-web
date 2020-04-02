/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import ContentHead from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import i18n from '../../../../i18n'

const Section = ({
  contentId,
  menuId,
  visibleInMemo,
  onToggleVisibleInMemo,
  html,
  memoLangIndex,
  userLangIndex
}) => (
  <span id={menuId} key={contentId}>
    <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} />
    <VisibilityInfo
      contentId={contentId}
      visibleInMemo={visibleInMemo}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
    />

    <span
      style={visibleInMemo ? {} : { display: 'none' }}
      dangerouslySetInnerHTML={{
        __html: html || `<p><i>${i18n.messages[userLangIndex].sourceInfo.nothingFetched}</i></p>`
      }}
    />
  </span>
)

export default Section
