import React from 'react'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'
import { context } from '../util/fieldsByType'
import i18n from '../../../../i18n'

const { memoHeadings, buttons } = i18n.messages[1]

const ContentHead = ({ contentId }) => (
  <TitleAndInfoModal
    modalId={contentId}
    titleAndInfo={memoHeadings[contentId]}
    superscript={' ' + context[contentId].source || ''}
    btnClose={buttons.btnClose}
  />
)

export default ContentHead
