import React from 'react'

export const OnClickPropagationStopper = ({ children }) => {
  return (
    <span
      onClick={e => {
        e.stopPropagation()
      }}
    >
      {children}
    </span>
  )
}
