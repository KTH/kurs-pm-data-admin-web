const memoCtrl = require('../../server/controllers/memoCtrl')

jest.mock('../../server/api', () => ({}))
jest.mock('../../server/kursinfoApi', () => ({
  getCourseInfo: jest.fn(),
}))
jest.mock('../../server/ladokApi', () => ({
  getLadokCourseData: jest.fn(),
  getLadokCourseSyllabus: jest.fn(),
  getLadokCourseSyllabuses: jest.fn(),
}))
jest.mock('../../server/kursPmDataApi', () => ({
  getMemoApiData: jest.fn(),
  changeMemoApiData: jest.fn(),
}))
jest.mock('../../server/ugRestApi', () => ({
  getCourseEmployees: jest.fn(),
}))
jest.mock('../../server/utils/serverSideRendering', () => ({
  getServerSideFunctions: jest.fn(),
}))
jest.mock('../../server/server', () => ({
  getPaths: () => ({ examplePath: '/example' }),
}))
jest.mock('../../server/configuration', () => ({
  browser: {},
  server: { hostUrl: 'http://localhost', proxyPrefixPath: { uri: '' }, toolbar: { url: '' } },
}))
jest.mock('@kth/kth-node-web-common/lib/language', () => ({
  getLanguage: jest.fn(() => 'en'),
}))
jest.mock('@kth/log', () => ({
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}))

const { getMemoApiData, changeMemoApiData } = require('../../server/kursPmDataApi')
const { getCourseInfo } = require('../../server/kursinfoApi')
const { getLadokCourseData, getLadokCourseSyllabus, getLadokCourseSyllabuses } = require('../../server/ladokApi')
const { getCourseEmployees } = require('../../server/ugRestApi')
const { getServerSideFunctions } = require('../../server/utils/serverSideRendering')

// Mocks
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

const ugAdminEmployeesDataMock = {
  teachers: 'teacher mock',
  examiners: 'examiner mock',
  courseCoordinators: 'coordinator mock',
}

const ladokCourseDataMock = {
  kod: 'SF1624',
  benamning: 'Algebra och Geometri',
  omfattning: { formattedWithUnit: '7.5 hp' },
  organisation: { name: 'Math Department' },
  utbildningstyp: { id: 'abc123' },
}

const ladokCourseSyllabusDataMock = {
  kursplan: {
    kursinnehall: 'Course content example',
    larandemal: 'Learning outcomes example',
    examinationModules: {
      completeExaminationStrings: '<li>TEN1 - Tentamen, 7.5 credits</li>',
      titles: '<h4>TEN1 - Tentamen, 7.5 credits</h4>',
    },
    kommentartillexamination: '<p>Exam comment</p>',
    ovrigakravforslutbetyg: 'Additional requirements for final grade',
    etisktforhallningssatt: 'Ethical approach',
    faststallande: 'Additional regulations',
  },
  course: {
    betygsskala: 'A, B, C, D, E, FX, F',
  },
}
const ladokCourseSyllabusesDataMock = [
  {
    kursplan: {
      kursinnehall: 'Course content example',
      larandemal: 'Learning outcomes example',
      examinationModules: {
        completeExaminationStrings: '<li>TEN1 - Tentamen, 7.5 credits</li>',
        titles: '<h4>TEN1 - Tentamen, 7.5 credits</h4>',
      },
      kommentartillexamination: '<p>Exam comment</p>',
      ovrigakravforslutbetyg: 'Additional requirements for final grade',
      etisktforhallningssatt: 'Ethical approach',
      faststallande: 'Additional regulations',
      giltigfrom: 'HT2020',
    },
    course: {
      betygsskala: 'A, B, C, D, E, FX, F',
    },
  },
]

const courseInfoApiDataMock = {
  recommendedPrerequisites: 'Some recommended prerequisites',
}

describe('mergeAllData', () => {
  it('should merge all sources correctly', async () => {
    const i18n = require('../../i18n')
    const staticData = i18n.messages[0].staticMemoBodyByUserLang // assuming English

    const merged = await memoCtrl.mergeAllData(
      mockedApi(true),
      courseInfoApiDataMock,
      ladokCourseDataMock,
      ladokCourseSyllabusDataMock,
      ladokCourseSyllabusesDataMock,
      ugAdminEmployeesDataMock,
      staticData
    )

    expect(merged).toHaveProperty('equipment', 'Text saved by user in section in Equipment section')
    expect(merged).toHaveProperty('credits', ladokCourseDataMock.omfattning)
    expect(merged).toHaveProperty('courseContent', 'Course content example')
    expect(merged).toHaveProperty('prerequisites', 'Some recommended prerequisites')
    expect(merged).toHaveProperty('teacher', 'teacher mock')
    expect(merged.permanentDisability).toContain(
      'Students at KTH with a permanent disability can get support during studies from Funka:'
    )
  })
})

describe('renderMemoEditorPage', () => {
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
  }
  const next = jest.fn()

  const createReq = courseCode => ({
    params: { courseCode, memoEndPoint: 'some-memo' },
    query: {},
    url: '/example-url',
  })

  beforeEach(() => {
    getServerSideFunctions.mockReturnValue({
      createStore: () => ({
        setMemoBasicInfo: jest.fn(),
        doSetLanguageIndex: jest.fn(),
        setBrowserConfig: jest.fn(),
        rebuildDraftFromPublishedVer: false,
        setSectionsStructure: jest.fn(),
        memoData: {},
      }),
      getCompressedStoreCode: () => 'compressed-code',
      renderStaticPage: () => '<div>Rendered Page</div>',
    })

    getCourseEmployees.mockResolvedValue(ugAdminEmployeesDataMock)
    getCourseInfo.mockResolvedValue(courseInfoApiDataMock)
    getLadokCourseData.mockResolvedValue(ladokCourseDataMock)
    getLadokCourseSyllabus.mockResolvedValue(ladokCourseSyllabusDataMock)
    getLadokCourseSyllabuses.mockResolvedValue(ladokCourseSyllabusesDataMock)
  })

  it('should render memo page', async () => {
    const req = createReq('SF1624')

    getMemoApiData.mockResolvedValue({
      semester: '20241',
      memoCommonLangAbbr: 'en',
      applicationCodes: ['11111'],
    })

    await memoCtrl.renderMemoEditorPage(req, res, next)

    expect(res.render).toHaveBeenCalledWith(
      'memo/index',
      expect.objectContaining({
        html: expect.stringContaining('Rendered Page'),
        compressedStoreCode: 'compressed-code',
      })
    )
  })

  it('should render memo page if memoCommonLangAbbr is undefined', async () => {
    const req = createReq('SF1624')

    getMemoApiData.mockResolvedValue({
      semester: '20241',
      applicationCodes: ['11111'],
    })

    await memoCtrl.renderMemoEditorPage(req, res, next)

    expect(getCourseInfo).toHaveBeenCalledWith('SF1624', 'en')

    expect(res.render).toHaveBeenCalledWith(
      'memo/index',
      expect.objectContaining({
        html: expect.stringContaining('Rendered Page'),
        compressedStoreCode: 'compressed-code',
      })
    )

    expect(res.redirect).not.toHaveBeenCalled()
  })

  it.each(['SF1624', 'otherCourseCode'])(
    'redirects to kursinfo-admin-web if no semester in memoApiData for courseCode %s',
    async courseCode => {
      const req = createReq(courseCode)

      getMemoApiData.mockResolvedValue({})

      await memoCtrl.renderMemoEditorPage(req, res, next)

      expect(res.redirect).toHaveBeenCalledWith(`/kursinfoadmin/kurser/kurs/${courseCode}?source=missingMemoDraft`)
    }
  )
})

describe('updateContentByEndpoint', () => {
  it('should call changeMemoApiData and return JSON', async () => {
    const req = {
      params: { memoEndPoint: 'some-memo' },
      body: { title: 'Updated memo title' },
    }
    const res = {
      json: jest.fn(),
    }
    const next = jest.fn()

    changeMemoApiData.mockResolvedValue({ success: true })

    await memoCtrl.updateContentByEndpoint(req, res, next)

    expect(changeMemoApiData).toHaveBeenCalledWith(
      'updateCreatedDraft',
      { memoEndPoint: 'some-memo' },
      { title: 'Updated memo title' }
    )
    expect(res.json).toHaveBeenCalledWith({ success: true })
  })
})
