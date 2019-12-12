import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { menuContent } from '../util/exampleData'

@inject(['routerStore'])
@observer
class SideMenu extends Component {
  render() {
    const { id } = this.props

    const menuElements = []
    menuContent.forEach(content => {
      if (content.level === 'ancestor') {
        menuElements.push(<Ancestor key={menuElements.length} title={content.title} />)
      } else if (content.level === 'item') {
        menuElements.push(
          <Item
            key={menuElements.length}
            title={content.title}
            selected={content.selected}
            href={content.href}
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
          {menuElements}
        </div>
      </nav>
    )
  }
}

const Ancestor = props => (
  <ul className="nav nav-ancestor">
    <li>
      <span className="nav-item ancestor">{props.title}</span>
    </li>
  </ul>
)

const Item = props => (
  <ul className="nav nav-list">
    <li className={props.selected ? 'nav-item selected' : 'nav-item leaf'}>
      <a className="nav-link" href={props.href}>
        {props.title}
      </a>
    </li>
  </ul>
)

export default SideMenu
