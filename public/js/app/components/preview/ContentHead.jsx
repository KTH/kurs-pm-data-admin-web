import React from 'react'
import { FaAsterisk } from 'react-icons/fa'
import PropTypes from 'prop-types'
import i18n from '../../../../../i18n'

export const ContentHead = ({ contentId, memoLangIndex, fromSyllabus }) => {
  const { memoTitlesByMemoLang } = i18n.messages[memoLangIndex]
  const header = memoTitlesByMemoLang[contentId]
  const { is: isFromSyllabus } = fromSyllabus
  return header ? (
    <>
      <h3>
        {memoTitlesByMemoLang[contentId]}
        {isFromSyllabus && (
          <sup>
            <FaAsterisk className="syllabus-marker-icon" />
          </sup>
        )}
      </h3>
    </>
  ) : null
}

export const ExtraHeaderHead = ({ header }) => (header ? <h3>{header}</h3> : null)

export const SubSectionHeaderMessage = ({ message }) => <p className="sub-section-header">{message}</p>

ContentHead.propTypes = {
  contentId: PropTypes.string.isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  fromSyllabus: PropTypes.shape({
    is: PropTypes.bool.isRequired,
  }).isRequired,
}
ExtraHeaderHead.propTypes = {
  // eslint-disable-next-line react/require-default-props
  header: PropTypes.string,
}
SubSectionHeaderMessage.propTypes = {
  message: PropTypes.string.isRequired,
}
