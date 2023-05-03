import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

import Popup from './Popup'

const SideMenu = ({ courseCode, courseMemoItems, labels }) => (
  <div className="menu-memos">
    <p>
      <Button id="menu-link-directory" color="link">
        {`‹ ${labels.directory}`}
      </Button>
      <Popup header={labels.directory} body={labels.noLinksInPreview} targetId="menu-link-directory" />
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
      <p>
        <b>{labels.aboutCourseMemos}</b>
      </p>
      {courseMemoItems.map(({ id, label, outdated }) =>
        !outdated ? (
          <p key={id} id={id} className="active" data-testid="side-menu-labels">
            {label}
          </p>
        ) : (
          ''
        )
      )}
    </div>
    <p>
      <Button id="menu-link-course-development" color="link">
        {labels.courseDevelopment}
      </Button>
      <Popup header={labels.courseDevelopment} body={labels.noLinksInPreview} targetId="menu-link-course-development" />
    </p>
    <p>
      <Button id="menu-link-archive" color="link">
        {labels.archive}
      </Button>
      <Popup header={labels.archive} body={labels.noLinksInPreview} targetId="menu-link-archive" />
    </p>
  </div>
)

SideMenu.propTypes = {
  courseCode: PropTypes.string.isRequired,
  courseMemoItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ).isRequired,
  labels: PropTypes.shape({
    aboutCourse: PropTypes.string.isRequired,
    archive: PropTypes.string.isRequired,
    beforeChoosingCourse: PropTypes.string.isRequired,
    courseDevelopment: PropTypes.string.isRequired,
    courseMemo: PropTypes.string.isRequired,
    directory: PropTypes.string.isRequired,
    noLinksInPreview: PropTypes.string.isRequired,
    aboutCourseMemos: PropTypes.string.isRequired,
  }).isRequired,
}

export default SideMenu
