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
class MemoContainer extends Component {
  state = this.props.routerStore.memoData || {}

  courseCode = this.props.routerStore.courseCode

  memoEndPoint = this.props.routerStore.memoEndPoint

  semester = this.props.routerStore.semester

  langIndex = this.props.routerStore.langIndex

  componentDidMount() {
    // console.log('parent state', this.state.ladokRoundIds)
  }

  componentDidUpdate() {
    // console.log('parent state did update', this.state)
  }

  doUpdateStates = states => {
    // console.log('on change update', states)
    if (states)
      this.setState(states, console.log('after on change update', this.state.visibleInMemo))
  }

  handleAlert = (alertTranslationId, alertColor = 'success') => {
    const { alerts } = i18n.messages[this.langIndex]
    this.setState({ alertIsOpen: true, alertText: alerts[alertTranslationId], alertColor })
    setTimeout(() => {
      this.setState({ alertIsOpen: false, alertText: '', alertColor: '' })
    }, 2000)
  }

  onSave = (editorContent, alertTranslationId) => {
    const { courseCode, memoEndPoint } = this
    const body = { courseCode, memoEndPoint, ...editorContent } // containt kopps old data, or it is empty first time
    this.doUpdateStates(editorContent)
    return axios
      .post(
        '/kursinfoadmin/kurs-pm-data/internal-api/draft-updates/' + courseCode + '/' + memoEndPoint,
        body
      )
      .then(() => this.props.routerStore.tempMemoData(body))
      .then(() => this.handleAlert(alertTranslationId))
      .catch(error => console.log(error)) // alert error
  }

  /** * Conrol Panel ** */

  /** * User clicked button to save a draft  ** */
  handleBtnSave = () => {
    const resAfterSavingMemoData = this.onSave(this.state, 'autoSaved')
    return resAfterSavingMemoData
  }

  /** * User clicked button to go to one step back ** */
  onBack = () => {
    const { courseCode, memoEndPoint } = this
    this.handleBtnSave().then(
      setTimeout(() => {
        window.location = `${ADMIN}${courseCode}?memoEndPoint=${memoEndPoint}`
      }, 500)
    )
  }

  /** * User clicked button to go to next step  ** */
  onContinue = () => {
    const { courseCode, memoEndPoint } = this
    // SAVE BEFORE GOT TO NEXT?
    window.location = `${ADMIN}${courseCode}/${memoEndPoint}/preview`
  }

  render() {
    const { pages, pageTitles } = i18n.messages[this.langIndex]
    const { memoName, title, credits, creditUnitAbbr } = this.state

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
        <ProgressBar active={2} pages={pages} />
        <PageHead semester={this.semester} memoName={memoName} />
        <MemoEdition
          onSave={this.onSave}
          onChange={this.doUpdateStates}
          onAlert={this.handleAlert}
        />
        <Container className="fixed-bottom">
          <ControlPanel
            langIndex={this.langIndex}
            onSubmit={this.onContinue}
            onSave={this.handleBtnSave}
            onBack={this.onBack}
            progress={2}
            alertText={this.state.alertText}
            alertIsOpen={this.state.alertIsOpen}
            alertColor={this.state.alertColor || 'success'}
          />
        </Container>
      </Container>
    )
  }
}

export default MemoContainer
