/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Container, Row } from 'reactstrap'
import ControlButtons from '../components/ControlButtons'
import DropdownTerms from '../components/DropdownTerms'
import i18n from '../../../../i18n'
import { PageTitle, ProgressBar, TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

// import { Switch,Route } from 'react-router-dom'

const PROGRESS = 1

@inject(['routerStore'])
@observer
class ChoiceOptions extends Component {
  state = {
    semester: this.props.routerStore.semester
  }

  courseCode = this.props.routerStore.courseCode

  componentDidMount() {}

  render() {
    const { infoModals, pages, pageTitles, buttons } = i18n.messages[1]
    const { course, termsWithCourseRounds } = this.props.routerStore.koppsCourseRounds

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span>
              {this.courseCode +
                ' ' +
                course.title.sv +
                ' ' +
                course.credits +
                ' ' +
                (i18n.isSwedish() ? course.creditUnitAbbr.sv : 'credits')}
            </span>
          </PageTitle>
        </Row>

        <ProgressBar active={PROGRESS} pages={pages} />
        <Container className="sticky-content-section">
          <Row>
            <Col className="menu">
              <TitleAndInfoModal
                modalId="choose-semester"
                titleAndInfo={infoModals.chooseSemester}
                btnClose={buttons.btnClose}
              />
              <span style={{ marginBottom: '50' }}>
                <DropdownTerms items={termsWithCourseRounds} />
              </span>
            </Col>
          </Row>
        </Container>
        <ControlButtons
          progress={PROGRESS}
          semester={this.state.semester}
          alertText="{this.state.alertText}"
          alertIsOpen={false} // this.state.alertIsOpen
        />
      </Container>
    )
  }
}

export default ChoiceOptions
