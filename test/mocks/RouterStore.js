import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import RouterStore from '../../public/js/app/stores/RouterStore'

const tempSaveNewDraft = async (action, copyFrom, body) => {
  const newMemo = await realRouterStore.createNewMemo(action, copyFrom, body, (isTest = true)) //function exist
  const { ladokRoundIds, memoCommonLangAbbr, memoEndPoint, memoName, semester } = newMemo
  //Example where data saves
  mockRouterStore.miniMemos.draftsWithNoActivePublishedVer.push({
    ladokRoundIds,
    memoCommonLangAbbr,
    memoId: Math.random(),
    memoEndPoint,
    memoName,
    semester,
    status: 'draft',
    version: '1'
  })
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
  createNewMemo: tempSaveNewDraft,

  showAvailableSemesterRounds(semester) {
    return realRouterStore.showAvailableSemesterRounds(semester, [], mockMiniKoppsObj)
    // return new Promise((resolve, reject) => {
    //   resolve({ status: 200 })
    // })
  }
}

export default mockRouterStore
