import { allStandardHeadersAndSubHd } from '../../../public/js/app/util/fieldsByType'

const standardMemoContent = [
  'communicationDuringCourse',
  'courseContent',
  'courseCoordinator',
  'equipment',
  'ethicalApproach',
  'ethicalApproachSubSection',
  'examination',
  'examinationSubSection',
  'examiner',
  'gradingCriteria',
  'gradingScale',
  'infoForReregisteredStudents',
  'learningActivities',
  'learningOutcomes',
  'literature',
  'otherContacts',
  'otherRequirementsForFinalGrade',
  'permanentDisability',
  'permanentDisabilitySubSection',
  'possibilityToAddition',
  'possibilityToCompensate',
  'possibilityToCompletion',
  'preparations',
  'prerequisites',
  'reportingResults',
  'scheduleDetails',
  'software',
  'teacher',
  'teacherAssistants',
]

describe('Contol generation of headers which are standard for memo content', () => {
  test('Check standard memo content', done => {
    const s = allStandardHeadersAndSubHd()

    expect(standardMemoContent).toStrictEqual(s)

    done()
  })
})

export default standardMemoContent
