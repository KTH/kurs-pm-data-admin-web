import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import usedRounds from './mockUsedRounds'

import createApplicationStore from '../../public/js/app/stores/createApplicationStore'

const applicationStore = createApplicationStore()

const { draftsWithNoActivePublishedVer } = mockMiniMemos

const mockApplicationStoreWithDraftMemos = {
  ...applicationStore,
  courseCode: 'EF1111',
  langAbbr: 'en',
  langIndex: 0,
  semester: '',
  memoEndPoint: '',
  rounds: [],
  miniMemos: {
    draftsOfPublishedMemos: [],
    draftsWithNoActivePublishedVer,
    publishedWithNoActiveDraft: [],
    sortedPublishedForAllYears: [],
  },
  miniKoppsObj: mockMiniKoppsObj,

  showAvailableSemesterRounds(semester) {
    return applicationStore.showAvailableSemesterRounds(semester, usedRounds[semester], mockMiniKoppsObj)
  },
}

export default mockApplicationStoreWithDraftMemos
