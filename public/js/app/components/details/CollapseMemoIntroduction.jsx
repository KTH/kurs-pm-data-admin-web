import React from 'react'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'

const CollapseMemoIntroduction = ({ translate, landAbbr }) => {
  const { titleMain } = translate
  return (
    <CollapseDetails ariaLabel={titleMain} title={titleMain} yellow>
      {(landAbbr === 'sv' && (
        <div>
          <h3>Hur blir ditt kurs-PM bra för studenter?</h3>
          <p>
            Kurs-PM ska vara den övergripande planen som hjälper studenter att förbereda sig och planera för kursens
            genomförande.
          </p>
          <p>
            Studenter har varit med i arbetet med att ta fram mallen för kurs-PM.Det är viktigt för studenter att känna
            igen sig mellan kurser och att kursinformationen är tillgänglig. Därför är kurs-PM:
          </p>
          <ul>
            <li>Byggt utifrån en väl avstämd mall,</li>
            <li>Samlat på en tillgänglig sida,</li>
            <li>Nåbar, tillsammans med kursrummet, från fliken “Kurser” i Personliga menyn.</li>
          </ul>
          <p>Du gör så att detblirtydligt och effektivt för studenter att ta till sig information, genom att:</p>
          <ul>
            <li>Flytta information från kursrummet till kurs-PM (istället för att dupliceraden),</li>
            <li>Se över om du behöver göra om kursupplägget (se “Mer hjälp” nedan),</li>
            <li>Publicera kurs-PM i god tid innan kursstart så att studenter hinner förbereda sig</li>
          </ul>
          <h3>Kom i gång snabbt</h3>
          <ol>
            <li>Bläddra igenom alla tabbar/ flikar för att se vilka rubriker som finns</li>
            <li>Gå till sista steget “Granska” för att förstå hur ett färdigt kurs-PMser ut.</li>
            <li>Klicka på i-ikon vid varje rubrik för att förstå vad rubriken syftar till.</li>
            <li>
              När du valt att “Redigera” klickar du på “Visa vägledning” för att få guidning i hur du skriver innehåll
              under den specifika rubriken.
            </li>
            <li>
              När du arbetet klart, välj “Avsluta med utkast” eller “Granska” för att fortsätta tillpublicering. Ditt
              kurs-PM har sparats automatiskt.
            </li>
          </ol>
          <h3>Mer hjälp?</h3>
          <p>
            <a
              href="https://intra.kth.se/utbildning/utbildningsadministr/om-kursen/anvandarmanual"
              target="_blank"
              className="external-link"
              rel="noreferrer"
            >
              Användarmanual Om kursen
            </a>
          </p>
          <p>
            Hjälp med struktur och innehåll i kurs-PM och kursrum, kontakta:
            <a href="mailto:it-support@kth.se">it-support@kth.se</a>
          </p>
        </div>
      )) || (
        <div>
          <h3>How to create a course memo that is functional for the students</h3>
          <p>The course memo is the overall plan that helps students to prepare and plan for taking the course.</p>
          <p>
            Students were involved in developing the template for the course memo. It is important for students that the
            course information is uniform and accessible for all courses. Therefore, the course memo is:
          </p>
          <ul>
            <li>Based on a well-tuned template,</li>
            <li>Published on an accessible page</li>
            <li>Accessible from “Courses” in the Personal menu.</li>
          </ul>
          <p>You make it clear and efficient for students to absorb information when you:</p>
          <ul>
            <li>
              Move information that belongs in a course memo, from the course room to the course memo (instead of
              duplicating it),
            </li>
            <li>
              Reflect on whether you should change parts of how the course is structured (see “Need more help” below),
            </li>
            <li>Publish the course memo well in advance of the course start so that students have time to prepare.</li>
          </ul>
          <h3>Get started quickly </h3>
          <ol>
            <li>Look through all tabs to see which headings are available.</li>
            <li>Go to the last step, “Review,” to get a sense of a completed course memo.</li>
            <li>Click on the i-icon next to each heading to understand the heading’s intended use.</li>
            <li>
              Once you have chosen to “Edit,” click on “Show guidance” for guidance on how to write content under the
              specific heading.
            </li>
            <li>
              When you have finished, select “Exit (save draft)”or “Preview” to proceed to the publish step. Your course
              memo was automatically saved.
            </li>
          </ol>
          <h3>Need more help?</h3>
          <p>
            <a
              href="https://intra.kth.se/utbildning/utbildningsadministr/om-kursen/anvandarmanual"
              target="_blank"
              className="external-link"
              rel="noreferrer"
            >
              User manual About course (only in Swedish)
            </a>
          </p>
          <p>
            Help with structure and content in course memo and course room, contact:
            <a href="mailto:it-support@kth.se">it-support@kth.se</a>
          </p>
        </div>
      )}
    </CollapseDetails>
  )
}

CollapseMemoIntroduction.propTypes = {
  translate: PropTypes.shape({
    titleMain: PropTypes.string.isRequired,
  }).isRequired,
  landAbbr: PropTypes.oneOf(['en', 'sv']).isRequired,
}

export default CollapseMemoIntroduction
