const isRequiredInEditor = (contentId, context) => context?.[contentId]?.isRequired === true

const isStoredAsVisibleInDB = (contentId, memoData) => memoData?.visibleInMemo?.[contentId] === true

export const isStoredAsDefaultVisibleInDB = (contentId, memoData) =>
  memoData?.visibleInMemo?.[contentId] === 'defaultTrue'

const isMandatory = type => type === 'mandatory' || type === 'mandatoryAndEditable'

const isMandatoryForSome = type => type === 'mandatoryForSome'

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

  return mandatory || (mandatoryForSomeOrStoredAsVisible && htmlHasContent(htmlContent))
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
