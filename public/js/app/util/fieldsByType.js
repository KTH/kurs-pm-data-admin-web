// const i18n = require('../../i18n')

const context = {
  additionalRegulations: { isEditable: false, isRequired: false, source: 'syllabus' },
  courseContent: { isEditable: false, isRequired: true, source: 'syllabus' },
  communicationWithTeachers: { isEditable: false, isRequired: false, source: 'kip' }, // Kommunikation med lärare
  courseCoordinator: { isEditable: false, isRequired: true, source: 'ugRedis-kt' }, // Kursansvarig
  infoContactName: { isEditable: false, isRequired: true, source: 'k' },
  gradingCriteria: { isEditable: true, isRequired: false, source: 'kip' },
  gradingScale: { isEditable: false, isRequired: true, source: 'k' }, // Betygsskala
  ethicalApproach: {
    isEditable: false,
    isRequired: true,
    hasDefault: true,
    defaultSource: 'koppsFreshData',
    source: 'syllabus'
  },
  examination: { isEditable: false, isRequired: true, source: 'k' },
  examinationModules: {
    isEditable: true,
    isRequired: false,
    source: 'kip',
    hasDefault: true,
    defaultSource: 'koppsFreshData'
  },
  equipment: { isEditable: false, isRequired: false, source: 'koppsFreshData' },
  examiner: { isEditable: false, isRequired: false, source: 'ugRedis-k' },
  // languageOfInstructions: { isEditable: false, isRequired: true, source: 'kt' },
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
  learningActivities: { isEditable: true, isRequired: false, source: 'kip' }, // Läraktiviteter
  prerequisites: { isEditable: false, isRequired: false, source: 'syllabus' }, // Rekommenderade förkunskaper
  preparations: { isEditable: true, isRequired: false, source: 'kip' } // Förberedelser
}

const sections = [
  {
    id: 'contentAndOutcomes',
    title: 'Innehåll och lärandemål', // TODO: Later, to use i18n messages.sections for en/Sv somehow
    content: [
      'courseContent',
      'learningOutcomes',
      'learningActivities' /* , 'languageOfInstructions' */
    ]
  },
  {
    id: 'prep',
    title: 'Förberedelser',
    content: ['prerequisites', 'preparations', 'literature', 'equipment']
  },
  {
    id: 'reqToFinal',
    title: 'Examination',
    content: [
      'gradingScale',
      'examination',
      'examinationModules',
      'otherRequirementsForFinalGrade',
      'examiner',
      'ethicalApproach',
      'gradingCriteria',
      'possibilityToCompletion',
      'possibilityToAddition'
    ]
  },
  {
    id: 'scheduleDetails',
    title: 'Planering',
    content: ['scheduleDetails']
  },
  {
    id: 'contacts',
    title: 'Kontakter',
    content: [
      'communicationWithTeachers',
      'infoContactName', // Kontaktperson
      'courseCoordinator',
      'teacher',
      'teacherAssistants',
      'examiner',
      'otherContacts' // New Övriga kontakter
    ]
  },
  {
    id: 'extra',
    title: 'Ytterligare Information',
    content: ['additionalRegulations']
  }
]

module.exports = {
  context,
  sections
}
