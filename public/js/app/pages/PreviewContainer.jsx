import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
import axios from 'axios'

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
import ExtraSection from '../components/preview/ExtraSection'

import i18n from '../../../../i18n'
import { context, sections } from '../util/fieldsByType'
import { concatMemoName } from '../util/helpers'
import {
  FIRST_VERSION,
  EMPTY,
  REMOVE_PUBLISHED_PARAM,
  SERVICE_URL,
  SAVED_NEW_PARAM,
  ADMIN_URL
} from '../util/constants'
import PropTypes from 'prop-types'

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
    let mainSubjects = courseMainSubjects.split(',').map((s) => s.trim())

    // If main subjects exist, and the language is English, get Swedish translations of main subjects
    if (mainSubjects && mainSubjects.length > 0 && language === 'en') {
      mainSubjects = mainSubjects.map((subject) => englishTranslations.courseMainSubjects[subject])
    }
    // Get picture according to Swedish translation of first main subject
    courseImage = swedishTranslations.courseImage[mainSubjects.sort()[0]]
    // If no picture is available for first main subject, use default picture for language
    courseImage =
      courseImage ||
      (language === 'en'
        ? englishTranslations.courseImage.default
        : swedishTranslations.courseImage.default)
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
    content.forEach((contentId) => {
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
      memoData[extraHeaderTitle].forEach((m) => {
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
          <p>{EMPTY[memoLanguageIndex]}</p>
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
          {content.map((contentId) => {
            const menuId = id + '-' + contentId

            const { isRequired, type } = context[contentId]
            let contentHtml = memoData[contentId]
            let visibleInMemo = memoData.visibleInMemo[contentId]
            if (typeof visibleInMemo === 'undefined') {
              visibleInMemo = true
            }

            if (
              isRequired &&
              (type === 'mandatory' || type === 'mandatoryAndEditable') &&
              !contentHtml
            ) {
              contentHtml = EMPTY[memoLanguageIndex]
            } else if (isRequired && type === 'mandatoryForSome' && !contentHtml) {
              visibleInMemo = false
            } else if (!contentHtml) {
              visibleInMemo = false
            }

            // TODO: Rethink use of visibleInMemo
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
            memoData[extraHeaderTitle].map(
              ({ title, htmlContent, visibleInMemo, isEmptyNew, uKey }) => {
                return (
                  <ExtraSection
                    contentId={extraHeaderTitle}
                    key={uKey || extraHeaderTitle}
                    initialTitle={title}
                    initialValue={htmlContent}
                    visibleInMemo={visibleInMemo}
                    isEmptyNew={isEmptyNew}
                    uKey={uKey}
                    onEditorChange={() => {}}
                    onBlur={() => {}}
                    onRemove={() => {}}
                    memoLanguageIndex={memoLanguageIndex}
                  />
                )
              }
            )}
        </section>
      )
    )
  })
}

const determineContentFlexibility = () => {
  const lastColLastElem = document.getElementById('last-element-which-determines-styles')
  if (lastColLastElem) {
    const lastElBottomPx = lastColLastElem.getBoundingClientRect().bottom
    const allCenterSections = document
      .getElementById('flexible-content-of-center')
      .querySelectorAll('span')
    allCenterSections.forEach((section) => {
      const topOfSection = section.getBoundingClientRect().top
      if (topOfSection > lastElBottomPx) section.classList.add('flexible-section-style')
    })
  }
}

@inject(['routerStore'])
@observer
class PreviewContainer extends Component {
  state = {
    progress: this.props.progress ? Number(this.props.progress) : 3,
    previewMemo: this.props.routerStore.memoData
  }

  isDraftOfPublished = Number(this.props.routerStore.memoData.version) > FIRST_VERSION

  langIndex = this.props.routerStore.langIndex

  componentDidMount() {
    //Decide which content can have wider content (exempel tables, to make them more readable)
    determineContentFlexibility()
  }

  onBack = () => {
    const editLocation = window.location.href.replace(/\/preview/, '')
    window.location = editLocation
  }

  publish = () => {
    const { memoEndPoint, courseCode, semester, memoName } = this.state.previewMemo
    return (
      axios
        .post(
          '/kursinfoadmin/kurs-pm-data/internal-api/publish-memo/' +
            courseCode +
            '/' +
            memoEndPoint,
          { courseCode, memoEndPoint }
        )
        .then(() => {
          window.location = `${ADMIN_URL}${courseCode}?serv=pmdata&event=pub&term=${semester}&name=${encodeURIComponent(
            memoName
          )}`
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    )
  }

  onFinish = () => {
    const { isDraftOfPublished } = this
    const { courseCode, semester, memoEndPoint, memoName } = this.state.previewMemo
    const startAdminPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}${
      isDraftOfPublished ? REMOVE_PUBLISHED_PARAM : SAVED_NEW_PARAM
    }&term=${semester}&name=${memoName || memoEndPoint}`

    if (isDraftOfPublished)
      return (
        axios
          .delete(`${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`)
          // eslint-disable-next-line consistent-return
          .then((result) => {
            if (result.status >= 400) {
              this.onAlert('errWhileDeleting', 'danger')
              return 'ERROR-PreviewContainer.jsx-onFinish-' + result.status
            }
            setTimeout(() => {
              window.location = startAdminPageUrl
            }, 500)
          })
          .catch((err) => {
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

  render() {
    const { langIndex } = this
    const { routerStore } = this.props
    const {
      progressTitleHeaders,
      progressBarHeaders,
      pageTitles,
      breadCrumbLabels,
      sideMenuLabels
    } = i18n.messages[langIndex]
    const {
      coursePresentationLabels,
      courseFactsLabels,
      courseMemoLinksLabels,
      courseLinksLabels,
      courseContactsLabels,
      courseHeaderLabels
    } = i18n.messages[this.state.previewMemo.memoCommonLangAbbr === 'en' ? 0 : 1]
    const { memoName, semester = '', courseCode } = this.state.previewMemo
    const courseImage = resolveCourseImage(
      routerStore.imageFromAdmin,
      routerStore.koppsFreshData.courseMainSubjects,
      routerStore.memoLanguage
    )
    const allSections = renderAllSections(routerStore)
    const courseImageUrl = `${routerStore.browserConfig.imageStorageUri}${courseImage}`

    // Assumes that API only gave one memoData per memoEndPoint
    // Duplicate id’s filtered out later
    let active = false
    let courseMemoItems = routerStore.memoDatas.map((m) => {
      const id = m.memoEndPoint
      const label = concatMemoName(m.semester, m.ladokRoundIds, m.memoCommonLangAbbr)
      // memoEndPoint is currently displayed
      active = m.memoEndPoint === this.state.previewMemo.memoEndPoint
      return {
        id,
        label,
        active,
        url: `/kurs-pm/${courseCode}/${label}`
      }
    })
    // memoEndPoint has not been published before, and wasn’t in memoData
    if (!active) {
      courseMemoItems.push({
        id: routerStore.memoEndPoint,
        label: concatMemoName(
          routerStore.memoData.semester,
          routerStore.memoData.ladokRoundIds,
          routerStore.memoData.memoCommonLangAbbr
        ),
        active: true,
        url: `/kurs-pm/${courseCode}/${this.state.previewMemo.memoEndPoint}`
      })
    }

    // Duplicate id’s filtered out
    courseMemoItems = courseMemoItems.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    )

    return (
      <Container className="kip-container preview-container" fluid>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.preview}>
            <span>{routerStore.memoData.courseTitle}</span>
          </PageTitle>
        </Row>
        <ProgressBar active={this.state.progress} pages={progressBarHeaders} />
        <PageHead semester={semester} memoName={memoName} userLangIndex={langIndex} />
        <ProgressTitle id="progress-title" text={progressTitleHeaders[PROGRESS - 1]} />
        <div className="preview-content-separation" />
        <Row>
          <BreadCrumbs labels={breadCrumbLabels} courseCode={courseCode} />
        </Row>
        <Row>
          <Col lg="3" className="preview-side-menu">
            <SideMenu
              courseCode={courseCode}
              courseMemoItems={courseMemoItems}
              labels={sideMenuLabels}
            />
          </Col>
          <Col lg="9">
            <CourseHeader
              courseMemo={concatMemoName(
                routerStore.memoData.semester,
                routerStore.memoData.ladokRoundIds,
                routerStore.memoData.memoCommonLangAbbr
              )}
              courseCode={courseCode}
              courseTitle={routerStore.memoData.courseTitle}
              labels={courseHeaderLabels}
              language={routerStore.memoData.memoCommonLangAbbr}
            />
            <Row>
              <Col lg="8" id="flexible-content-of-center" className="preview-content-center">
                <CoursePresentation
                  courseImageUrl={courseImageUrl}
                  introText={routerStore.sellingText || ''}
                  labels={coursePresentationLabels}
                />
                {allSections}
              </Col>
              <Col lg="4" className="preview-content-right">
                <Row className="mb-4">
                  <Col>
                    <CourseFacts
                      language={routerStore.memoData.memoCommonLangAbbr}
                      labels={courseFactsLabels}
                      departmentName={routerStore.memoData.departmentName}
                      memoData={routerStore.memoData}
                    />
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col>
                    <CourseMemoLinks
                      language={routerStore.memoData.memoCommonLangAbbr}
                      labels={courseMemoLinksLabels}
                      memoData={routerStore.memoData}
                      syllabusValid={routerStore.memoData.syllabusValid}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <CourseLinks
                      language={routerStore.memoData.memoCommonLangAbbr}
                      labels={courseLinksLabels}
                    />
                  </Col>
                </Row>
                <Row id="row-for-the-last-element-which-determines-styles" className="mt-4">
                  <Col>
                    <CourseContacts
                      styleId="last-element-which-determines-styles"
                      language={routerStore.memoData.memoCommonLangAbbr}
                      memoData={routerStore.memoData}
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
            onSubmit={this.publish}
            onBack={this.onBack}
            onCancel={this.onFinish}
            progress={this.state.progress}
            alertText={this.state.alertText}
            alertIsOpen={this.state.alertIsOpen}
            isDraftOfPublished={this.isDraftOfPublished}
          />
        </Container>
      </Container>
    )
  }
}

PreviewContainer.propTypes = {
  routerStore: PropTypes.func
}

export default PreviewContainer
