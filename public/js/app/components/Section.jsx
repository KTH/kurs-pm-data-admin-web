/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { ContentHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'
import i18n from '../../../../i18n'
import { typeOfHeader } from '../util/fieldsByType'
import PropTypes from 'prop-types'

const Section = ({
  contentId,
  menuId,
  visibleInMemo,
  onToggleVisibleInMemo,
  html,
  memoLangIndex,
  userLangIndex
}) => {
  const { nothingFetched } = i18n.messages[userLangIndex].sourceInfo

  return (
    <span id={menuId} key={contentId} className="main-text-section section-50">
      <ContentHead
        contentId={contentId}
        memoLangIndex={memoLangIndex}
        userLangIndex={userLangIndex}
      />
      <VisibilityInfo
        contentId={contentId}
        contentType="section"
        visibleInMemo={visibleInMemo}
        onToggleVisibleInMemo={onToggleVisibleInMemo}
        userLangIndex={userLangIndex}
      />

      <span
        style={visibleInMemo ? {} : { display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: html || `<p><i>${nothingFetched[typeOfHeader(contentId)]}</i></p>`
        }}
      />
    </span>
  )
}
Section.propTypes = {
  contentId: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  html: PropTypes.string, // add default
  memoLangIndex: PropTypes.number.isRequired, // add default
  userLangIndex: PropTypes.number.isRequired
}

Section.defaultProps = {
  html: null
}

export default Section
