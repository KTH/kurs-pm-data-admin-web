import React from 'react'
import { HeadingAsteriskModal } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import PropTypes from 'prop-types'

import i18n from '../../../../i18n'

export const ContentHead = ({ contentId, memoLangIndex, userLangIndex }) => {
  const { memoTitlesByMemoLang, buttons } = i18n.messages[memoLangIndex]
  const { memoInfoByUserLang } = i18n.messages[userLangIndex]

  const titleAndInfo = {
    header: memoTitlesByMemoLang[contentId],
    body: memoInfoByUserLang[contentId].body,
  }
  return <HeadingAsteriskModal modalId={contentId} titleAndInfo={titleAndInfo} btnClose={buttons.btnClose} />
}

export const ExtraHeaderHead = ({ header, contentId, memoLangIndex, userLangIndex }) => {
  const { buttons } = i18n.messages[memoLangIndex]
  const { memoInfoByUserLang } = i18n.messages[userLangIndex]

  const titleAndInfo = {
    header,
    body: memoInfoByUserLang[contentId].body,
  }
  return <HeadingAsteriskModal modalId={contentId} titleAndInfo={titleAndInfo} btnClose={buttons.btnClose} />
}

ContentHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

ExtraHeaderHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  header: PropTypes.string.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}
