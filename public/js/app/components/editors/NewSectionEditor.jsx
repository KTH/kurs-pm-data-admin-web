/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Editor } from '@tinymce/tinymce-react'
import i18n from '../../../../../i18n'
import { Collapse, ActionModalButton } from '@kth/kth-kip-style-react-components'
import { ExtraHeaderHead } from '../ContentHead'
import VisibilityInfo from '../VisibilityInfo'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import editorConf from '../../util/editorInitConf'
import PropTypes from 'prop-types'

@inject(['routerStore'])
@observer
class NewSectionEditor extends Component {
  state = {
    extraContent:
      this.props.routerStore.memoData[this.props.contentId][this.props.currentIndex] || [],
    isOpen: false,
    showEmptyTitleAlert: false
  }

  userLangIndex = this.props.routerStore.langIndex

  memoLangIndex = this.props.routerStore.memoLangAbbr === 'sv' ? 1 : 0

  static getDerivedStateFromProps(props, state) {
    const { showError } = props
    const { extraContent, showEmptyTitleAlert } = state
    // fast reaction to props change after switch/submit
    if (showError && !showEmptyTitleAlert) {
      return { showEmptyTitleAlert: showError }
    }

    // check if hasEmptyTitle error is fixed and update state
    const { title, htmlContent } = extraContent
    const hasEmptyTitle = !!(title.length === 0)
    const hasEmptyText = !!(htmlContent.length === 0)
    return { showEmptyTitleAlert: hasEmptyTitle && !hasEmptyText }
  }

  componentDidMount() {
    const { extraContent } = this.state

    this.setState({
      isOpen: extraContent.isEmptyNew || !!(extraContent.title.length === 0) || false
    })
  }

  componentDidUpdate() {
    const { uKey, menuId, contentId, currentIndex, routerStore, showError } = this.props
    const { extraContent, showEmptyTitleAlert } = this.state
    // eslint-disable-next-line react/destructuring-assignment
    this.updateExtraHeadersState(contentId, currentIndex, extraContent)
    routerStore.dirtyEditor = uKey

    if (showError && showEmptyTitleAlert) {
      const sectionElement = document.getElementById(menuId)
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  componentWillUnmount() {
    this.onSaveByThisContentId()
  }

  updateExtraHeadersState = () => {
    const { contentId, currentIndex } = this.props
    const { extraContent } = this.state
    const { title, htmlContent } = extraContent
    const hasEmptyTitle = !!(title.length === 0)
    const hasEmptyText = !!(htmlContent.length === 0)
    // full path to routerStore
    this.props.routerStore.updateThisExtraState(
      contentId,
      currentIndex,
      hasEmptyTitle,
      hasEmptyText
    )
  }

  setNewContent = (editorContent) => {
    const { contentId, currentIndex } = this.props
    const { memoData } = this.props.routerStore
    memoData[contentId][currentIndex].htmlContent = editorContent.trim()
  }

  setNewTitle = (event) => {
    event.preventDefault()
    const { contentId, currentIndex } = this.props
    const { memoData } = this.props.routerStore
    const title = event.target.value.trim()
    memoData[contentId][currentIndex].title = title // || (this.memoLangIndex === 1 ? 'Egna rubrik ' + currentIndex : 'New heading ' + currentIndex)
  }

  onRemoveNewSection = (wasEmpty = false) => {
    const { contentId, uKey, currentIndex } = this.props
    this.props.routerStore.dirtyEditor = uKey
    this.props.routerStore.removeExtraContent(contentId, currentIndex)
    if (wasEmpty) this.props.onAlert('removedEmptyContent', 'success', 500)
    else this.props.onAlert('removedAddedContent', 'success', 500)
  }

  onSaveByThisContentId = () => {
    const { contentId, currentIndex, uKey } = this.props
    const { dirtyEditor } = this.props.routerStore
    const latestMemoData = this.props.routerStore.memoData[contentId]
    // thisSectionExist is needed to know if section was deleted before unmounting
    const thisSectionExist = !!this.props.routerStore.memoData[contentId].length > currentIndex

    if (dirtyEditor === uKey) {
      this.props.onSave({ [contentId]: latestMemoData }, 'autoSaved')
    }
    this.props.routerStore.dirtyEditor = ''

    if (thisSectionExist) delete this.props.routerStore.memoData[contentId][currentIndex].isEmptyNew
  }

  toggleVisibleInMemo = () => {
    const { contentId, currentIndex } = this.props
    const { memoData } = this.props.routerStore
    const { visibleInMemo } = memoData[contentId][currentIndex]
    this.props.routerStore.memoData[contentId][currentIndex].visibleInMemo = !visibleInMemo
    this.onSaveByThisContentId()
  }

  onToggleVisibleEditor = () => {
    const { contentId, currentIndex, uKey } = this.props
    const { isOpen } = this.state
    const { memoData } = this.props.routerStore
    const { title, htmlContent } = memoData[contentId][currentIndex]
    const hasEmptyTitle = !!(title.length === 0)
    const hasEmptyText = !!(htmlContent.length === 0)
    if (isOpen) {
      if (
        hasEmptyTitle && // memoData[contentId][currentIndex].title.trim().length === 0 &&
        hasEmptyText
      ) {
        this.onRemoveNewSection(true)

        return false
      }
      if (hasEmptyTitle) {
        this.setState({ showEmptyTitleAlert: true })
        this.props.onAlert('errorEmptyTitle', 'danger')

        return false
      }
      delete this.props.routerStore.memoData[contentId][currentIndex].isEmptyNew
    } else this.props.routerStore.dirtyEditor = uKey

    this.setState({ isOpen: !isOpen })
    return true
  }

  render() {
    const { uKey, contentId, menuId } = this.props
    const { userLangIndex } = this
    const { extraContent, showEmptyTitleAlert, isOpen } = this.state
    const { htmlContent, title, isEmptyNew, visibleInMemo } = extraContent

    const { actionModals, buttons, sourceInfo, memoInfoByUserLang } = i18n.messages[userLangIndex]

    return (
      <span id={menuId} className="Add--New--Title--And--Info">
        {!isOpen && !isEmptyNew && (
          <ExtraHeaderHead
            header={title}
            contentId={contentId}
            memoLangIndex={this.memoLangIndex}
            userLangIndex={userLangIndex}
          />
        )}

        <VisibilityInfo
          contentId={`${contentId}-${uKey}`}
          sectionType="section"
          visibleInMemo={visibleInMemo}
          onToggleVisibleInMemo={this.toggleVisibleInMemo}
          isEditorOpen={isOpen || isEmptyNew}
          onToggleVisibleEditor={this.onToggleVisibleEditor}
          userLangIndex={userLangIndex}
        />
        {(isEmptyNew || isOpen) && (
          <span>
            <Form>
              <FormGroup className="title">
                <Label htmlFor={`headerFor${contentId}-${uKey}`}>{sourceInfo.addNewTitle}</Label>
                <Input
                  type="text"
                  id={`headerFor${contentId}-${uKey}`}
                  onChange={this.setNewTitle}
                  onBlur={this.onSaveByThisContentId}
                  defaultValue={title}
                />
                {showEmptyTitleAlert && (
                  <Label htmlFor={`headerFor${contentId}-${uKey}`} className="error-label">
                    {sourceInfo.errorEmptyTitle}
                  </Label>
                )}
              </FormGroup>
            </Form>
            <Collapse
              alt="Expand this to see a helping text"
              uLabel={contentId}
              color="white"
              buttonText={buttons.showGuidance}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: memoInfoByUserLang[contentId].help || `<p>${sourceInfo.dummyHelpText}</p>`
                }}
              />
            </Collapse>
            <Editor
              id={`editorFor${contentId}-${uKey}`}
              initialValue={htmlContent}
              init={editorConf(userLangIndex === 1 ? 'sv_SE' : null)}
              onEditorChange={this.setNewContent}
              onBlur={this.onSaveByThisContentId}
            />
            <ActionModalButton
              btnLabel={buttons.btnRemoveHeader}
              modalId={`beforeRemoving-${contentId}-${uKey}`}
              type="remove"
              modalLabels={actionModals.newSectionRemove}
              onConfirm={this.onRemoveNewSection}
            />
          </span>
        )}

        {!isOpen &&
          !isEmptyNew &&
          /* is included in memo, preview text without editor */
          ((visibleInMemo && (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  (htmlContent !== '' && htmlContent) ||
                  `<p><i>${sourceInfo.noInfoYet.section}</i></p>`
              }}
            />
          )) ||
            /* editor has content but is not yet included in pm */
            (htmlContent !== '' && ( // TODO: add DEFAULT TEXT
              <span>
                <p>
                  <i>{sourceInfo.notIncludedInMemoYet.section}</i>
                </p>
              </span>
            )))}
      </span>
    )
  }
}

NewSectionEditor.propTypes = {
  contentId: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  htmlContent: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool,
  onAlert: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  routerStore: PropTypes.func,
  showError: PropTypes.bool,
  uKey: PropTypes.string.isRequired
}

NewSectionEditor.defaultProps = {
  htmlContent: ''
}

export default NewSectionEditor
