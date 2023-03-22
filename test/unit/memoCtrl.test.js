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
  possibilityToCompletionTemplate: '<p>Text fetched from kopps and can be edited, removed</p>',
  possibilityToAdditionTemplate: '<p>Text fetched from kopps and can be edited, removed</p>',
  schemaUrls: [
    'https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/',
    'https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/',
  ],
  literatureTemplate: '<p>Text fetched from kopps and can be edited, removed</p>',
  equipmentTemplate: '<p>Text fetched from kopps and can be edited, removed</p>',
  examinationModules: '<h4>Written Exam ( wTEN1 )</h4>',
}

const links =
  '<p><br/><a title="Schema" href="https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/">Schema HT-2020-CDEPR1-MFL-2</a><br/><a title="Schema" href="https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/">Schema HT-2020-CBIOT2-MFL</a></p>'

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

const memoCtrl = require('../../server/controllers/memoCtrl')

describe('Contol functions for combining data', () => {
  test('Update fetch data with default data from kopps if some api data has no values, except examinationSubSection', done => {
    const emptyApiData = mockedApi()
    const memoLangAbbr = 'en'
    const updatedMemoData = memoCtrl.combineDefaultValues(emptyApiData, mockedKoppsTemplates)
    const {
      examinationSubSection,
      equipment,
      scheduleDetails,
      literature,
      possibilityToCompletion,
      possibilityToAddition,
    } = updatedMemoData
    expect(examinationSubSection).toBe(emptyApiData.examinationSubSection)
    expect(equipment).toBe(mockedKoppsTemplates.equipmentTemplate)
    expect(literature).toBe(mockedKoppsTemplates.literatureTemplate)
    expect(possibilityToCompletion).toBe(mockedKoppsTemplates.possibilityToCompletionTemplate)
    expect(possibilityToAddition).toBe(mockedKoppsTemplates.possibilityToAdditionTemplate)

    done()
  })

  test('Update fetch data with default data from kopps if some api data has no values', done => {
    const filledInApiData = mockedApi(true)
    const memoLangAbbr = 'en'
    const updatedMemoData = memoCtrl.combineDefaultValues(filledInApiData, mockedKoppsTemplates)
    const {
      examinationSubSection,
      equipment,
      scheduleDetails,
      literature,
      possibilityToCompletion,
      possibilityToAddition,
    } = updatedMemoData
    expect(examinationSubSection).toBe(filledInApiData.examinationSubSection)
    expect(equipment).toBe(filledInApiData.equipment)
    expect(literature).toBe(filledInApiData.literature)
    expect(possibilityToCompletion).toBe(filledInApiData.possibilityToCompletion)
    expect(possibilityToAddition).toBe(filledInApiData.possibilityToAddition)

    done()
  })

  test('Kopps data cleaned up from templates', done => {
    const newKoppsData = memoCtrl.removeTemplatesFromKoppsFreshData(mockedKoppsTemplates)
    expect(newKoppsData.equipmentTemplate).toBe(undefined)
    expect(newKoppsData.literatureTemplate).toBe(undefined)
    expect(newKoppsData.possibilityToCompletionTemplate).toBe(undefined)
    expect(newKoppsData.possibilityToAdditionTemplate).toBe(undefined)

    done()
  })

  test('Merge kopps data and api data, memo api data replaces kopps data', async () => {
    const newKoppsData = await memoCtrl.mergeKoppsAndMemoData(mockedKoppsTemplates, mockedApi(true))
    expect(newKoppsData).toMatchInlineSnapshot(`
      {
        "equipment": "Text saved by user in section in Equipment section",
        "examinationModules": "<h4>Written Exam ( wTEN1 )</h4>",
        "examinationSubSection": "Text saved by user in section in Examination subsection",
        "literature": "Text saved by user in Literature section",
        "possibilityToAddition": "Text saved by user in Opportunity to raise an approved grade via renewed examination section",
        "possibilityToCompletion": "Text saved by user in Opportunity to complete the requirements via supplementary examination section",
        "scheduleDetails": "Text saved by user in Detailed plan section",
        "schemaUrls": [
          "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/",
          "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/",
        ],
      }
    `)
  })

  test('Merge kopps data and api data, memo api has empty values', async () => {
    const newKoppsData = await memoCtrl.mergeKoppsAndMemoData(mockedKoppsTemplates, mockedApi(false))
    expect(newKoppsData).toMatchInlineSnapshot(`
      {
        "equipment": "",
        "examinationModules": "<h4>Written Exam ( wTEN1 )</h4>",
        "examinationSubSection": "",
        "literature": "",
        "possibilityToAddition": "",
        "possibilityToCompletion": "",
        "scheduleDetails": "",
        "schemaUrls": [
          "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cdepr1-mfl-2/calendar/",
          "https://www-r.referens.sys.kth.se/social/course/SF1624/subgroup/ht-2020-cbiot2-mfl/calendar/",
        ],
      }
    `)
  })
})
