const context = {
  courseContent: { isFromSyllabus: true, kopps: 'content' },
  learningOutcomes: { isFromSyllabus: true, kopps: 'goals' },
  equipment: { isFromSyllabus: false },
  literature: { isFromSyllabus: false },
  additionalRegulations: { isFromSyllabus: true, kopps: 'additionalRegulations' },
  gradingScale: { isFromSyllabus: true, kopps: 'formattedGradeScales' },
  ethicalApproach: { isFromSyllabus: true, kopps: 'ethicalApproach' },
  examination: { isFromSyllabus: true, kopps: 'examination' },
  examinationModules: { defaultFrom: 'kopps', isFromSyllabus: false },
  supplementaryExam: { isFromSyllabus: false },
  raiseApprovedGrade: { isFromSyllabus: false },
  otherRequirementsForFinalGrade: { isFromSyllabus: true, kopps: 'reqsForFinalGrade' },
  examiner: { isFromSyllabus: false },
  communicationWithTeachers: { isFromSyllabus: false },
  courseCoordinator: { isFromSyllabus: false },
  labSupervisors: { isFromSyllabus: false },
  teacherAssistants: { isFromSyllabus: false },
  teacher: { isFromSyllabus: false },
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
    title: 'Kurslitteratur och förberedelser',
    content: ['equipment', 'literature']
  },
  {
    id: 'reqToFinal',
    title: 'Examination och slutförande',
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
    id: 'extra',
    title: 'Ytterligare Information',
    content: [
      'additionalRegulations',
      'teacher',
      'teacherAssistants',
      'labSupervisors',
      'courseCoordinator',
      'communicationWithTeachers'
    ]
  }
]

module.exports = {
  context,
  sections
}
