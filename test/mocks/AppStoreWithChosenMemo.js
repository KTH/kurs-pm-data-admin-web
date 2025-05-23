import createApplicationStore from '../../public/js/app/stores/createApplicationStore'
import memoTypes from './memoData/memoTypes'

const applicationStore = createApplicationStore()

const setMemoBasicInfoTest = props => ({
  memoEndPoint: props.memoEndPoint.toUpperCase() || '',
  memoLangAbbr: props.memoCommonLangAbbr || 'sv',
  semester: props.semester || '',
})
const reducedKoppsData = {
  en: {
    credits: { formattedWithUnit: '9.0 credits' },
    creditUnitAbbr: 'hp',
    title: 'Project in Plasma Physics',
    syllabusValid: {
      validFromTerm: 20191,
      validUntilTerm: 20201,
    },
  },
  sv: {
    credits: { formattedWithUnit: '9.0 hp' },
    creditUnitAbbr: 'hp',
    title: 'Projekt i plasmafysik',
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
    examinationModules: '<h4>INL1 - Inlämningsuppgifter, 3,5 hp</h4>',
  }

  routerWithMemoData.setSectionsStructure()

  return routerWithMemoData
}

export default mockApplicationStoreWithChosenMemo
