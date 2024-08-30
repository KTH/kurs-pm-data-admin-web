const isRequiredInEditor = (contentId, context) => context?.[contentId]?.isRequired === true

const isMandatory = type => type === 'mandatory' || type === 'mandatoryAndEditable'

const isMandatoryForSome = type => type === 'mandatoryForSome'

export const isStoredAsVisibleInDB = (contentId, memoData) => memoData?.visibleInMemo?.[contentId] === true

export const isStoredAsDefaultVisibleInDB = (contentId, memoData) =>
  memoData?.visibleInMemo?.[contentId] === 'defaultTrue'

export const htmlHasContent = htmlContent => htmlContent !== undefined && htmlContent !== ''

export const isStandardHeadingVisibleInEditor = (contentId, context, memoData) => {
  const required = isRequiredInEditor(contentId, context)
  const storedAsVisible = isStoredAsVisibleInDB(contentId, memoData)

  return required || storedAsVisible
}

export const isStandardHeadingVisibleInPreview = (contentId, context, memoData) => {
  const { type } = context[contentId]
  const htmlContent = memoData[contentId]

  const mandatory = isMandatory(type)
  const mandatoryForSomeOrStoredAsVisible = isMandatoryForSome(type) || isStoredAsVisibleInDB(contentId, memoData)

  return mandatory || (htmlHasContent(htmlContent) && mandatoryForSomeOrStoredAsVisible)
}

export const isExtraHeadingVisibleInEditor = (extraHeaderTitle, index, memoData) => {
  const headingObject = memoData[extraHeaderTitle]?.[index]
  const { visibleInMemo } = headingObject
  const storedAsVisible = visibleInMemo === true

  return storedAsVisible
}

export const isExtraHeadingVisibleInPreview = (extraHeaderTitle, index, memoData) => {
  const headingObject = memoData[extraHeaderTitle]?.[index]
  const { visibleInMemo, htmlContent } = headingObject
  const storedAsVisible = visibleInMemo === true

  return storedAsVisible && htmlHasContent(htmlContent)
}

const sectionsToSkip = ['contacts']

export const getAllSectionsAndHeadingsToShowInPreview = ({ sections, context, memoData }) => {
  const sectionsAndHeadings = []
  sections
    .filter(({ id }) => !sectionsToSkip.includes(id))
    .forEach(({ id, content, extraHeaderTitle }) => {
      sectionsAndHeadings[id] = []
      const standardHeadingIds = []
      const extraHeadingIndices = []

      content.forEach(contentId => {
        const visibleInMemo = isStandardHeadingVisibleInPreview(contentId, context, memoData)

        if (visibleInMemo) {
          standardHeadingIds.push(contentId)
        }
      })

      memoData[extraHeaderTitle]?.forEach((headingObject, index) => {
        const visibleInMemo = isExtraHeadingVisibleInPreview(extraHeaderTitle, index, memoData)

        if (visibleInMemo) {
          extraHeadingIndices.push(index)
        }
      })

      const isEmptySection = standardHeadingIds.length === 0 && extraHeadingIndices.length === 0

      sectionsAndHeadings.push({
        id,
        standardHeadingIds,
        extraHeaderTitle,
        extraHeadingIndices,
        isEmptySection,
      })
    })

  return sectionsAndHeadings
}
