import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'
import i18n from '../../../../i18n'

const ContentHead = ({ contentId, langIndex }) => {
  const { memoHeadings, buttons } = i18n.messages[langIndex]
  return (
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={memoHeadings[contentId]}
      btnClose={buttons.btnClose}
    />
  )
}

export default ContentHead
