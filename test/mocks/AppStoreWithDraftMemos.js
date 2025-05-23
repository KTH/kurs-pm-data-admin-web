import createApplicationStore from '../../public/js/app/stores/createApplicationStore'
import { mockMiniLadokObj } from './miniLadokObjs'
import mockMiniMemos from './miniMemos'
import usedRounds from './mockUsedRounds'

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
  miniLadokObj: mockMiniLadokObj,

  showAvailableSemesterRounds(semester) {
    return applicationStore.showAvailableSemesterRounds(semester, usedRounds[semester], mockMiniLadokObj)
  },
}

export default mockApplicationStoreWithDraftMemos
