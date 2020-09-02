import mockMiniKoppsObj from './miniKoppsObjs'
import mockMiniMemos from './miniMemos'

const tempSaveNewImage = (imageFile, tempImagePath, isDefaultChosen) => {
  mockAdminStore.newImageFile = imageFile
  mockAdminStore.tempImagePath = tempImagePath
  mockAdminStore.isDefaultChosen = isDefaultChosen
}

const mockRouterStore = {
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
    return new Promise((resolve, reject) => {
      resolve({ status: 200 })
    })
  }
}

export default mockRouterStore
