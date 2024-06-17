import React from 'react'
import { seasonStr } from '../utils-shared/helpers'

function SemesterDropdown({ chooseSemesterLabel, handleSelectedSemester, semesterList, langIndex, selectedSemester }) {
  const handleChange = event => {
    event.preventDefault()
    handleSelectedSemester(event.target.value)
  }

  return (
    <div className="select-wrapper">
      <select
        className="form-control"
        data-testid="select-terms"
        id="term-list"
        aria-label={chooseSemesterLabel}
        onChange={handleChange}
        value={selectedSemester}
      >
        {!selectedSemester && (
          <option key="no-chosen" value={chooseSemesterLabel} style={{ display: 'none' }}>
            {chooseSemesterLabel}
          </option>
        )}
        {semesterList &&
          semesterList.map(({ term }, index) => (
            <option data-testid="select-option" id={`itemFor-${term}`} key={index} value={term}>
              {seasonStr(langIndex, term)}
            </option>
          ))}
      </select>
    </div>
  )
}

export default SemesterDropdown
