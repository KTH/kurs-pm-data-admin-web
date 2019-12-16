const context = {
  courseContent: { type: '', isFromSyllabus: true, kopps: 'content' },
  learningOutcomes: { type: '', isFromSyllabus: true, kopps: 'goals' },
  equipment: { type: '', isFromSyllabus: false },
  literature: { type: '', isFromSyllabus: false },
  additionalRegulations: { type: '', isFromSyllabus: true, kopps: 'additionalRegulations' },
  gradingScale: { type: '', isFromSyllabus: true, kopps: 'formattedGradeScales' },
  ethicalApproach: { type: '', isFromSyllabus: true, kopps: 'ethicalApproach' },
  examination: { type: '', isFromSyllabus: true, kopps: '' },
  examinationComment: { type: '', isFromSyllabus: true, kopps: 'examComments' },
  examinationCommentEditable: { type: '', isFromSyllabus: false },
  supplementaryExam: { type: '', isFromSyllabus: false },
  raiseApprovedGrade: { type: '', isFromSyllabus: false },
  otherRequirementsForFinalGrade: { type: '', isFromSyllabus: true, kopps: 'reqsForFinalGrade' },
  examiner: { type: '', isFromSyllabus: false },
  communicationWithTeachers: { type: '', isFromSyllabus: false },
  courseCoordinator: { type: '', isFromSyllabus: false },
  labSupervisors: { type: '', isFromSyllabus: false },
  teacherAssistants: { type: '', isFromSyllabus: false },
  teacher: { type: '', isFromSyllabus: false },
  languageOfInstructions: { type: '', isFromSyllabus: false },
  planning: { type: '', isFromSyllabus: false },
  gradingCriteria: { type: '', isFromSyllabus: false }
}

const sections = [
  {
    id: 'contentAndOutcomes',
    title: 'Innehåll och lärandemål',
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
      'examinationComment',
      'otherRequirementsForFinalGrade',
      'examiner',
      'ethicalApproach',
      'examinationCommentEditable',
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
