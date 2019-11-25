/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = {
    editorContent: '',
    buttonClicked: false
  }

  handleEditorChange = editorContent => {
    this.setState({
      editorContent
    })
    console.log('Content was updated:', this.state.editorContent)
  }

  handleConfirm = () => {
    console.log('Content was submited:', this.state.editorContent)
  }

  toggleButton = () => this.setState({ buttonClicked: !this.state.buttonClicked })

  render() {
    const { message, syllabusObjFromKopps } = this.props.routerStore

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
          // initialValue={`<p>Lärandemål from kopps:<p> ${syllabusObjFromKopps.goals}`}
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
            autosave_interval: '5s',
            autosave_ask_before_unload: true,
            autosave_restore_when_empty: true,
            autosave_retention: '1m',
            block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3'
          }}
          onEditorChange={this.handleEditorChange}
        />
        <Button onClick={this.handleConfirm}>Button</Button>
      </div>
    )
  }
}

export default Start
