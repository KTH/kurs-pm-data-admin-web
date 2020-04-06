import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'

import ControlPanel from '../components/ControlPanel'
import ProgressTitle from '../components/ProgressTitle'
import PageHead from '../components/PageHead'

import i18n from '../../../../i18n'

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

  breadcrumbs = () => {
    const { breadCrumbLabels } = i18n.messages[this.langIndex]
    const { courseCode } = this.state.previewMemo
    return (
      <nav>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link">{breadCrumbLabels.university}</Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link">{breadCrumbLabels.student}</Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link">{breadCrumbLabels.directory}</Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link">{`${breadCrumbLabels.aboutCourse} ${courseCode}`}</Button>
          </BreadcrumbItem>
        </Breadcrumb>
      </nav>
    )
  }

  render() {
    const { progressTitleHeaders, progressBarHeaders, pageTitles } = i18n.messages[this.langIndex]
    const { memoName, semester = '' } = this.state.previewMemo

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
        <Row>{this.breadcrumbs()}</Row>
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
