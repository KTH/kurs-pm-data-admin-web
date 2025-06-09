import standardMemoContent from './standardContentId'

const defaultVisibilities = {
  additionalRegulations: 'defaultTrue',
  ethicalApproachSubSection: 'defaultTrue',
  equipment: 'defaultTrue',
  examinationSubSection: false,
  permanentDisabilitySubSection: 'defaultTrue',
  possibilityToAddition: 'defaultTrue',
  possibilityToCompletion: 'defaultTrue',
  prerequisites: 'defaultTrue',
  scheduleDetails: 'defaultTrue',
}

const generatedStandardVisibility = (onlyDefaults = false, allVisible = false) => {
  if (onlyDefaults) return { visibleInMemo: defaultVisibilities }
  const visibilities = {}
  standardMemoContent.map(content => (visibilities[content] = allVisible))
  return { visibleInMemo: visibilities }
}
export default generatedStandardVisibility
