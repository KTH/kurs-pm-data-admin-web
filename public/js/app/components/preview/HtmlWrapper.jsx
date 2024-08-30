/* eslint-disable react/no-danger */
import React from 'react'

function HtmlWrapper({ id, mode, html }) {
  switch (mode) {
    case 'inline':
      return <span id={id} dangerouslySetInnerHTML={{ __html: html }} />
    default:
      return <div id={id} dangerouslySetInnerHTML={{ __html: html }} />
  }
}

export default HtmlWrapper
