import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

// Position adjustments is to counter the effects of margin top in use-personal-menu
// Placement will actually be below target
const Popup = ({ header, body, targetId }) => {
  return (
    <UncontrolledPopover trigger="hover legacy" placement="top" target={targetId} offset="0, -30">
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>{body}</PopoverBody>
    </UncontrolledPopover>
  )
}

export default Popup
