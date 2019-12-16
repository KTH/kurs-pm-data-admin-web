/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Button } from 'reactstrap'
import EditorPerTitle from '../components/Editor'
import { context, sections } from '../util/fieldsByType'
import axios from 'axios'
import SideMenu from '../components/SideMenu'
import i18n from '../../../../i18n'

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

  render() {
    const { koppsFreshData } = this.props.routerStore
    const { header } = i18n.messages[1]

    return (
      <Container>
        <Row>
          <Col>
            <h1>Skapa nytt kurs-pm</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <SideMenu id="mainMenu" />
          </Col>
          <Col lg="8">
            {sections.map(section => (
              <span key={section.id}>
                <h2 id={section.id} key={'header-' + section.id}>
                  {section.title}
                </h2>
                {section.content.map(title =>
                  context[title].isFromSyllabus ? (
                    <span id={title} key={title}>
                      <h3>{header[title]}</h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: koppsFreshData[context[title].kopps] }}
                      />
                    </span>
                  ) : (
                    <EditorPerTitle
                      id={title}
                      key={title}
                      onEditorChange={this.handleEditorChange}
                    />
                  )
                )}
              </span>
            ))}
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
