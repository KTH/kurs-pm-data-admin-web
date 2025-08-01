import { isMandatory, isMandatoryForSome, isRequired } from './sectionAndHeaderUtils'

export const MemoViewMode = Object.freeze({
  Published: 'published',
  Editor: 'editor',
  Preview: 'preview',
})

// === Visibility helpers ===

export const isStoredAsVisibleInDB = (contentId, memoData) => memoData?.visibleInMemo?.[contentId] === true

export const isStoredAsDefaultVisibleInDB = (contentId, memoData) =>
  memoData?.visibleInMemo?.[contentId] === 'defaultTrue'

export const htmlHasContent = htmlContent => htmlContent !== undefined && htmlContent !== ''

const sectionsToSkip = ['contacts']

// === Generalized visibility evaluators ===

export const getStandardContentVisibility = (contentId, memoData, mode) => {
  const contentIsRequired = isRequired(contentId)
  const htmlContent = memoData?.[contentId]

  if (mode === MemoViewMode.Published || mode === MemoViewMode.Preview) {
    const mandatory = isMandatory(contentId)
    const mandatoryForSomeOrStoredAsVisible =
      isMandatoryForSome(contentId) || isStoredAsVisibleInDB(contentId, memoData)

    return mandatory || (htmlHasContent(htmlContent) && mandatoryForSomeOrStoredAsVisible)
  }

  if (mode === MemoViewMode.Editor) {
    return contentIsRequired || isStoredAsVisibleInDB(contentId, memoData)
  }

  return false
}

export const getExtraContentVisibility = (extraHeaderTitle, index, memoData, mode) => {
  const headingObject = memoData?.[extraHeaderTitle]?.[index]
  const { visibleInMemo, htmlContent } = headingObject || {}

  if (mode === MemoViewMode.Editor) {
    return visibleInMemo === true
  }

  if (mode === MemoViewMode.Published || mode === MemoViewMode.Preview) {
    return visibleInMemo === true && htmlHasContent(htmlContent)
  }

  return false
}

// === Generalized section + heading resolver ===

export const getAllSectionsAndHeadingsToShow = ({ sections, memoData, mode }) => {
  const sectionsAndHeadings = []

  sections
    .filter(({ id }) => !sectionsToSkip.includes(id))
    .forEach(({ id, content, extraHeaderTitle }) => {
      sectionsAndHeadings[id] = []
      const standardHeadingIds = []
      const extraHeadingIndices = []

      content.forEach(contentId => {
        if (getStandardContentVisibility(contentId, memoData, mode)) {
          standardHeadingIds.push(contentId)
        }
      })

      memoData?.[extraHeaderTitle]?.forEach((_, index) => {
        if (getExtraContentVisibility(extraHeaderTitle, index, memoData, mode)) {
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
