import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
import PropTypes from 'prop-types'

// Position adjustments is to counter the effects of margin top in use-personal-menu
// Placement will actually be below target
const Popup = ({ header, body, targetId }) => (
  <UncontrolledPopover trigger="hover legacy" placement="top" target={targetId}>
    <PopoverHeader>{header}</PopoverHeader>
    <PopoverBody>{body}</PopoverBody>
  </UncontrolledPopover>
)

Popup.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
}

export default Popup
