import mockMiniKoppsObj from './miniKoppsObjs'
import memoTypes from './memoData/memoTypes'
import RouterStore from '../../public/js/app/stores/RouterStore'
import usedRounds from './mockUsedRounds'

const realRouterStore = new RouterStore()

const setMemoBasicInfoTest = (props) => ({
  memoEndPoint: props.memoEndPoint.toUpperCase() || '',
  memoLangAbbr: props.memoCommonLangAbbr || 'sv',
  semester: props.semester || ''
})
const reducedKoppsData = {
  en: {
    credits: 9,
    creditUnitAbbr: 'hp',
    title: 'Project in Plasma Physics',
    titleOther: 'Projekt i plasmafysik'
  },
  sv: {
    credits: 9,
    creditUnitAbbr: 'hp',
    title: 'Projekt i plasmafysiks',
    titleOther: 'Project in Plasma Physics'
  }
}

const mockRouterStoreWithChosenMemo = (
  memoType = 'DRAFT_NEW_MEMO',
  contentType = 'freshEmpty',
  memoLang = 'en',
  userLang = 'en'
) => {
  const mockedMemoData = memoTypes[memoType][memoLang][contentType]
  const updateStoreWith = memoType && contentType ? setMemoBasicInfoTest(mockedMemoData) : {}
  const routerWithMemoData = {
    ...realRouterStore,
    courseCode: 'EF1111',
    courseTitle: '',
    langAbbr: userLang,
    langIndex: userLang === 'en' ? 0 : 1,
    semester: '',
    memoEndPoint: '',
    rounds: [],
    ...updateStoreWith,
    memoData: { ...mockedMemoData, ...reducedKoppsData[userLang] }
  }

  return routerWithMemoData
}

export default mockRouterStoreWithChosenMemo
