/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { FaRegEyeSlash, FaChevronRight } from 'react-icons/fa'
import Collapsible from 'react-collapsible'

import { sections, context } from '../util/fieldsByType'
import i18n from '../../../../i18n'

class SideMenu extends Component {
  render() {
    const { memoHeadings } = i18n.messages[1]
    return (
      <nav
        id={this.props.id}
        className="col navbar navbar-expand-lg navbar-light pl-0 h-100"
        style={{
          ...this.props.style,
          ...{
            width: '105%',
            overflowX: 'hidden',
            overflowY: 'scroll'
          }
        }}
      >
        <div className="collapse navbar-collapse" id="navbarNav">
          {sections.map(section => (
            <span key={section.id}>
              <Collapsible trigger=<NavHeading key={'nav-' + section.id} title={section.title} />>
                {section.content.map(contentId => (
                  <NavItem
                    key={'nav-' + contentId}
                    id={section.id + '-' + contentId}
                    title={memoHeadings[contentId].header}
                    selected={false}
                    visibleInMemo={
                      context[contentId].isRequired
                        ? true
                        : (this.props.visibleInMemo && this.props.visibleInMemo[contentId]) || false
                    }
                  />
                ))}
              </Collapsible>
            </span>
          ))}
        </div>
      </nav>
    )
  }
}

const NavHeading = props => (
  <>
    <FaChevronRight className="menu-icon" />
    <ul className="nav nav-ancestor">
      <li>
        <span className="nav-item ancestor">{props.title}</span>
      </li>
    </ul>
  </>
)

const NavItem = props => (
  <ul className="nav nav-list">
    <li className={props.selected ? 'nav-item selected' : 'nav-item leaf'}>
      <Link
        smooth
        className="nav-link"
        to={'#' + props.id}
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      >
        <span>{props.title}</span>
        {props.visibleInMemo ? null : <FaRegEyeSlash className="section_info_visibility_icon" />}
      </Link>
    </li>
  </ul>
)

export default SideMenu
