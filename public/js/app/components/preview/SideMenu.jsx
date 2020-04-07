import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody, Button } from 'reactstrap'

const SideMenu = ({ courseCode, courseMemoItems, backLink, labels }) => {
  return (
    <div>
      <p>
        &lsaquo;&nbsp;
        <a href={backLink}>{labels.directory}</a>
      </p>
      <p>
        <b>{`${labels.aboutCourse} ${courseCode}`}</b>
      </p>
      <hr />
      <p>{labels.beforeChoosingCourse}</p>
      <p>
        <b>{labels.courseMemo}</b>
      </p>
      <hr />
      <div className="menu-memos">
        {courseMemoItems.map(({ label, active }) => {
          return active ? (
            <p id={label} key={label} className="active">
              {label}
            </p>
          ) : (
            <span key={label}>
              <Button id={label} color="link">
                {label}
              </Button>
              <UncontrolledPopover trigger="hover legacy" placement="bottom" target={label}>
                <PopoverHeader>{label}</PopoverHeader>
                <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
              </UncontrolledPopover>
            </span>
          )
        })}
      </div>
      <p>{labels.finishCourse}</p>
      <p>{labels.courseDevelopmentAndHistory}</p>
    </div>
  )
}

export default SideMenu
