import React from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../../../i18n'
import { HeaderSource, getHeaderSource, isSubSection } from '../../util/sectionAndHeaderUtils'
import { ContentHead, SubSectionHeaderMessage } from './ContentHead'
import HtmlWrapper from './HtmlWrapper'

const Section = ({ contentId, menuId, htmlContent, memoLangIndex = 0 /* en */ }) => {
  const { noInfoYetPreview, insertedSubSection } = i18n.messages[memoLangIndex].sourceInfo

  const contentSource = getHeaderSource(contentId)
  const isFromSyllabus = contentSource === HeaderSource.SYLLABUS

  const contentIsSubSection = isSubSection(contentId)

  const isAddedSubSection = contentIsSubSection && contentId !== 'permanentDisabilitySubSection'

  return (
    <article id={menuId} key={contentId} aria-labelledby={isAddedSubSection ? null : contentId}>
      {isAddedSubSection ? (
        <SubSectionHeaderMessage message={insertedSubSection} />
      ) : (
        <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} isFromSyllabus={isFromSyllabus} />
      )}
      <HtmlWrapper mode="inline" html={htmlContent || `<p><i>${noInfoYetPreview}</i></p>`} />
    </article>
  )
}

Section.propTypes = {
  contentId: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  htmlContent: PropTypes.string,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

export default Section
