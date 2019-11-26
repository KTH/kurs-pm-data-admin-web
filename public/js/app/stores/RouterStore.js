import { observable, action } from 'mobx'
import axios from 'axios'
// import api from '../../../../server/api'
// import postMemoDataById from '../../../../server/kursPmDataApi'

class RouterStore {
  @observable message = 'This is the default string...'

  @observable courseCode

  @observable semester

  @observable syllabusObjFromKopps

  @observable memoData

  // @action doUpsertItem (body, courseCode, semester) {
  //   return axios.post('intern-api/kurs-pm-data')// postMemoDataById(body, courseCode, semester)
  //   .then(res => {
  //     console.log('post Memo Data By Id')
  //   })
  //   .catch(err => {
  //     if (err.response) {
  //       throw new Error(err.message, err.response.data)
  //     }
  //     throw err
  //   })
  // }

  // eslint-disable-next-line class-methods-use-this
  @action doUpsertItem(body, courseCode, semester) {
    // return axios.post('intern-api/'+courseCode)
    console.log('Post to internal api first')
    return axios
      .post('/kursinfoadmin/kurs-pm-data/intern-api/' + courseCode + '/' + semester, body)
      .then(res => {
        console.log('Success uppserted item to api', res)
        return res
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.message, err.response.data)
        }
        throw err
      })
  }

  @action setBrowserConfig(config, paths, apiHost, thisHostBaseUrl) {
    this.browserConfig = config
    this.paths = paths
    this.apiHost = apiHost
    this.thisHostBaseUrl = thisHostBaseUrl
  }

  @action SSRsetCookieHeader(cookieHeader) {
    if (typeof window === 'undefined') {
      this.cookieHeader = cookieHeader || ''
    }
  }

  @action doSetLanguage(lang) {
    this.language = lang
  }

  initializeStore(storeName) {
    const store = this

    if (
      typeof window !== 'undefined' &&
      window.__initialState__ &&
      window.__initialState__[storeName]
    ) {
      /* TODO:
        const util = globalRegistry.getUtility(IDeserialize, 'kursinfo-web')
        const importData = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
        console.log("importData",importData, "util",util)
        for (let key in importData) {
          // Deserialize so we get proper ObjectPrototypes
          // NOTE! We need to escape/unescape each store to avoid JS-injection
          store[key] = util.deserialize(importData[key])
        }
        delete window.__initialState__[storeName] */

      const tmp = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))

      Object.keys(tmp).map(key => {
        store[key] = tmp[key]
        delete tmp[key]
      })

      // Just a nice helper message
      if (Object.keys(window.__initialState__).length === 0) {
        window.__initialState__ = 'Mobx store state initialized'
      }
    }
  }
}

export default RouterStore
