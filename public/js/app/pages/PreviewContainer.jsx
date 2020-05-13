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
import { EMPTY, SERVICE_URL, SAVED_NEW_PARAM } from '../util/constants'

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

  return sections.map(({ id, content, extraHeaderTitle }) => {
    // Contacts are displayed in the right column
    return (
      id !== 'contacts' && (
        <span key={id}>
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

            if (isRequired && type === 'mandatory' && !contentHtml) {
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
        </span>
      )
    )
  })
}

@inject(['routerStore'])
@observer
class PreviewContainer extends Component {
  state = {
    progress: this.props.progress ? Number(this.props.progress) : 3,
    previewMemo: this.props.routerStore.memoData
  }

  // isDraftOfPublished = Number(this.props.routerStore.memoData.version) > 1

  langIndex = this.props.routerStore.langIndex

  onBack = () => {
    const editLocation = window.location.href.replace(/\/preview/, '')
    window.location = editLocation
  }

  publish = () => {
    const { memoEndPoint, courseCode } = this.state.previewMemo
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
          window.location = '/kursinfoadmin/kurs-pm-data/' + courseCode
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error))
    )
  }

  courseSubHeader = () => {
    const { title, credits, creditUnitAbbr } = this.props.routerStore.koppsFreshData
    const { courseCode } = this.state.previewMemo
    return (
      <span>
        {courseCode +
          ' ' +
          title +
          ' ' +
          credits +
          ' ' +
          (i18n.isSwedish() ? creditUnitAbbr : 'credits')}
      </span>
    )
  }

  onFinish = () => {
    // const { isDraftOfPublished } = this
    const { courseCode, semester, memoEndPoint, memoName } = this.state.previewMemo
    const startAdminPageUrl = `${
      SERVICE_URL.aboutCourseAdmin
    }${courseCode}${SAVED_NEW_PARAM}&term=${semester}&name=${memoName || memoEndPoint}`

    // if (isDraftOfPublished) DELETE THIS DRAFT FURTHER WHEN AVBRYT FLÖDE IS READY
    setTimeout(() => {
      window.location = startAdminPageUrl
    }, 500)
  }

  render() {
    const {
      progressTitleHeaders,
      progressBarHeaders,
      pageTitles,
      breadCrumbLabels,
      sideMenuLabels
    } = i18n.messages[this.langIndex]
    const {
      coursePresentationLabels,
      courseFactsLabels,
      courseMemoLinksLabels,
      extraInfo,
      courseLinksLabels,
      courseContactsLabels,
      courseHeaderLabels
    } = i18n.messages[this.state.previewMemo.memoCommonLangAbbr === 'en' ? 0 : 1]
    const { memoName, semester = '', courseCode } = this.state.previewMemo
    const courseImage = resolveCourseImage(
      this.props.routerStore.imageFromAdmin,
      this.props.routerStore.koppsFreshData.courseMainSubjects,
      this.props.routerStore.memoLanguage
    )
    const allSections = renderAllSections(this.props.routerStore)
    const courseImageUrl = `${this.props.routerStore.browserConfig.imageStorageUri}${courseImage}`

    // Assumes that API only gave one memoData per memoEndPoint
    let active = false
    const courseMemoItems = this.props.routerStore.memoDatas.map(m => {
      const id = m.memoEndPoint
      const label = concatMemoName(
        m.semester,
        m.ladokRoundIds,
        this.props.routerStore.memoData.memoCommonLangAbbr
      )
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
        id: this.props.routerStore.memoEndPoint,
        label: concatMemoName(
          this.props.routerStore.memoData.semester,
          this.props.routerStore.memoData.ladokRoundIds,
          this.props.routerStore.memoData.memoCommonLangAbbr
        ),
        active: true,
        url: `/kurs-pm/${courseCode}/${this.state.previewMemo.memoEndPoint}`
      })
    }

    return (
      <Container className="kip-container" style={{ marginBottom: '115px', padding: '0' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.preview}>
            {this.courseSubHeader()}
          </PageTitle>
        </Row>
        <ProgressBar active={this.state.progress} pages={progressBarHeaders} />
        <Row />
        <PageHead semester={semester} memoName={memoName} />
        <ProgressTitle id="progress-title" text={progressTitleHeaders[PROGRESS - 1]} />
        <div className="preview-content-separation" />
        <Row>
          <BreadCrumbs labels={breadCrumbLabels} courseCode={courseCode} />
        </Row>
        <Row>
          <Col lg="3">
            <SideMenu
              courseCode={courseCode}
              courseMemoItems={courseMemoItems}
              labels={sideMenuLabels}
            />
          </Col>
          <Col lg="9">
            <Row className="preview-content">
              <CourseHeader
                courseMemo={concatMemoName(
                  this.props.routerStore.memoData.semester,
                  this.props.routerStore.memoData.ladokRoundIds,
                  this.props.routerStore.memoData.memoCommonLangAbbr
                )}
                courseCode={courseCode}
                title={this.props.routerStore.koppsFreshData.title}
                credits={this.props.routerStore.koppsFreshData.credits}
                creditUnitAbbr={this.props.routerStore.koppsFreshData.creditUnitAbbr}
                labels={courseHeaderLabels}
                language={this.props.routerStore.memoData.memoCommonLangAbbr}
              />
            </Row>
            <Row className="preview-content">
              <Col lg="8" className="preview-content-center">
                <CoursePresentation
                  courseImageUrl={courseImageUrl}
                  introText={this.props.routerStore.sellingText}
                  labels={coursePresentationLabels}
                />
                {allSections}
              </Col>
              <Col lg="4" className="preview-content-right">
                <CourseFacts
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  labels={courseFactsLabels}
                  department={this.props.routerStore.koppsFreshData.department}
                  memoData={this.props.routerStore.memoData}
                />
                {/* TODO: Use better spacing method */}
                <div style={{ height: '30px' }} />
                <CourseMemoLinks
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  labels={courseMemoLinksLabels}
                  extraInfo={extraInfo}
                  memoData={this.props.routerStore.memoData}
                  validFromTerm={this.props.routerStore.koppsFreshData.validFromTerm}
                />
                {/* TODO: Use better spacing method */}
                <div style={{ height: '30px' }} />
                <CourseLinks
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  labels={courseLinksLabels}
                />
                {/* TODO: Use better spacing method */}
                <div style={{ height: '30px' }} />
                <CourseContacts
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  memoData={this.props.routerStore.memoData}
                  labels={courseContactsLabels}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Container className="fixed-bottom">
          <ControlPanel
            langIndex={this.langIndex}
            onSubmit={this.publish}
            onBack={this.onBack}
            onCancel={this.onFinish}
            progress={this.state.progress}
            alertText={this.state.alertText}
            alertIsOpen={this.state.alertIsOpen}
          />
        </Container>
      </Container>
    )
  }
}

export default PreviewContainer
