/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

/**
 * This file was added to minimise the download-size of the client app.
 * If you import it in "mobx/index.js" instead of "compress.js", the HTML-code
 * of the application-store can be shrinked significantly.
 * In production mode, the size of program-find-web's complete HTML-file
 * became 100 kBytes instead of 645 kBytes.
 *
 * Please note:
 * The dependency on "pako" increases the size of "dist/app.js" by approx. 45 kBytes.
 * Especially therefore the usage of this file makes mostly sense if you put
 * a lot of data into your application store on the server-side.
 *
 * "js-base64" was added as dependency instead of using Node's "Buffer.to('base64)'"
 * and the browser's "window.btoa()" to shrink "dist/app.js" by approx. 25 kBytes.
 * It's presumably Babel which otherwise adds many unused code to polyfill "Buffer"
 * for the client.
 * (It might be possible to optimise the Babel-configuration instead...)
 */

import { toJS } from 'mobx'

// eslint-disable-next-line import/no-extraneous-dependencies
import pako from 'pako'
// eslint-disable-next-line import/no-unresolved
import { Base64 } from 'js-base64'

export { compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument }

/**
 * During server-side rendering put the result of this function
 * into <script>-tags so that it gets executed when the page is loaded.
 *
 * @param {object} store
 *
 * @returns {string}
 */
function compressStoreIntoJavascriptCode(store) {
  const json = JSON.stringify(toJS(store))
  const compressed = pako.deflate(json, { to: 'string' })
  const encoded = Base64.encode(compressed)

  const output = `window.__compressedApplicationStore__ = "${encoded}";`
  return output
}

/**
 * During client startup use this function to initialize the client
 * with the server-side prepared application store.
 *
 * @param {object} store
 *    MobX store which should be filled with the compressed data
 *    which was created during server-side rendering
 *
 * @return {object}
 *    Returns same object as input
 *    but it might have been changed in place
 */
function uncompressStoreInPlaceFromDocument(store) {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    // eslint-disable-next-line no-console
    console.error('uncompressStoreInPlaceFromDocument(): Expected to be run on client side')
    return store
  }

  // @ts-ignore
  const { __compressedApplicationStore__: encoded } = window
  const hasCompressedStore = encoded != null && typeof encoded === 'string'
  if (!hasCompressedStore) {
    return store
  }

  const decoded = Base64.decode(encoded)
  const uncompressed = pako.inflate(decoded, { to: 'string' })
  const data = JSON.parse(uncompressed)

  const isValidData = data != null && typeof data === 'object'
  if (!isValidData) {
    // eslint-disable-next-line no-console
    console.error('uncompress(): Invalid store data')
    return store
  }

  const dataKeys = Object.keys(data)
  dataKeys.forEach(key => {
    // eslint-disable-next-line no-param-reassign
    store[key] = data[key]
  })
  return store
}
