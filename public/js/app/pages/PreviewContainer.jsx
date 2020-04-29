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

const PROGRESS = 3

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
    const { courseFactsLabels } = i18n.messages[
      this.state.previewMemo.memoCommonLangAbbr === 'en' ? 0 : 1
    ]
    const { memoName, semester = '', courseCode } = this.state.previewMemo

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
            />
          </Col>
          <Col>
            <Row>
              <h2>Course Header</h2>
              {/* <CourseHeader
                courseMemo={routerStore.memoEndPoint}
                courseCode={this.courseCode}
                title={this.title}
                credits={this.credits}
                creditUnitAbbr={this.creditUnitAbbr}
                language={routerStore.language}
              /> */}
            </Row>
            <Row>
              <Col>
                <h3>Course Presentation</h3>
                {/* <CoursePresentation
                  introText={this.introText}
                  courseImageUrl={courseImageUrl}
                  semester={this.semester}
                /> */}
                <p>All sections…</p>
                {/* {allSections} */}
              </Col>
              <Col lg="3">
                <CourseFacts
                  department={this.props.routerStore.koppsFreshData.department}
                  memoData={this.props.routerStore.memoData}
                  labels={courseFactsLabels}
                  language={this.state.previewMemo.memoCommonLangAbbr}
                />
                <h2>Course Links</h2>
                {/* <CourseLinks language={routerStore.memoLanguage} /> */}
                <h2>Course Contacts</h2>
                {/* <CourseContacts
                  language={routerStore.memoLanguage}
                  memoData={routerStore.memoData}
                /> */}
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
