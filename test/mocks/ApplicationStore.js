import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import createApplicationStore from '../../public/js/app/stores/createApplicationStore'
import {
  excludedFieldsInContractEducation,
  getContractEducationStructure,
} from '../../public/js/app/util/fieldsByType.js'
const applicationStore = createApplicationStore()

const tempSaveNewDraft = async (action, copyFrom, body, isTest) => {
  const newMemo = await applicationStore.createNewMemo(action, copyFrom, body, isTest) //function exist
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
    version: '1',
  }
  mockApplicationStore.miniMemos.draftsWithNoActivePublishedVer.push(objToSave)
  await mockApplicationStore.setSectionsStructure()
  return newMemo
}

const mockApplicationStore = {
  ...applicationStore,
  courseCode: 'EF1111',
  langAbbr: 'en',
  langIndex: 0,
  semester: '', //20201,
  memoEndPoint: '',
  rounds: [],
  miniMemos: {
    draftsOfPublishedMemos: [],
    draftsWithNoActivePublishedVer: [],
    sortedPublishedForAllYears: [],
  },
  miniKoppsObj: mockMiniKoppsObj,
  browserConfig: {
    storageUri: '',
  },
  createNewMemo(action, copyFrom, body) {
    return tempSaveNewDraft(action, copyFrom, body, true)
  },

  showAvailableSemesterRounds(semester) {
    return applicationStore.showAvailableSemesterRounds(semester, [], mockMiniKoppsObj)
    // return new Promise((resolve, reject) => {
    //   resolve({ status: 200 })
    // })
  },

  updateDraft(body) {
    return applicationStore.updateDraft(body, true)
  },
}

export default mockApplicationStore
