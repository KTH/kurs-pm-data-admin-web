/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { Button } from 'reactstrap'
import { context } from '../util/fieldsByType'

import i18n from '../../../../i18n'

const { sourceInfo, buttons } = i18n.messages[Number(i18n.isSwedish())]

const VisibilityInfo = ({
  contentId,
  isRequired = (context[contentId] && context[contentId].isRequired) || false,
  visibleInMemo,
  isEditorOpen,
  onToggleVisibleInMemo,
  onToggleVisibleEditor
}) => (
  <span className="section_info word-break">
    <span>
      <span className="section_info_visibility_label">
        {(isRequired && (
          <p className="mandatory">
            <b>{sourceInfo[context[contentId].type]}</b>
            {context[contentId].source && <b className="source">{sourceInfo.fetched} </b>}
            {context[contentId].source && sourceInfo[context[contentId].source]}
          </p>
        )) || (
          <form className="Show--Or--Not--inMemo">
            <span>
              <label htmlFor={'visibilityFor' + contentId} style={{ fontSize: '1rem' }}>
                <input
                  type="checkbox"
                  id={'visibilityFor' + contentId}
                  name="visibleInMemo"
                  onClick={() => onToggleVisibleInMemo(contentId)} // TODO: ADAPT TO EXTRA HEADERS
                  defaultChecked={visibleInMemo}
                  style={{ marginRight: '.3em' }}
                />
                {sourceInfo.includeInMemo}
              </label>
              {context[contentId] && context[contentId].source && (
                <b className="source">{sourceInfo.fetched} </b>
              )}
              {context[contentId] &&
                context[contentId].source &&
                sourceInfo[context[contentId].source]}
            </span>
          </form>
        )}
      </span>
    </span>
    {(!context[contentId] || context[contentId].isEditable) && (
      <Button className="mb-0 mt-0" onClick={() => onToggleVisibleEditor()}>
        {isEditorOpen ? buttons.closeEditor : buttons.edit}
      </Button>
    )}
  </span>
)

export default VisibilityInfo
