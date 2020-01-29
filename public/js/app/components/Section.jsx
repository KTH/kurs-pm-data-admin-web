/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import ContentHead from './ContentHead'
import VisibilityInfo from './VisibilityInfo'

const Section = ({ contentId, menuId, visibleInMemo, onToggleVisibleInMemo, html }) => (
  <span id={menuId} key={contentId}>
    <ContentHead contentId={contentId} />
    <VisibilityInfo
      contentId={contentId}
      visibleInMemo={visibleInMemo}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
    />

    <span
      style={visibleInMemo ? {} : { display: 'none' }}
      dangerouslySetInnerHTML={{ __html: html || '<p>Information saknas</p>' }}
    />
  </span>
)

export default Section
