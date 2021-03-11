/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import { useLocalObservable } from 'mobx-react'

export { createMobxManager, getMobxManager }

const Global = {
  managerInstances: {},
}

/**
 * @param {string} storeId
 *      Can be used to identify the needed store
 *      in case more than one store is managed
 * @param {function} initCallback
 *      Function that returns the initial state of the store
 *
 * @returns {object}
 *      Returns a manager instance which especially contains
 *      the method "getProviderComponentAndValue()"
 */
function createMobxManager(storeId, initCallback) {
  const MobxStoreManager = _hoistClassDefinition()

  const manager = Global.managerInstances[storeId]
  if (manager == null) {
    Global.managerInstances[storeId] = new MobxStoreManager(storeId, initCallback)
    return Global.managerInstances[storeId]
  }

  manager._reset(initCallback)
  return manager
}

/**
 * @param {string} [storeId]
 *      Can be used to identify the needed store
 *      in case more than one store is managed
 *
 * @returns {object|null}
 *      Manager instance if createMobxManager() was used before; or
 *      Null
 */
function getMobxManager(storeId) {
  return Global.managerInstances[storeId] || null
}

function _hoistClassDefinition() {
  class MobxStoreManager {
    constructor(storeId, initCallback) {
      this._id = storeId
      this._initCallback = initCallback

      this._initialized = false
      this._reactContext = null
      this._ReactContextProvider = null
      this._mobxStore = null
    }

    getId() {
      return this._id
    }

    _initIfNeeded() {
      if (this._initialized) {
        return this
      }

      this._reactContext = React.createContext(null)
      this._ReactContextProvider = this._reactContext.Provider

      this._mobxStore = useLocalObservable(this._initCallback)

      this._initialized = true
      return this
    }

    _reset(initCallback) {
      if (this._initCallback === initCallback) {
        return this
      }

      this._initCallback = initCallback

      if (this._initialized) {
        this._mobxStore = useLocalObservable(this._initCallback)
        return this
      }

      this._initIfNeeded()
      return this
    }

    getProviderComponentAndValue() {
      this._initIfNeeded()

      const result = {
        Provider: this._ReactContextProvider,
        value: this._mobxStore,
      }
      return result
    }

    getContextHook() {
      this._initIfNeeded()
      return React.useContext(this._reactContext)
    }
  }

  return MobxStoreManager
}
