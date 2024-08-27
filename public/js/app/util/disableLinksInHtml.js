// This is a temporary "fix" for the non-functioning profile page links and should be removed later.
export const disableLinksInHtml = html => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const anchorTags = tempDiv.querySelectorAll('a')
  anchorTags.forEach(anchor => {
    anchor.setAttribute('onclick', 'event.preventDefault();')
    anchor.setAttribute('style', 'cursor: default; text-decoration: none;')
  })
  return tempDiv.innerHTML
}
