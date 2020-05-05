import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody, Button } from 'reactstrap'

const SideMenu = ({ courseCode, courseMemoItems, labels }) => {
  return (
    <div className="menu-memos">
      <p>
        <Button id="menu-link-directory" color="link">
          {`‹ ${labels.directory}`}
        </Button>
        <UncontrolledPopover trigger="hover legacy" placement="bottom" target="menu-link-directory">
          <PopoverHeader>{labels.directory}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </p>
      <p>
        <b>{`${labels.aboutCourse} ${courseCode}`}</b>
      </p>
      <hr />
      <p>
        <Button id="menu-link-before-choosing-course" color="link">
          {labels.beforeChoosingCourse}
        </Button>
        <UncontrolledPopover
          trigger="hover legacy"
          placement="bottom"
          target="menu-link-before-choosing-course"
        >
          <PopoverHeader>{labels.beforeChoosingCourse}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </p>
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
      <p>
        {' '}
        <Button id="menu-link-finish-course" color="link">
          {labels.finishCourse}
        </Button>
        <UncontrolledPopover
          trigger="hover legacy"
          placement="bottom"
          target="menu-link-finish-course"
        >
          <PopoverHeader>{labels.finishCourse}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </p>
      <p>
        {' '}
        <Button id="menu-link-course-development-and-history" color="link">
          {labels.courseDevelopmentAndHistory}
        </Button>
        <UncontrolledPopover
          trigger="hover legacy"
          placement="bottom"
          target="menu-link-course-development-and-history"
        >
          <PopoverHeader>{labels.courseDevelopmentAndHistory}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </p>
    </div>
  )
}

export default SideMenu
