import React from 'react'
import { Button } from 'reactstrap'

export const SaveAndCloseButton = ({ onSaveAndClose, text }) => {
  return (
    <Button onClick={onSaveAndClose} color="secondary">
      {text}
    </Button>
  )
}
