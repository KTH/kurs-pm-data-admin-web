import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Jumbotron, Button } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'

@inject(['routerStore'])
@observer
class Start extends Component {
  state = {
    buttonClicked: false
  }

  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent())
  }

  toggleButton = () => this.setState({ buttonClicked: !this.state.buttonClicked })

  render() {
    const { message, syllabusObjFromKopps } = this.props.routerStore

    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Node-web</h1>
          <h2>You are upp and running kth-node react!</h2>
          <hr className="my-2" />
          <h3>{`Message from routerStore: ${message}`}</h3>
          <Button onClick={this.toggleButton}>Try me</Button>
          <p>{this.state.buttonClicked ? 'Button works!' : ''}</p>
        </Jumbotron>
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
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}

export default Start
