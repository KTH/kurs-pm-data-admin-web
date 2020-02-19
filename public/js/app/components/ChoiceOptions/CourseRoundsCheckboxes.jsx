import React, { Component } from 'react'
import { FormGroup, CustomInput } from 'reactstrap'

class CourseRoundsCheckboxes extends Component {
  state = {
    chosenByUserCourseRounds: this.props.rounds || []
  }

  toggleStates = event => {
    const { checked, value } = event.target
    const temp = this.state.chosenByUserCourseRounds
    if (checked) temp.push(value)
    else temp.splice(temp.indexOf(value), 1)
    this.props.onChoice({ rounds: temp.sort() })
  }

  render() {
    const { items, semester } = this.props
    const cRs = items.find(objCR => objCR.term === semester)

    return (
      <FormGroup>
        {cRs &&
          cRs.rounds
            .reverse()
            .map(({ ladokRoundId }) => (
              <CustomInput
                defaultChecked={this.state.chosenByUserCourseRounds.indexOf(ladokRoundId) > -1}
                id={`courseRound-${semester}-${ladokRoundId}`}
                key={ladokRoundId}
                label={'Kurstillfällesnamn' + ladokRoundId}
                onChange={this.toggleStates}
                type="checkbox"
                value={ladokRoundId}
              />
            ))}
      </FormGroup>
    )
  }
}

export default CourseRoundsCheckboxes
