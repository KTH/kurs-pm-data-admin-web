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
    const { memoHeadings } = i18n.messages[1]
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
            {sections.map(section => (
              <NavItemNode
                key={'nav-item-node-' + section.id}
                id={section.id}
                title={section.title}
                isExpandedId={this.isExpandedId}
                setExpandedId={this.setExpandedId}
                removeExpandedId={this.removeExpandedId}
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
