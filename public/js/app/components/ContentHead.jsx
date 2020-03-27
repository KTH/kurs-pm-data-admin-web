import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'
import i18n from '../../../../i18n'

const ContentHead = ({ contentId, memoLangIndex }) => {
  const { memoHeadings, buttons } = i18n.messages[memoLangIndex]
  return (
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={memoHeadings[contentId]}
      btnClose={buttons.btnClose}
    />
  )
}

export default ContentHead
