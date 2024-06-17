import React from 'react'

function Dropdown({ placeholderText, onChange, options, selectedOption }) {
  const handleChange = event => {
    event.preventDefault()
    onChange(event.target.value)
  }

  return (
    <div className="select-wrapper">
      <select className="form-control" onChange={handleChange} value={selectedOption} aria-label={placeholderText}>
        {!selectedOption && (
          <option key="no-chosen" value={placeholderText} style={{ display: 'none' }}>
            {placeholderText}
          </option>
        )}
        {options &&
          options.map(({ value, text }, index) => (
            <option key={index} value={value}>
              {text}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Dropdown
