import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import RouterStore from '../../public/js/app/stores/RouterStore'
import usedRounds from './mockUsedRounds'

const realRouterStore = new RouterStore()

const mockRouterStoreWithAllMemos = {
  ...realRouterStore,
  courseCode: 'EF1111',
  langAbbr: 'en',
  langIndex: 0,
  semester: '',
  memoEndPoint: '',
  rounds: [],
  miniMemos: mockMiniMemos,
  miniKoppsObj: mockMiniKoppsObj,

  showAvailableSemesterRounds(semester) {
    return realRouterStore.showAvailableSemesterRounds(
      semester,
      usedRounds[semester],
      mockMiniKoppsObj
    )
  }
}

export default mockRouterStoreWithAllMemos
