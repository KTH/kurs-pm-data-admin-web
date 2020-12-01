import React from 'react'
import { Button } from 'reactstrap'

import Popup from './Popup'

const SideMenu = ({ courseCode, courseMemoItems, labels }) => {
  return (
    <div className="menu-memos">
      <p>
        <Button id="menu-link-directory" color="link">
          {`‹ ${labels.directory}`}
        </Button>
        <Popup
          header={labels.directory}
          body={labels.noLinksInPreview}
          targetId="menu-link-directory"
        />
      </p>
      <p>
        <b>{`${labels.aboutCourse} ${courseCode}`}</b>
      </p>
      <hr />
      <p>
        <Button id="menu-link-before-choosing-course" color="link">
          {labels.beforeChoosingCourse}
        </Button>
        <Popup
          header={labels.beforeChoosingCourse}
          body={labels.noLinksInPreview}
          targetId="menu-link-before-choosing-course"
        />
      </p>
      <p>
        <b>{labels.courseMemo}</b>
      </p>
      <hr />
      <div className="menu-memos-sub">
        {courseMemoItems.map(({ id, label, active }) => {
          return active ? (
            <p key={id} id={id} className="active">
              {label}
            </p>
          ) : (
            <p key={id}>
              <Button id={id} color="link">
                {label}
              </Button>
              <Popup header={label} body={labels.noLinksInPreview} targetId={id} />
            </p>
          )
        })}
      </div>
      {/* <p>
        <Button id="menu-link-finish-course" color="link">
          {labels.finishCourse}
        </Button>
        <Popup
          header={labels.finishCourse}
          body={labels.noLinksInPreview}
          targetId="menu-link-finish-course"
        />
      </p> */}
      <p>
        <Button id="menu-link-course-development" color="link">
          {labels.courseDevelopment}
        </Button>
        <Popup
          header={labels.courseDevelopment}
          body={labels.noLinksInPreview}
          targetId="menu-link-course-development"
        />
      </p>
      <p>
        <Button id="menu-link-archive" color="link">
          {labels.archive}
        </Button>
        <Popup
          header={labels.archive}
          body={labels.noLinksInPreview}
          targetId="menu-link-archive"
        />
      </p>
    </div>
  )
}

export default SideMenu
