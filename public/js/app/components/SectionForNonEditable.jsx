/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { typeOfHeader } from '../util/fieldsByType'
import i18n from '../../../../i18n'
import { ContentHead } from './ContentHead'
import VisibilityInfo from './VisibilityInfo'

const SectionForNonEditable = ({
  contentId,
  menuId,
  visibleInMemo,
  onToggleVisibleInMemo,
  html,
  memoLangIndex,
  userLangIndex,
}) => {
  const { nothingFetched } = i18n.messages[userLangIndex].sourceInfo
  const typeOfThisHeader = typeOfHeader(contentId)

  return (
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
        data-testid={`text-for-memo-${typeOfThisHeader}-${contentId}`}
        style={visibleInMemo ? {} : { display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: html || `<p data-testid='msg-text-about-empty'><i>${nothingFetched[typeOfThisHeader]}</i></p>`,
        }}
      />
    </span>
  )
}
SectionForNonEditable.propTypes = {
  contentId: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  html: PropTypes.string, // add default
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired, // add default
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

SectionForNonEditable.defaultProps = {
  html: null,
}

export default SectionForNonEditable
