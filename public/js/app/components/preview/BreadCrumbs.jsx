import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Button
} from 'reactstrap'

const BreadCrumbs = ({ labels, courseCode }) => (
  <nav>
    <Breadcrumb>
      <BreadcrumbItem>
        <Button id="breadcrumb-university" color="link">
          {labels.university}
        </Button>
        <UncontrolledPopover
          trigger="hover legacy"
          placement="bottom"
          target="breadcrumb-university"
        >
          <PopoverHeader>{labels.university}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Button id="breadcrumb-student" color="link">
          {labels.student}
        </Button>
        <UncontrolledPopover trigger="hover legacy" placement="bottom" target="breadcrumb-student">
          <PopoverHeader>{labels.student}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Button id="breadcrumb-directory" color="link">
          {labels.directory}
        </Button>
        <UncontrolledPopover
          trigger="hover legacy"
          placement="bottom"
          target="breadcrumb-directory"
        >
          <PopoverHeader>{labels.directory}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Button id="breadcrumb-about" color="link">
          {`${labels.aboutCourse} ${courseCode}`}
        </Button>
        <UncontrolledPopover trigger="hover legacy" placement="bottom" target="breadcrumb-about">
          <PopoverHeader>{labels.aboutCourse}</PopoverHeader>
          <PopoverBody>Länkar i menyn fungerar inte i granska-läge</PopoverBody>
        </UncontrolledPopover>
      </BreadcrumbItem>
    </Breadcrumb>
  </nav>
)

export default BreadCrumbs
