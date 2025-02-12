const mockedApi = (withValues = false) => ({
  examinationSubSection: withValues ? 'Text saved by user in section in Examination subsection' : '',
  equipment: withValues ? 'Text saved by user in section in Equipment section' : '',
  scheduleDetails: withValues ? 'Text saved by user in Detailed plan section' : '',
  literature: withValues ? 'Text saved by user in Literature section' : '',
  possibilityToCompletion: withValues
    ? 'Text saved by user in Opportunity to complete the requirements via supplementary examination section'
    : '',
  possibilityToAddition: withValues
    ? 'Text saved by user in Opportunity to raise an approved grade via renewed examination section'
    : '',
})
const mockedKoppsTemplates = {
  schemaUrls: [
    'https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/',
    'https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/',
  ],
  examinationModules: '<h4>Written Exam ( wTEN1 )</h4>',
}

const ladokMockData = {
  omfattning: '7.5',
  benamning: 'Algebra och Geometri',
  huvudomraden: [{ name: 'Matematik' }, { name: 'Teknik' }],
  organisation: {
    name: '',
  },
  utbildningstyp: {
    id: '',
  },
  betygsskala: { code: 'AF', formatted: 'A, B, C, D, E, FX, F' },
}

const combinedExamInfo = {
  examination:
    '<p><ul><li>TEN1 - Tentamen, 7.5 credits, Grading scale: A, B, C, D, E, FX, F</li></ul></p><p>Based on recommendation from KTH’s coordinator for disabilities, the examiner will decide how to adapt an examination for students with documented disability. <br><br>The examiner may apply another examination format when re-examining individual students.<p>The examiner decides, in consultation with KTHs Coordinator of students with disabilities (Funka), about any customized examination for students with documented, lasting disability.&#160;</p></p>',
  examinationModules: '<h4>TEN1 - Tentamen, 7.5 credits</h4>',
}

const mockedCourseInfo = {
  courseCode: 'ML1616',
  sellingText: '<p>Exempel på text</p>',
  supplementaryInfo: '<p><strong><em>Exempel på övriga info</em></strong></p>',
  courseDisposition: '',
  recommendedPrerequisites: 'Some recommended prerequisites',
  lastChangedBy: 'charja',
  imageInfo: '',
}

const apiMemoDataMock = {}

jest.mock('../../server/configuration', () => ({
  server: {
    logging: { log: { level: 'info' } },
    proxyPrefixPath: {},
    session: { options: { sessionOptions: { secret: '' } } },
  },
}))
jest.mock('../../server/api', () => {})
jest.mock('../../server/server', () => ({
  getPaths: () => [],
}))
jest.mock('../../server/koppsApi', () => ({}))
jest.mock('../../server/ladokApi', () => ({}))

const memoCtrl = require('../../server/controllers/memoCtrl')

describe('Contol functions for combining data', () => {
  test('Update fetch data if some api data has no values, except examinationSubSection', done => {
    const emptyApiData = mockedApi()
    const updatedMemoData = memoCtrl.combineDefaultValues(emptyApiData, mockedKoppsTemplates)
    const { examinationSubSection } = updatedMemoData
    expect(examinationSubSection).toBe(emptyApiData.examinationSubSection)
    done()
  })

  test('Update fetch data with default data from kopps if some api data has no values', done => {
    const filledInApiData = mockedApi(true)
    const updatedMemoData = memoCtrl.combineDefaultValues(filledInApiData, mockedKoppsTemplates)
    const { examinationSubSection, equipment, literature, possibilityToCompletion, possibilityToAddition } =
      updatedMemoData
    expect(examinationSubSection).toBe(filledInApiData.examinationSubSection)
    expect(equipment).toBe(filledInApiData.equipment)
    expect(literature).toBe(filledInApiData.literature)
    expect(possibilityToCompletion).toBe(filledInApiData.possibilityToCompletion)
    expect(possibilityToAddition).toBe(filledInApiData.possibilityToAddition)

    done()
  })

  test('Merge kopps data, course info data and api data, memo api data replaces kopps data', async () => {
    const newKoppsData = await memoCtrl.mergeKoppsCourseAndMemoData(
      JSON.parse(JSON.stringify(mockedKoppsTemplates)),
      mockedCourseInfo,
      mockedApi(true)
    )
    expect(newKoppsData).toMatchInlineSnapshot(`
{
  "equipment": "Text saved by user in section in Equipment section",
  "examinationModules": "<h4>Written Exam ( wTEN1 )</h4>",
  "examinationSubSection": "Text saved by user in section in Examination subsection",
  "literature": "Text saved by user in Literature section",
  "possibilityToAddition": "Text saved by user in Opportunity to raise an approved grade via renewed examination section",
  "possibilityToCompletion": "Text saved by user in Opportunity to complete the requirements via supplementary examination section",
  "prerequisites": "Some recommended prerequisites",
  "scheduleDetails": "Text saved by user in Detailed plan section",
  "schemaUrls": [
    "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/",
    "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/",
  ],
}
`)
  })

  test('Merge kopps data, course info data and api data, memo api has empty values', async () => {
    const newKoppsData = await memoCtrl.mergeKoppsCourseAndMemoData(
      JSON.parse(JSON.stringify(mockedKoppsTemplates)),
      mockedCourseInfo,
      mockedApi(false)
    )
    expect(newKoppsData).toMatchInlineSnapshot(`
{
  "equipment": "",
  "examinationModules": "<h4>Written Exam ( wTEN1 )</h4>",
  "examinationSubSection": "",
  "literature": "",
  "possibilityToAddition": "",
  "possibilityToCompletion": "",
  "prerequisites": "Some recommended prerequisites",
  "scheduleDetails": "",
  "schemaUrls": [
    "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/",
    "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/",
  ],
}
`)
  })

  test('merge all data sources correctly', async () => {
    const newKoppsData = await memoCtrl.mergeKoppsCourseAndMemoData(
      JSON.parse(JSON.stringify(mockedKoppsTemplates)),
      mockedCourseInfo,
      mockedApi(false)
    )

    const result = await memoCtrl.mergeAllData(
      newKoppsData,
      mockedCourseInfo,
      ladokMockData,
      apiMemoDataMock,
      combinedExamInfo
    )

    expect(result.credits).toBe('7.5')
    expect(result.title).toBe('Algebra och Geometri')
    expect(result.departmentName).toBe('')
    expect(result.mainSubjects).toBe('Matematik,Teknik')
    expect(result.gradingScale).toBe('A, B, C, D, E, FX, F')
  })
})
