// const i18n = require('../../i18n')

const context = {
  additionalRegulations: { isEditable: false, isRequired: false, source: 'syllabus' },
  bonusPoints: { isEditable: true, isRequired: false, source: 'kip' },
  courseContent: { isEditable: false, isRequired: true, source: 'syllabus' },
  communicationDuringCourse: { isEditable: true, isRequired: false, source: 'kip' }, // Kommunikation med lärare
  courseCoordinator: { isEditable: false, isRequired: true, source: 'ugRedis-kt' }, // Kursansvarig
  ethicalApproach: {
    isEditable: false,
    isRequired: true,
    hasDefault: true,
    defaultSource: 'koppsFreshData',
    source: 'syllabus'
  },
  ethicalApproachThisCourse: {
    isEditable: true,
    isRequired: false,
    source: 'kip'
  },
  examination: { isEditable: false, isRequired: true, source: 'k' },
  examinationModules: {
    isEditable: true,
    isRequired: false,
    source: 'kip',
    hasDefault: true,
    defaultSource: 'koppsFreshData'
  },
  examiner: { isEditable: false, isRequired: true, source: 'ugRedis-k' },
  extraHeaders1: { isEditable: true, isRequired: false, source: 'kip' },
  extraHeaders2: { isEditable: true, isRequired: false, source: 'kip' },
  extraHeaders3: { isEditable: true, isRequired: false, source: 'kip' },
  extraHeaders4: { isEditable: true, isRequired: false, source: 'kip' },
  extraHeaders5: { isEditable: true, isRequired: false, source: 'kip' },
  equipment: { isEditable: false, isRequired: false, source: 'k' },
  gradingCriteria: { isEditable: true, isRequired: false, source: 'kip' },
  gradingScale: { isEditable: false, isRequired: true, source: 'k' }, // Betygsskala
  infoContactName: { isEditable: false, isRequired: false, source: 'k' },
  infoForReregisteredStudents: { isEditable: true, isRequired: false, source: 'kip' },
  // languageOfInstructions: { isEditable: false, isRequired: true, source: 'kt' },
  learningActivities: { isEditable: true, isRequired: false, source: 'kip' }, // Läraktiviteter
  learningOutcomes: { isEditable: false, isRequired: true, source: 'syllabus' },
  literature: { isEditable: false, isRequired: true, source: 'syllabus' },
  possibilityToCompletion: { isEditable: false, isRequired: false, source: 'k' },
  possibilityToAddition: { isEditable: false, isRequired: false, source: 'k' },
  otherContacts: { isEditable: true, isRequired: false, source: 'kip' },
  otherRequirementsForFinalGrade: { isEditable: false, isRequired: true, source: 'syllabus' },
  scheduleDetails: {
    isEditable: true,
    isRequired: false,
    source: 'kip',
    defaultSource: 'koppsFreshData'
  },
  teacherAssistants: { isEditable: false, isRequired: false, source: 'ugRedis-kt' }, // Lärarassistenter
  teacher: { isEditable: false, isRequired: true, source: 'ugRedis-kt' }, // Lärare
  prerequisites: { isEditable: false, isRequired: false, source: 'syllabus' }, // Rekommenderade förkunskaper
  preparations: { isEditable: true, isRequired: false, source: 'kip' }, // Förbereda inför kursstart
  software: { isEditable: true, isRequired: false, source: 'kip' }, // Programvara
  permanentDisability: { isEditable: false, isRequired: true, source: 'kip' } // Funktionsnedsättning
}

const sections = [
  {
    id: 'contentAndOutcomes',
    title: 'Innehåll och lärandemål', // TODO: Later, to use i18n messages.sections for en/Sv somehow
    content: [
      'courseContent',
      'learningOutcomes',
      'learningActivities' /* , 'languageOfInstructions' */,
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
      'otherRequirementsForFinalGrade',
      'bonusPoints',
      'examiner',
      'ethicalApproach',
      'ethicalApproachThisCourse',
      'gradingCriteria',
      'possibilityToCompletion',
      'possibilityToAddition',
      'extraHeaders3'
    ]
  },
  {
    id: 'extra',
    title: 'Ytterligare Information',
    content: ['additionalRegulations', 'infoForReregisteredStudents', 'extraHeaders4']
  },
  {
    id: 'scheduleDetails',
    title: 'Planering',
    content: ['scheduleDetails', 'extraHeaders5']
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
