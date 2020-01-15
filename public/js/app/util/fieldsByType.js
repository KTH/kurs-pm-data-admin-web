const context = {
  additionalRegulations: { isFromSyllabus: true, kopps: 'additionalRegulations' },
  courseContent: { isFromSyllabus: true, kopps: 'content' },
  gradingScale: { isFromSyllabus: true, kopps: 'formattedGradeScales' },
  ethicalApproach: { isFromSyllabus: true, kopps: 'ethicalApproach' },
  examination: { isFromSyllabus: true, kopps: 'examination' },
  examinationModules: { isFromSyllabus: false, hasDefault: true, defaultSource: 'koppsFreshData' },
  equipment: { isFromSyllabus: false },
  learningOutcomes: { isFromSyllabus: true, kopps: 'goals' },
  literature: { isFromSyllabus: false },
  supplementaryExam: { isFromSyllabus: false },
  raiseApprovedGrade: { isFromSyllabus: false },
  otherRequirementsForFinalGrade: { isFromSyllabus: true, kopps: 'reqsForFinalGrade' },
  examiner: { isFromSyllabus: false },
  communicationWithTeachers: { isFromSyllabus: false }, //Kommunikation med lärare
  courseCoordinator: { isFromSyllabus: false }, //kursansvarig
  infoContactName: { isFromSyllabus: true, kopps: 'infoContactName' }, //new
  otherContacts: { isFromSyllabus: false }, //new
  teacherAssistants: { isFromSyllabus: false }, //lärarassistenter
  teacher: { isFromSyllabus: false }, //lärare
  languageOfInstructions: { isFromSyllabus: false },
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
      'supplementaryExam',
      'raiseApprovedGrade'
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
