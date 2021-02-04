import React from 'react'
import PropTypes from 'prop-types'
import CollapseDetails from './CollapseDetails'

const CollapseMemoIntroduction = ({ translate }) => {
  const {
    aboutMemo,
    aboutKursinformation,
    aboutHelpInCanvasAndMemo,
    mainContinue,
    startInfo,
    titleMain
  } = translate
  return (
    <CollapseDetails
      // className="details-about-each-section"
      ariaLabel={translate}
      title={titleMain}
    >
      <span dangerouslySetInnerHTML={{ __html: startInfo }} />
      <details>
        <summary className="white">{aboutMemo.title}</summary>
        <span
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
      </details>
      <span dangerouslySetInnerHTML={{ __html: mainContinue }} />
    </CollapseDetails>
  )
}

CollapseMemoIntroduction.propTypes = {
  translate: PropTypes.objectOf,
  details: PropTypes.string,
  title: PropTypes.string
}

export default CollapseMemoIntroduction
