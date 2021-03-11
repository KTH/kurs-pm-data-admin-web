/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import MobxStoreProvider from './MobxStoreProvider'
import useStore from './useStore'
import { compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument } from './compress'
// import { compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument } from './compressWithPako'

export { MobxStoreProvider, useStore, compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument }
