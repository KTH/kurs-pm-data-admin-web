import standardMemoContent from './standardContentId'

const generatedStandardMemoData = (withData = false, htmlStart = '<p>', htmlEnd = '</p>') => {
  const memoStandard = {}
  standardMemoContent.map(
    contentId =>
      (memoStandard[contentId] = withData ? `${htmlStart}Some test data for section ${contentId}${htmlEnd}` : '')
  )[0]
  return memoStandard
}

export default generatedStandardMemoData
