import React from 'react'
import { Button } from 'reactstrap'

export const SaveAndCloseButton = ({ onSaveAndClose, text }) => (
  <Button data-testid="save-and-exit" onClick={onSaveAndClose} color="secondary">
    {text}
  </Button>
)
