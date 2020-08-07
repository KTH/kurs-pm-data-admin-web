import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'
import i18n from '../../../../i18n'
import PropTypes from 'prop-types'

const { memoInfoByUserLang } = i18n.messages[Number(i18n.isSwedish())]

export const ContentHead = ({ contentId, memoLangIndex }) => {
  const { memoTitlesByMemoLang, buttons } = i18n.messages[memoLangIndex]
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

export const ExtraHeaderHead = ({ header, contentId, memoLangIndex }) => {
  const { buttons } = i18n.messages[memoLangIndex]
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
  memoLangIndex: PropTypes.number.isRequired
}

ExtraHeaderHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  memoLangIndex: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired
}
