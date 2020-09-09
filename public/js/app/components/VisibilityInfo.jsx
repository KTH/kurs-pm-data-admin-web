/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { Button } from 'reactstrap'
import { context, contentParam, isRequired, typeOfHeader } from '../util/fieldsByType'
import PropTypes from 'prop-types'

import i18n from '../../../../i18n'

const VisibilityInfo = ({
  contentId,
  visibleInMemo,
  isEditorOpen,
  onToggleVisibleInMemo,
  onToggleVisibleEditor,
  contentType,
  userLangIndex
}) => {
  const dataOrigin = contentParam(contentId, 'source')

  const isHeaderInConf = !!context[contentId]

  const { isEditable } = context[contentId] || false
  const { sourceInfo, buttons } = i18n.messages[userLangIndex]
  const { fetched } = sourceInfo

  return (
    <span className="section-info word-break">
      <span>
        <span className="section_info_visibility_label">
          {(isRequired(contentId) && (
            <p className="mandatory">
              <b>{sourceInfo[typeOfHeader(contentId)]}</b>
              {dataOrigin && <b className="source">{fetched} </b>}
              {dataOrigin && sourceInfo[dataOrigin]}
            </p>
          )) || (
            <form className="Show--Or--Not--inMemo">
              <span>
                <label htmlFor={'visibilityFor' + contentId} style={{ fontSize: '1rem' }}>
                  <input
                    type="checkbox"
                    id={'visibilityFor' + contentId}
                    name="visibleInMemo"
                    onClick={() => onToggleVisibleInMemo(contentId)}
                    defaultChecked={visibleInMemo || false}
                    style={{ marginRight: '.3em' }}
                  />
                  {sourceInfo.includeInMemo[contentType]}
                </label>
                {isHeaderInConf && dataOrigin && <b className="source">{fetched}</b>}
                {isHeaderInConf && dataOrigin && sourceInfo[dataOrigin]}
              </span>
            </form>
          )}
        </span>
      </span>
      {(!isHeaderInConf || isEditable) && (
        <Button
          className="mb-0 mt-0"
          onClick={() => onToggleVisibleEditor()}
          data-testid={isEditorOpen ? 'btn-close-editor' : 'btn-open-editor'}
        >
          {isEditorOpen ? buttons.closeEditor : buttons.edit}
        </Button>
      )}
    </span>
  )
}

VisibilityInfo.propTypes = {
  contentId: PropTypes.string.isRequired,
  isEditorOpen: PropTypes.bool,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  onToggleVisibleEditor: PropTypes.func,
  contentType: PropTypes.string.isRequired, // add default
  userLangIndex: PropTypes.number.isRequired
}

VisibilityInfo.defaultProps = {
  isEditorOpen: null,
  onToggleVisibleEditor: null
}

export default VisibilityInfo
