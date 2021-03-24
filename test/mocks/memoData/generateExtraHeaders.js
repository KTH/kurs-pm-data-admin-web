const extraHeaders = ['extraHeaders1', 'extraHeaders2', 'extraHeaders3', 'extraHeaders4']

const visibleHeaders = headerId => {
  const twovisibleHeaders = ['First header', 'Second header'].map((title, index) => {
    const readableContent = `Html content for section ${title}`
    return {
      uKey: title.split(' ').join(''),
      title: `Created by user ${title} for section ${headerId}`,
      htmlContent: `<p>${readableContent}</p>`,
      readContentExistsONLYforTest: readableContent,
      visibleInMemo: true,
    }
  })
  return twovisibleHeaders
}

const generatedExtraHeaders = (withData = false) => {
  const headersWithContent = {}
  extraHeaders.map(headerId => (headersWithContent[headerId] = withData ? visibleHeaders(headerId) : []))
  return headersWithContent
}

export default generatedExtraHeaders
