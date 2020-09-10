import standardMemoContent from './standardContentId'

const generatedStandardMemoData = (withData = false) => {
  const memoStandard = {}
  standardMemoContent.map(
    (contentId) =>
      (memoStandard[contentId] = withData ? `<p>Some test data for section ${contentId}</p>` : '')
  )[0]
  return memoStandard
}

export default generatedStandardMemoData
