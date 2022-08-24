import * as React from 'react'

import { Editor } from '@tinymce/tinymce-react'
import { useStore } from '../../../mobx'
import editorConf from '../../../util/editorInitConf'
import StandardEditorPerTitle from '../StandardEditorPerTitle'
import StandardSectionOrEditor from '../../StandardSectionOrEditor'

const swedishUserLangAbbr = 'sv_SE'

const EditorSimpleElement = () => {
  const editorLabel = 'editor-for-examinationSubSection-simple'

  const htmlContentForSimpleEditor = '<p>Examination will be edited next week after examination day</p>'

  const handleUpdate = () => {}

  return (
    <div>
      <Editor
        id={editorLabel}
        initialValue={htmlContentForSimpleEditor}
        init={editorConf(swedishUserLangAbbr)}
        onEditorChange={handleUpdate}
        aria-label={editorLabel}
      />
    </div>
  )
}
const StandardEditorWithTitleAndLocalState = () => {
  const contentId = 'ethicalApproachSubSection'
  const htmlContent = '<p> Ethical Approach Content For A Second Editor </p>'

  const [typedData, setTypedData] = React.useState(htmlContent)
  const handleUpdate = value => {
    setTypedData(value)
  }

  return (
    <div>
      <StandardEditorPerTitle
        contentId={contentId}
        htmlContent={typedData}
        menuId={`reqToFinal-${contentId}`}
        visibleInMemo
        onSave={handleUpdate}
        onToggleVisibleInMemo={() => {}}
        key={contentId}
      />
    </div>
  )
}
const StandardSectionOrEditorWithStoreState = () => {
  const store = useStore()
  const contentId = 'literature'
  const htmlContent = '<p> Literature Content For A Third Editor with Store State </p>'
  store.setMemoByContentId(contentId, htmlContent)
  const { memoData } = store
  return (
    <div>
      <StandardSectionOrEditor
        contentId={contentId}
        key={contentId}
        memoLangIndex={1}
        onToggleVisibleInMemo={() => {}}
        sectionId="prep"
        userLangIndex={1}
        checkVisibility={() => true}
        htmlContent={memoData[contentId]}
      />
    </div>
  )
}
const EditorsForTest = () => (
  <div>
    <EditorSimpleElement />
    <StandardEditorWithTitleAndLocalState />
    <StandardSectionOrEditorWithStoreState />
  </div>
)

export default EditorsForTest
