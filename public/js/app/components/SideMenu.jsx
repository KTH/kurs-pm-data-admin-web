import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { sections } from '../util/fieldsByType'
import i18n from '../../../../i18n'

@inject(['routerStore'])
@observer
class SideMenu extends Component {
  render() {
    const { header } = i18n.messages[1]
    return (
      <nav
        id={this.props.id}
        className="col navbar navbar-expand-lg navbar-light"
        style={{ paddingLeft: '0' }}
      >
        <div className="collapse navbar-collapse" id="navbarNav">
          {sections.map(section => (
            <span key={section.id}>
              <NavHeading key={'nav-' + section.id} title={section.title} />
              <>
                {section.content.map(title => (
                  <NavItem key={'nav-' + title} id={title} title={header[title]} selected={false} />
                ))}
              </>
            </span>
          ))}
        </div>
      </nav>
    )
  }
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
      <Link className="nav-link" to={location => ({ ...location, hash: props.id })}>
        {props.title}
      </Link>
    </li>
  </ul>
)

export default SideMenu
