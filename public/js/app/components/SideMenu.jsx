import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { FaRegEyeSlash } from 'react-icons/fa'

import { sections } from '../util/fieldsByType'
import i18n from '../../../../i18n'

const isVisibleInMemo = (visibleInMemo, title) => {
  if (visibleInMemo) {
    return title in visibleInMemo ? visibleInMemo[title] : true
  }
  return true
}

const SideMenu = ({ id, style, visibleInMemo }) => {
  const { memoHeadings } = i18n.messages[1]
  return (
    <nav
      id={id}
      className="col navbar navbar-expand-lg navbar-light"
      style={{
        ...style,
        ...{ paddingLeft: '0', width: '100%', height: '100%', overflow: 'scroll' }
      }}
    >
      <div className="collapse navbar-collapse" id="navbarNav">
        {sections.map(section => (
          <span key={section.id}>
            <NavHeading key={'nav-' + section.id} title={section.title} />
            <>
              {section.content.map(title => (
                <NavItem
                  key={'nav-' + title}
                  id={title}
                  title={memoHeadings[title].header}
                  selected={false}
                  visibleInMemo={isVisibleInMemo(visibleInMemo, title)}
                />
              ))}
            </>
          </span>
        ))}
      </div>
    </nav>
  )
}

const NavHeading = props => (
  <ul className="nav nav-ancestor">
    <li>
      <span className="nav-item ancestor">{props.title}</span>
    </li>
  </ul>
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
