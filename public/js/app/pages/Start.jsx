/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = {
    editorContent: '',
    buttonClicked: false
  }

  courseCode = this.props.routerStore.courseCode

  semester = this.props.routerStore.semester

  handleEditorChange = editorContent => {
    this.setState({
      editorContent
    })
    console.log('Content was updated:', this.state.editorContent)
  }

  handleConfirm = () => {
    const body = {
      koppsObject: this.props.routerStore.syllabusObjFromKopps,
      editorContent: this.state.editorContent
    }
    console.log('Content is submited, preparing to save changes:', this.state.editorContent)
    return axios
      .post('/kursinfoadmin/kurs-pm-data/intern-api/' + this.courseCode + '/' + this.semester, body) // this.props.routerStore.doUpsertItem(body, 'SF1624', '20191')
      .then(() => console.log('Success handleConfirm'))
      .catch(error => console.log('Error handleConfirm', error))
  }

  toggleButton = () => this.setState({ buttonClicked: !this.state.buttonClicked })

  render() {
    const { message, memoData, syllabusObjFromKopps } = this.props.routerStore

    return (
      <div>
        <h1>Skapa nytt kurs-pm</h1>
        <h2>Innehåll och lärandemål</h2>
        <h3>Lärandemål</h3>
        <p dangerouslySetInnerHTML={{ __html: syllabusObjFromKopps.goals }} />
        <h2>Examination och slutförande</h2>
        <h3>Målrelaterade betygskriterier</h3>
        <Editor
          id="editor1"
          initialValue={memoData ? memoData.betygskriterier : ''}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink autosave lists link image imagetools charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'table paste code help wordcount'
            ],
            language: 'sv_SE',
            toolbar: `code | undo redo | formatselect | bold italic underline subscript superscript charmap |
              searchreplace | image | link | restoredraft | fullscreen |
              table | 
              bullist numlist outdent indent | removeformat | help`,
            imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
            autosave_interval: '60s',
            autosave_ask_before_unload: true,
            autosave_restore_when_empty: true,
            autosave_retention: '1m',
            block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4'
          }}
          onEditorChange={this.handleEditorChange}
        />
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
