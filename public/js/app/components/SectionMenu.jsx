/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { observer } from 'mobx-react'
import { HashLink as Link } from 'react-router-hash-link'
import PropTypes from 'prop-types'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

const scrollWithOffset = el => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
  const yOffset = -120
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
}

function SectionMenu({ activeTab, children, memoLangIndex, checkVisibility, checkVisibilityExtraHeading }) {
  const { sections, memoData } = useStore()
  const { memoTitlesByMemoLang } = i18n.messages[memoLangIndex]

  const activeSection = sections.find(({ id }) => id === activeTab)
  const { id, content, extraHeaderTitle } = activeSection

  return (
    <nav className="content-overview col">
      {content.map(
        contentId =>
          memoTitlesByMemoLang[contentId] && (
            <NavItemLink
              key={`nav-litem-leaf-${contentId}`}
              id={`${id}-${contentId}`}
              title={memoTitlesByMemoLang[contentId]}
              showEyeSlashIcon={!checkVisibility(contentId)}
            />
          )
      )}
      {extraHeaderTitle &&
        memoData[extraHeaderTitle] &&
        memoData[extraHeaderTitle].map(({ uKey, title }, index) => (
          <NavItemLink
            key={'nav-litem-leaf-' + uKey}
            id={id + '-' + extraHeaderTitle + uKey}
            title={title}
            showEyeSlashIcon={!checkVisibilityExtraHeading(extraHeaderTitle, index)}
          />
        ))}
      {children}
    </nav>
  )
}

const NavItemLink = ({ id, title, showEyeSlashIcon: showIcon }) => (
  <p className="nav-link-to-content-header">
    <Link smooth to={'#' + id} scroll={el => scrollWithOffset(el)}>
      <span>{title}</span>
    </Link>
    {showIcon && <svg className="section_info_visibility_icon" />}
  </p>
)

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showEyeSlashIcon: PropTypes.bool.isRequired,
}

SectionMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  checkVisibility: PropTypes.func.isRequired,
  checkVisibilityExtraHeading: PropTypes.func.isRequired,
}

SectionMenu.defaultProps = {
  children: '',
}

export default observer(SectionMenu)
