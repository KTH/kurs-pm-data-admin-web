import React from 'react'
import PropTypes from 'prop-types'

import Popup from './Popup'

const SideMenu = ({ courseCode, courseMemoItems, labels }) => (
  <nav id="mainMenu" className="kth-local-navigation menu-memos">
    <button id="menu-link-directory" className="kth-button back">{`${labels.directory}`}</button>
    <Popup header={labels.directory} body={labels.noLinksInPreview} targetId="menu-link-directory" />
    <h2>{`${labels.aboutCourse} ${courseCode}`}</h2>
    <ul>
      <li>
        <button id="menu-link-before-choosing-course" className="link-button">
          {labels.beforeChoosingCourse}
        </button>
        <Popup
          header={labels.beforeChoosingCourse}
          body={labels.noLinksInPreview}
          targetId="menu-link-before-choosing-course"
        />
      </li>
      <li className="kth-local-navigation__submenu">
        <h3>{labels.courseMemo}</h3>
        <ul>
          <li>
            <button href="/" className="link-button">
              {labels.aboutCourseMemos}
            </button>
          </li>
          {courseMemoItems.map(({ id, label, outdated, active }) =>
            !outdated ? (
              <li key={id}>
                <button id={id} className={`link-button ${active ? 'active' : ''}`} data-testid="side-menu-labels">
                  {label}
                </button>
                <Popup header={label} body={labels.noLinksInPreview} targetId={id} />
              </li>
            ) : (
              ''
            )
          )}
        </ul>
      </li>
      <li>
        <button id="menu-link-course-development" className="link-button">
          {labels.courseDevelopment}
        </button>
        <Popup
          header={labels.courseDevelopment}
          body={labels.noLinksInPreview}
          targetId="menu-link-course-development"
        />
      </li>
      <li>
        <button id="menu-link-archive" className="link-button">
          {labels.archive}
        </button>
        <Popup header={labels.archive} body={labels.noLinksInPreview} targetId="menu-link-archive" />
      </li>
    </ul>
  </nav>
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
    noLinksInPreview: PropTypes.string.isRequired,
    aboutCourseMemos: PropTypes.string.isRequired,
  }).isRequired,
}

export default SideMenu
