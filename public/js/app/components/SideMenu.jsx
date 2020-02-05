import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { FaRegEyeSlash } from 'react-icons/fa'
import Collapsible from 'react-collapsible'

import { sections, context } from '../util/fieldsByType'
import i18n from '../../../../i18n'

const visibility = (contentId, visibleInMemoProp) => {
  if (context[contentId].isRequired) {
    return (visibleInMemoProp && visibleInMemoProp[contentId]) || false
  }
  return true
}

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedId: null
    }
  }

  setExpandedId = expandedId => {
    this.setState({ expandedId })
  }

  isExpandedId = id => id === this.state.expandedId

  render() {
    const { memoHeadings } = i18n.messages[1]
    return (
      <MainMenu
        extraClasses={['pl-0', 'h-100']}
        style={{
          ...this.props.style,
          ...{
            width: '105%',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }
        }}
      >
        <NavBarCollapse>
          <NavListExpandable>
            {sections.map(section => (
              <NavItemNode
                key={'nav-item-node-' + section.id}
                id={section.id}
                title={section.title}
                isExpandedId={this.isExpandedId}
                setExpandedId={this.setExpandedId}
              >
                <ul id="leftmenu-div-1" className="nav nav-list">
                  {section.content.map(contentId => (
                    <NavItemLeaf
                      key={'nav-litem-leaf-' + contentId}
                      id={section.id + '-' + contentId}
                      title={memoHeadings[contentId].header}
                      showVisibilityIcon={visibility(contentId, this.props.visibleInMemo)}
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

const NavItemNode = ({ id, title, isExpandedId, setExpandedId, children }) => (
  <li className={isExpandedId(id) ? 'nav-item node selected expanded' : 'nav-item node'}>
    <Collapsible
      onOpening={() => setExpandedId(id)}
      onClosing={() => setExpandedId(null)}
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

const NavItemLeaf = ({ id, title, showVisibilityIcon }) => (
  <li className="nav-item leaf">
    <Link
      smooth
      className="nav-link"
      to={'#' + id}
      scroll={el => el.scrollIntoView({ behavior: 'smooth' })}
    >
      <span>{title}</span>
      {showVisibilityIcon && <FaRegEyeSlash className="section_info_visibility_icon" />}
    </Link>
  </li>
)

export default SideMenu
