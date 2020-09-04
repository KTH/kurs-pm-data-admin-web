import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import RouterStore from '../../public/js/app/stores/RouterStore'

const usedRounds = {
  20211: ['2', '3'],
  20202: ['2', '3']
}

const realRouterStore = new RouterStore()
const { draftsWithNoActivePublishedVer } = mockMiniMemos

const mockRouterStoreWithMiniMemos = {
  ...realRouterStore,
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
    sortedPublishedForAllYears: []
  },
  miniKoppsObj: mockMiniKoppsObj,

  showAvailableSemesterRounds(semester) {
    return realRouterStore.showAvailableSemesterRounds(
      semester,
      usedRounds[semester],
      mockMiniKoppsObj
    )
  }
}

export default mockRouterStoreWithMiniMemos
