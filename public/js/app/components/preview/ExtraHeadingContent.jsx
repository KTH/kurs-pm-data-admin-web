/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import { ExtraHeaderHead } from './ContentHead'
import { EMPTY } from '../../util/constants'

function ExtraHeadingContent(props) {
  const {
    contentId,
    isEmptyNew,
    initialValue: contentForEditor = '',
    initialTitle: contentForTitle = '',
    memoLanguageIndex,
    visibleInMemo,
  } = props

  return (
    <span className="Added--New--Title--And--Info">
      {!isEmptyNew && (
        <ExtraHeaderHead header={contentForTitle} contentId={contentId} memoLangIndex={memoLanguageIndex} />
      )}

      {!isEmptyNew &&
        /* is included in memo, preview text without editor */
        visibleInMemo && (
          <span
            dangerouslySetInnerHTML={{
              __html: (contentForEditor !== '' && contentForEditor) || `<p><i>${EMPTY[memoLanguageIndex]}</i></p>`,
            }}
          />
        )}
    </span>
  )
}

ExtraHeadingContent.propTypes = {
  contentId: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  initialTitle: PropTypes.string.isRequired,
  memoLanguageIndex: PropTypes.number.isRequired,
  isEmptyNew: PropTypes.bool,
  visibleInMemo: PropTypes.bool.isRequired,
}

ExtraHeadingContent.defaultProps = {
  isEmptyNew: false,
}

export default ExtraHeadingContent
