import createApplicationStore from '../../public/js/app/stores/createApplicationStore'
import { mockMiniLadokObj } from './miniLadokObjs'
import mockMiniMemos from './miniMemos'
import usedRounds from './mockUsedRounds'

const applicationStore = createApplicationStore()

const mockApplicationStoreWithAllMemos = {
  ...applicationStore,
  courseCode: 'EF1111',
  langAbbr: 'en',
  langIndex: 0,
  semester: '',
  memoEndPoint: '',
  rounds: [],
  miniMemos: mockMiniMemos,
  miniLadokObj: mockMiniLadokObj,

  showAvailableSemesterRounds(semester) {
    return applicationStore.showAvailableSemesterRounds(semester, usedRounds[semester], mockMiniLadokObj)
  },
}

export default mockApplicationStoreWithAllMemos
