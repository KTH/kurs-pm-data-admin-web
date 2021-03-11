/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import { HashLink as Link } from 'react-router-hash-link'
import { FaRegEyeSlash } from 'react-icons/fa'
import { sections, isRequired } from '../util/fieldsByType'
import i18n from '../../../../i18n'
import ProgressTitle from './ProgressTitle'
import PropTypes from 'prop-types'

const showEyeSlashIcon = (contentId, visibleInMemoProp) => {
  if (isRequired(contentId)) {
    // Required headers are always visible, don’t show an eye slash icon
    return false
  }

  if (visibleInMemoProp && typeof visibleInMemoProp === 'object' && visibleInMemoProp[contentId]) {
    // Header isn’t required and there’s a display mode saved
    // Display mode is inverted from whether or not an eye slash icon should be shown
    return !visibleInMemoProp[contentId]
  }
  if (typeof visibleInMemoProp === 'boolean') return !visibleInMemoProp

  // Header isn’t required and there’s no display mode saved
  // Default is to hide header and therefor to show an eye slash icon
  return true
}

function SectionMenu({ activeTab, children, memoLangIndex, visiblesOfStandard }) {
  const { memoData } = useStore()
  const { memoTitlesByMemoLang } = i18n.messages[memoLangIndex]

  const activeSection = sections.find(({ id }) => id === activeTab)
  const { id, content, extraHeaderTitle } = activeSection

  return (
    <MainMenu extraClasses={['pl-0', 'h-100']}>
      {content.map(
        contentId =>
          memoTitlesByMemoLang[contentId] && (
            <NavItemLink
              key={'nav-litem-leaf-' + contentId}
              id={id + '-' + contentId}
              title={memoTitlesByMemoLang[contentId]}
              showEyeSlashIcon={showEyeSlashIcon(contentId, visiblesOfStandard)}
            />
          )
      )}
      {extraHeaderTitle &&
        memoData[extraHeaderTitle] &&
        memoData[extraHeaderTitle].map(({ uKey, title, visibleInMemo: isVisible }) => (
          <NavItemLink
            key={'nav-litem-leaf-' + uKey}
            id={id + '-' + extraHeaderTitle + uKey}
            title={title}
            showEyeSlashIcon={showEyeSlashIcon(uKey, isVisible)}
          />
        ))}
      {children}
    </MainMenu>
  )
}

const MainMenu = ({ extraClasses = '', children }) => (
  <nav id="mainMenu" className={'content-overview col navbar navbar-expand-lg navbar-light ' + extraClasses.join(' ')}>
    {children}
  </nav>
)

const NavItemLink = ({ id, title, showEyeSlashIcon: showIcon }) => (
  <p className="nav-link-to-content-header">
    <Link smooth to={'#' + id} scroll={el => el.scrollIntoView({ behavior: 'smooth' })}>
      <span>{title}</span>
    </Link>
    {showIcon && <FaRegEyeSlash className="section_info_visibility_icon" />}
  </p>
)

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showEyeSlashIcon: PropTypes.bool.isRequired,
}

MainMenu.propTypes = {
  extraClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
}

SectionMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node,
  memoLangIndex: PropTypes.number.isRequired,
  visiblesOfStandard: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}

SectionMenu.defaultProps = {
  children: '',
}

export default SectionMenu
