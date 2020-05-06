/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'

import Popup from './Popup'

// Volontary information
const communicationWithTeachers = (language, memoData, labels) =>
  !memoData.communicationDuringCourse || (
    <div>
      <h4 style={{ marginTop: '0' }}>{labels.communicationWithTeachersTitle}</h4>
      <div dangerouslySetInnerHTML={{ __html: memoData.communicationDuringCourse }} />
    </div>
  )

// Mandatory information
const courseCoordinator = (language, memoData, labels) =>
  memoData.courseCoordinator ? (
    <div>
      <h4 style={{ marginTop: '0' }}>{labels.courseCoordinatorTitle}</h4>
      <div
        id="links-course-coordinator"
        dangerouslySetInnerHTML={{ __html: memoData.courseCoordinator }}
      />
      <Popup
        header={labels.courseCoordinatorTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-course-coordinator"
      />
    </div>
  ) : (
    <div>
      <h4 style={{ marginTop: '0' }}>{labels.courseCoordinatorTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

// Mandatory information
const teacher = (language, memoData, labels) =>
  memoData.teacher ? (
    <div>
      <h4>{labels.teacherTitle}</h4>
      <div id="links-teacher" dangerouslySetInnerHTML={{ __html: memoData.teacher }} />
      <Popup
        header={labels.teacherTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-teacher"
      />
    </div>
  ) : (
    <div>
      <h4>{labels.teacherTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

// Volontary information
const teacherAssistants = (language, memoData, labels) =>
  !memoData.teacherAssistants || (
    <div>
      <h4>{labels.teacherAssistantsTitle}</h4>
      <div
        id="links-teacher-assistants"
        dangerouslySetInnerHTML={{ __html: memoData.teacherAssistants }}
      />
      <Popup
        header={labels.teacherAssistantsTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-teacher-assistants"
      />
    </div>
  )

// Mandatory information
const examiner = (language, memoData, labels) =>
  memoData.examiner ? (
    <div>
      <h4>{labels.examinerTitle}</h4>
      <div id="links-examiner" dangerouslySetInnerHTML={{ __html: memoData.examiner }} />
      <Popup
        header={labels.examinerTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-examiner"
      />
    </div>
  ) : (
    <div>
      <h4>{labels.examinerTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

// Volontary information
const otherContacts = (language, memoData, labels) =>
  !memoData.otherContacts || (
    <div>
      <h4>{labels.otherContactsTitle}</h4>
      <div id="links-other-contacts" dangerouslySetInnerHTML={{ __html: memoData.otherContacts }} />
      <Popup
        header={labels.otherContactsTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-other-contacts"
      />
    </div>
  )

const CourseContacts = ({ language, memoData = {}, labels = {} }) => (
  <div>
    <h2 style={{ marginTop: '0' }}>{labels.courseContactsTitle}</h2>
    <div
      className="text-break"
      style={{ backgroundColor: '#f4f4f4', padding: '20px 10px 20px 20px' }}
    >
      {communicationWithTeachers(language, memoData, labels)}
      {courseCoordinator(language, memoData, labels)}
      {teacher(language, memoData, labels)}
      {teacherAssistants(language, memoData, labels)}
      {examiner(language, memoData, labels)}
      {otherContacts(language, memoData, labels)}
    </div>
  </div>
)

export default CourseContacts
