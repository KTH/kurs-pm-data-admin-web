import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

import i18n from '../../../../../i18n'
import { EMPTY } from '../../util/constants'

const { memoInfoByUserLang } = i18n.messages[Number(i18n.isSwedish())]

export const ContentHead = ({ contentId, memoLangIndex }) => {
  const { memoTitlesByMemoLang, buttons } = i18n.messages[memoLangIndex]
  const header = memoTitlesByMemoLang[contentId] || EMPTY[memoLangIndex]
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

// export default ContentHead
