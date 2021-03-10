/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import React from 'react'
import { observer } from 'mobx-react'
import { ExtraHeaderHead } from './ContentHead'
import { useStore } from '../../mobx'

import i18n from '../../../../../i18n'

function ExtraSection(props) {
  const { langIndex: userLangIndex } = useStore()
  const {
    contentId,
    isEmptyNew,
    initialValue: contentForEditor = '',
    initialTitle: contentForTitle = '',
    memoLanguageIndex,
    visibleInMemo,
  } = props

  const { sourceInfo } = i18n.messages[userLangIndex]

  return (
    <span className="Added--New--Title--And--Info">
      {!isEmptyNew && (
        <ExtraHeaderHead header={contentForTitle} contentId={contentId} memoLangIndex={memoLanguageIndex} />
      )}

      {!isEmptyNew &&
        /* is included in memo, preview text without editor */
        ((visibleInMemo && (
          <span
            dangerouslySetInnerHTML={{
              __html: (contentForEditor !== '' && contentForEditor) || '',
            }}
          />
        )) ||
          /* editor has content but is not yet included in pm */
          (contentForEditor !== '' && ( // TODO: add DEFAULT TEXT
            <span>
              <p>
                {/* <i>{type === 'optionalEditable' ? sourceInfo.notIncludedInMemoYet : sourceInfo.notIncludedInMemoYetOfAddition}</i> */}
              </p>
            </span>
          )))}
    </span>
  )
}
export default ExtraSection
