/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'
import i18n from '../../../../../i18n'

// Volontary information
const communicationWithTeachers = (language, memoData, labels) =>
  !memoData.communicationDuringCourse || (
    <div>
      <h3>{labels.communicationWithTeachersTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.communicationDuringCourse }} />
    </div>
  )

// Mandatory information
const courseCoordinator = (language, memoData, labels) =>
  memoData.courseCoordinator ? (
    <div>
      <h3>{labels.courseCoordinatorTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.courseCoordinator }} />
    </div>
  ) : (
    <div>
      <h3>{labels.courseCoordinatorTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

// Mandatory information
const teacher = (language, memoData, labels) =>
  memoData.teacher ? (
    <div>
      <h3>{labels.teacherTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.teacher }} />
    </div>
  ) : (
    <div>
      <h3>{labels.teacherTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

// Volontary information
const teacherAssistants = (language, memoData, labels) =>
  !memoData.teacherAssistants || (
    <div>
      <h3>{labels.teacherAssistantsTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.teacherAssistants }} />
    </div>
  )

// Mandatory information
const examiner = (language, memoData, labels) =>
  memoData.examiner ? (
    <div>
      <h3>{labels.examinerTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.examiner }} />
    </div>
  ) : (
    <div>
      <h3>{labels.examinerTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </div>
  )

// Volontary information
const otherContacts = (language, memoData, labels) =>
  !memoData.otherContacts || (
    <div>
      <h3>{labels.otherContactsTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.otherContacts }} />
    </div>
  )

const CourseContacts = ({ language, memoData = {}, labels = {} }) => (
  <div>
    <h2 style={{ marginTop: '0' }}>{labels.courseContactsTitle}</h2>
    <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
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
