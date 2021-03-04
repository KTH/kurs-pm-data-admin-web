/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import { getMobxManager } from './manager'

import createApplicationStore from '../stores/createApplicationStore'

export default useStore

/**
 * Hook which can be used by any React component
 * within the related MobxStoreProvider.
 *
 * @param {string} [storeId]
 *
 * @returns {object}
 *      Current state of application store
 */
function useStore(storeId = 'default') {
  const manager = getMobxManager(storeId)

  const isTestEnvironmentWithoutProviderComponent = manager == null
  if (isTestEnvironmentWithoutProviderComponent) {
    const dummyStoreForTesting = createApplicationStore()
    return dummyStoreForTesting
  }

  return manager.getContextHook()
}
