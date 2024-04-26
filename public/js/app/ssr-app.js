/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { enableStaticRendering } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'

import { compressStoreIntoJavascriptCode } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import appFactory from './app'

function _getServerSideFunctions() {
  return {
    createStore() {
      return createApplicationStore()
    },

    getCompressedStoreCode(store) {
      const code = compressStoreIntoJavascriptCode(store)
      return code
    },

    renderStaticPage({ applicationStore, location, basename }) {
      enableStaticRendering(true)
      const app = (
        <StaticRouter basename={basename} location={location}>
          {appFactory(applicationStore)}
        </StaticRouter>
      )
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const html = ReactDOMServer.renderToString(app)

      return html
    },
  }
}

export default _getServerSideFunctions()
