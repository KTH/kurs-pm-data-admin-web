import React from 'react'

export const OnClickPropagationStopper = ({ children }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <span
    onClick={e => {
      e.stopPropagation()
    }}
  >
    {children}
  </span>
)
