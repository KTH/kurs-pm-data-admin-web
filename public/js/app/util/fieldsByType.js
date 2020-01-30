// const i18n = require('../../i18n')
/*
  (s)-syllabus
  (c)-course general information
  (r)-course round related info
  (pm)-pm information
 */
const context = {
  additionalRegulations: { isEditable: false, isRequired: false, source: '(s)' },
  courseContent: { isEditable: false, isRequired: true, source: '(s)' },
  communicationDuringCourse: { isEditable: true, isRequired: false, source: '(pm)' }, // Kommunikation med lärare
  courseCoordinator: { isEditable: false, isRequired: true, source: '(r)' }, // Kursansvarig
  ethicalApproach: {
    isEditable: false,
    isRequired: true,
    hasDefault: true,
    defaultSource: 'koppsFreshData',
    source: '(s)'
  },
  ethicalApproachThisCourse: {
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  examination: { isEditable: false, isRequired: true, source: '(s)' },
  examinationModules: {
    isEditable: true,
    isRequired: false,
    source: '(pm)',
    hasDefault: true,
    defaultSource: 'koppsFreshData'
  },
  examiner: { isEditable: false, isRequired: true, source: '(c)' },
  extraHeaders1: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders2: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders3: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders4: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders5: { isEditable: true, isRequired: false, source: '(pm)' },
  equipment: { isEditable: false, isRequired: false, source: '(c)' },
  gradingCriteria: { isEditable: true, isRequired: false, source: '(pm)' },
  gradingScale: { isEditable: false, isRequired: true, source: '(s)' }, // Betygsskala
  infoContactName: { isEditable: false, isRequired: false, source: '(c)' },
  infoForReregisteredStudents: { isEditable: true, isRequired: false, source: '(pm)' },
  // languageOfInstructions: { isEditable: false, isRequired: true, source: 'kt' },
  learningActivities: { isEditable: true, isRequired: false, source: '(pm)' }, // Läraktiviteter
  learningOutcomes: { isEditable: false, isRequired: true, source: '(s)' },
  literature: { isEditable: false, isRequired: true, source: '(c)' },
  otherContacts: { isEditable: true, isRequired: false, source: '(pm)' },
  otherRequirementsForFinalGrade: { isEditable: false, isRequired: true, source: '(s)' },
  permanentDisability: { isEditable: false, isRequired: true, source: '(pm)' }, // Funktionsnedsättning
  possibilityToCompletion: { isEditable: false, isRequired: false, source: '(c)' },
  possibilityToAddition: { isEditable: false, isRequired: false, source: '(c)' },
  possibilityToCompensate: { isEditable: true, isRequired: false, source: '(pm)' },
  preparations: { isEditable: true, isRequired: false, source: '(pm)' }, // Förbereda inför kursstart
  prerequisites: { isEditable: false, isRequired: false, source: '(c)' }, // Rekommenderade förkunskaper
  reportingResults: { isEditable: true, isRequired: false, source: '(pm)' },
  scheduleDetails: {
    isEditable: true,
    isRequired: false,
    source: '(pm)',
    defaultSource: 'koppsFreshData'
  },
  software: { isEditable: true, isRequired: false, source: '(pm)' }, // Programvara
  teacherAssistants: { isEditable: false, isRequired: false, source: '(r)' }, // Lärarassistenter
  teacher: { isEditable: false, isRequired: true, source: '(r)' } // Lärare
}

const sections = [
  {
    id: 'contentAndOutcomes',
    title: 'Innehåll och lärandemål', // TODO: Later, to use i18n messages.sections for en/Sv somehow
    content: [
      'courseContent',
      'learningOutcomes',
      'learningActivities',
      'scheduleDetails' /* , 'languageOfInstructions' */,
      'extraHeaders1'
    ]
  },
  {
    id: 'prep',
    title: 'Förbereda inför kursstart',
    content: [
      'prerequisites',
      'preparations',
      'literature',
      'equipment',
      'software',
      'permanentDisability',
      'extraHeaders2'
    ]
  },
  {
    id: 'reqToFinal',
    title: 'Examination',
    content: [
      'gradingScale',
      'examination',
      'examinationModules',
      'gradingCriteria',
      'otherRequirementsForFinalGrade',
      'possibilityToCompletion',
      'possibilityToAddition',
      'possibilityToCompensate',
      'examiner',
      'reportingResults',
      'ethicalApproach',
      'ethicalApproachThisCourse',
      'extraHeaders3'
    ]
  },
  {
    id: 'extra',
    title: 'Ytterligare Information',
    content: ['additionalRegulations', 'infoForReregisteredStudents', 'extraHeaders4']
  },
  {
    id: 'planning',
    title: 'Planering',
    content: ['extraHeaders5']
  },
  {
    id: 'contacts',
    title: 'Kontakter',
    content: [
      'communicationDuringCourse',
      'infoContactName', // Kontaktperson
      'courseCoordinator',
      'teacher',
      'teacherAssistants',
      'examiner',
      'otherContacts'
    ]
  }
]

module.exports = {
  context,
  sections
}
