import React, { Component } from 'react'
import { FormGroup, Label, CustomInput } from 'reactstrap'

class CourseRoundsCheckboxes extends Component {
  state = {
    // courseRounds: this.props.rounds || []
  }

  //   toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  render() {
    const { items, semester } = this.props
    const cRs = items.find(objCR => objCR.term === semester)

    return (
      <FormGroup>
        {cRs &&
          cRs.rounds.map(objCR => (
            <CustomInput
              id={`courseRound-${objCR.ladokRoundId}`}
              label={objCR.ladokRoundId}
              type="checkbox"
              key={objCR.ladokRoundId}
            />
          ))}
      </FormGroup>
    )
  }
}

export default CourseRoundsCheckboxes
