import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
// TODO: ENGLISH TRANSLATIONS AND MOVE TO MESSAGES
const CollapseMemoIntroduction = ({ translate }) => {
  const { titleMain } = translate
  return (
    <CollapseDetails ariaLabel={titleMain} title={titleMain} yellow>
      <div>
        <h3>Kom i gång snabbt</h3>
        <ol>
          <li>Bläddra igenom alla tabbar/ flikar för att se vilka rubriker som finns</li>
          <li>Gå till sista steget "Granska" för att förstå hur ett färdigt kurs-PM ser ut.</li>
          <li>Klicka på i-ikon vid varje rubrik för att förstå vad rubriken syftar till.</li>
        </ol>
        <h3>Mer hjälp?</h3>
        <p>
          <a href="#intro" target="_blank" className="external-link">
            Introduktion till nya kurs-PM:et
          </a>
        </p>
        <p>
          <a href="#intro" target="_blank" className="external-link">
            Förstå olika delar av kursinformation
          </a>
        </p>
        <p>
          <a href="#intro" target="_blank" className="external-link">
            Hjälp med hur ditt kursupplägg i Canvas ska fungera ihop med det nya kurs-PM:et?
          </a>
        </p>
      </div>
    </CollapseDetails>
  )
}

CollapseMemoIntroduction.propTypes = {
  translate: PropTypes.shape({
    titleMain: PropTypes.string.isRequired,
  }).isRequired,
}

export default CollapseMemoIntroduction
