/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { Row, Col } from 'reactstrap'

import axios from 'axios'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'
import PageHeading from '../components-shared/PageHeading'
import ProgressBar from '../components-shared/ProgressBar'
import AlertMissingDraft from '../components/alerts/AlertMissingDraft'
import ControlPanel from '../components/ControlPanel'
import ProgressTitle from '../components/ProgressTitle'
import PageHead from '../components/PageHead'
import SideMenu from '../components/preview/SideMenu'
import CourseFacts from '../components/preview/CourseFacts'
import CourseMemoLinks from '../components/preview/CourseMemoLinks'
import CourseLinks from '../components/preview/CourseLinks'
import CourseContacts from '../components/preview/CourseContacts'
import Section from '../components/preview/Section'

import i18n from '../../../../i18n'
import { standardSections } from '../util/sectionAndHeaderUtils'
import { concatMemoName, concatHeaderMemoName } from '../util/helpers'
import { seasonStr } from '../utils-shared/helpers'
import { FIRST_VERSION, SERVICE_URL, SAVED_NEW_PARAM, ADMIN_URL } from '../util/constants'
import { TYPE, useToast } from '../hooks/useToast'
import { getAllSectionsAndHeadingsToShow, MemoViewMode } from '../util/visibilityUtils'
import ContentFromNewSectionEditor from '../components/preview/ContentFromNewSectionEditor'

const PROGRESS = 3

const renderAllSections = ({ memoData }) => {
  const memoLanguageIndex = memoData.memoCommonLangAbbr === 'en' ? 0 : 1
  const { sectionsLabels } = i18n.messages[memoLanguageIndex]
  const { noInfoYetPreview } = i18n.messages[memoLanguageIndex].sourceInfo

  const sectionsAndContent = getAllSectionsAndHeadingsToShow({
    sections: standardSections,
    memoData,
    mode: MemoViewMode.Preview,
  })

  return sectionsAndContent.map(({ id, standardHeadingIds, extraHeaderTitle, extraHeadingIndices, isEmptySection }) => {
    if (isEmptySection) {
      return <EmptySection key={id} id={id} sectionsLabels={sectionsLabels} noInfoYetPreview={noInfoYetPreview} />
    }

    return (
      <SectionWrapper key={id} id={id} sectionsLabels={sectionsLabels}>
        <Sections headings={standardHeadingIds} id={id} memoData={memoData} memoLanguageIndex={memoLanguageIndex} />

        <ExtraHeaders
          headingIndices={extraHeadingIndices}
          extraHeaderTitle={extraHeaderTitle}
          memoData={memoData}
          memoLanguageIndex={memoLanguageIndex}
        />
      </SectionWrapper>
    )
  })
}

const EmptySection = ({ id, sectionsLabels, noInfoYetPreview }) => (
  <SectionWrapper id={id} sectionsLabels={sectionsLabels}>
    <article>
      <p>
        <i>{noInfoYetPreview}</i>
      </p>
    </article>
  </SectionWrapper>
)

const SectionWrapper = ({ id, sectionsLabels, children }) => (
  <section key={id} aria-labelledby={id} className="section-wrapper">
    <h2 id={id} key={'header-' + id}>
      {sectionsLabels[id]}
    </h2>
    {children}
  </section>
)

const Sections = ({ headings, id, memoData, memoLanguageIndex }) =>
  headings.map(contentId => {
    const menuId = id + '-' + contentId
    const htmlContent = memoData[contentId]

    return (
      <Section
        memoLangIndex={memoLanguageIndex}
        contentId={contentId}
        menuId={menuId}
        key={contentId}
        htmlContent={htmlContent}
      />
    )
  })

const ExtraHeaders = ({ headingIndices, extraHeaderTitle, memoData, memoLanguageIndex }) =>
  headingIndices.map(index => {
    const { uKey, title, htmlContent } = memoData[extraHeaderTitle]?.[index] || {}
    return (
      <ContentFromNewSectionEditor
        key={uKey}
        title={title}
        htmlContent={htmlContent}
        memoLanguageIndex={memoLanguageIndex}
      />
    )
  })

const determineContentFlexibility = () => {
  const lastColLastElem = document.getElementById('last-element-which-determines-styles')
  if (lastColLastElem) {
    const lastElBottomPx = lastColLastElem.getBoundingClientRect().bottom
    const allCenterSections = document.getElementById('flexible-content-of-center').querySelectorAll('span')
    allCenterSections.forEach(section => {
      const topOfSection = section.getBoundingClientRect().top
      if (topOfSection > lastElBottomPx) section.classList.add('flexible-section-style')
    })
  }
}

function PreviewContainer(props) {
  const store = useStore()
  const { langAbbr, langIndex, memoData, activeTermsPublishedMemos } = store
  const progress = props.progress ? Number(props.progress) : 3
  const {
    courseCode,
    courseTitle,
    semester = '',
    applicationCodes,
    memoCommonLangAbbr,
    memoEndPoint,
    memoName,
    version,
    syllabusValid,
  } = memoData

  const {
    toast,
    toastData: { alertIsOpen, alertText, alertColor },
  } = useToast(langIndex)

  useEffect(() => {
    // Decide which content can have wider content (exempel tables, to make them more readable)
    // But text must stay the same
    determineContentFlexibility()
  }, [])

  if (!applicationCodes) return <AlertMissingDraft langAbbr={langAbbr} langIndex={langIndex} courseCode={courseCode} />

  const isDraftOfPublished = Number(version) > FIRST_VERSION

  const { pagesCreateNewPm, pagesChangePublishedPm, pageTitles, sideMenuLabels } = i18n.messages[langIndex]

  const { courseFactsLabels, courseMemoLinksLabels, courseLinksLabels, courseContactsLabels, sectionsLabels } =
    i18n.messages[memoCommonLangAbbr === 'en' ? 0 : 1]

  const { validFromTerm } = syllabusValid

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const allSections = renderAllSections(store)

  // Assumes that API only gave one memoData per memoEndPoint
  // Duplicate id’s filtered out later
  let active = false
  let courseMemoItems = activeTermsPublishedMemos.map(memoItem => {
    const { outdated } = memoItem
    const id = memoItem.memoEndPoint
    const label = concatMemoName(memoItem.semester, memoItem.applicationCodes, memoItem.memoCommonLangAbbr)
    // memoEndPoint is currently displayed
    active = memoItem.memoEndPoint === memoEndPoint
    return {
      id,
      label,
      active,
      outdated,
      url: `/kurs-pm/${courseCode}/${label}`,
    }
  })
  // memoEndPoint has not been published before, and wasn’t in memoData
  if (!active) {
    courseMemoItems.push({
      id: store.memoEndPoint,
      label: concatMemoName(semester, applicationCodes, memoCommonLangAbbr),
      active: true,
      outdated: memoData.outdated,
      url: `/kurs-pm/${courseCode}/${memoEndPoint}`,
    })
  }

  // Duplicate id’s filtered out
  courseMemoItems = courseMemoItems.filter((item, index, arr) => index === arr.findIndex(t => t.id === item.id))

  const onBack = () => {
    const editLocation = window.location.href.replace(/\/preview/, '')
    window.location = editLocation
  }

  const publish = () =>
    axios
      .post('/kursinfoadmin/kurs-pm-data/internal-api/publish-memo/' + courseCode + '/' + memoEndPoint, {
        courseCode,
        memoEndPoint,
      })
      .then(() => {
        const versionStr = encodeURIComponent(
          `Ver ${version} - ${new Date(memoData.lastChangeDate).toLocaleString(langIndex === 0 ? 'en-GB' : 'sv-SE')}`
        )
        const publishType = isDraftOfPublished ? 'pub_changed' : 'pub'
        window.location = `${ADMIN_URL}${courseCode}?serv=pmdata&event=${publishType}&ver=${versionStr}&term=${semester}&name=${encodeURIComponent(
          memoName
        )}&memoendpoint=${memoEndPoint}&ladokRound=${applicationCodes.join('-')}`
      })
      // eslint-disable-next-line no-console
      .catch(() => {
        toast('errWhilePublishing', TYPE.ERROR)
      })

  const onFinish = () => {
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${SAVED_NEW_PARAM}&term=${semester}&name=${
      memoName || memoEndPoint
    }`

    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  return (
    <div className="kip-container preview-container">
      <PageHeading heading={isDraftOfPublished ? pageTitles.published : pageTitles.new} subHeading={courseTitle} />
      <ProgressBar current={progress - 1} steps={isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm} />
      <PageHead semester={semester} memoName={memoName} userLangIndex={langIndex} />
      <ProgressTitle id="progress-title" text={pagesCreateNewPm[PROGRESS - 1]} />
      <div className="preview-content-separation" />
      <Row>
        <Col lg="3" className="preview-side-menu">
          <SideMenu courseCode={courseCode} courseMemoItems={courseMemoItems} labels={sideMenuLabels} />
        </Col>
        <Col lg="9">
          <PageHeading heading={concatHeaderMemoName(semester, memoCommonLangAbbr)} subHeading={courseTitle} />
          <Row>
            <Col
              lg="8"
              id="flexible-content-of-center"
              className="preview-content-center"
              data-testid="preview-main-content"
            >
              <p>
                {sectionsLabels.asterisk} {seasonStr(langIndex, validFromTerm)}
              </p>
              {allSections}
            </Col>
            <Col lg="4" className="preview-content-right" data-testid="preview-side-content">
              <CourseFacts labels={courseFactsLabels} departmentName={memoData.departmentName} memoData={memoData} />
              <CourseMemoLinks language={memoCommonLangAbbr} labels={courseMemoLinksLabels} memoData={memoData} />
              <CourseLinks language={memoCommonLangAbbr} labels={courseLinksLabels} />
              <div id="row-for-the-last-element-which-determines-styles">
                <CourseContacts
                  styleId="last-element-which-determines-styles"
                  memoData={memoData}
                  labels={courseContactsLabels}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ControlPanel
        fixedBottom
        langIndex={langIndex}
        onSubmit={publish}
        onBack={onBack}
        onCancel={onFinish}
        progress={progress}
        isDraftOfPublished={isDraftOfPublished}
        alertIsOpen={alertIsOpen}
        alertText={alertText}
        alertColor={alertColor}
      />
    </div>
  )
}

PreviewContainer.propTypes = {
  progress: PropTypes.number,
}

export default PreviewContainer
