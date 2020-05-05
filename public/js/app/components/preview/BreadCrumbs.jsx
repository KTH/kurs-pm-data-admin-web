import React from 'react'
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import Popup from './Popup'

const BreadCrumbs = ({ labels, courseCode }) => (
  <nav>
    <Breadcrumb>
      <BreadcrumbItem>
        <Button id="breadcrumb-university" color="link">
          {labels.university}
        </Button>
        <Popup
          header={labels.university}
          body={labels.noLinksInPreview}
          targetId="breadcrumb-university"
        />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Button id="breadcrumb-student" color="link">
          {labels.student}
        </Button>
        <Popup
          header={labels.student}
          body={labels.noLinksInPreview}
          targetId="breadcrumb-student"
        />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Button id="breadcrumb-directory" color="link">
          {labels.directory}
        </Button>
        <Popup
          header={labels.directory}
          body={labels.noLinksInPreview}
          targetId="breadcrumb-directory"
        />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Button id="breadcrumb-about" color="link">
          {`${labels.aboutCourse} ${courseCode}`}
        </Button>
        <Popup
          header={labels.aboutCourse}
          body={labels.noLinksInPreview}
          targetId="breadcrumb-about"
        />
      </BreadcrumbItem>
    </Breadcrumb>
  </nav>
)

export default BreadCrumbs
