import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'

@inject(['routerStore'])
@observer
class SideMenu extends Component {
  state = {}

  updateMemoContent = editorContent => {
    this.props.onEditorChange(editorContent, this.props.id)
  }

  render() {
    // const { header } = i18n.messages[1]
    // const { selectedId } = this.props.routerStore
    const { id } = this.props

    return (
      <nav
        id={id}
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

      // <span>
      //   <h3>{header[id]}</h3>
      //   <Editor
      //     id={id}
      //     initialValue={memoData ? memoData[id] : ''}
      //     init={{
      //       height: 500,
      //       menubar: false,
      //       plugins: [
      //         'advlist autolink autosave lists link image imagetools charmap preview anchor',
      //         'searchreplace visualblocks code fullscreen',
      //         'table paste code help wordcount'
      //       ],
      //       language: i18n.isSwedish() ? 'sv_SE' : 'en_En',
      //       toolbar: `code | undo redo | formatselect | bold italic underline subscript superscript charmap |
      //           searchreplace | image | link | restoredraft | fullscreen |
      //           table |
      //           bullist numlist outdent indent | removeformat | help`,
      //       imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
      //       autosave_interval: '60s',
      //       autosave_ask_before_unload: true,
      //       autosave_restore_when_empty: true,
      //       autosave_retention: '1m',
      //       block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4'
      //     }}
      //     onEditorChange={this.updateMemoContent}
      //   />
      // </span>
    )
  }
}
export default SideMenu
