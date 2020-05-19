import React from 'react'
import Title from './Title'

import i18n from '../../../../../i18n'

export const ContentHead = ({ contentId, memoLangIndex, fromSyllabus }) => {
  const { memoTitlesByMemoLang } = i18n.messages[memoLangIndex]
  const header = memoTitlesByMemoLang[contentId]
  return header ? <Title titleId={contentId} header={header} fromSyllabus={fromSyllabus} /> : null
}

export const ExtraHeaderHead = ({ header, contentId }) =>
  header ? <Title titleId={contentId} header={header} /> : null
