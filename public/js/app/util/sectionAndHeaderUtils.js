// Be aware that this entire file, or most of it, is replicated in multiple apps,
// so changes here should probably be synced to the other apps.
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.

const HeaderType = Object.freeze({
  Mandatory: 'mandatory', // Obligatoriska rubriker (från KTH-mallen), ej redigerbara
  MandatoryAndEditable: 'mandatoryAndEditable', // Obligatoriska rubriker (från KTH-mallen), redigerbara
  MandatoryAndEditableWithoutDefault: 'mandatoryAndEditableWithoutDefault', // Obligatoriska rubriker (från KTH-mallen), redigerbara och utan default värde
  MandatoryForSome: 'mandatoryForSome', // Obligatoriska rubriker för vissa kurser (från KTH-mallen) ej redigerbara
  Optional: 'optional', // Valbara rubriker (från KTH-mallen), ej redigerbara
  OptionalEditable: 'optionalEditable', // Valbara rubriker, redigerbara
})

export const HeaderSource = Object.freeze({
  CourseSyllabus: '(s)', // Course syllabus info
  CourseVersion: '(c)', // Course general info
  UG: '(ug)', // UG info
})

export const headerConfig = Object.freeze({
  additionalRegulations: {
    type: HeaderType.MandatoryForSome,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
  },
  courseContent: {
    type: HeaderType.Mandatory,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
  },
  communicationDuringCourse: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  }, // Kommunikation med lärare
  courseCoordinator: { type: HeaderType.Mandatory, isEditable: false, isRequired: true, source: HeaderSource.UG }, // Kursansvarig
  ethicalApproach: {
    type: HeaderType.Mandatory,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
    subSectionTitle: 'ethicalApproachSubSection',
  },
  ethicalApproachSubSection: {
    isEditable: true,
    isRequired: false,
    isSubSection: true,
  },
  examination: {
    type: HeaderType.Mandatory,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
    subSectionTitle: 'examinationSubSection',
  },
  examinationSubSection: {
    isEditable: true,
    isRequired: false,
    isSubSection: true,
  },
  examiner: { type: HeaderType.Mandatory, isEditable: false, isRequired: true, source: HeaderSource.UG },
  extraHeaders1: { isEditable: true, isRequired: false },
  extraHeaders2: { isEditable: true, isRequired: false },
  extraHeaders3: { isEditable: true, isRequired: false },
  extraHeaders4: { isEditable: true, isRequired: false },
  equipment: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  },
  gradingCriteria: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  },
  gradingScale: {
    type: HeaderType.Mandatory,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
  }, // Betygsskala
  infoForReregisteredStudents: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  },
  learningActivities: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  }, // Läraktiviteter
  learningOutcomes: {
    type: HeaderType.Mandatory,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
  },
  literature: {
    type: HeaderType.MandatoryAndEditableWithoutDefault,
    isEditable: true,
    isRequired: true,
  },
  otherContacts: { type: HeaderType.OptionalEditable, isEditable: true, isRequired: false },
  otherRequirementsForFinalGrade: {
    type: HeaderType.MandatoryForSome,
    isEditable: false,
    isRequired: true,
    source: HeaderSource.CourseSyllabus,
  },
  permanentDisability: {
    type: HeaderType.Mandatory,
    isEditable: false,
    isRequired: true,
    subSectionTitle: 'permanentDisabilitySubSection',
  }, // Funktionsnedsättning
  permanentDisabilitySubSection: {
    isEditable: true,
    isRequired: false,
    isSubSection: true,
  },
  possibilityToCompletion: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  }, // default
  possibilityToAddition: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  }, // default
  possibilityToCompensate: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  },
  preparations: { type: HeaderType.OptionalEditable, isEditable: true, isRequired: false }, // Förberedelser inför kursstart
  prerequisites: {
    type: HeaderType.Optional,
    isEditable: false,
    isRequired: false,
    source: HeaderSource.CourseVersion,
  }, // Rekommenderade förkunskaper
  reportingResults: { isEditable: true, isRequired: false },
  scheduleDetails: {
    type: HeaderType.OptionalEditable,
    isEditable: true,
    isRequired: false,
  },
  software: { type: HeaderType.OptionalEditable, isEditable: true, isRequired: false }, // Programvara
  teacher: { type: HeaderType.Mandatory, isEditable: false, isRequired: true, source: HeaderSource.UG }, // Lärare
})

export const excludedHeadersInContractEducation = [
  'additionalRegulations',
  'permanentDisability',
  'permanentDisabilitySubSection',
]

export const standardSections = Object.freeze([
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
    title: 'Ytterligare information',
    content: ['additionalRegulations', 'infoForReregisteredStudents'],
    extraHeaderTitle: 'extraHeaders4',
  },
  {
    id: 'contacts',
    title: 'Kontakter',
    content: ['communicationDuringCourse', 'courseCoordinator', 'teacher', 'examiner', 'otherContacts'],
    extraHeaderTitle: null,
  },
])

function filterSectionsContentIds(contentIdsToRemove = []) {
  const newSections = JSON.parse(JSON.stringify(standardSections)) // to avoid changing standardSections as a constant
  const finalSections = newSections.map(section => {
    const { content } = section
    section.content = content.filter(contentId => !contentIdsToRemove.includes(contentId))
    return section
  })

  return finalSections
}

export function getContractEducationStructure() {
  return filterSectionsContentIds(excludedHeadersInContractEducation)
}

export const getExtraHeaderIdBySectionId = sectionId =>
  standardSections.find(({ id }) => id === sectionId).extraHeaderTitle || null

export const isHeaderInConfig = contentId => Object.prototype.hasOwnProperty.call(headerConfig, contentId)
export const getHeaderType = contentId => (headerConfig[contentId] && headerConfig[contentId].type) || ''
export const getHeaderSource = contentId => (headerConfig[contentId] && headerConfig[contentId].source) || ''

export const isMandatory = contentId => {
  const type = headerConfig?.[contentId]?.type
  return (
    type === HeaderType.Mandatory ||
    type === HeaderType.MandatoryAndEditable ||
    type === HeaderType.MandatoryAndEditableWithoutDefault
  )
}

export const isMandatoryForSome = contentId => {
  const type = headerConfig?.[contentId]?.type
  return type === HeaderType.MandatoryForSome
}

export const isRequired = contentId => Boolean(headerConfig[contentId]?.isRequired)
export const isEditable = contentId => Boolean(headerConfig[contentId]?.isEditable)

export const hasSubSection = contentId => Boolean(headerConfig[contentId]?.subSectionTitle)
export const isSubSection = contentId => Boolean(headerConfig[contentId]?.isSubSection)

export const allStandardHeadersAndSubHd = () => [].concat(...standardSections.map(({ content }) => content)).sort()

export const getOnlyStandardHeaders = sectionId => {
  const sectionContent = standardSections.find(({ id }) => id === sectionId)

  return [...sectionContent.content.filter(id => !isSubSection(id))]
}

export const getHeadersByType = headerType => [
  ...allStandardHeadersAndSubHd().filter(id => headerConfig[id].type === headerType),
]

export const getSectionHeadersByType = (headerType, sectionId) => {
  const sectionContent = standardSections.find(({ id }) => id === sectionId)
  return [...sectionContent.content.filter(id => headerConfig[id].type === headerType)]
}

export const getNumOfStandardHeadersAndSubHd = () => allStandardHeadersAndSubHd().length

export const getNumOfEditableStandardContent = () =>
  [...allStandardHeadersAndSubHd().filter(id => isEditable(id))].length
