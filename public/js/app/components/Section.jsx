/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { FaRegEyeSlash } from 'react-icons/fa'
import { Button } from 'reactstrap'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

import i18n from '../../../../i18n'

const { messages, memoHeadings, buttons } = i18n.messages[1]

const VisibilityInfo = ({ contentId, isRequired, visibleInMemo, onToggleVisibleInMemo }) => (
  <span className="section_info word-break">
    <span>
      {visibleInMemo ? null : <FaRegEyeSlash className="section_info_visibility_icon" />}
      <span className="section_info_visibility_label">
        {visibleInMemo
          ? isRequired
            ? messages.section_info_visibility_mandatory
            : messages.section_info_visibility_label_shown
          : messages.section_info_visibility_label_hidden}
      </span>
    </span>
    {!isRequired && (
      <Button
        style={{ marginTop: 0, marginBottom: 0 }}
        onClick={() => onToggleVisibleInMemo(contentId)}
      >
        {visibleInMemo ? buttons.btn_hide_in_memo : buttons.btn_show_in_memo}
      </Button>
    )}
  </span>
)

const Section = ({ contentId, menuId, isRequired, visibleInMemo, onToggleVisibleInMemo, html }) => (
  <span id={menuId} key={contentId}>
    <TitleAndInfoModal
      modalId={contentId}
      titleAndInfo={memoHeadings[contentId]}
      btnClose={buttons.btnClose}
    />
    <VisibilityInfo
      contentId={contentId}
      isRequired={isRequired}
      visibleInMemo={visibleInMemo}
      onToggleVisibleInMemo={onToggleVisibleInMemo}
    />

    <span dangerouslySetInnerHTML={{ __html: html }} />
  </span>
)

export default Section
