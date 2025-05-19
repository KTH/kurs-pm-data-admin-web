'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { safeGet } = require('safe-utils')
const apis = require('../api')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { getCourseInfo } = require('../kursinfoApi')
const { getLadokRoundIdsFromKopps } = require('../koppsApi')
const { getLadokCourseData, getLadokCourseSyllabus } = require('../ladokApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')
const { getCourseEmployees } = require('../ugRestApi')
const serverPaths = require('../server').getPaths()
const { browser, server } = require('../configuration')
const i18n = require('../../i18n')

const addDefaultValues = data => ({
  ...data,
  equipment: data.equipment || '',
  scheduleDetails: data.scheduleDetails || '',
  literature: data.literature || '',
  possibilityToCompletion: data.possibilityToCompletion || '',
  possibilityToAddition: data.possibilityToAddition || '',
})

const mergeAllData = async (
  memoApiData,
  courseInfoApiData,
  ladokCourseData,
  ladokCourseSyllabusData,
  koppsEmployeesData
) => {
  const memoDataWithDefaults = addDefaultValues(memoApiData)

  // Source: kursinfo-api
  const courseInfoApiValues = {
    prerequisites: courseInfoApiData.recommendedPrerequisites,
  }

  // Source: Ladok
  const ladokCourseValues = {
    credits: ladokCourseData.omfattning,
    title: ladokCourseData.benamning,
    courseTitle: `${ladokCourseData.kod} ${ladokCourseData.benamning} ${ladokCourseData.omfattning.formattedWithUnit}`,
    departmentName: ladokCourseData.organisation.name,
    educationalTypeId: ladokCourseData.utbildningstyp.id,
  }

  // Source: Ladok
  const examinationContent = `<p><ul>${ladokCourseSyllabusData.kursplan.examinationModules.completeExaminationStrings}</ul></p>${ladokCourseSyllabusData.kursplan.kommentartillexamination}`
  const ladokCourseSyllabusValues = {
    courseContent: ladokCourseSyllabusData.kursplan.kursinnehall,
    learningOutcomes: ladokCourseSyllabusData.kursplan.larandemal,
    gradingScale: ladokCourseSyllabusData.course.betygsskala,
    examination: examinationContent,
    examinationModules: ladokCourseSyllabusData.kursplan.examinationModules.titles,
    otherRequirementsForFinalGrade: ladokCourseSyllabusData.kursplan.ovrigakravforslutbetyg,
    ethicalApproach: ladokCourseSyllabusData.kursplan.etisktforhallandesatt,
    additionalRegulations: ladokCourseSyllabusData.kursplan.faststallande,
  }

  // Source: Static content
  const { permanentDisability } = i18n.messages[language === 'en' ? 0 : 1].staticMemoBodyByUserLang

  return {
    ...memoDataWithDefaults,
    ...courseInfoApiValues,
    ...ladokCourseValues,
    ...ladokCourseSyllabusValues,
    ...permanentDisability,
    ...koppsEmployeesData,
  }
}

async function renderMemoEditorPage(req, res, next) {
  try {
    const userLang = language.getLanguage(res) || 'sv'
    const langIndex = userLang === 'en' ? 0 : 1
    const translateTo = userLang === 'en' ? 1 : 0
    const { courseCode, memoEndPoint } = req.params
    const { action = '' } = req.query
    // STORE MANIPULATIONS
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const applicationStore = createStore()

    const memoApiData = await getMemoApiData('getDraftByEndPoint', { memoEndPoint })
    const { semester, memoCommonLangAbbr } = memoApiData
    const memoLangAbbr = memoCommonLangAbbr || userLang

    applicationStore.rebuildDraftFromPublishedVer = action === 'rebuild'

    applicationStore.setBrowserConfig(browser, serverPaths, apis, server.hostUrl)

    applicationStore.doSetLanguageIndex(userLang)

    applicationStore.setMemoBasicInfo({
      courseCode,
      memoEndPoint,
      semester,
      memoLangAbbr,
    })

    /**
     * This is temporary to fetch only round id for UG Rest Api.
     * Because UG Rest Api is using ladok round id in its group names still.
     * So once it gets updated then this will be removed.
     */

    // start
    const memoApiDataDeepCopy = memoApiData
    const { applicationCodes } = memoApiDataDeepCopy

    try {
      memoApiDataDeepCopy.ladokRoundIds = await getLadokRoundIdsFromKopps(courseCode, semester, applicationCodes)
    } catch (error) {
      log.error(error)
      memoApiDataDeepCopy.ladokRoundIds = []
    }
    // end
    const koppsEmployeesData = await getCourseEmployees(memoApiDataDeepCopy)

    const courseInfoApiData = await getCourseInfo(courseCode, memoLangAbbr)
    const ladokCourseData = await getLadokCourseData(courseCode, memoLangAbbr)
    const ladokCourseSyllabusData = await getLadokCourseSyllabus(courseCode, semester, memoLangAbbr)

    applicationStore.memoData = await mergeAllData(
      memoApiData,
      courseInfoApiData,
      ladokCourseData,
      ladokCourseSyllabusData,
      koppsEmployeesData
    )

    await applicationStore.setSectionsStructure()

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = server.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    res.render('memo/index', {
      compressedStoreCode,
      html: view,
      title: userLang === 'sv' ? 'Administrera Om kursen' : 'Administer About course',
      kursinfoadmin: {
        title: i18n.messages[langIndex].messages.main_site_name,
        url: `${server.hostUrl}${server.hostUrl.includes('.se/') ? '' : '/'}kursinfoadmin/kurser/kurs/${courseCode}`,
      },
      languageLink: {
        title: i18n.messages[translateTo].messages.locale_text,
        toLang: `?l=${userLang === 'sv' ? 'en' : 'sv'}`,
      },
      toolbarUrl: server.toolbar.url,
      theme: 'student-web',
      proxyPrefix,
      lang: userLang,
      description:
        userLang === 'sv'
          ? 'Kursinformation – Administration av kurs-PM'
          : 'Course Information – Administration of course memos',
    })
  } catch (err) {
    log.error('Error in getContent', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function updateContentByEndpoint(req, res, next) {
  try {
    const { memoEndPoint } = req.params
    const apiResponse = await changeMemoApiData('updateCreatedDraft', { memoEndPoint }, req.body)
    if (safeGet(() => apiResponse.message)) {
      log.debug('Error from API: ', apiResponse.message)
    }
    log.info('Memo contents was updated in kurs-pm-data-api for memo: ', memoEndPoint)
    return res.json(apiResponse)
  } catch (err) {
    log.error('Error in updateContentByEndpoint', { error: err })
    next(err)
  }
}

module.exports = {
  mergeAllData,
  renderMemoEditorPage,
  updateContentByEndpoint,
}
