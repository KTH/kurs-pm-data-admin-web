import React, { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import axios from 'axios'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'

import ControlPanel from '../components/ControlPanel'
import ProgressTitle from '../components/ProgressTitle'
import PageHead from '../components/PageHead'
import BreadCrumbs from '../components/preview/BreadCrumbs'
import SideMenu from '../components/preview/SideMenu'
import CourseFacts from '../components/preview/CourseFacts'
import CourseMemoLinks from '../components/preview/CourseMemoLinks'
import CourseLinks from '../components/preview/CourseLinks'
import CourseContacts from '../components/preview/CourseContacts'
import CourseHeader from '../components/preview/CourseHeader'
import CoursePresentation from '../components/preview/CoursePresentation'
import Section from '../components/preview/Section'
import ExtraHeadingContent from '../components/preview/ExtraHeadingContent'

import i18n from '../../../../i18n'
import { context, sections } from '../util/fieldsByType'
import { concatMemoName } from '../util/helpers'
import {
  FIRST_VERSION,
  EMPTY,
  REMOVE_PUBLISHED_PARAM,
  SERVICE_URL,
  SAVED_NEW_PARAM,
  ADMIN_URL,
} from '../util/constants'

const PROGRESS = 3

// Logic copied from kursinfo-web
export const resolveCourseImage = (imageFromAdmin, courseMainSubjects = '', language) => {
  // TODO Cleanup translations
  const englishTranslations = i18n.messages[0]
  const swedishTranslations = i18n.messages[1]

  let courseImage = ''
  // If course administrator has set own picture, use that
  if (imageFromAdmin && imageFromAdmin.length > 4) {
    courseImage = imageFromAdmin
    // Course administrator has not set own picture, get one based on course’s main subjects
  } else {
    let mainSubjects = courseMainSubjects.split(',').map(s => s.trim())

    // If main subjects exist, and the language is English, get Swedish translations of main subjects
    if (mainSubjects && mainSubjects.length > 0 && language === 'en') {
      mainSubjects = mainSubjects.map(subject => englishTranslations.courseMainSubjects[subject])
    }
    // Get picture according to Swedish translation of first main subject
    courseImage = swedishTranslations.courseImage[mainSubjects.sort()[0]]
    // If no picture is available for first main subject, use default picture for language
    courseImage =
      courseImage ||
      (language === 'en' ? englishTranslations.courseImage.default : swedishTranslations.courseImage.default)
  }
  return courseImage
}

const renderAllSections = ({ memoData }) => {
  // TODO Use resolved labels instead
  const memoLanguageIndex = memoData.memoCommonLangAbbr === 'en' ? 0 : 1
  const { sectionsLabels } = i18n.messages[memoLanguageIndex]

  // TODO Refactor logic for visible sections
  const sectionsWithContent = []
  sections.forEach(({ id, content, extraHeaderTitle }) => {
    content.forEach(contentId => {
      const { isRequired, type } = context[contentId]
      let contentHtml = memoData[contentId]
      let visibleInMemo = memoData.visibleInMemo[contentId]
      if (typeof visibleInMemo === 'undefined') {
        visibleInMemo = true
      }

      if (isRequired && (type === 'mandatory' || type === 'mandatoryAndEditable') && !contentHtml) {
        contentHtml = EMPTY[memoLanguageIndex]
      } else if (isRequired && type === 'mandatoryForSome' && !contentHtml) {
        visibleInMemo = false
      } else if (!contentHtml) {
        visibleInMemo = false
      }
      if (visibleInMemo && !sectionsWithContent.includes(id)) {
        sectionsWithContent.push(id)
      }
    })

    if (extraHeaderTitle && Array.isArray(memoData[extraHeaderTitle])) {
      memoData[extraHeaderTitle].forEach(m => {
        if (m.visibleInMemo && !sectionsWithContent.includes(id)) {
          sectionsWithContent.push(id)
        }
      })
    }
  })

  // TODO Refactor logic for visible sections
  return sections.map(({ id, content, extraHeaderTitle }) => {
    if (!sectionsWithContent.includes(id)) {
      return (
        <section key={id}>
          <h2 id={id} key={'header-' + id}>
            {sectionsLabels[id]}
          </h2>
          <p>
            <i>{EMPTY[memoLanguageIndex]}</i>
          </p>
        </section>
      )
    }
    // Contacts are displayed in the right column
    return (
      id !== 'contacts' && (
        <section key={id}>
          <h2 id={id} key={'header-' + id}>
            {sectionsLabels[id]}
          </h2>
          {content.map(contentId => {
            const menuId = id + '-' + contentId

            const { isRequired, type } = context[contentId]
            let contentHtml = memoData[contentId]
            let visibleInMemo = memoData.visibleInMemo[contentId]
            if (typeof visibleInMemo === 'undefined') {
              visibleInMemo = true
            }

            if (isRequired && (type === 'mandatory' || type === 'mandatoryAndEditable') && !contentHtml) {
              contentHtml = `<p><i>${EMPTY[memoLanguageIndex]}</i></p>`
            } else if (isRequired && type === 'mandatoryForSome' && !contentHtml) {
              visibleInMemo = false
            } else if (!contentHtml) {
              visibleInMemo = false
            }

            return (
              visibleInMemo && (
                <Section
                  memoLangIndex={memoLanguageIndex}
                  contentId={contentId}
                  menuId={menuId}
                  key={contentId}
                  visibleInMemo={visibleInMemo}
                  html={contentHtml}
                />
              )
            )
          })}
          {extraHeaderTitle &&
            Array.isArray(memoData[extraHeaderTitle]) &&
            memoData[extraHeaderTitle].map(({ title, htmlContent, visibleInMemo, isEmptyNew, uKey }) => (
              <ExtraHeadingContent
                contentId={extraHeaderTitle}
                key={uKey || extraHeaderTitle}
                initialTitle={title}
                initialValue={htmlContent}
                visibleInMemo={visibleInMemo}
                isEmptyNew={isEmptyNew}
                uKey={uKey}
                memoLanguageIndex={memoLanguageIndex}
              />
            ))}
        </section>
      )
    )
  })
}

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
  const { browserConfig, langIndex, memoData, sellingText = '' } = store
  // eslint-disable-next-line react/destructuring-assignment
  const progress = props.progress ? Number(props.progress) : 3

  const isDraftOfPublished = Number(memoData.version) > FIRST_VERSION
  const { courseCode, courseTitle, semester = '', ladokRoundIds, memoCommonLangAbbr, memoEndPoint, memoName } = memoData
  const { pagesCreateNewPm, pagesChangePublishedPm, pageTitles, breadCrumbLabels, sideMenuLabels } = i18n.messages[
    langIndex
  ]
  const {
    coursePresentationLabels,
    courseFactsLabels,
    courseMemoLinksLabels,
    courseLinksLabels,
    courseContactsLabels,
    courseHeaderLabels,
  } = i18n.messages[memoCommonLangAbbr === 'en' ? 0 : 1]

  const courseImage = resolveCourseImage(
    store.imageFromAdmin,
    store.koppsFreshData.courseMainSubjects,
    store.memoLanguage
  )
  const allSections = renderAllSections(store)
  const courseImageUrl = `${browserConfig.imageStorageUri}${courseImage}`

  // Assumes that API only gave one memoData per memoEndPoint
  // Duplicate id’s filtered out later
  let active = false
  let courseMemoItems = store.memoDatas.map(m => {
    const id = m.memoEndPoint
    const label = concatMemoName(m.semester, m.ladokRoundIds, m.memoCommonLangAbbr)
    // memoEndPoint is currently displayed
    active = m.memoEndPoint === memoEndPoint
    return {
      id,
      label,
      active,
      url: `/kurs-pm/${courseCode}/${label}`,
    }
  })
  // memoEndPoint has not been published before, and wasn’t in memoData
  if (!active) {
    courseMemoItems.push({
      id: store.memoEndPoint,
      label: concatMemoName(semester, ladokRoundIds, memoCommonLangAbbr),
      active: true,
      url: `/kurs-pm/${courseCode}/${memoEndPoint}`,
    })
  }

  // Duplicate id’s filtered out
  courseMemoItems = courseMemoItems.filter((item, index, self) => index === self.findIndex(t => t.id === item.id))

  useEffect(() => {
    // Decide which content can have wider content (exempel tables, to make them more readable)
    // But text must stay the same
    determineContentFlexibility()
  }, [])

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
        window.location = `${ADMIN_URL}${courseCode}?serv=pmdata&event=${isDraftOfPublished ? 'pub_changed' : 'pub'}${
          isDraftOfPublished
            ? `&ver=${new Date(memoData.lastChangeDate).toLocaleString(langIndex === 0 ? 'en-US' : 'sv-SE')}`
            : ''
        }&term=${semester}&name=${encodeURIComponent(memoName)}&memoendpoint=${memoEndPoint}`
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))

  const onFinish = () => {
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${
      isDraftOfPublished ? REMOVE_PUBLISHED_PARAM : SAVED_NEW_PARAM
    }&term=${semester}&name=${memoName || memoEndPoint}`

    if (isDraftOfPublished)
      return (
        axios
          .delete(`${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`)
          // eslint-disable-next-line consistent-return
          .then(result => {
            if (result.status >= 400) {
              return 'ERROR-PreviewContainer.jsx-onFinish-' + result.status
            }
            setTimeout(() => {
              window.location = startAdminPageUrl
            }, 500)
          })
          .catch(err => {
            if (err.response) {
              throw new Error('PreviewContainer.jsx-onFinish-' + err.message)
            }
            throw err
          })
      )
    return setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  return (
    <Container className="kip-container preview-container" fluid>
      <Row>
        <PageTitle id="mainHeading" pageTitle={isDraftOfPublished ? pageTitles.published : pageTitles.new}>
          {courseTitle}
        </PageTitle>
      </Row>
      <ProgressBar active={progress} pages={isDraftOfPublished ? pagesChangePublishedPm : pagesCreateNewPm} />
      <PageHead semester={semester} memoName={memoName} userLangIndex={langIndex} />
      <ProgressTitle id="progress-title" text={pagesCreateNewPm[PROGRESS - 1]} />
      <div className="preview-content-separation" />
      <Row>
        <BreadCrumbs labels={breadCrumbLabels} courseCode={courseCode} />
      </Row>
      <Row>
        <Col lg="3" className="preview-side-menu">
          <SideMenu courseCode={courseCode} courseMemoItems={courseMemoItems} labels={sideMenuLabels} />
        </Col>
        <Col lg="9">
          <CourseHeader
            courseMemo={concatMemoName(semester, ladokRoundIds, memoCommonLangAbbr)}
            courseCode={courseCode}
            courseTitle={courseTitle}
            labels={courseHeaderLabels}
            language={memoCommonLangAbbr}
          />
          <Row>
            <Col lg="8" id="flexible-content-of-center" className="preview-content-center">
              <CoursePresentation
                courseImageUrl={courseImageUrl}
                introText={sellingText || ''}
                labels={coursePresentationLabels}
              />
              {allSections}
            </Col>
            <Col lg="4" className="preview-content-right">
              <Row className="mb-4">
                <Col>
                  <CourseFacts
                    labels={courseFactsLabels}
                    departmentName={memoData.departmentName}
                    memoData={memoData}
                  />
                </Col>
              </Row>
              <Row className="my-4">
                <Col>
                  <CourseMemoLinks
                    language={memoCommonLangAbbr}
                    labels={courseMemoLinksLabels}
                    memoData={memoData}
                    syllabusValid={memoData.syllabusValid}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <CourseLinks language={memoCommonLangAbbr} labels={courseLinksLabels} />
                </Col>
              </Row>
              <Row id="row-for-the-last-element-which-determines-styles" className="mt-4">
                <Col>
                  <CourseContacts
                    styleId="last-element-which-determines-styles"
                    memoData={memoData}
                    labels={courseContactsLabels}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container className="fixed-bottom">
        <ControlPanel
          langIndex={langIndex}
          onSubmit={publish}
          onBack={onBack}
          onCancel={onFinish}
          progress={progress}
          // alertText={alertText}
          // alertIsOpen={alertIsOpen}
          isDraftOfPublished={isDraftOfPublished}
        />
      </Container>
    </Container>
  )
}

PreviewContainer.propTypes = {
  progress: PropTypes.number,
}

PreviewContainer.defaultProps = {
  progress: 3,
}
export default PreviewContainer
