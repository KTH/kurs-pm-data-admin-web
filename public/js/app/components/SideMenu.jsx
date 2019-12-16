import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { contents } from '../util/exampleData'

@inject(['routerStore'])
@observer
class SideMenu extends Component {
  render() {
    const { id } = this.props

    const menu = []
    contents.forEach(content => {
      if (content.level === 'heading') {
        menu.push(<NavHeading key={menu.length} title={content.title} />)
      } else if (content.level === 'section') {
        menu.push(
          <NavItem
            key={menu.length}
            id={content.id}
            title={content.title}
            selected={content.selected}
          />
        )
      }
    })

    return (
      <nav
        id={id}
        className="col navbar navbar-expand-lg navbar-light"
        style={{ paddingLeft: '0' }}
      >
        <div className="collapse navbar-collapse" id="navbarNav">
          {menu}
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
