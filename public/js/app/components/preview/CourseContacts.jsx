/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import Popup from './Popup'

// Volontary information
const communicationWithTeachers = (memoData, labels) =>
  !memoData.communicationDuringCourse || (
    <>
      <h4>{labels.communicationWithTeachersTitle}</h4>
      <div dangerouslySetInnerHTML={{ __html: memoData.communicationDuringCourse }} />
    </>
  )

// Mandatory information
const courseCoordinator = (memoData, labels) =>
  memoData.courseCoordinator ? (
    <>
      <h4>{labels.courseCoordinatorTitle}</h4>
      <div id="links-course-coordinator" dangerouslySetInnerHTML={{ __html: memoData.courseCoordinator }} />
      <Popup
        header={labels.courseCoordinatorTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-course-coordinator"
      />
    </>
  ) : (
    <>
      <h4>{labels.courseCoordinatorTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

// Mandatory information
const teacher = (memoData, labels) =>
  memoData.teacher ? (
    <>
      <h4>{labels.teacherTitle}</h4>
      <div id="links-teacher" dangerouslySetInnerHTML={{ __html: memoData.teacher }} />
      <Popup header={labels.teacherTitle} body={labels.linkOpensInNewTab} targetId="links-teacher" />
    </>
  ) : (
    <>
      <h4>{labels.teacherTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

// Volontary information
const teacherAssistants = (memoData, labels) =>
  !memoData.teacherAssistants || (
    <>
      <h4>{labels.teacherAssistantsTitle}</h4>
      <div id="links-teacher-assistants" dangerouslySetInnerHTML={{ __html: memoData.teacherAssistants }} />
      <Popup
        header={labels.teacherAssistantsTitle}
        body={labels.linkOpensInNewTab}
        targetId="links-teacher-assistants"
      />
    </>
  )

// Mandatory information
const examiner = (memoData, labels) =>
  memoData.examiner ? (
    <>
      <h4>{labels.examinerTitle}</h4>
      <div id="links-examiner" dangerouslySetInnerHTML={{ __html: memoData.examiner }} />
      <Popup header={labels.examinerTitle} body={labels.linkOpensInNewTab} targetId="links-examiner" />
    </>
  ) : (
    <>
      <h4>{labels.examinerTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

// Volontary information
const otherContacts = (memoData, labels) =>
  !memoData.otherContacts || (
    <>
      <h4>{labels.otherContactsTitle}</h4>
      <div id="links-other-contacts" dangerouslySetInnerHTML={{ __html: memoData.otherContacts }} />
      <Popup header={labels.otherContactsTitle} body={labels.linkOpensInNewTab} targetId="links-other-contacts" />
    </>
  )

const CourseContacts = ({ styleId = null, memoData = {}, labels = {} }) => {
  const { visibleInMemo = {} } = memoData
  const {
    communicationDuringCourse: isCommunicationWTVisible,
    otherContacts: isOtherContactsVisible,
    teacherAssistants: isTeacherAssistantsVisible,
  } = visibleInMemo
  return (
    <section id={styleId} aria-labelledby="memo-contacts">
      <h2 id="memo-contacts" className="preview-info">
        {labels.courseContactsTitle}
      </h2>
      <div className="preview-info-box text-break">
        {isCommunicationWTVisible && communicationWithTeachers(memoData, labels)}
        {courseCoordinator(memoData, labels)}
        {teacher(memoData, labels)}
        {isTeacherAssistantsVisible && teacherAssistants(memoData, labels)}
        {examiner(memoData, labels)}
        {isOtherContactsVisible && otherContacts(memoData, labels)}
      </div>
    </section>
  )
}

CourseContacts.propTypes = {
  styleId: PropTypes.string.isRequired,
  memoData: PropTypes.shape({
    visibleInMemo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    communicationDuringCourse: PropTypes.string,
    courseCoordinator: PropTypes.string,
    examiner: PropTypes.string,
    teacher: PropTypes.string,
    teacherAssistants: PropTypes.string,
    otherContacts: PropTypes.string,
  }),
  labels: PropTypes.shape({
    communicationWithTeachersTitle: PropTypes.string.isRequired,
    courseContactsTitle: PropTypes.string.isRequired,
    courseCoordinatorTitle: PropTypes.string.isRequired,
    examinerTitle: PropTypes.string.isRequired,
    linkOpensInNewTab: PropTypes.string.isRequired,
    mandatoryFieldMissing: PropTypes.string.isRequired,
    teacherAssistantsTitle: PropTypes.string.isRequired,
    teacherTitle: PropTypes.string.isRequired,
    otherContactsTitle: PropTypes.string.isRequired,
  }).isRequired,
}

export default CourseContacts
