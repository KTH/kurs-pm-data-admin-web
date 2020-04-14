// Mallen innehåller fyra olika varianter av rubrikersom finns flödenför:
// mandatory 1.obligatoriska rubriker(från KTH-mallen) ej redigerbara
// mandatoryAndEditable 1.obligatoriska rubriker(från KTH-mallen) som är redigerbara
// mandatoryForSome = 2.obligatoriska rubriker för vissa kurser(från KTH-mallen) ej redigerbara
// optional - valbara rubriker, ej redigerbara
// optionalEditable - valbara rubriker och redigerbara
// 3.valbara rubriker/avsnitt(från KTH-mallen)
// 4.egna tillagda rubriker
/*
  (s)-syllabus
  (c)-course general information
  (r)-course round related info
  (pm)-pm information
 */

const context = {
  additionalRegulations: {
    openIfContent: true,
    type: 'optional',
    isEditable: false,
    isRequired: false,
    source: '(s)'
  },
  courseContent: {
    type: 'mandatory',
    isEditable: false,
    isRequired: true,
    source: '(s)'
  },
  communicationDuringCourse: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  }, // Kommunikation med lärare
  courseCoordinator: { type: 'mandatory', isEditable: false, isRequired: true, source: '(r)' }, // Kursansvarig
  ethicalApproach: {
    type: 'mandatory',
    isEditable: false,
    isRequired: true,
    source: '(s)'
  },
  ethicalApproachThisCourse: {
    // ????avsnit
    isEditable: true,
    isRequired: false
  },
  examination: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' },
  examinationModules: {
    openIfContent: true,
    isEditable: true,
    isRequired: false
  },
  examiner: { type: 'mandatory', isEditable: false, isRequired: true, source: '(c)' },
  extraHeaders1: { isEditable: true, isRequired: false },
  extraHeaders2: { isEditable: true, isRequired: false },
  extraHeaders3: { isEditable: true, isRequired: false },
  extraHeaders4: { isEditable: true, isRequired: false },
  extraHeaders5: { isEditable: true, isRequired: false },
  equipment: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  },
  gradingCriteria: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  },
  gradingScale: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' }, // Betygsskala
  infoForReregisteredStudents: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  },
  learningActivities: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  }, // Läraktiviteter
  learningOutcomes: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' },
  literature: {
    openIfContent: true,
    type: 'mandatoryAndEditable',
    isEditable: true,
    isRequired: true
  },
  otherContacts: { type: 'optionalEditable', isEditable: true, isRequired: false },
  otherRequirementsForFinalGrade: {
    type: 'mandatoryForSome',
    isEditable: false,
    isRequired: true,
    source: '(s)'
  },
  permanentDisability: { type: 'mandatory', isEditable: false, isRequired: true }, // Funktionsnedsättning
  possibilityToCompletion: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  }, // default
  possibilityToAddition: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  }, // default
  possibilityToCompensate: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  },
  preparations: { type: 'optionalEditable', isEditable: true, isRequired: false }, // Förbereda inför kursstart
  prerequisites: {
    openIfContent: true,
    type: 'optional',
    isEditable: false,
    isRequired: false,
    source: '(c)'
  }, // Rekommenderade förkunskaper
  reportingResults: { isEditable: true, isRequired: false },
  scheduleDetails: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false
  },
  software: { type: 'optionalEditable', isEditable: true, isRequired: false }, // Programvara
  teacherAssistants: {
    openIfContent: true,
    type: 'optional',
    isEditable: false,
    isRequired: false,
    source: '(r)'
  }, // Lärarassistenter
  teacher: { type: 'mandatory', isEditable: false, isRequired: true, source: '(r)' } // Lärare
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
      'otherRequirementsForFinalGrade',
      'examinationModules',
      'gradingCriteria',
      'possibilityToCompletion',
      'possibilityToAddition',
      'possibilityToCompensate',
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
    id: 'contacts',
    title: 'Kontakter',
    content: [
      'communicationDuringCourse',
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
