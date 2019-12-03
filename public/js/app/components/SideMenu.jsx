import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'
import { menuContent } from '../util/exampleData'

@inject(['routerStore'])
@observer
class SideMenu extends Component {
  state = {}

  updateMemoContent = editorContent => {
    this.props.onEditorChange(editorContent, this.props.id)
  }

  render() {
    // const { header } = i18n.messages[1]
    // const { selectedId } = this.props.routerStore
    const { id } = this.props

    const menuElements = []
    menuContent.forEach((content, index) => {
      if (content.level === 'ancestor') {
        menuElements.push(<Ancestor index={index} title={content.title} />)
      } else if (content.level === 'item') {
        menuElements.push(
          <Item
            index={index}
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
  <ul key={props.index} className="nav nav-ancestor">
    <li key={props.index}>
      <span className="nav-item ancestor">{props.title}</span>
    </li>
  </ul>
)

const Item = props => (
  <ul key={props.index} className="nav nav-list">
    <li key={props.index} className={props.selected ? 'nav-item selected' : 'nav-item leaf'}>
      <a className="nav-link" href={props.href}>
        {props.title}
      </a>
    </li>
  </ul>
)

export default SideMenu
