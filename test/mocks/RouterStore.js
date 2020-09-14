import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import RouterStore from '../../public/js/app/stores/RouterStore'

const tempSaveNewDraft = async (action, copyFrom, body, isTest) => {
  const newMemo = await realRouterStore.createNewMemo(action, copyFrom, body, isTest) //function exist
  const { ladokRoundIds, memoCommonLangAbbr, memoEndPoint, memoName, semester } = newMemo
  //Example where data saves
  const objToSave = {
    ladokRoundIds,
    memoCommonLangAbbr,
    memoId: Math.random(),
    memoEndPoint,
    memoName,
    semester,
    status: 'draft',
    version: '1'
  }
  mockRouterStore.miniMemos.draftsWithNoActivePublishedVer.push(objToSave)

  return newMemo
}

const realRouterStore = new RouterStore()

const mockRouterStore = {
  ...realRouterStore,
  courseCode: 'EF1111',
  langAbbr: 'en',
  langIndex: 0,
  semester: '', //20201,
  memoEndPoint: '',
  rounds: [],
  miniMemos: {
    draftsOfPublishedMemos: [],
    draftsWithNoActivePublishedVer: [],
    sortedPublishedForAllYears: []
  },
  miniKoppsObj: mockMiniKoppsObj,
  browserConfig: {
    storageUri: ''
  },
  createNewMemo(action, copyFrom, body) {
    return tempSaveNewDraft(action, copyFrom, body, true)
  },

  showAvailableSemesterRounds(semester) {
    return realRouterStore.showAvailableSemesterRounds(semester, [], mockMiniKoppsObj)
    // return new Promise((resolve, reject) => {
    //   resolve({ status: 200 })
    // })
  },

  updateDraft(body) {
    return realRouterStore.updateDraft(body, true)
  }
}

export default mockRouterStore
