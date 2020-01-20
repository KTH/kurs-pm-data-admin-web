const context = {
  additionalRegulations: { isEditable: false, isRequired: false, source: 'syllabus' },
  courseContent: { isEditable: false, isRequired: true, source: 'syllabus' },
  communicationWithTeachers: { isEditable: false, isRequired: false, source: 'kip' }, //Kommunikation med lärare
  courseCoordinator: { isEditable: false, isRequired: true, source: 'ugRedis-kt' }, //kursansvarig
  infoContactName: { isEditable: false, isRequired: true, source: 'k' },
  gradingCriteria: { isEditable: true, isRequired: false, source: 'kip' },
  gradingScale: { isEditable: false, isRequired: true, source: 'k' }, //Betygsskala
  ethicalApproach: {
    isEditable: true,
    isRequired: true,
    hasDefault: true,
    defaultSource: 'koppsFreshData',
    source: ''
  }, //kan redigeras
  examination: { isEditable: false, isRequired: true, source: 'k' },
  examinationModules: {
    isEditable: true,
    isRequired: false,
    source: 'kip',
    hasDefault: true,
    defaultSource: 'koppsFreshData'
  },
  equipment: { isEditable: true, isRequired: false, source: '' },
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
  teacherAssistants: { isEditable: false, isRequired: false, source: 'ugRedis-kt' }, //lärarassistenter
  teacher: { isEditable: false, isRequired: true, source: 'ugRedis-kt' }, //lärare
  learningActivities: { isEditable: true, isRequired: false, source: 'kip' } //läraktiviteter
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
    title: 'Förbereda inför kursstart',
    content: ['equipment', 'literature']
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
      'infoContactName', //Kontaktperson
      'courseCoordinator',
      'teacher',
      'teacherAssistants',
      'examiner',
      'otherContacts' //new Övriga kontakter
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
