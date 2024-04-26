import React from 'react'
import PropTypes from 'prop-types'

import i18n from '../../../../../i18n'
import { context } from '../../util/fieldsByType'
import { ContentHead, SubSectionHeaderMessage } from './ContentHead'

const Section = ({ contentId, menuId, visibleInMemo, html, memoLangIndex }) => {
  const { nothingFetched, insertedSubSection } = i18n.messages[memoLangIndex].sourceInfo
  const fromSyllabus = {
    is: context[contentId].source === '(s)',
    subHeader: contentId === 'examination' || contentId === 'ethicalApproach',
  }
  const isAddedSubSection = context[contentId].hasParentTitle && contentId !== 'permanentDisabilitySubSection'
  return (
    <span id={menuId} key={contentId}>
      {isAddedSubSection ? (
        <SubSectionHeaderMessage message={insertedSubSection} />
      ) : (
        <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} fromSyllabus={fromSyllabus} />
      )}
      <span
        style={visibleInMemo ? {} : { display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: html || `<p><i>${nothingFetched[context[contentId].type]}</i></p>`,
        }}
      />
    </span>
  )
}

Section.propTypes = {
  contentId: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  html: PropTypes.string,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

Section.defaultProps = {
  html: '',
}

export default Section
