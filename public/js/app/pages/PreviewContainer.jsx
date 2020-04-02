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
import axios from 'axios'

const ADMIN = '/kursinfoadmin/kurs-pm-data/'

@inject(['routerStore'])
@observer
class PreviewContainer extends Component {
  state = {
    progress: this.props.progress ? Number(this.props.progress) : 3,
    updatedMemo: this.props.routerStore.memoData
  }

  langIndex = this.props.routerStore.langIndex

  componentDidMount() {
    console.log('parent state', this.state.updatedMemo.ladokRoundIds)
  }

  componentDidUpdate() {
    console.log('parent state did update', this.state.updatedMemo)
  }

  doUpdateStates = states => {
    if (states) this.setState(states)
  }

  handleAlert = alertText => {
    this.setState({ alertIsOpen: true, alertText })
    setTimeout(() => {
      this.setState({ alertIsOpen: false, alertText: '' })
    }, 2000)
  }

  onSave = (editorContent, alertType) => {
    const { alerts } = i18n.messages[this.langIndex]
    const { memoEndPoint } = editorContent
    const { examinationModules, scheduleDetails } = editorContent // because koppsFreshData contains them as well
    const body = {
      ...editorContent, // containt kopps old data, or it is empty first time
      ...this.props.routerStore.koppsFreshData, // update memo data with fresh kopps data or fill in empty data if it's first time
      ...examinationModules, // update it again from editor content because it was overriden by koppsFreshData default values
      ...scheduleDetails // update it again from editor content because it was overriden by koppsFreshData default values
    }
    this.doUpdateStates({ updatedMemo: editorContent })
    console.log('Content is submited to parent, preparing to save changes:', body)
    return axios
      .post('/kursinfoadmin/kurs-pm-data/internal-api/draft-updates/' + memoEndPoint, body)
      .then(() => this.props.routerStore.tempMemoData(body))
      .then(() => this.handleAlert(alerts[alertType]))
      .catch(error => console.log(error)) // alert error
  }

  /** * Conrol Panel ** */

  /** * User clicked button to save a draft  ** */
  handleBtnSave = () => {
    const res = this.onSave(this.state.updatedMemo, 'autoSaved')
    return res
  }

  handleBackSave = () => {
    const { courseCode, memoEndPoint } = this.state.updatedMemo
    this.handleBtnSave().then(
      setTimeout(() => {
        window.location = `${ADMIN}${courseCode}?memoEndPoint=${memoEndPoint}`
      }, 500)
    )
  }

  /** * User clicked button to go to next step  ** */
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

  /** * User clicked button to go to one step back ** */
  onBack = () => {
    switch (this.state.progress) {
      case 2:
        // TODO: ERROR HANTERING
        this.handleBackSave()
        break
      default:
        this.setState({ progress: this.state.progress - 1 })
        break
    }
  }

  render() {
    const { pages, pageTitles } = i18n.messages[this.langIndex]
    const { title, credits, creditUnitAbbr } = this.props.routerStore.koppsFreshData
    const { memoName, semester = '' } = this.state.updatedMemo

    return (
      <Container className="kip-container" style={{ marginBottom: '115px' }}>
        <Row>
          <PageTitle id="mainHeading" pageTitle={pageTitles.new}>
            <span>
              {this.state.updatedMemo.courseCode +
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
        <PageHead semester={semester} memoName={memoName} />
        {
          {
            2: <MemoEdition onSave={this.onSave} onChange={this.doUpdateStates} />,
            3: (
              <>
                <h2>Hej! Det är sista steg</h2>
                <p>Lorem ipsum</p>
              </>
            )
          }[this.state.progress]
        }
        <Container className="fixed-bottom">
          <ControlPanel
            langIndex={this.langIndex}
            onSubmit={this.onContinue}
            onSave={this.handleBtnSave}
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

export default PreviewContainer
