import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class DropdownTerms extends Component {
  state = {
    dropdownOpen: false,
    term: ''
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  render() {
    const { items } = this.props
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="select-semester">
        <DropdownToggle caret>
          {this.state.term ? 'Vald termin: ' + this.state.term : 'Välj termin'}
        </DropdownToggle>
        <DropdownMenu>
          {items &&
            items.map(obj => (
              <DropdownItem
                id={`itemFor-${obj.term}`}
                key={obj.term}
                onClick={() => this.setState({ term: obj.term })}
              >
                {obj.term}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default DropdownTerms
