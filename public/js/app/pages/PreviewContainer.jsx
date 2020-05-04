import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'

import ControlPanel from '../components/ControlPanel'
import ProgressTitle from '../components/ProgressTitle'
import PageHead from '../components/PageHead'

import i18n from '../../../../i18n'
import BreadCrumbs from '../components/preview/BreadCrumbs'
import SideMenu from '../components/preview/SideMenu'
import CourseFacts from '../components/preview/CourseFacts'
import CourseMemoLinks from '../components/preview/CourseMemoLinks'
import CourseLinks from '../components/preview/CourseLinks'
import CourseContacts from '../components/preview/CourseContacts'
import CourseHeader from '../components/preview/CourseHeader'
import CoursePresentation from '../components/preview/CoursePresentation'

const PROGRESS = 3

// Logic copied from kursinfo-web
export const resolveCourseImage = (imageFromAdmin, courseMainSubjects = '', language) => {
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

@inject(['routerStore'])
@observer
class PreviewContainer extends Component {
  state = {
    progress: this.props.progress ? Number(this.props.progress) : 3,
    previewMemo: this.props.routerStore.memoData
  }

  langIndex = this.props.routerStore.langIndex

  handleAlert = alertText => {
    this.setState({ alertIsOpen: true, alertText })
    setTimeout(() => {
      this.setState({ alertIsOpen: false, alertText: '' })
    }, 2000)
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

  render() {
    const {
      progressTitleHeaders,
      progressBarHeaders,
      pageTitles,
      breadCrumbLabels,
      sideMenuLabels
    } = i18n.messages[this.langIndex]
    const {
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
      this.props.routerStore.courseMainSubjects,
      this.props.routerStore.memoLanguage
    )
    const courseImageUrl = `${this.props.routerStore.browserConfig.imageStorageUri}${courseImage}`

    // Assumes that API only gave one memoData per memoEndPoint
    let active = true
    const courseMemoItems = this.props.routerStore.memoDatas.map(m => {
      const label = m.memoEndPoint
      // memoEndPoint is currently displayed
      active = m.memoEndPoint === this.props.routerStore.memoEndPoint
      return {
        label,
        active,
        url: `/kurs-pm/${courseCode}/${label}`
      }
    })
    // memoEndPoint has not been published before, and wasn’t in memoData
    if (!active) {
      courseMemoItems.push({
        label: this.props.routerStore.memoEndPoint,
        active: true,
        url: `/kurs-pm/${courseCode}/${this.props.routerStore.memoEndPoint}`
      })
    }

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.preview}>
            {this.courseSubHeader()}
          </PageTitle>
        </Row>
        <ProgressBar active={this.state.progress} pages={progressBarHeaders} />
        <Row />
        <PageHead semester={semester} memoName={memoName} />
        <ProgressTitle id="progress-title" text={progressTitleHeaders[PROGRESS - 1]} />
        <Row style={{ borderTop: '2px solid rgb(212,212,212)' }} />
        <Row>
          <BreadCrumbs labels={breadCrumbLabels} courseCode={courseCode} />
        </Row>
        <Row>
          <Col lg="3">
            <SideMenu
              courseCode={courseCode}
              courseMemoItems={courseMemoItems}
              backLink="https://www.kth.se"
              labels={sideMenuLabels}
              language={this.props.routerStore.memoData.memoCommonLangAbbr}
            />
          </Col>
          <Col>
            <Row>
              <CourseHeader
                courseMemo={this.props.routerStore.memoEndPoint}
                courseCode={courseCode}
                title={this.props.routerStore.koppsFreshData.title}
                credits={this.props.routerStore.koppsFreshData.credits}
                creditUnitAbbr={this.props.routerStore.koppsFreshData.creditUnitAbbr}
                labels={courseHeaderLabels}
                language={this.props.routerStore.memoData.memoCommonLangAbbr}
              />
            </Row>
            <Row>
              <Col>
                <CoursePresentation
                  introText={this.props.routerStore.sellingText}
                  courseImageUrl={courseImageUrl || ''}
                  semester={this.semester}
                />
                <p>All sections…</p>
                {/* {allSections} */}
              </Col>
              <Col lg="3">
                <CourseFacts
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  labels={courseFactsLabels}
                  department={this.props.routerStore.koppsFreshData.department}
                  memoData={this.props.routerStore.memoData}
                />
                <CourseMemoLinks
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  labels={courseMemoLinksLabels}
                  extraInfo={extraInfo}
                  memoData={this.props.routerStore.memoData}
                  validFromTerm={this.props.routerStore.koppsFreshData.validFromTerm}
                />
                <CourseLinks
                  language={this.props.routerStore.memoData.memoCommonLangAbbr}
                  labels={courseLinksLabels}
                />
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
            onSubmit={() => this.handleAlert('Publish option is not yet implemented!')}
            onBack={() => this.handleAlert('Back option is not yet implemented!')}
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
