import mockMiniKoppsObj from './miniKoppsObjs'
import memoTypes from './memoData/memoTypes'
import usedRounds from './mockUsedRounds'
import createApplicationStore from '../../public/js/app/stores/createApplicationStore'

const applicationStore = createApplicationStore()

const setMemoBasicInfoTest = props => ({
  memoEndPoint: props.memoEndPoint.toUpperCase() || '',
  memoLangAbbr: props.memoCommonLangAbbr || 'sv',
  semester: props.semester || '',
})
const reducedKoppsData = {
  en: {
    credits: '9.0',
    creditUnitAbbr: 'hp',
    title: 'Project in Plasma Physics',
    titleOther: 'Projekt i plasmafysik',
    syllabusValid: {
      validFromTerm: 20191,
      validUntilTerm: 20201,
    },
  },
  sv: {
    credits: '9.0',
    creditUnitAbbr: 'hp',
    title: 'Projekt i plasmafysiks',
    titleOther: 'Project in Plasma Physics',
    syllabusValid: {
      validFromTerm: 20191,
      validUntilTerm: 20201,
    },
  },
}

const mockApplicationStoreWithChosenMemo = (
  memoType = 'DRAFT_NEW_MEMO',
  contentType = 'freshEmpty',
  memoLang = 'en',
  userLang = 'en'
) => {
  const mockedMemoData = memoTypes[memoType][memoLang][contentType]
  const updateStoreWith = memoType && contentType ? setMemoBasicInfoTest(mockedMemoData) : {}
  const routerWithMemoData = {
    ...applicationStore,
    courseCode: 'EF1111',
    courseTitle: '',
    langAbbr: userLang,
    langIndex: userLang === 'en' ? 0 : 1,
    semester: '',
    memoEndPoint: '',
    rounds: [],
    ...updateStoreWith,
    memoData: { ...mockedMemoData, ...reducedKoppsData[userLang] },
    extraContentState: { extraHeaders1: [], extraHeaders2: [], extraHeaders3: [], extraHeaders4: [] },
  }

  return routerWithMemoData
}

export default mockApplicationStoreWithChosenMemo
