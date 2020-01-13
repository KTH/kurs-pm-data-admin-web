/* eslint-disable react/no-danger */
/* eslint-disable-next-line no-unused-vars */
import React from 'react'
import { FaRegEyeSlash } from 'react-icons/fa'
import { Button } from 'reactstrap'
import { TitleAndInfoModal } from '@kth/kth-kip-style-react-components'

import i18n from '../../../../i18n'

const { memoHeadings, buttons } = i18n.messages[1]

const Section = ({ title, visibleInMemo, toggleVisibleInMemo, html }) => (
  <span id={title} key={title}>
    <TitleAndInfoModal
      modalId={title}
      titleAndInfo={memoHeadings[title]}
      btnClose={buttons.btnClose}
    />
    <span className="section_info">
      <span>
        {visibleInMemo ? null : <FaRegEyeSlash className="section_info_visibility_icon" />}
        <span className="section_info_visibility_label">
          {visibleInMemo ? 'Visas i kurs-PM' : 'Döljs i kurs-PM'}
        </span>
      </span>
      <Button style={{ marginTop: 0 }} onClick={() => toggleVisibleInMemo(title)}>
        {visibleInMemo ? buttons.btn_hide_in_memo : buttons.btn_show_in_memo}
      </Button>
    </span>

    <span dangerouslySetInnerHTML={{ __html: html }} />
  </span>
)

export default Section
