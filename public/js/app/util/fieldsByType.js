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
  (ug)-ug information
  (r)-course round related info
  (pm)-pm information
  (o)-course info
 */

const excludedFieldsInContractEducation = [
  'additionalRegulations',
  'permanentDisability',
  'permanentDisabilitySubSection',
]

const context = {
  additionalRegulations: {
    type: 'mandatoryForSome',
    isEditable: false,
    isRequired: true,
    source: '(s)',
  },
  courseContent: {
    type: 'mandatory',
    isEditable: false,
    isRequired: true,
    source: '(s)',
  },
  communicationDuringCourse: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  }, // Kommunikation med lärare
  courseCoordinator: { type: 'mandatory', isEditable: false, isRequired: true, source: '(ug)' }, // Kursansvarig
  ethicalApproach: {
    type: 'mandatory',
    isEditable: false,
    isRequired: true,
    source: '(s)',
    subSection: true,
    subSectionTitle: 'ethicalApproachSubSection',
  },
  ethicalApproachSubSection: {
    isEditable: true,
    isRequired: false,
    hasParentTitle: true,
  },
  examination: {
    type: 'mandatory',
    isEditable: false,
    isRequired: true,
    source: '(s)',
    subSection: true,
    subSectionTitle: 'examinationSubSection',
  },
  examinationSubSection: {
    isEditable: true,
    isRequired: false,
    hasParentTitle: true,
  },
  examiner: { type: 'mandatory', isEditable: false, isRequired: true, source: '(ug)' },
  extraHeaders1: { isEditable: true, isRequired: false },
  extraHeaders2: { isEditable: true, isRequired: false },
  extraHeaders3: { isEditable: true, isRequired: false },
  extraHeaders4: { isEditable: true, isRequired: false },
  equipment: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  },
  gradingCriteria: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  },
  gradingScale: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' }, // Betygsskala
  infoForReregisteredStudents: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  },
  learningActivities: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  }, // Läraktiviteter
  learningOutcomes: { type: 'mandatory', isEditable: false, isRequired: true, source: '(s)' },
  literature: {
    type: 'mandatoryAndEditableWithoutDefault',
    isEditable: true,
    isRequired: true,
  },
  otherContacts: { type: 'optionalEditable', isEditable: true, isRequired: false },
  otherRequirementsForFinalGrade: {
    type: 'mandatoryForSome',
    isEditable: false,
    isRequired: true,
    source: '(s)',
  },
  permanentDisability: {
    type: 'mandatory',
    isEditable: false,
    isRequired: true,
    subSection: true,
    subSectionTitle: 'permanentDisabilitySubSection',
  }, // Funktionsnedsättning
  permanentDisabilitySubSection: {
    isEditable: true,
    isRequired: false,
    hasParentTitle: true,
  },
  possibilityToCompletion: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  }, // default
  possibilityToAddition: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  }, // default
  possibilityToCompensate: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  },
  preparations: { type: 'optionalEditable', isEditable: true, isRequired: false }, // Förberedelser inför kursstart
  prerequisites: {
    type: 'optional',
    isEditable: false,
    isRequired: false,
    source: '(o)',
  }, // Rekommenderade förkunskaper
  reportingResults: { isEditable: true, isRequired: false },
  scheduleDetails: {
    type: 'optionalEditable',
    isEditable: true,
    isRequired: false,
  },
  software: { type: 'optionalEditable', isEditable: true, isRequired: false }, // Programvara
  teacher: { type: 'mandatory', isEditable: false, isRequired: true, source: '(ug)' }, // Lärare
}

// it is a function to avoid accident change of getDefaultSections() somewhere else
const getDefaultSections = () => [
  {
    id: 'contentAndOutcomes',
    title: 'Innehåll och lärandemål',
    content: ['courseContent', 'learningOutcomes', 'learningActivities', 'scheduleDetails'],
    extraHeaderTitle: 'extraHeaders1',
  },
  {
    id: 'prep',
    title: 'Förberedelser inför kursstart',
    content: [
      'prerequisites',
      'preparations',
      'literature',
      'equipment',
      'software',
      'permanentDisability',
      'permanentDisabilitySubSection',
    ],
    extraHeaderTitle: 'extraHeaders2',
  },
  {
    id: 'reqToFinal',
    title: 'Examination',
    content: [
      'gradingScale',
      'examination',
      'examinationSubSection',
      'otherRequirementsForFinalGrade',
      'gradingCriteria',
      'possibilityToCompletion',
      'possibilityToAddition',
      'possibilityToCompensate',
      'reportingResults',
      'ethicalApproach',
      'ethicalApproachSubSection',
    ],
    extraHeaderTitle: 'extraHeaders3',
  },
  {
    id: 'extra',
    title: 'Ytterligare Information',
    content: ['additionalRegulations', 'infoForReregisteredStudents'],
    extraHeaderTitle: 'extraHeaders4',
  },
  {
    id: 'contacts',
    title: 'Kontakter',
    content: ['communicationDuringCourse', 'courseCoordinator', 'teacher', 'examiner', 'otherContacts'],
    extraHeaderTitle: null,
  },
]
function filterSectionsContentIds(contentIdsToRemove = []) {
  const newSections = JSON.parse(JSON.stringify(getDefaultSections())) // to avoid changing getDefaultSections() as a constant
  const finalSections = newSections.map(section => {
    const { content } = section
    section.content = content.filter(contentId => !contentIdsToRemove.includes(contentId))
    return section
  })

  return finalSections
}

function getContractEducationStructure() {
  return filterSectionsContentIds(excludedFieldsInContractEducation)
}

const getExtraHeaderIdBySectionId = sectionId =>
  getDefaultSections().find(({ id }) => id === sectionId).extraHeaderTitle || null

const contentParam = (contentId, param) => (context[contentId] && context[contentId][param]) || ''

const isRequired = contentId => (context[contentId] && context[contentId].isRequired) || false

const typeOfHeader = contentId => context[contentId].type || ''

const allStandardHeadersAndSubHd = () => [].concat(...getDefaultSections().map(({ content }) => content)).sort()

const getOnlyStandardHeaders = sectionId => {
  const sectionContent = getDefaultSections().find(({ id }) => id === sectionId)

  return [...sectionContent.content.filter(id => !contentParam(id, 'hasParentTitle'))]
}

const getHeadersByType = headerType => [...allStandardHeadersAndSubHd().filter(id => context[id].type === headerType)]

const getSectionHeadersByType = (headerType, sectionId) => {
  const sectionContent = getDefaultSections().find(({ id }) => id === sectionId)
  return [...sectionContent.content.filter(id => context[id].type === headerType)]
}

const getNumOfStandardHeadersAndSubHd = () => allStandardHeadersAndSubHd().length

const getNumOfEditableStandardContent = () =>
  [...allStandardHeadersAndSubHd().filter(id => contentParam(id, 'isEditable'))].length

module.exports = {
  allStandardHeadersAndSubHd,
  context,
  contentParam,
  excludedFieldsInContractEducation,
  getContractEducationStructure,
  getExtraHeaderIdBySectionId,
  getNumOfEditableStandardContent,
  getNumOfStandardHeadersAndSubHd,
  getHeadersByType,
  getSectionHeadersByType,
  getOnlyStandardHeaders,
  filterSectionsContentIds,
  getDefaultSections,
  isRequired,
  typeOfHeader,
}
