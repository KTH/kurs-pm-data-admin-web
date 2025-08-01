import React from 'react'
import PropTypes from 'prop-types'

import { getHeaderType } from '../util/sectionAndHeaderUtils'
import i18n from '../../../../i18n'
import HeadingBox from '../components/layout/HeadingBox'
import { disableLinksInHtml } from '../util/disableLinksInHtml'
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
  const headerType = getHeaderType(contentId)

  const isReady = React.useMemo(() => visibleInMemo && html !== '', [visibleInMemo, html])

  return (
    <HeadingBox isReady={isReady}>
      <span
        id={menuId}
        key={contentId}
        className="main-text-section"
        data-testid={`section-${headerType}-${contentId}`}
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
          className="section-content"
          data-testid={`text-for-memo-${headerType}-${contentId}`}
          style={visibleInMemo ? {} : { display: 'none' }}
          dangerouslySetInnerHTML={{
            __html:
              disableLinksInHtml(html) ||
              `<p data-testid='msg-text-about-empty'><i>${nothingFetched[headerType]}</i></p>`,
          }}
        />
      </span>
    </HeadingBox>
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
