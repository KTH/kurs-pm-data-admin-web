/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'
import { StickyContainer } from 'react-sticky'
import ProgressTitle from '../components/ProgressTitle'
import i18n from '../../../../i18n'

const PROGRESS = 1

@inject(['routerStore'])
@observer
class ChoiceOptions extends Component {
  state = this.props.routerStore.memoData ? this.props.routerStore.memoData : {}

  isApiExisted = !this.props.routerStore.memoData

  koppsFreshData = this.props.routerStore.koppsFreshData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  componentDidMount() {}

  render() {
    const { pages } = i18n.messages[1]

    return (
      <Container className="memo-container">
        <Row className="mb-4">
          <Col lg="9">
            <ProgressTitle id="progress-title" text={pages[PROGRESS - 1]} />
          </Col>
        </Row>
        <StickyContainer className="sticky-content-section">
          <Row>
            <Col lg="12">
              <h2>Hello</h2>
            </Col>
          </Row>
        </StickyContainer>
      </Container>
    )
  }
}

export default ChoiceOptions
