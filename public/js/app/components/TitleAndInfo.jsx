import React, { Component } from 'react'
import i18n from '../../../../i18n'
import { InfoModalButton } from '@kth/kth-kip-style-react-components'

const TitleAndInfo = ({ title, shortTitle }) => {
  const infoModalLabels = {
    // will be moved to messages for each
    shortTitle: {
      header: i18n.messages[1].header[shortTitle],
      body: 'Det är viktigt för studenter att veta om det för att planera sina studier för att....',
      btnClose: 'Stäng'
    }
  }
  return (
    <span className="title_and_info">
      <h3 data-testid={shortTitle + '-heading'}>
        {title}
        <InfoModalButton
          modalId={shortTitle + '-infoModal'}
          modalLabels={infoModalLabels.shortTitle} // use later i18n message: infoModalLabels[shortTitle]
        />
      </h3>
    </span>
  )
}

export default TitleAndInfo
