import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../i18n'

@inject(['routerStore'])
@observer
class EditorPerTitle extends Component {
  state = {}

  updateMemoContent = editorContent => {
    this.props.onEditorChange(editorContent, this.props.id)
  }

  render() {
    const { memoData } = this.props.routerStore
    const { header } = i18n.messages[1]
    const { id } = this.props

    return (
      <span id={id}>
        <h3>{header[id]}</h3>
        <Editor
          id={'editorFor' + id}
          initialValue={memoData ? memoData[id] : ''}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink autosave lists link image imagetools charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'table paste code help wordcount'
            ],
            language: i18n.isSwedish() ? 'sv_SE' : 'en_En',
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
          onEditorChange={this.updateMemoContent}
        />
      </span>
    )
  }
}
export default EditorPerTitle
