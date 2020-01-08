import React from 'react'
import { Button } from 'reactstrap'
import { FaRegEyeSlash } from 'react-icons/fa'
import i18n from '../../../../i18n'
import { InfoModalButton } from '@kth/kth-kip-style-react-components'

const TitleAndInfo = ({ title, shortTitle, visibleInMemo }) => {
  const { header, buttons } = i18n.messages[1]
  const infoModalLabels = {
    // will be moved to i18n messages for each
    shortTitle: {
      header: header[shortTitle],
      body: 'Det är viktigt för studenter att veta om det för att planera sina studier för att....',
      btnClose: 'Stäng'
    }
  }

  return (
    <>
      <span className="title_and_info">
        <h3 data-testid={shortTitle + '-heading'}>
          {title}
          <InfoModalButton
            modalId={shortTitle + '-infoModal'}
            modalLabels={infoModalLabels.shortTitle} // use later i18n message: infoModalLabels[shortTitle]
          />
        </h3>
      </span>
      <span className="section_info">
        <span>
          {visibleInMemo ? null : <FaRegEyeSlash className="section_info_visibility_icon" />}
          <span className="section_info_visibility_label">
            {visibleInMemo ? 'Visas i kurs-PM' : 'Döljs i kurs-PM'}
          </span>
        </span>
        <Button style={{ marginTop: 0 }}>
          {visibleInMemo ? buttons.btn_hide_in_memo : buttons.btn_show_in_memo}
        </Button>
      </span>
    </>
  )
}

export default TitleAndInfo
