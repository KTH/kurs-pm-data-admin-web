import React from 'react'
import Button from '../../components-shared/Button'

export const SaveAndCloseButton = ({ onSaveAndClose, text }) => (
  <Button data-testid="save-and-exit" onClick={onSaveAndClose} variant="secondary">
    {text}
  </Button>
)
