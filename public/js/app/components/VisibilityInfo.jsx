/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { context, contentParam, isRequired, typeOfHeader } from '../util/fieldsByType'

import i18n from '../../../../i18n'

const VisibilityInfo = ({
  contentId,
  visibleInMemo,
  isEditorOpen,
  onToggleVisibleInMemo,
  onToggleVisibleEditor,
  sectionType,
  userLangIndex,
  contentName,
}) => {
  const dataOrigin = contentParam(contentId, 'source')

  const isHeaderInConf = !!context[contentId]

  const { isEditable } = context[contentId] || false
  const { sourceInfo, buttons, memoTitlesByMemoLang: memoTitles } = i18n.messages[userLangIndex]
  const { fetched } = sourceInfo
  return (
    <span className="section-info word-break">
      <span>
        <span className="section_info_visibility_label">
          {(isRequired(contentId) && (
            <p className="mandatory" data-testid="data-origin">
              <b>{sourceInfo[typeOfHeader(contentId)]}</b>
              {dataOrigin && <b className="source">{fetched} </b>}
              {dataOrigin && sourceInfo[dataOrigin]}
            </p>
          )) || (
            <form className="Show--Or--Not--inMemo">
              <div className="form-check form-group">
                <input
                  className="form-check-input"
                  data-testid={`checkbox-visibility-${contentId}`}
                  type="checkbox"
                  id={'visibilityFor' + contentId}
                  name="visibleInMemo"
                  onClick={() => onToggleVisibleInMemo(contentId)}
                  defaultChecked={visibleInMemo || false}
                  style={{ marginRight: '.3em' }}
                />
                <label
                  className="form-control-label"
                  data-testid="label-visibility"
                  htmlFor={'visibilityFor' + contentId}
                  style={{ fontSize: '1rem' }}
                >
                  {' '}
                  {sourceInfo.includeInMemo[sectionType]}
                </label>
                {isHeaderInConf && dataOrigin && <b className="source">{fetched} </b>}
                {isHeaderInConf && dataOrigin && sourceInfo[dataOrigin]}
              </div>
            </form>
          )}
        </span>
      </span>
      {(!isHeaderInConf || isEditable) && (
        <Button
          aria-label={`${isEditorOpen ? buttons.closeEditor : buttons.edit} ${
            memoTitles[contentId] || memoTitles[contentId.substring(0, contentId.length - 10)] || contentName
          }`}
          className="mb-0 mt-0"
          onClick={() => onToggleVisibleEditor()}
          data-testid={isEditorOpen ? `btn-close-editor-${contentId}` : `btn-open-editor-${contentId}`}
        >
          {isEditorOpen ? buttons.closeEditor : buttons.edit}
        </Button>
      )}
    </span>
  )
}

VisibilityInfo.propTypes = {
  contentId: PropTypes.string.isRequired,
  contentName: PropTypes.string,
  isEditorOpen: PropTypes.bool,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  onToggleVisibleEditor: PropTypes.func,
  sectionType: PropTypes.string.isRequired, // add default
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

VisibilityInfo.defaultProps = {
  isEditorOpen: null,
  onToggleVisibleEditor: null,
  contentName: '',
}

export default VisibilityInfo
