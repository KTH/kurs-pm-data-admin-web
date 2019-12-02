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
          <Col>
            <h1>Skapa nytt kurs-pm</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <nav
              id="mainMenu"
              className="col navbar navbar-expand-lg navbar-light"
              style={{ paddingLeft: '0' }}
            >
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav nav-ancestor">
                  <li>
                    <span className="nav-item ancestor">Innehåll och lärandemål</span>
                  </li>
                </ul>
                <ul className="nav nav-list">
                  <li className="nav-item selected">
                    <a className="nav-link" href="#1">
                      Lärandemål
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-ancestor">
                  <li>
                    <span className="nav-item ancestor">Genomföra kursen</span>
                  </li>
                </ul>
                <ul className="nav nav-list">
                  <li className="nav-item leaf">
                    <a className="nav-link" href="#2">
                      Detaljplanering
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-ancestor">
                  <li>
                    <span className="nav-item ancestor">Examination och slutförande</span>
                  </li>
                </ul>
                <ul className="nav nav-list">
                  <li className="nav-item leaf">
                    <a className="nav-link" href="#3">
                      Målrelaterade betygskriterier
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </Col>
          <Col lg="8">
            <h2>Innehåll och lärandemål</h2>
            <h3 id="1">Lärandemål</h3>
            <p dangerouslySetInnerHTML={{ __html: koppsFreshData.goals }} />
            <h2 id="2">Genomföra kursen</h2>
            <EditorPerTitle id="planning" onEditorChange={this.handleEditorChange} />
            <h2 id="3">Examination och slutförande</h2>
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
