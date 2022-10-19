import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

const Introduction = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Hur blir ditt kurs-PM bra för studenter?</h3>
      <p>
        Kurs-PM ska vara den övergripande planen som hjälper studenter att förbereda sig och planera för kursens
        genomförande, både innan kursstart och under kursens gång.
      </p>
      <p>
        Studenter har varit med i arbetet med att ta fram mallen för kurs-PM. Det är viktigt för studenter att känna
        igen sig mellan kurser och att kursinformationen är tillgänglig. Därför är kurs-PM:
      </p>
      <ul>
        <li>Samlat på en tillgänglig sida,</li>
        <li>Byggt utifrån en väl avstämd struktur/mall,</li>
        <li>Nåbar, tillsammans med kursrummet, från fliken &rdquo;Kurser&rdquo; i Personliga menyn.</li>
      </ul>
      <p>För att det ska bli tydligt och effektivt för studenter att ta till sig information är det viktigt att du:</p>
      <ul>
        <li>Flyttar information från kursrummet till kurs-PM (istället för att duplicera den),</li>
        <li>Ser över om du behöver göra om strukturen i kursrummet,</li>
        <li>Publicerar kurs-PM i god tid innan kursstart så att studenter hinner förbereda sig,</li>
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
      <p>
        Bakgrund, se&nbsp;
        <a
          href="https://intra.kth.se/utbildning/utbildningsadministr/om-kursen/kurs-pm/kurs-pm-1.1079198"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Kurs-PM
        </a>
      </p>
    </>
  ) : (
    <>
      <h3>How to create a course memo that is functional for the students</h3>
      <p>
        The course memo is the plan that helps students prepare and plan to take the course, both before and after the
        course.
      </p>
      <p>
        Students were involved in developing the template for the course memo. It is vital for students that the course
        information is uniform and accessible for all courses. Therefore, the course memo is:
      </p>
      <ul>
        <li>Published on an accessible page,</li>
        <li>Based on a well-tuned structure/template,</li>
        <li>Accessible, along with the course room, from “Courses” in the Personal menu.</li>
      </ul>
      <p>To make it clear and efficient for students to absorb information, please:</p>
      <ul>
        <li>
          Move information that belongs in a course memo, from the course room to the course memo (instead of
          duplicating it),
        </li>
        <li>Reflect on whether you should change the course room structure,</li>
        <li>Publish the course memo well in advance of the course start so that students have time to prepare,</li>
        <li>
          Add a link to the course memo in the course room. See&nbsp;
          <a
            href="https://www-edit.sys.kth.se/preview/www/2.9631/2.8043/2.84758/2.93755/2.93757/1.1059436?l=en_GB"
            target="_blank"
            className="external-link"
            rel="noreferrer"
          >
            The Syllabus function in Canvas
          </a>
          {' for more information.'}
        </li>
      </ul>
      <p>
        Background, see&nbsp;
        <a
          href="https://intra.kth.se/en/utbildning/utbildningsadministr/om-kursen/kurs-pm/kurs-pm-1.1079198"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Course memo
        </a>
      </p>
    </>
  )

Introduction.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const GetStarted = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Kom i gång snabbt</h3>
      <ol>
        <li>Bläddra igenom alla tabbar/flikar för att se vilka rubriker som finns,</li>
        <li>Gå till sista steget &rdquo;Granska och publicera&rdquo; för att förstå hur ett färdigt kurs-PM ser ut,</li>
        <li>Klicka på i-ikon vid varje rubrik för att förstå vad rubriken syftar till,</li>
        <li>
          När du valt att &rdquo;Redigera&rdquo; klickar du på &rdquo;Visa vägledning&rdquo; för att få guidning i hur
          du skriver innehåll under den specifika rubriken,
        </li>
        <li>
          När du arbetet klart, välj &rdquo;Avsluta med utkast&rdquo; eller &rdquo;Granska&rdquo; för att fortsätta till
          publicering. Ditt kurs-PM har sparats automatiskt.
        </li>
      </ol>
    </>
  ) : (
    <>
      <h3>Get started quickly</h3>
      <ol>
        <li>Look through all tabs to see which headings are available,</li>
        <li>Go to the last step, &ldquo;Preview and publish,&rdquo; to get a sense of a completed course memo,</li>
        <li>Click on the i-icon next to each heading to understand the heading’s intended use,</li>
        <li>
          Once you have chosen to &ldquo;Edit,&rdquo; click on &ldquo;Show guidance&rdquo; for guidance on how to write
          content under the specific heading,
        </li>
        <li>
          When you have finished, select &ldquo;Exit (save draft)&rdquo; or &ldquo;Preview&rdquo; to proceed to the
          publish step. Your course memo was automatically saved.
        </li>
      </ol>
    </>
  )

GetStarted.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const InformStudents = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Informera dina studenter om gjorda ändringar</h3>
      <p>
        Informera dina studenter om att du har gjort ändringar i ditt kurs-PM. Ange också vad du har ändrat. Det är
        alltid den senaste versionen av ditt kurs-PM som visas på sidan &rdquo;Förbereda och gå kurs&rdquo;. På sidan
        &rdquo;Arkiv&rdquo; visas alla versioner av ett kurs-PM.
      </p>
    </>
  ) : (
    <>
      <h3>Inform your students of changes made</h3>
      <p>
        Inform your students that you have made changes to your course memo. Also, specify what you have changed. It is
        always the latest version of your course memo that appears on the &ldquo;Prepare and take a course&rdquo; page.
        The &ldquo;Archive&rdquo; page displays all versions of a course memo.
      </p>
    </>
  )

InformStudents.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const MoreHelp = ({ langAbbr }) =>
  langAbbr === 'sv' ? (
    <>
      <h3>Mer hjälp?</h3>
      <p>
        <a
          href="https://intra.kth.se/utbildning/utbildningsadministr/om-kursen/kurs-pm/mallen-och-rubriker-i-kurs-pm-1.1079196"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Mallen och rubriker i kurs-PM
        </a>
      </p>
      <p>
        <a
          href="https://intra.kth.se/utbildning/utbildningsadministr/om-kursen/kurs-pm/detaljerade-instruktioner-for-kurs-pm-1.1085586"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Detaljerade instruktioner för kurs-PM
        </a>
      </p>
      <p>
        Hjälp med struktur och innehåll i kurs-PM och kursrum, kontakta:&nbsp;
        <a href="mailto:it-support@kth.se"> it-support@kth.se</a>
      </p>
    </>
  ) : (
    <>
      <h3>Need more help?</h3>
      <p>
        <a
          href="https://intra.kth.se/en/utbildning/utbildningsadministr/om-kursen/kurs-pm/mallen-och-rubriker-i-kurs-pm-1.1079196"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          The template and headings for course memo
        </a>
      </p>
      <p>
        <a
          href="https://intra.kth.se/en/utbildning/utbildningsadministr/om-kursen/kurs-pm/detaljerade-instruktioner-for-kurs-pm-1.1085586"
          target="_blank"
          className="external-link"
          rel="noreferrer"
        >
          Detailed instructions for course memo
        </a>
      </p>
      <p>
        Help with structure and content in course memo and course room, contact:&nbsp;
        <a href="mailto:it-support@kth.se"> it-support@kth.se</a>
      </p>
    </>
  )

MoreHelp.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const HelpEdit = ({ langAbbr }) => (
  <div>
    <Introduction langAbbr={langAbbr} />
    <InformStudents langAbbr={langAbbr} />
    <MoreHelp langAbbr={langAbbr} />
  </div>
)

HelpEdit.propTypes = {
  langAbbr: PropTypes.string.isRequired,
}

const HelpCreate = ({ langAbbr }) => (
  <div>
    <Introduction langAbbr={langAbbr} />
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
      {isDraftOfPublished ? <HelpEdit langAbbr={langAbbr} /> : <HelpCreate langAbbr={langAbbr} />}
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
