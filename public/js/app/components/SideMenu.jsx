import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { FaRegEyeSlash } from 'react-icons/fa'
import Collapsible from 'react-collapsible'

import { sections, context } from '../util/fieldsByType'
import i18n from '../../../../i18n'

const showEyeSlashIcon = (contentId, visibleInMemoProp) => {
  if (context[contentId].isRequired) {
    // Required headers are always visible, don’t show an eye slash icon
    return false
  }

  if (visibleInMemoProp && visibleInMemoProp[contentId]) {
    // Header isn’t required and there’s a display mode saved
    // Display mode is inverted from whether or not an eye slash icon should be shown
    return !visibleInMemoProp[contentId]
  }

  // Header isn’t required and there’s no display mode saved
  // Default is to hide header and therefor to show an eye slash icon
  return true
}

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedIds: []
    }
  }

  setExpandedId = expandedId => {
    this.setState(({ expandedIds }) => {
      if (!expandedIds.includes(expandedId)) {
        expandedIds.push(expandedId)
      }
      return { expandedIds }
    })
  }

  removeExpandedId = expandedId =>
    this.setState(({ expandedIds }) => ({
      expandedIds: expandedIds.filter(id => id !== expandedId)
    }))

  isExpandedId = id => this.state.expandedIds.includes(id)

  componentDidMount = () => {
    if (this.state.expandedIds.length === 0) this.setState({ expandedIds: [sections[0].id] })
  }

  render() {
    const { memoTitlesByMemoLang, sectionsLabels } = i18n.messages[this.props.memoLangIndex]
    return (
      <MainMenu
        extraClasses={['pl-0', 'h-100']}
        style={{
          ...this.props.style,
          ...{
            width: '105%',
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        }}
      >
        <NavBarCollapse>
          <NavListExpandable>
            {sections.map(({ id, content }) => (
              <NavItemNode
                key={'nav-item-node-' + id}
                id={id}
                title={sectionsLabels[id]}
                isExpandedId={this.isExpandedId}
                setExpandedId={this.setExpandedId}
                removeExpandedId={this.removeExpandedId}
              >
                <ul id="leftmenu-div-1" className="nav nav-list">
                  {content.map(contentId => (
                    <NavItemLeaf
                      key={'nav-litem-leaf-' + contentId}
                      id={id + '-' + contentId}
                      title={memoTitlesByMemoLang[contentId]}
                      showEyeSlashIcon={showEyeSlashIcon(contentId, this.props.visibleInMemo)}
                    />
                  ))}
                </ul>
              </NavItemNode>
            ))}
          </NavListExpandable>
        </NavBarCollapse>
      </MainMenu>
    )
  }
}

const MainMenu = ({ extraClasses = '', style, children }) => (
  <nav
    id="mainMenu"
    className={'col navbar navbar-expand-lg navbar-light ' + extraClasses.join(' ')}
    style={style}
  >
    {children}
  </nav>
)

const NavBarCollapse = ({ children }) => (
  <div className="collapse navbar-collapse" id="navbarNav">
    {children}
  </div>
)

const NavListExpandable = ({ children }) => <ul className="nav nav-list expandable">{children}</ul>

const NavItemNode = ({ id, title, isExpandedId, setExpandedId, removeExpandedId, children }) => (
  <li className={isExpandedId(id) ? 'nav-item node selected expanded' : 'nav-item node'}>
    <Collapsible
      open={isExpandedId(id)}
      onOpening={() => setExpandedId(id)}
      onClosing={() => removeExpandedId(id)}
      trigger={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <a href={'#' + id} className="nav-link">
          {title}
        </a>
      }
    >
      {children}
    </Collapsible>
  </li>
)

const NavItemLeaf = ({ id, title, showEyeSlashIcon: showIcon }) => (
  <li className="nav-item leaf" style={{ padding: '0' }}>
    <Link
      smooth
      className="nav-link"
      to={'#' + id}
      scroll={el => el.scrollIntoView({ behavior: 'smooth' })}
      style={{ justifyContent: 'flex-start' }}
    >
      {showIcon && <FaRegEyeSlash className="section_info_visibility_icon" />}
      <span>{title}</span>
    </Link>
  </li>
)

export default SideMenu
