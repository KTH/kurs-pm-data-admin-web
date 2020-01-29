/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { FaRegEyeSlash } from 'react-icons/fa'
import { Button } from 'reactstrap'
import { context } from '../util/fieldsByType'

import i18n from '../../../../i18n'

const { messages, buttons } = i18n.messages[1]

const VisibilityInfo = ({
  contentId,
  isRequired = context[contentId].isRequired,
  visibleInMemo,
  onToggleVisibleInMemo
}) => (
  <span className="section_info word-break">
    <span>
      {visibleInMemo ? null : <FaRegEyeSlash className="section_info_visibility_icon" />}
      <span className="section_info_visibility_label">
        {isRequired
          ? messages.section_info_visibility_mandatory
          : (visibleInMemo && messages.section_info_visibility_label_shown) ||
            messages.section_info_visibility_label_hidden}
      </span>
    </span>
    {!isRequired && (
      <Button className="mb-0 mt-0" onClick={() => onToggleVisibleInMemo(contentId)}>
        {visibleInMemo ? buttons.btn_hide_in_memo : buttons.btn_show_in_memo}
      </Button>
    )}
  </span>
)

export default VisibilityInfo
