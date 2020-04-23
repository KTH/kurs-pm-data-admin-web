/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { ContentHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import i18n from '../../../../i18n'
import { context } from '../util/fieldsByType'

const { nothingFetched } = i18n.messages[Number(i18n.isSwedish())].sourceInfo

const Section = ({
  contentId,
  menuId,
  visibleInMemo,
  onToggleVisibleInMemo,
  html,
  memoLangIndex
}) => (
  <span id={menuId} key={contentId} className="main-text-session">
    <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} />
    <VisibilityInfo
      contentId={contentId}
      contentType="section"
      visibleInMemo={visibleInMemo}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
    />

    <span
      style={visibleInMemo ? {} : { display: 'none' }}
      dangerouslySetInnerHTML={{
        __html: html || `<p><i>${nothingFetched[context[contentId].type]}</i></p>`
      }}
    />
  </span>
)

export default Section
