/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button } from 'reactstrap'
import EditorPerTitle from '../components/Editor'
import axios from 'axios'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = this.props.routerStore.memoData

  isApiExisted = !this.props.routerStore.memoData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

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

  doUpdateStates = states => {
    if (states) this.setState(states)
  }

  render() {
    const { koppsFreshData } = this.props.routerStore

    return (
      <Container>
        <Row>
          <h1>Skapa nytt kurs-pm</h1>
        </Row>
        <Row>
          <Col
            xl="4"
            lg="4"
            style={{ backgroundColor: '#005ea4', color: '#ffffff', paddingTop: 'calc(2em + 1px)' }}
          >
            <p style={{ color: '#ffffff', fontWeight: '700' }}>Innehåll och lärandemål</p>
            <p style={{ color: '#ffffff' }}>Lärandemål</p>
            <p style={{ color: '#ffffff', fontWeight: '700' }}>Genomföra kursen</p>
            <p style={{ color: '#ffffff' }}>Detaljplanering</p>
            <p style={{ color: '#ffffff', fontWeight: '700' }}>Examination och slutförande</p>
            <p style={{ color: '#ffffff' }}>Målrelaterade betygskriterier</p>
          </Col>
          <Col xl="8" lg="8">
            <h2>Innehåll och lärandemål</h2>
            <h3>Lärandemål</h3>
            <p dangerouslySetInnerHTML={{ __html: koppsFreshData.goals }} />
            <h2>Genomföra kursen</h2>
            <EditorPerTitle id="planning" onEditorChange={this.handleEditorChange} />
            <h2>Examination och slutförande</h2>
            <EditorPerTitle id="gradingCriteria" onEditorChange={this.handleEditorChange} />
            <br />
            <Button onClick={this.handleConfirm} color="success" style={{ float: 'right' }}>
              Spara
            </Button>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Start
