import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class DropdownSemesters extends Component {
  state = {
    dropdownOpen: false
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  render() {
    const { items } = this.props
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="select-semester">
        <DropdownToggle caret>
          {this.props.semester ? 'Vald termin: ' + this.props.semester : 'Välj termin'}
        </DropdownToggle>
        <DropdownMenu>
          {items &&
            items.map(obj => (
              <DropdownItem
                id={`itemFor-${obj.term}`}
                key={obj.term}
                onClick={() => {
                  this.props.onChoice({ semester: obj.term })
                }}
              >
                {obj.term}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default DropdownSemesters
