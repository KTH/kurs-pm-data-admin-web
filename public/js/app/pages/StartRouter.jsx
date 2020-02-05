/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row } from 'reactstrap'
import Start from './Start'
import ChoiceOptions from './ChoiceOptions'
import ControlButtons from '../components/ControlButtons'
import PageHead from '../components/PageHead'
import i18n from '../../../../i18n'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class StartRouter extends Component {
  state = { progress: this.props.progress ? Number(this.props.progress) : 1 }

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  componentDidMount() {}

  doUpdateStates = states => {
    if (states) this.setState(states)
  }

  render() {
    const { pages, pageTitles } = i18n.messages[1]
    const { title, credits, creditUnitAbbr } = this.props.routerStore.koppsFreshData

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span>
              {this.courseCode +
                ' ' +
                title +
                ' ' +
                credits +
                ' ' +
                (i18n.isSwedish() ? creditUnitAbbr : 'credits')}
            </span>
          </PageTitle>
        </Row>
        <ProgressBar active={this.state.progress} pages={pages} />
        <PageHead semester={this.props.routerStore.semester} />
        {
          {
            1: <ChoiceOptions onChange={this.doUpdateStates} />,
            2: <Start onChange={this.doUpdateStates} />,
            3: <h2>Hej! Det är sista steg</h2>
          }[this.state.progress]
        }
        <ControlButtons
          onClick={this.doUpdateStates}
          progress={this.state.progress}
          alertText={this.state.alertText}
          alertIsOpen={this.state.alertIsOpen}
        />
      </Container>
    )
  }
}

export default StartRouter
