import React from 'react'
import PropTypes from 'prop-types'

export const EditButton = ({ isEditButtonVisible, isEditorOpen, buttons, contentName, contentId, onToggleEditor }) => {
  if (!isEditButtonVisible) {
    return null
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <span
      className={`toggle-editor ${isEditorOpen ? 'opened' : 'closed'}`}
      aria-label={`${isEditorOpen ? buttons.closeEditor : buttons.edit} ${contentName}`}
      onClick={() => onToggleEditor()}
      data-testid={isEditorOpen ? `btn-close-editor-${contentId}` : `btn-open-editor-${contentId}`}
      role="button"
    />
  )
}

EditButton.propTypes = {
  isEditButtonVisible: PropTypes.bool.isRequired,
  isEditorOpen: PropTypes.bool.isRequired,
  buttons: PropTypes.object.isRequired,
  contentName: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  onToggleEditor: PropTypes.func.isRequired,
  extraHeadingEditor: PropTypes.bool,
}
