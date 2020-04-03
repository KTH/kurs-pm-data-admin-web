import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'
import i18n from '../../../../i18n'

const { memoInfoByUserLang } = i18n.messages[Number(i18n.isSwedish())]

const ContentHead = ({ contentId, memoLangIndex }) => {
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

export default ContentHead
