/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { FaPencilAlt, FaRegEyeSlash } from 'react-icons/fa'
import { Button } from 'reactstrap'
import { context } from '../util/fieldsByType'

import i18n from '../../../../i18n'

const { sourceInfo, buttons } = i18n.messages[Number(i18n.isSwedish())]

const VisibilityInfo = ({
  contentId,
  isRequired = context[contentId].isRequired,
  visibleInMemo,
  isEditorOpen,
  onToggleVisibleInMemo,
  onToggleVisibleEditor
}) => (
  <span className="section_info word-break">
    <span>
      <span className="section_info_visibility_label">
        {isRequired ? (
          <p className="mandatory">
            <b>{sourceInfo.mandatory}</b>|<i>{sourceInfo[context[contentId].source]}</i>
          </p>
        ) : (
          <form className="Show--Or--Not--inMemo">
            <span>
              <label htmlFor={'visibilityFor' + contentId} style={{ fontSize: '1rem' }}>
                <input
                  type="checkbox"
                  id={'visibilityFor' + contentId}
                  name="visibleInMemo"
                  onClick={() => onToggleVisibleInMemo(contentId)}
                  defaultChecked={visibleInMemo}
                  style={{ marginRight: '.3em' }}
                />
                {sourceInfo.includeInMemo}
              </label>
            </span>
          </form>
        )}
      </span>
    </span>
    {context[contentId].isEditable && (
      <Button className="mb-0 mt-0" onClick={() => onToggleVisibleEditor()}>
        <FaPencilAlt className="section_pencil" />
        {isEditorOpen ? 'Stäng/Visa som text' : buttons.edit}
      </Button>
    )}
  </span>
)

export default VisibilityInfo
