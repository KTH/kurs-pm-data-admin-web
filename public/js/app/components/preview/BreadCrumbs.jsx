import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import PropTypes from 'prop-types'
import Popup from './Popup'

const BreadCrumbs = ({ labels, courseCode }) => (
  <nav>
    <Breadcrumb>
      <BreadcrumbItem>
        <button className="link-button" id="breadcrumb-university">
          {labels.university}
        </button>
        <Popup header={labels.university} body={labels.noLinksInPreview} targetId="breadcrumb-university" />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <button className="link-button" id="breadcrumb-student">
          {labels.student}
        </button>
        <Popup header={labels.student} body={labels.noLinksInPreview} targetId="breadcrumb-student" />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <button className="link-button" id="breadcrumb-directory">
          {labels.directory}
        </button>
        <Popup header={labels.directory} body={labels.noLinksInPreview} targetId="breadcrumb-directory" />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <button className="link-button" id="breadcrumb-about">
          {`${labels.aboutCourse} ${courseCode}`}
        </button>
        <Popup header={labels.aboutCourse} body={labels.noLinksInPreview} targetId="breadcrumb-about" />
      </BreadcrumbItem>
    </Breadcrumb>
  </nav>
)

BreadCrumbs.propTypes = {
  courseCode: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    aboutCourse: PropTypes.string.isRequired,
    directory: PropTypes.string.isRequired,
    noLinksInPreview: PropTypes.string.isRequired,
    student: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
  }).isRequired,
}

export default BreadCrumbs
