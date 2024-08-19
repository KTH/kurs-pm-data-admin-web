import React from 'react'
import PropTypes from 'prop-types'
import { EMPTY } from '../../util/constants'
import { ExtraHeaderHead } from './ContentHead'

function ExtraHeadingContent(props) {
  const {
    contentId,
    isEmptyNew,
    initialValue: contentForEditor = '',
    initialTitle: contentForTitle = '',
    memoLanguageIndex,
  } = props

  return (
    <span className="Added--New--Title--And--Info article">
      {!isEmptyNew && (
        <ExtraHeaderHead header={contentForTitle} contentId={contentId} memoLangIndex={memoLanguageIndex} />
      )}
      {!isEmptyNew && (
        /* is included in memo, preview text without editor */
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
}

ExtraHeadingContent.defaultProps = {
  isEmptyNew: false,
}

export default ExtraHeadingContent
