import React, { useState, memo } from 'react'
import { seasonStr } from '../util/helpers'

function SemesterDropdown({ chooseSemesterLabel, handleSelectedSemester, semesterList, langIndex }) {
  const [selectedSemester, setSelectedSemester] = useState()
  const handleChange = event => {
    handleSelectedSemester(event)
    setSelectedSemester(event.target.value)
  }
  return (
    <div className="select-wrapper">
      <select
        className="form-control"
        data-testid="select-terms"
        id="semesterDropdownControl"
        aria-label={chooseSemesterLabel}
        onChange={handleChange}
        defaultValue="PLACEHOLDER"
      >
        {!selectedSemester && (
          <option key="no-chosen" defaultValue="PLACEHOLDER" style={{ display: 'none' }}>
            {chooseSemesterLabel}
          </option>
        )}

        {semesterList &&
          semesterList.map(({ term }) => (
            <option data-testid="select-option" id={`itemFor-${term}`} key={term} value={term}>
              {seasonStr(langIndex, term)}
            </option>
          ))}
      </select>
    </div>
  )
}
export default memo(SemesterDropdown)
