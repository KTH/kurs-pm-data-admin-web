import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'
import RouterStore from '../../public/js/app/stores/RouterStore'

const tempSaveNewImage = (imageFile, tempImagePath, isDefaultChosen) => {
  mockAdminStore.newImageFile = imageFile
  mockAdminStore.tempImagePath = tempImagePath
  mockAdminStore.isDefaultChosen = isDefaultChosen
}

const realRouterStore = new RouterStore()

const mockRouterStore = {
  ...realRouterStore,
  courseCode: 'EF1111',
  langAbbr: 'sv',
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
  paths: {
    memo: {
      saveImage: {
        method: 'post',
        uri: '/kursinfoadmin/kurser/kurs/storage/saveImage/:courseCode/:published'
      }
    }
  },
  isDefaultChosen: true,
  tempSaveNewImage: tempSaveNewImage,

  showAvailableSemesterRounds(semester) {
    return realRouterStore.showAvailableSemesterRounds(semester, [], mockMiniKoppsObj)
    // return new Promise((resolve, reject) => {
    //   resolve({ status: 200 })
    // })
  }
}

export default mockRouterStore
