import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'
import i18n from '../../../../i18n'
import PropTypes from 'prop-types'

export const ContentHead = ({ contentId, memoLangIndex, userLangIndex }) => {
  const { memoTitlesByMemoLang, buttons } = i18n.messages[memoLangIndex]
  const { memoInfoByUserLang } = i18n.messages[userLangIndex]

  const titleAndInfo = {
    header: memoTitlesByMemoLang[contentId],
    body: memoInfoByUserLang[contentId].body
  }
  return (
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={titleAndInfo}
      btnClose={buttons.btnClose}
    />
  )
}

export const ExtraHeaderHead = ({ header, contentId, memoLangIndex, userLangIndex }) => {
  const { buttons } = i18n.messages[memoLangIndex]
  const { memoInfoByUserLang } = i18n.messages[userLangIndex]

  const titleAndInfo = {
    header,
    body: memoInfoByUserLang[contentId].body
  }
  return (
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={titleAndInfo}
      btnClose={buttons.btnClose}
    />
  )
}

ContentHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  memoLangIndex: PropTypes.number.isRequired,
  userLangIndex: PropTypes.number.isRequired
}

ExtraHeaderHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  memoLangIndex: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  userLangIndex: PropTypes.number.isRequired
}
