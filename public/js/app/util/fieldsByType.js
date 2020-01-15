const context = {
  additionalRegulations: { isFromSyllabus: true },
  courseContent: { isFromSyllabus: true },
  gradingScale: { isFromSyllabus: true },
  ethicalApproach: { isFromSyllabus: true },
  examination: { isFromSyllabus: true },
  examinationModules: { isFromSyllabus: false, hasDefault: true, defaultSource: 'koppsFreshData' },
  equipment: { isFromSyllabus: false },
  learningOutcomes: { isFromSyllabus: true },
  literature: { isFromSyllabus: true },
  possibilityToCompletion: { isFromSyllabus: true },
  possibilityToAddition: { isFromSyllabus: true },
  otherRequirementsForFinalGrade: { isFromSyllabus: true },
  examiner: { isFromSyllabus: false },
  communicationWithTeachers: { isFromSyllabus: false }, //Kommunikation med lärare
  courseCoordinator: { isFromSyllabus: false }, //kursansvarig
  infoContactName: { isFromSyllabus: true }, //new
  otherContacts: { isFromSyllabus: false }, //new
  teacherAssistants: { isFromSyllabus: false }, //lärarassistenter
  teacher: { isFromSyllabus: false }, //lärare
  languageOfInstructions: { isFromSyllabus: true },
  planning: { isFromSyllabus: false },
  gradingCriteria: { isFromSyllabus: false }
}

const sections = [
  {
    id: 'contentAndOutcomes',
    title: 'Innehåll och lärandemål', // TODO: Later, to use i18n messages.sections for en/Sv somehow
    content: ['courseContent', 'learningOutcomes', 'languageOfInstructions', 'planning']
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
