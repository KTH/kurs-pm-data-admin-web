const extraHeaders = [
  'extraHeaders1',
  'extraHeaders2',
  'extraHeaders3',
  'extraHeaders4',
  'extraHeaders5'
]

const headers = (headerId) => {
  // const invisibleExtraHeader = {
  //   uKey: Math.random().toString(),
  //   title: `Extra header which is invisible, ${headerId}`,
  //   htmlContent: '<p>Content which should be hidden<p>',
  //   visibleInMemo: false
  // }
  const visibleHeaders = ['First header', 'Second header'].map((title) => ({
    uKey: Math.random().toString(),
    title: `Created by user ${title} for section ${headerId}`,
    htmlContent: `<p>Html content for section ${title} </p>`,
    visibleInMemo: true
  }))
  return visibleHeaders //[invisibleExtraHeader, ...visibleHeaders]
}

const generatedExtraHeaders = (withData = false) => {
  const headersWithContent = {}
  extraHeaders.map((headerId) => (headersWithContent[headerId] = withData ? headers(headerId) : []))
  return headersWithContent
}

export default generatedExtraHeaders
