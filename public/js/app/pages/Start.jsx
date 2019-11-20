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

  submit = () => {
    console.log('Content was submited:', this.state.editorContent)
  }

  toggleButton = () => this.setState({ buttonClicked: !this.state.buttonClicked })

  render() {
    const { message, syllabusObjFromKopps } = this.props.routerStore

    return (
      <div>
        <h2>Lärandemål</h2>
        <p dangerouslySetInnerHTML={{ __html: syllabusObjFromKopps.goals }} />
        <h2>Målrelaterade betygskriterier</h2>
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
            toolbar: `code | undo redo | formatselect  charmap | bold italic underline subscript superscript| searchreplace | image | link | restoredraft | fullscreen |
              table tabledelete | tableprops tablerowprops tablecellprops | 
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
        <Button onClick={this.submit}>Submit</Button>
      </div>
    )
  }
}

export default Start
