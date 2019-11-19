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
    const { message } = this.props.routerStore
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
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ] //,
            // toolbar:
            //   'undo redo | formatselect | bold italic backcolor | \
            //   alignleft aligncenter alignright alignjustify | \
            //   bullist numlist outdent indent | removeformat | help'
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}

export default Start
