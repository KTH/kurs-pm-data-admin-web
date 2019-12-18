/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Route } from 'react-router-dom'

import EditorPerTitle from '../components/Editor'
import { context, sections } from '../util/fieldsByType'
import axios from 'axios'
import SideMenu from '../components/SideMenu'
import i18n from '../../../../i18n'
import { ProgressBar } from '@kth/kth-kip-style-react-components'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = this.props.routerStore.memoData

  isApiExisted = !this.props.routerStore.memoData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  componentDidMount() {
    this.scrollIntoView()
  }

  handleEditorChange = (editorContent, contentHeader) => {
    this.setState({
      [contentHeader]: editorContent
    })
    console.log('Content was updated:', this.state)
  }

  handleConfirm = () => {
    const { courseCode, semester } = this
    const start = {
      // It will be needed at the stage when we get 'fresh' data from Kopps
      _id: courseCode + semester,
      courseCode,
      semester
    }
    const body = this.isApiExisted
      ? this.state
      : { ...start, ...this.props.routerStore.koppsFreshData, ...this.state }

    console.log('Content is submited, preparing to save changes:', this.state)
    return axios
      .post(
        '/kursinfoadmin/kurs-pm-data/internal-api/' + this.courseCode + '/' + this.semester,
        body
      ) // this.props.routerStore.doUpsertItem(body, 'SF1624', '20191')
      .then(() => console.log('Success handleConfirm'))
      .catch(error => console.log('Error handleConfirm', error))
  }

  toggleViewMode = () => {
    this.setState(state => ({ singleMode: !state.singleMode }), this.scrollIntoView)
  }

  scrollIntoView = () => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  renderSingleView = ({ location }) => {
    const { koppsFreshData } = this.props.routerStore

    const sectionId = location.hash.substr(1)
    const section = context[sectionId]

    if (!section) return null

    if (!section.isFromSyllabus)
      return (
        <>
          <h2>{section.title}</h2>
          <EditorPerTitle id={sectionId} onEditorChange={this.handleEditorChange} />
        </>
      )

    const text = section.kopps ? (
      // eslint-disable-next-line react/no-danger
      <p dangerouslySetInnerHTML={{ __html: koppsFreshData[section.kopps] }} />
    ) : (
      <p />
    )

    return (
      <>
        <h2>{section.title}</h2>

        <p>{text}</p>
      </>
    )
  }

  renderScrollView = () => {
    const { koppsFreshData } = this.props.routerStore
    const { header } = i18n.messages[1]

    return sections.map(section => (
      <span key={section.id}>
        <h2 id={section.id} key={'header-' + section.id}>
          {section.title}
        </h2>
        {section.content.map(title =>
          context[title].isFromSyllabus ? (
            <span id={title} key={title}>
              <h3>{header[title]}</h3>
              <p dangerouslySetInnerHTML={{ __html: koppsFreshData[context[title].kopps] }} />
            </span>
          ) : (
            <EditorPerTitle id={title} key={title} onEditorChange={this.handleEditorChange} />
          )
        )}
      </span>
    ))
  }

  render() {
    const { pages } = i18n.messages[1]

    return (
      <Container>
        <Row>
          <Col lg="10">
            <h1>Skapa nytt kurs-pm</h1>
          </Col>
          <Col lg="2">
            <Button
              onClick={this.toggleViewMode}
              color="info"
              size="sm"
              style={{ marginTop: '1em' }}
            >
              {this.state.singleMode ? 'Switch to Scroll View' : 'Switch to Single View'}
            </Button>
          </Col>
        </Row>
        <ProgressBar active={2} pages={pages} />
        <Row>
          <Col lg="4">
            <SideMenu id="mainMenu" />
          </Col>
          <Col lg="8">
            {this.state.singleMode ? (
              <Route render={this.renderSingleView} />
            ) : (
              this.renderScrollView()
            )}
            <Button onClick={this.handleConfirm} color="success" style={{ float: 'right' }}>
              Spara
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Start
