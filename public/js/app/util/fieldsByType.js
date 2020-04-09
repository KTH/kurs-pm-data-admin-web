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
    isRequired: false,
    source: '(pm)'
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
    isRequired: false,
    source: '(pm)'
  },
  examination: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' },
  examinationModules: {
    openIfContent: true,
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  examiner: { type: 'mandatory', isEditable: false, isRequired: true, source: '(c)' },
  extraHeaders1: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders2: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders3: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders4: { isEditable: true, isRequired: false, source: '(pm)' },
  extraHeaders5: { isEditable: true, isRequired: false, source: '(pm)' },
  equipment: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  gradingCriteria: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  gradingScale: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' }, // Betygsskala
  infoForReregisteredStudents: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  learningActivities: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  }, // Läraktiviteter
  learningOutcomes: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' },
  literature: {
    openIfContent: true,
    type: 'mandatoryAndEditable',
    isEditable: true,
    isRequired: true,
    source: '(pm)'
  },
  otherContacts: { type: 'optionalEditable', isEditable: true, isRequired: false, source: '(pm)' },
  otherRequirementsForFinalGrade: {
    type: 'mandatoryForSome',
    isEditable: false,
    isRequired: true,
    source: '(s)'
  },
  permanentDisability: { type: 'mandatory', isEditable: false, isRequired: true, source: '(c)' }, // Funktionsnedsättning
  possibilityToCompletion: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  }, // default
  possibilityToAddition: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  }, // default
  possibilityToCompensate: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  preparations: { type: 'optionalEditable', isEditable: true, isRequired: false, source: '(pm)' }, // Förbereda inför kursstart
  prerequisites: {
    openIfContent: true,
    type: 'optional',
    isEditable: false,
    isRequired: false,
    source: '(c)'
  }, // Rekommenderade förkunskaper
  reportingResults: { isEditable: true, isRequired: false, source: '(pm)' },
  scheduleDetails: {
    openIfContent: true,
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
    source: '(pm)'
  },
  software: { type: 'optionalEditable', isEditable: true, isRequired: false, source: '(pm)' }, // Programvara
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
