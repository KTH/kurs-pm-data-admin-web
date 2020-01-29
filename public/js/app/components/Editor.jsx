import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'
import { FaRegEyeSlash } from 'react-icons/fa'
import i18n from '../../../../i18n'
import { Collapse } from '@kth/kth-kip-style-react-components'
import ContentHead from './ContentHead'

@inject(['routerStore'])
@observer
class EditorPerTitle extends Component {
  updateMemoContent = editorContent => {
    this.props.onEditorChange(editorContent, this.props.contentId)
  }

  toggleVisibleInMemo = () => {
    this.props.onToggleVisibleInMemo(this.props.contentId)
  }

  render() {
    const { memoData, defaultValues } = this.props.routerStore
    const { buttons } = i18n.messages[1]
    const { contentId, menuId, visibleInMemo } = this.props

    return (
      <span id={menuId}>
        <ContentHead contentId={contentId} />
        <span className="section_info">
          <span>
            {visibleInMemo ? null : <FaRegEyeSlash className="section_info_visibility_icon" />}
            <span className="section_info_visibility_label">
              {visibleInMemo ? 'Visas i kurs-PM' : 'Döljs i kurs-PM'}
            </span>
          </span>
          <Button className="mb-0 mt-0" onClick={this.toggleVisibleInMemo}>
            {visibleInMemo ? buttons.btn_hide_in_memo : buttons.btn_show_in_memo}
          </Button>
        </span>
        <span style={visibleInMemo ? {} : { display: 'none' }}>
          <Collapse alt="Expand this" uLabel={contentId} color="white" buttonText="Hjälptext">
            <p>Hjälptext som hjälper</p>
          </Collapse>
          <Editor
            id={'editorFor' + contentId}
            initialValue={
              (memoData && memoData[contentId] !== '' && memoData[contentId]) ||
              defaultValues[contentId] ||
              ''
            }
            init={{
              // min_height: 100,
              menubar: false,
              plugins: [
                'advlist autolink autoresize autosave lists link image imagetools charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'table paste code help wordcount'
              ],
              language: i18n.isSwedish() ? 'sv_SE' : null,
              toolbar: `code | undo redo | formatselect | bold italic underline subscript superscript charmap |
                  searchreplace | image | link | restoredraft | fullscreen |
                  table | 
                  bullist numlist outdent indent | removeformat | help`,
              imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
              autosave_interval: '60s',
              autosave_ask_before_unload: true,
              autosave_restore_when_empty: true,
              autosave_retention: '1m',
              block_formats: 'Paragraph=p; Header 4=h4'
            }}
            onEditorChange={this.updateMemoContent}
            onBlur={this.props.onBlur}
          />
        </span>
      </span>
    )
  }
}
export default EditorPerTitle
