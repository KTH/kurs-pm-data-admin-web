/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Container, Row } from 'reactstrap'
import ControlButtons from '../components/ControlButtons'
import DropdownSemesters from '../components/DropdownSemesters'
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

  onUpdateState = oneState => {
    this.setState(oneState)
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${encodeURI(Object.keys(oneState))}=${encodeURI(Object.values(oneState))}`
    })
  }

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
              <span>
                <TitleAndInfoModal
                  modalId="choose-semester"
                  titleAndInfo={infoModals.chooseSemester}
                  btnClose={buttons.btnClose}
                />
                <DropdownSemesters
                  items={termsWithCourseRounds}
                  semester={this.state.semester}
                  onChoice={this.onUpdateState}
                />
              </span>
              <span style={this.state.semester ? { marginTop: '50' } : { display: 'none' }}>
                <TitleAndInfoModal
                  modalId="choose-course-round"
                  titleAndInfo={infoModals.chooseRound}
                  btnClose={buttons.btnClose}
                />
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
