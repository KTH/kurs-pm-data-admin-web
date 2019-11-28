/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'
import EditorPerTitle from '../components/Editor'
import axios from 'axios'
import i18n from '../../../../i18n'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = this.props.routerStore.memoData

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  handleEditorChange = (editorContent, contentHeader) => {
    this.setState({
      [contentHeader]: editorContent
    })
    console.log('Content was updated:', this.state)
  }

  handleConfirm = () => {
    const body = this.state
    // {
    //   obligatory: this.props.routerStore.syllabusObjFromKopps,
    //   editable: this.state
    // }
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
    const { syllabusObjFromKopps } = this.props.routerStore

    return (
      <div>
        <h1>Skapa nytt kurs-pm</h1>
        <h2>Innehåll och lärandemål</h2>
        <h3>Lärandemål</h3>
        <p dangerouslySetInnerHTML={{ __html: syllabusObjFromKopps.goals }} />
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
      </div>
    )
  }
}

export default Start
