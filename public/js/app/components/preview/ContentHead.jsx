import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

import i18n from '../../../../../i18n'

const { memoInfoByUserLang } = i18n.messages[Number(i18n.isSwedish())]

export const ContentHead = ({ contentId, memoLangIndex }) => {
  const { memoTitlesByMemoLang, buttons } = i18n.messages[memoLangIndex]
  const header = memoTitlesByMemoLang[contentId]
  const titleAndInfo = {
    header,
    body: memoInfoByUserLang[contentId].body
  }
  return header ? (
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={titleAndInfo}
      btnClose={buttons.btnClose}
    />
  ) : null
}

export const ExtraHeaderHead = ({ header, contentId, memoLangIndex }) => {
  const { buttons } = i18n.messages[memoLangIndex]
  const titleAndInfo = {
    header,
    body: memoInfoByUserLang[contentId].body
  }
  return header ? (
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={titleAndInfo}
      btnClose={buttons.btnClose}
    />
  ) : null
}

// export default ContentHead
