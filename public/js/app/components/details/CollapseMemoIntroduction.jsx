import React from 'react'
import PropTypes from 'prop-types'
import CollapseDetails from './CollapseDetails'
// TODO: ENGLISH TRANSLATIONS AND MOVE TO MESSAGES
const CollapseMemoIntroduction = ({ translate }) => {
  const {
    aboutMemo,
    aboutKursinformation,
    aboutHelpInCanvasAndMemo,
    mainContinue,
    startInfo,
    titleMain,
    open
  } = translate
  return (
    <CollapseDetails className="guidance-per-content" ariaLabel={titleMain} title={titleMain} open>
      {/* <span dangerouslySetInnerHTML={{ __html: startInfo }} /> */}
      {/* <details>
        <summary className="white">{aboutMemo.title}</summary> */}
      <div
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          paddingBottom: '20px',
          width: '1000px'
        }}
      >
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
      {/* <span
          dangerouslySetInnerHTML={{
            __html: aboutMemo.details
          }}
        />
      </details>
      <details>
        <summary className="white">{aboutKursinformation.title}</summary>
        <span
          dangerouslySetInnerHTML={{
            __html: aboutKursinformation.details
          }}
        />
      </details>
      <details>
        <summary className="white">{aboutHelpInCanvasAndMemo.title}</summary>
        <span
          dangerouslySetInnerHTML={{
            __html: aboutHelpInCanvasAndMemo.details
          }}
        />
      <span dangerouslySetInnerHTML={{ __html: mainContinue }} /> */}
      {/* </details> */}
    </CollapseDetails>
  )
}

CollapseMemoIntroduction.propTypes = {
  translate: PropTypes.shape({
    aboutMemo: PropTypes.objectOf(PropTypes.string),
    aboutKursinformation: PropTypes.objectOf(PropTypes.string),
    aboutHelpInCanvasAndMemo: PropTypes.objectOf(PropTypes.string),
    titleMain: PropTypes.string,
    startInfo: PropTypes.string,
    mainContinue: PropTypes.string
  })
  // details: PropTypes.string,
  // title: PropTypes.string
}

export default CollapseMemoIntroduction
