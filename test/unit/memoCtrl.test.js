const memoCtrl = require('../../server/controllers/memoCtrl')

jest.mock('../../server/api', () => ({}))
jest.mock('../../server/kursinfoApi', () => ({
  getCourseInfo: jest.fn(),
}))
jest.mock('../../server/ladokApi', () => ({
  getLadokCourseData: jest.fn(),
  getLadokCourseSyllabus: jest.fn(),
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
const { getLadokCourseData, getLadokCourseSyllabus } = require('../../server/ladokApi')
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

const courseInfoApiDataMock = {
  recommendedPrerequisites: 'Some recommended prerequisites',
}

describe('mergeAllData', () => {
  it('should merge all sources correctly', async () => {
    const merged = await memoCtrl.mergeAllData(
      mockedApi(true),
      courseInfoApiDataMock,
      ladokCourseDataMock,
      ladokCourseSyllabusDataMock,
      ugAdminEmployeesDataMock
    )

    expect(merged).toHaveProperty('equipment', 'Text saved by user in section in Equipment section')
    expect(merged).toHaveProperty('credits', ladokCourseDataMock.omfattning)
    expect(merged).toHaveProperty('courseContent', 'Course content example')
    expect(merged).toHaveProperty('prerequisites', 'Some recommended prerequisites')
    expect(merged).toHaveProperty('teacher', 'teacher mock')
  })
})

describe('renderMemoEditorPage', () => {
  it('should render memo page', async () => {
    const req = {
      params: { courseCode: 'SF1624', memoEndPoint: 'some-memo' },
      query: {},
      url: '/example-url',
    }
    const res = {
      render: jest.fn(),
    }
    const next = jest.fn()

    getMemoApiData.mockResolvedValue({
      semester: '20241',
      memoCommonLangAbbr: 'en',
      applicationCodes: ['11111'],
    })

    getCourseEmployees.mockResolvedValue(ugAdminEmployeesDataMock)
    getCourseInfo.mockResolvedValue(courseInfoApiDataMock)
    getLadokCourseData.mockResolvedValue(ladokCourseDataMock)
    getLadokCourseSyllabus.mockResolvedValue(ladokCourseSyllabusDataMock)

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

    await memoCtrl.renderMemoEditorPage(req, res, next)

    expect(res.render).toHaveBeenCalledWith(
      'memo/index',
      expect.objectContaining({
        html: expect.stringContaining('Rendered Page'),
        compressedStoreCode: 'compressed-code',
      })
    )
  })
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
