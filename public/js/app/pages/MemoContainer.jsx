/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row } from 'reactstrap'
import ControlPanel from '../components/ControlPanel'
import i18n from '../../../../i18n'
import { PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'
// import { Switch,Route } from 'react-router-dom'
import MemoEdition from './MemoEdition'
import PageHead from '../components/PageHead'

const ADMIN = '/kursinfoadmin/kurs-pm-data/'

@inject(['routerStore'])
@observer
class MemoContainer extends Component {
  state = { progress: this.props.progress ? Number(this.props.progress) : 2 }

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  memoEndPoint = this.props.routerStore.memoEndPoint

  componentDidMount() {}

  doUpdateStates = states => {
    if (states) this.setState(states)
  }

  onContinue = () => {
    switch (this.state.progress) {
      default:
        this.setState({ progress: this.state.progress + 1 })
        break
      case 3:
        alert('PUBLISHED')
        break
    }
  }

  onBack = () => {
    switch (this.state.progress) {
      case 2:
        window.location = `${ADMIN}${this.courseCode}?semester=${this.semester}&memoEndPoint=${this.memoEndPoint}`
        break
      default:
        this.setState({ progress: this.state.progress - 1 })
        break
    }
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
            2: <MemoEdition onChange={this.doUpdateStates} />,
            3: <h2>Hej! Det är sista steg</h2>
          }[this.state.progress]
        }
        <Container className="fixed-bottom">
          <ControlPanel
            onSubmit={this.onContinue}
            onBack={this.onBack}
            progress={this.state.progress}
            alertText={this.state.alertText}
            alertIsOpen={this.state.alertIsOpen}
          />
        </Container>
      </Container>
    )
  }
}

export default MemoContainer
