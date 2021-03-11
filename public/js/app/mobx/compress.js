/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import { toJS } from 'mobx'

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
  const compressedData = encodeURIComponent(JSON.stringify(toJS(store)))

  const output = `window.__compressedApplicationStore__ = "${compressedData}";`
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
  const { __compressedApplicationStore__: data } = window
  const hasCompressedStore = data != null && typeof data === 'string'
  if (!hasCompressedStore) {
    return store
  }

  const uncompressedData = JSON.parse(decodeURIComponent(data))
  const validData = uncompressedData != null && typeof uncompressedData === 'object'
  if (!validData) {
    // eslint-disable-next-line no-console
    console.error('uncompress(): Invalid store data')
    return store
  }

  const dataKeys = Object.keys(uncompressedData)
  dataKeys.forEach(key => {
    // eslint-disable-next-line no-param-reassign
    store[key] = uncompressedData[key]
  })
  return store
}
