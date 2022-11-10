import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

const Introduction = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Vad är kurs-PM?</h3>
      <p>
        Kurs-PM är den övergripande planen som hjälper studenter att förbereda sig och planera för kursens genomförande,
        både innan kursstart och under kursens gång.
      </p>
    </>
  ) : (
    <>
      <h3>What is a course memo?</h3>
      <p>
        The course memo is the overall plan that helps the student to prepare and plan for the implementation of the
        course, both before the start of the course and during the course.
      </p>
    </>
  )

Introduction.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const IntroductionEdit = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Kurs-PM versionshanteras</h3>
      <p>
        När du gör ändringar av kurs-PM skapas en ny version. Den senaste versionen visas på sidan ”Förbereda och gå
        kurs”. Alla versioner visas på sidan ”Arkiv”.
      </p>
    </>
  ) : (
    <>
      <h3>Course memos exist in different versions</h3>
      <p>
        When you make changes to the course memo, a new version is created. The latest version appears on the “Prepare
        and take a course” page. The “Archive” page displays all versions of a course memo.
      </p>
    </>
  )

IntroductionEdit.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const GetStarted = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Kom i gång snabbt</h3>
      <ul>
        <li>Bläddra igenom alla flikar för att se vilka rubriker som finns</li>
        <li>
          Gå till sista steget &rdquo;Granska och publicera&rdquo; för att se hur ditt kurs-PM kommer att se ut när det
          är publicerat
        </li>
        <li>Klicka på i-ikonen vid en rubrik för att förstå vad den syftar till</li>
        <li>
          Använd &rdquo;Visa vägledning&rdquo; för att få guidning i hur du skriver innehåll för den specifika rubriken
        </li>
        <li>
          När du är klar, välj &rdquo;Avsluta med utkast&rdquo; eller &rdquo;Granska&rdquo; för att fortsätta till
          publicering.
        </li>
      </ul>
    </>
  ) : (
    <>
      <h3>Get started quickly</h3>
      <ul>
        <li>Look through all tabs to see which headings are available</li>
        <li>Go to the last step, &ldquo;Preview and publish,&rdquo; to get a sense of a completed course memo</li>
        <li>Click on the i-icon next to each heading to understand the heading’s intended use</li>
        <li>Click on &ldquo;Show guidance&rdquo; for guidance on how to write content under the specific heading</li>
        <li>
          When you have finished, select &ldquo;Exit (save draft)&rdquo; or &ldquo;Preview&rdquo; to proceed to the
          publish step.
        </li>
      </ul>
    </>
  )

GetStarted.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const InformStudents = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Hur blir ditt kurs-PM bra för studenter?</h3>
      <p>För att det ska bli tydligt och effektivt för studenter att ta till sig information är det viktigt att du:</p>
      <ul>
        <li>Publicerar kurs-PM innan kursstart så att studenter hinner förbereda sig</li>
        <li>
          Ser över strukturen i kursrummet för att undvika att ha dubblerad information i ditt kursrum och kurs-PM
        </li>
        <li>
          Länkar till ditt kurs-PM från kursrummet, se&nbsp;
          <a
            href="https://intra.kth.se/utbildning/systemstod/canvas/guider/kursoversikt-1.1059436"
            target="_blank"
            className="external-link"
            rel="noreferrer"
          >
            Funktionen Kursöversikt i Canvas
          </a>
        </li>
      </ul>
    </>
  ) : (
    <>
      <h3>How to create a course memo that is functional for the students</h3>
      <p>To make it clear and efficient for students to absorb information, please:</p>
      <ul>
        <li>Publish the course memo well in advance of the course start so that students have time to prepare</li>
        <li>
          Reflect on whether you should change the course room structure to avoid duplicated information in your course
          room and the course memo
        </li>
        <li>
          Add a link to the course memo in the course room. See&nbsp;
          <a
            href="https://intra.kth.se/en/utbildning/systemstod/canvas/guider/kursoversikt-1.1059436"
            target="_blank"
            className="external-link"
            rel="noreferrer"
          >
            See The Syllabus function in Canvas for more information.
          </a>
        </li>
      </ul>
    </>
  )

InformStudents.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const InformStudentsEdit = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Informera dina studenter om gjorda ändringar</h3>
      <p>Informera dina studenter om att du har gjort ändringar i ditt kurs-PM. Ange också vad du har ändrat.</p>
    </>
  ) : (
    <>
      <h3>Inform your students of changes made</h3>
      <p>Inform your students that you have made changes to your course memo. Also, specify what you have changed.</p>
    </>
  )

InformStudentsEdit.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

// eslint-disable-next-line react/prop-types
const MoreHelp = ({ langAbbr, isDraftOfPublished }) => {
  const userManual = isDraftOfPublished ? 'andra-publicerat-kurs-pm-1.1184949' : 'skapa-publicera-nytt-1.1184947'
  return langAbbr === 'sv' ? (
    <>
      <h3>Mer hjälp?</h3>
      <p>
        <a
          href="https://intra.kth.se/utbildning/systemstod/om-kursen/kurs-pm/riktilinjer-1.1184855"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Riktlinjer för kurs-PM
        </a>
      </p>
      <p>
        <a
          href={`https://intra.kth.se/utbildning/systemstod/om-kursen/kurs-pm/manual/${userManual}`}
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Användarmanual för kurs-PM
        </a>
      </p>
      <p>
        För support, kontakta:&nbsp;
        <a href="mailto:it-support@kth.se"> it-support@kth.se</a>
      </p>
    </>
  ) : (
    <>
      <h3>Need more help?</h3>
      <p>
        <a
          href="https://intra.kth.se/en/utbildning/systemstod/om-kursen/kurs-pm/riktilinjer-1.1184855"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Guideline on course memo
        </a>
      </p>
      <p>
        <a
          href={`https://intra.kth.se/en/utbildning/systemstod/om-kursen/kurs-pm/manual/${userManual}`}
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          User manual for course memo
        </a>
      </p>
      <p>
        For more support, please contact:&nbsp;
        <a href="mailto:it-support@kth.se"> it-support@kth.se</a>
      </p>
    </>
  )
}

MoreHelp.propTypes = {
  langAbbr: PropTypes.string.isRequired,
  isDraftOfPublished: PropTypes.bool.isRequired,
}

const HelpEdit = ({ langAbbr, isDraftOfPublished }) => (
  <div>
    <IntroductionEdit langAbbr={langAbbr} />
    <InformStudentsEdit langAbbr={langAbbr} />
    <GetStarted langAbbr={langAbbr} />
    <MoreHelp langAbbr={langAbbr} isDraftOfPublished={isDraftOfPublished} />
  </div>
)

HelpEdit.propTypes = {
  langAbbr: PropTypes.string.isRequired,
  isDraftOfPublished: PropTypes.bool.isRequired,
}

const HelpCreate = ({ langAbbr }) => (
  <div>
    <Introduction langAbbr={langAbbr} />
    <InformStudents langAbbr={langAbbr} />
    <GetStarted langAbbr={langAbbr} />
    <MoreHelp langAbbr={langAbbr} />
  </div>
)

HelpCreate.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const CollapseMemoIntroduction = ({ translate, langAbbr, isDraftOfPublished }) => {
  const { titleMain } = translate
  return (
    <CollapseDetails ariaLabel={titleMain} title={titleMain} yellow>
      {isDraftOfPublished ? (
        <HelpEdit langAbbr={langAbbr} isDraftOfPublished={isDraftOfPublished} />
      ) : (
        <HelpCreate langAbbr={langAbbr} />
      )}
    </CollapseDetails>
  )
}

CollapseMemoIntroduction.propTypes = {
  translate: PropTypes.shape({
    titleMain: PropTypes.string.isRequired,
  }).isRequired,
  langAbbr: PropTypes.oneOf(['en', 'sv']).isRequired,
  isDraftOfPublished: PropTypes.bool.isRequired,
}

export default CollapseMemoIntroduction
