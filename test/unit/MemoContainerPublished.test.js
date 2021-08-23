import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../../public/js/app/mobx'
import { act } from 'react-dom/test-utils'

import i18n from '../../i18n'
import {
  getNumOfEditableStandardContent,
  getOnlyStandardHeaders,
  getSectionHeadersByType,
  sections,
  typeOfThisHeader,
} from '../../public/js/app/util/fieldsByType.js'

import MemoContainer from '../../public/js/app/pages/MemoEditingContainer'

import generatedStandardMemoData from '../mocks/memoData/generateStandardMemoData'
import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'
import generatedExtraHeaders from '../mocks/memoData/generateExtraHeaders'
import translations from '../mocks/translations'

const { memoTitlesByMemoLang, orderedFilledInAndVisible, sectionsLabels } = translations.en
const { notIncludedInMemoYet, pageTitles } = translations.sv
const { alerts, info, sourceInfo } = i18n.messages[0]
const introductionHeaders = {
  sv: ['Hur blir ditt kurs-PM bra för studenter?'],
  en: ['How to create a course memo that is functional for the students'],
}
const getStartedHeaders = {
  sv: ['Kom i gång snabbt'],
  en: ['Get started quickly'],
}
const informStudentsHeaders = {
  sv: ['Informera dina studenter om gjorda ändringar'],
  en: ['Inform your students of changes made'],
}
const moreHelpHeaders = {
  sv: ['Mer hjälp?'],
  en: ['Need more help?'],
}

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText, queryAllByTestId, queryByTestId } = screen

const EditPublishedMemo = ({ activeTab, memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedRouterStore = mockApplicationStoreWithChosenMemo(
    'DRAFT_OF_PUBLISHED',
    'filledInAndVisible',
    memoLang,
    userLang
  )
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedRouterStore}>
        <MemoContainer initialActiveTab={activeTab} {...rest} />
      </MobxStoreProvider>
    </StaticRouter>
  )
}
/*******************************************/
/**** contentAndOutcomes *******************/
/*******************************************/
describe('Active tab contentAndOutcomes. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditPublishedMemo activeTab="contentAndOutcomes" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: contentAndOutcomes (draft of published). renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: contentAndOutcomes (draft of published). renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.published)
  })

  test('tab: contentAndOutcomes (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(10)
    const expectedh3ds = introductionHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(0, 6)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: contentAndOutcomes (draft of published). renders alert about kopps data were updated', () => {
    const alert = getByText('Kursplans-information och kontaktinformation har uppdaterats automatiskt.')
    expect(alert).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). renders alert about kopps data were updated', () => {
    const alert = getByText('Det finns ändringar som ej publicerats. Du kan')
    expect(alert).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). renders collapse for help-text for all editors because they are open', () => {
    const allHelpTextBtns = getAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(1)
  })

  test('tab: contentAndOutcomes (draft of published). All edit buttons have label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = getAllByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn.length).toBe(1)
  })

  test('tab: contentAndOutcomes (draft of published). renders main subheader h4 (course name), h4 for help text and other menu h4 (menu headers), ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(3)
    const expectedhds = ['EF1111 Project in Plasma Physics 9.0 hp', 'Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: contentAndOutcomes (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [prep, reqToFinal, extra, contacts]

    expectedInactiveTitles.map((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(contentAndOutcomes)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: contentAndOutcomes (draft of published). renders main header h2 (page name) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
  })

  test('tab: contentAndOutcomes (draft of published). renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(17)
    const expectedAriaLabels = [
      'återgå till senaste publicerade versionen av kurs-PM  (2019-07-01 15:37:34)',
      'Information about Course contents',
      'Information about Intended learning outcomes',
      'Information about Learning activities',
      'Redigera Läraktiviteter',
      'Information about Detailed plan', //TODO: add ariaLang
      'Stäng redigeringsläge Detaljplanering',
      'Information about Created by user First header for section extraHeaders1',
      'Redigera Created by user First header for section extraHeaders1', // fix header in extra rubrik
      'Information about Created by user Second header for section extraHeaders1',
      'Redigera Created by user Second header for section extraHeaders1', // fix header in extra rubrik
      null,
      'Information about Made changes',
      null,
      null,
      'Avbryt',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      'återgå till senaste publicerade versionen av kurs-PM (2019-07-01 15:37:34)',
      '',
      '',
      '',
      'Redigera',
      '',
      'Stäng',
      '',
      'Redigera',
      '',
      'Redigera',
      'Lägg till rubrik till Content and learning outcomes',
      '',
      'Välj kurs-PM',
      'Spara',
      'Avbryt',
      'Granska',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: contentAndOutcomes (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('contentAndOutcomes')
    expect(headers.length).toBe(4)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: contentAndOutcomes (draft of published). renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(2)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('tab: contentAndOutcomes (draft of published). renders <SectionForNonEditable>, there are no standard headers which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). renders <StandardEditorPerTitle>, there are no standard headers mandatory and editable', async () => {
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headersAndSubHds.length).toBe(2)
  })

  test('tab: contentAndOutcomes (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and non-editable and have no content (not included as well)', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headersAndSubHds.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). learningActivities editor is not visible', async () => {
    const editor = screen.queryByTestId('standard-editor-learningActivities')
    expect(editor).not.toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). scheduleDetails editor is visible', async () => {
    const openEditor = getByTestId('standard-editor-scheduleDetails')
    expect(openEditor).toHaveTextContent(
      `Visa vägledningUnder rubriken "Detaljplanering" beskriver du vilka läraktiviteter eller examinationstillfällen som har planerats under kursen. Använd med fördel en tabell för att på ett överblickbart sätt beskriva aktiviteternas ordning, dess innehåll och vilka förberedelser som rekommenderas inför varje aktivitet. Systemet skapar en tabell med tre kolumner åt dig där du kan skriva i kursomgångens läraktiviteter. Du kan anpassa denna tabell genom att t.ex. lägga till rader, lägga till kolumner, eller ersätta den med en tabell från Word. Ett enkelt och tydligt sätt är att beskriva detaljplanering genom att för varje läraktivitet eller examination ange typ av aktivitet, aktivitetens innehåll och vilka förberedelser som studenten behöver göra. Förberedelser kan vara kapitel och andra referenser till kurslitteratur eller webbsidor, men det kan också vara att installera programvara eller annan praktisk förberedelse. Länka gärna till instruktioner och material för kursomgången i Canvas, men var uppmärksam på att länkar från tidigare kurs-PM som kopierats till detta kurs-PM kan vara ogiltiga. Testa därför länkar till andra webbsidor innan publicering. Följande Detaljplanering är ett exempel från kurs HI1027: [Infoga exempel på tabell] Om du beskrivit kursens olika läraktiviteter under rubriken "Läraktiviteter" rekommenderas att använda samma terminologi för att studenterna ska se den röda träden genom detta kurs-PM. Om det är någon aktivitet som är särskilt viktigt för studenten att förbereda kan det understrykas genom att beskriva det i rubriken "Särskilda förberedelser".`
    )
  })

  test('tab: contentAndOutcomes (draft of published). Renders "Learning activities" checkbox which are checked and shows filled in content, then check it to show message about excluded though filled content', async () => {
    //Läraktiviteter - Learning activities
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-learningActivities')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleText = queryByTestId('text-for-memo-optionalEditable-learningActivities')
    expect(visibleText).toBeInTheDocument()
    expect(visibleText).toHaveTextContent('Some test data for section learningActivities')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const emptyMsg = queryByTestId('text-for-memo-optionalEditable-learningActivities')
      expect(emptyMsg).not.toBeInTheDocument()
      const filledInButNotIncludedMsg = queryByTestId(
        'optional-and-excluded-but-with-content-section-learningActivities'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes (draft of published). Renders "scheduleDetails" checkbox which are checked and editor is open because it has content', async () => {
    // Renders "scheduleDetails" checkbox which are checked and shows filled in content,
    // then check it to show message about excluded though filled content
    // Detailed plan
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-scheduleDetails')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleEditor = queryByTestId('btn-close-editor-scheduleDetails')
    expect(visibleEditor).toBeInTheDocument()
    expect(visibleEditor).toHaveTextContent('Stäng redigeringsläge')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. Check if button edit/close editor works. If scheduleDetails has some content then scheduleDetails should be open in the beginning', async () => {
    //Detailed plan
    const editor = screen.queryByTestId('standard-editor-scheduleDetails')
    expect(editor).toBeInTheDocument()

    const close = screen.queryByTestId('btn-close-editor-scheduleDetails')
    expect(close).toBeInTheDocument()

    fireEvent.click(close)
    await waitFor(() => {
      const editorOpenBtn = screen.queryByTestId('btn-open-editor-scheduleDetails')
      expect(editorOpenBtn).toBeInTheDocument()
    })
  })

  // data-testid="btn-open-editor-extraHeaders1-0.13108128127030394"
  test('tab: contentAndOutcomes (draft of published). both extraHeader editors are not visible, but their editor buttons are visibile', async () => {
    const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders1-Firstheader')
    expect(firstExtraEditor).not.toBeInTheDocument()
    const firstExtraText = screen.queryByText('Html content for section First header')
    expect(firstExtraText).toBeInTheDocument()

    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders1-Firstheader')
    expect(firstExtraOpenBtn).toBeInTheDocument()

    const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders1-Secondheader')
    expect(secondExtraEditor).not.toBeInTheDocument()
    const secondExtraText = screen.queryByText('Html content for section Second header')
    expect(secondExtraText).toBeInTheDocument()
    const secondExtraEditorOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders1-Secondheader')
    expect(secondExtraEditorOpenBtn).toBeInTheDocument()
  })

  // data-testid="btn-open-editor-extraHeaders1-0.13108128127030394"
  test('tab: contentAndOutcomes (draft of published). Open both extra headers editors', async () => {
    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders1-Firstheader')

    fireEvent.click(firstExtraOpenBtn)
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders1-Firstheader')).toBeInTheDocument()
      const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders1-Firstheader')
      expect(firstExtraEditor).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('btn-open-editor-extraHeaders1-Secondheader'))
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders1-Secondheader')).toBeInTheDocument()
      const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders1-Secondheader')
      expect(secondExtraEditor).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes (draft of published). check texts of buttons in control panel it is different for Edit published', async () => {
    expect(getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(getByText('Spara')).toBeInTheDocument()
    expect(getByText('Avbryt')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). Click button Spara', async () => {
    fireEvent.click(getByText('Spara'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes (draft of published). get memo name', async () => {
    expect(getByText('Autumn 2019-2 (Start date 28/10/2019, English)')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). get memo semester', async () => {
    expect(getByText('HT 2019')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). comment about changes does not exist in html, because it is not a draft of a published memo', async () => {
    expect(getByTestId('text-about-changes')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). render correct number of text about data origin and source info ', () => {
    expect(getAllByText('från kursplan').length).toBe(2)
    expect(screen.queryByText('från kursgemensam information')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(getAllByText('Inkluderas alltid').length).toBe(2)
    expect(getAllByText('Inkludera').length).toBe(4)
    expect(screen.queryByText('Inkluderas för vissa kurser')).not.toBeInTheDocument()
    expect(screen.queryByText('Inkludera ytterligare avsnitt')).not.toBeInTheDocument()
  })
})

/*******************************************/
/**** Förbereda inför kurstart *************/
/*******************************************/
describe('Active tab prep. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditPublishedMemo activeTab="prep" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: prep (draft of published). renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: prep (draft of published). renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.published)
  })

  test('tab: prep (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(12)
    const expectedh3ds = introductionHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(6, 14)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: prep (draft of published). renders collapse for help-text for all editors because they are open', () => {
    const allHelpTextBtns = getAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(3)
  })

  test('tab: prep (draft of published). All edit buttons have label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = getAllByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn.length).toBe(3)
  })

  test('tab: prep (draft of published). renders main subheader h4 (course name), h4 for help text and other menu h4 (menu headers), ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(3)
    const expectedhds = ['EF1111 Project in Plasma Physics 9.0 hp', 'Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: prep (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, reqToFinal, extra, contacts]

    expectedInactiveTitles.map((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const prepTab = screen.getByRole('tab', { selected: true })
    expect(prepTab).toHaveTextContent(prep)

    expect(prepTab.className).toBe('nav-link active')
  })

  test('tab: prep (draft of published). renders main header h2 (page name) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
  })

  test('tab: prep (draft of published). renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(22)
    const expectedAriaLabels = [
      'återgå till senaste publicerade versionen av kurs-PM  (2019-07-01 15:37:34)',
      'Information about Recommended prerequisites',
      'Information about Specific preparations',
      'Redigera Särskilda förberedelser',
      'Information about Literature',
      'Stäng redigeringsläge Kurslitteratur',
      'Information about Equipment', //TODO: add ariaLang
      'Stäng redigeringsläge Utrustning',
      'Information about Software',
      'Redigera Programvara',
      'Information about Support for students with disabilities',
      'Stäng redigeringsläge Stöd för studenter med funktionsnedsättning',
      'Information about Created by user First header for section extraHeaders2',
      'Redigera Created by user First header for section extraHeaders2', // fix header in extra rubrik
      'Information about Created by user Second header for section extraHeaders2',
      'Redigera Created by user Second header for section extraHeaders2', // fix header in extra rubrik
      null,
      'Information about Made changes',
      null,
      null,
      'Avbryt',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      'återgå till senaste publicerade versionen av kurs-PM (2019-07-01 15:37:34)',
      '',
      '',
      'Redigera',
      '',
      'Stäng',
      '',
      'Stäng',
      '',
      'Redigera',
      '',
      'Stäng',
      '',
      'Redigera',
      '',
      'Redigera',
      'Lägg till rubrik till Preparations before course start',
      '',
      'Välj kurs-PM',
      'Spara',
      'Avbryt',
      'Granska',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: prep (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('prep')
    expect(headers.length).toBe(6)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: prep (draft of published). renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('tab: prep (draft of published). renders <SectionForNonEditable>, there are no standard headers which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(0)
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, literature is a standard header, mandatory and editable, will have open editor because it has content', async () => {
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const editorSectionIsOpen = getByTestId(`standard-editor-${contentId}`)
      expect(editorSectionIsOpen).toHaveTextContent(/Visa vägledningUnder rubriken "Kurslitteratur"/i)
      expect(getByTestId(`btn-close-editor-${contentId}`)).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'prep')
    expect(headersAndSubHds.length).toBe(3)
    const preparationsText = getByTestId(`text-for-memo-${contentType}-preparations`)
    expect(preparationsText).toHaveTextContent('Some test data for section preparations')
    const equipmentOpenEditor = getByTestId(`standard-editor-equipment`)
    expect(equipmentOpenEditor).toBeInTheDocument()
    expect(getByTestId(`btn-close-editor-equipment`)).toBeInTheDocument()
    const software = getByTestId(`text-for-memo-${contentType}-software`)
    expect(software).toHaveTextContent('Some test data for section software')
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional' // prerequisites
    const headersAndSubHds = getSectionHeadersByType(contentType, 'prep')
    expect(headersAndSubHds.length).toBe(1)
    const prerequisites = getByTestId(`text-for-memo-${contentType}-${headersAndSubHds[0]}`)
    expect(prerequisites).toBeInTheDocument()
    expect(prerequisites).toHaveTextContent('Some test data for section prerequisites')
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: prep (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
  })

  test('tab: prep. renders Edit buttons for each editable standard header and subheaher because memo content is empty', async () => {
    expect(getByTestId('btn-open-editor-preparations')).toBeInTheDocument()
    expect(getByTestId('btn-close-editor-literature')).toBeInTheDocument()
    expect(getByTestId('btn-close-editor-equipment')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-software')).toBeInTheDocument()
    expect(getByTestId('btn-close-editor-permanentDisabilitySubSection')).toBeInTheDocument()

    expect(screen.queryByTestId('btn-open-editor-prerequisites')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-permanentDisability')).not.toBeInTheDocument()

    expect(screen.queryByTestId('btn-close-editor-prerequisites')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-permanentDisability')).not.toBeInTheDocument()
  })

  test('tab: prep (draft of published). Renders "preparations" checkbox which are checked and shows filled in content, then check it to show message about excluded though filled content', async () => {
    //Läraktiviteter - Learning activities
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-preparations')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleText = queryByTestId('text-for-memo-optionalEditable-preparations')
    expect(visibleText).toBeInTheDocument()
    expect(visibleText).toHaveTextContent('Some test data for section preparations')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const emptyMsg = queryByTestId('text-for-memo-optionalEditable-preparations')
      expect(emptyMsg).not.toBeInTheDocument()
      const filledInButNotIncludedMsg = queryByTestId('optional-and-excluded-but-with-content-section-preparations')
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). Renders "literature" close editor button, then click it to close editor and show text from editor', async () => {
    const closeLiterature = getByTestId('btn-close-editor-literature')
    expect(closeLiterature).toBeInTheDocument()

    const visibleText = queryByTestId('text-for-memo-mandatoryEditable-literature')
    expect(visibleText).not.toBeInTheDocument()

    fireEvent.click(closeLiterature)
    await waitFor(() => {
      const editLiterature = getByTestId('btn-open-editor-literature')
      expect(editLiterature).toBeInTheDocument()

      const showText = queryByTestId('text-for-memo-mandatoryAndEditable-literature')
      expect(showText).toBeInTheDocument()
      expect(showText).toHaveTextContent('Some test data for section literature')
    })
  })

  test('tab: prep (draft of published). Renders "equipment" checkbox which are checked and editor is open because it has content', async () => {
    // Renders "equipment" checkbox which are checked and shows filled in content,
    // then check it to show message about excluded though filled content

    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-equipment')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleEditor = queryByTestId('btn-close-editor-equipment')
    expect(visibleEditor).toBeInTheDocument()
    expect(visibleEditor).toHaveTextContent('Stäng redigeringsläge')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. Check if button edit/close editor works. If software has some content then software should be closed in the beginning', async () => {
    const editor = screen.queryByTestId('standard-editor-software')
    expect(editor).not.toBeInTheDocument()

    const editorOpenBtn = screen.queryByTestId('btn-open-editor-software')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const close = screen.queryByTestId('btn-close-editor-software')
      expect(close).toBeInTheDocument()
    })
  })

  // data-testid="btn-open-editor-extraHeaders2-0.13108128127030394"
  test('tab: prep (draft of published). both extraHeader editors are not visible, but their editor buttons are visibile', async () => {
    const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders2-Firstheader')
    expect(firstExtraEditor).not.toBeInTheDocument()
    const firstExtraText = screen.queryByText('Html content for section First header')
    expect(firstExtraText).toBeInTheDocument()

    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders2-Firstheader')
    expect(firstExtraOpenBtn).toBeInTheDocument()

    const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders2-Secondheader')
    expect(secondExtraEditor).not.toBeInTheDocument()
    const secondExtraText = screen.queryByText('Html content for section Second header')
    expect(secondExtraText).toBeInTheDocument()
    const secondExtraEditorOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders2-Secondheader')
    expect(secondExtraEditorOpenBtn).toBeInTheDocument()
  })

  // data-testid="btn-open-editor-extraHeaders2-0.13108128127030394"
  test('tab: prep (draft of published). Open both extra headers editors', async () => {
    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders2-Firstheader')

    fireEvent.click(firstExtraOpenBtn)
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders2-Firstheader')).toBeInTheDocument()
      const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders2-Firstheader')
      expect(firstExtraEditor).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('btn-open-editor-extraHeaders2-Secondheader'))
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders2-Secondheader')).toBeInTheDocument()
      const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders2-Secondheader')
      expect(secondExtraEditor).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). check texts of buttons in control panel it is different for Edit published', async () => {
    expect(getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(getByText('Spara')).toBeInTheDocument()
    expect(getByText('Avbryt')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: prep (draft of published). Click button Spara', async () => {
    fireEvent.click(getByText('Spara'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). render correct number of text about data origin and source info ', () => {
    expect(screen.queryByText('från kursplan')).not.toBeInTheDocument()
    expect(getAllByText('från kursgemensam information').length).toBe(1)
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: prep (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(getAllByText('Inkluderas alltid').length).toBe(2)
    expect(getAllByText('Inkludera').length).toBe(6)
    expect(screen.queryByText('Inkluderas för vissa kurser')).not.toBeInTheDocument()
    expect(getAllByText('Inkludera ytterligare avsnitt').length).toBe(1)
  })
})

/*******************************************/
/**** Examination  reqToFinal **************/
/*******************************************/
describe('Active tab reqToFinal. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditPublishedMemo activeTab="reqToFinal" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: reqToFinal (draft of published). renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: reqToFinal (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(15)
    const expectedh3ds = introductionHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(14, 25)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: reqToFinal (draft of published). renders collapse for help-text for all editors because they are open', () => {
    const allHelpTextBtns = getAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(4)
  })

  test('tab: reqToFinal (draft of published). All edit buttons have label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = getAllByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn.length).toBe(4)
  })

  test('tab: reqToFinal (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, prep, extra, contacts]

    expectedInactiveTitles.map((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(reqToFinal)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: reqToFinal (draft of published). renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(27)
    const expectedAriaLabels = [
      'återgå till senaste publicerade versionen av kurs-PM  (2019-07-01 15:37:34)',
      'Information about Grading scale',
      'Information about Examination',
      'Stäng redigeringsläge Examination',
      'Information about Other requirements for final grade',
      'Information about Grading criteria/assessment criteria',
      'Redigera Målrelaterade betygskriterier/bedömningskriterier',
      'Information about Opportunity to complete the requirements via supplementary examination',
      'Stäng redigeringsläge Möjlighet till komplettering',
      'Information about Opportunity to raise an approved grade via renewed examination',
      'Stäng redigeringsläge Möjlighet till plussning',
      'Information about Alternatives to missed activities or tasks',
      'Redigera Möjlighet till ersättningsuppgifter',
      'Information about Reporting of exam results',
      'Redigera Resultatrapportering',
      'Information about Ethical approach',
      'Stäng redigeringsläge Etiskt förhållningssätt',
      'Information about Created by user First header for section extraHeaders3',
      'Redigera Created by user First header for section extraHeaders3', // fix header in extra rubrik
      'Information about Created by user Second header for section extraHeaders3',
      'Redigera Created by user Second header for section extraHeaders3', // fix header in extra rubrik
      null,
      'Information about Made changes',
      null,
      null,
      'Avbryt',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))

    //testa       'Lägg till rubrik till Preparations before course start',
    //  'återgå till senaste publicerade versionen av kurs-PM (2019-07-01 15:37:34)',
  })

  test('tab: reqToFinal (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('reqToFinal')
    expect(headers.length).toBe(9)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: reqToFinal (draft of published). renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(3)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('tab: reqToFinal (draft of published). renders <SectionForNonEditable>, there are one standard header which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('tab: reqToFinal (draft of published). renders <StandardEditorPerTitle>, no fields which are mandatory and can be edited', async () => {
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headersAndSubHds.length).toBe(4)

    const examinationSubSectionEditor = getByTestId(`standard-editor-examinationSubSection`)
    expect(examinationSubSectionEditor).toBeInTheDocument()
    const gradingCriteriaText = getByTestId(`text-for-memo-${contentType}-gradingCriteria`)
    expect(gradingCriteriaText).toBeInTheDocument()

    const possibilityToCompletionEditor = getByTestId(`standard-editor-possibilityToCompletion`)
    expect(possibilityToCompletionEditor).toBeInTheDocument()

    const possibilityToAdditionEditor = getByTestId(`standard-editor-possibilityToAddition`)
    expect(possibilityToAdditionEditor).toBeInTheDocument()

    const possibilityToCompensate = getByTestId(`text-for-memo-${contentType}-possibilityToCompensate`)
    expect(possibilityToCompensate).toHaveTextContent('Some test data for section possibilityToCompensate')

    const reportingResults = getByTestId(`text-for-memo-${contentType}-reportingResults`)
    expect(reportingResults).toHaveTextContent('Some test data for section reportingResults')

    const ethicalApproachSubSection = getByTestId(`standard-editor-ethicalApproachSubSection`)
    expect(ethicalApproachSubSection).toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional' // prerequisites
    const headersAndSubHds = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headersAndSubHds.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
    const inactiveTabEditorcourseContent = screen.queryByTestId('standard-editor-courseContent')
    expect(inactiveTabEditorcourseContent).not.toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). Renders "examinationSubSection" checkbox which are checked and shows filled in content', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-examinationSubSection')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleEditor = queryByTestId('btn-close-editor-examinationSubSection')
    expect(visibleEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "examinationSubSection" open editor and tries to close it after pressing button "close"', async () => {
    const editorCloseBtn = getByTestId('btn-close-editor-examinationSubSection')
    expect(editorCloseBtn).toBeInTheDocument()

    fireEvent.click(editorCloseBtn)
    await waitFor(() => {
      const editorOpenBtn = getByTestId('btn-open-editor-examinationSubSection')
      const visibleText = queryByTestId('text-for-memo-optionalEditable-examinationSubSection')
      expect(visibleText).toBeInTheDocument()
    })
    fireEvent.click(getByTestId('checkbox-visibility-examinationSubSection'))
    await waitFor(() => {
      const filledInButNotIncludedMsg = queryByTestId(
        'optional-and-excluded-but-with-content-subSection-examinationSubSection'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "gradingCriteria" closed editor and tries to change visibility and then open it after pressing button "open"', async () => {
    const visibleText = queryByTestId('text-for-memo-optionalEditable-gradingCriteria')
    expect(visibleText).toBeInTheDocument()

    fireEvent.click(getByTestId('checkbox-visibility-gradingCriteria'))
    await waitFor(() => {
      const filledInButNotIncludedMsg = queryByTestId('optional-and-excluded-but-with-content-section-gradingCriteria')
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
    })
    const editorOpenBtn = getByTestId('btn-open-editor-gradingCriteria')

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const editorCloseBtn = getByTestId('btn-close-editor-gradingCriteria')
      expect(editorCloseBtn).toBeInTheDocument()
    })
  })

  //ethicalApproachSubSection
  test('tab: reqToFinal (draft of published). Renders "ethicalApproachSubSection" checkbox which are checked and shows filled in content', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-ethicalApproachSubSection')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleEditor = queryByTestId('btn-close-editor-ethicalApproachSubSection')
    expect(visibleEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "ethicalApproachSubSection" open editor and tries to close it after pressing button "close"', async () => {
    const editorCloseBtn = getByTestId('btn-close-editor-ethicalApproachSubSection')
    expect(editorCloseBtn).toBeInTheDocument()

    fireEvent.click(editorCloseBtn)
    await waitFor(() => {
      const editorOpenBtn = getByTestId('btn-open-editor-ethicalApproachSubSection')
      const visibleText = queryByTestId('text-for-memo-optionalEditable-ethicalApproachSubSection')
      expect(visibleText).toBeInTheDocument()
    })
    fireEvent.click(getByTestId('checkbox-visibility-ethicalApproachSubSection'))
    await waitFor(() => {
      const filledInButNotIncludedMsg = queryByTestId(
        'optional-and-excluded-but-with-content-subSection-ethicalApproachSubSection'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
    })
  })

  //possibilityToCompletion

  test('tab: reqToFinal (draft of published). Renders "possibilityToCompletion" checkbox which are checked and shows filled in content', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-possibilityToCompletion')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleEditor = queryByTestId('btn-close-editor-possibilityToCompletion')
    expect(visibleEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "possibilityToCompletion" as an open editor and tries to change visibility and to close it by pressing a button "close"', async () => {
    const editorCloseBtn = getByTestId('btn-close-editor-possibilityToCompletion')
    expect(editorCloseBtn).toBeInTheDocument()

    fireEvent.click(editorCloseBtn)
    await waitFor(() => {
      const editorOpenBtn = getByTestId('btn-open-editor-possibilityToCompletion')
      const visibleText = queryByTestId('text-for-memo-optionalEditable-possibilityToCompletion')
      expect(visibleText).toBeInTheDocument()
    })
    fireEvent.click(getByTestId('checkbox-visibility-possibilityToCompletion'))
    await waitFor(() => {
      const filledInButNotIncludedMsg = queryByTestId(
        'optional-and-excluded-but-with-content-section-possibilityToCompletion'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
    })
  })

  // data-xtestid="btn-open-editor-extraHeaders3-0.13108128127030394"
  test('tab: reqToFinal (draft of published). both extraHeader editors are not visible, but their editor buttons are visibile', async () => {
    const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders3-Firstheader')
    expect(firstExtraEditor).not.toBeInTheDocument()
    const firstExtraText = screen.queryByText('Html content for section First header')
    expect(firstExtraText).toBeInTheDocument()

    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders3-Firstheader')
    expect(firstExtraOpenBtn).toBeInTheDocument()

    const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders3-Secondheader')
    expect(secondExtraEditor).not.toBeInTheDocument()
    const secondExtraText = screen.queryByText('Html content for section Second header')
    expect(secondExtraText).toBeInTheDocument()
    const secondExtraEditorOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders3-Secondheader')
    expect(secondExtraEditorOpenBtn).toBeInTheDocument()
  })

  // data-xtestid="btn-open-editor-extraHeaders2-0.13108128127030394"
  test('tab: reqToFinal (draft of published). Open both extra headers editors', async () => {
    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders3-Firstheader')

    fireEvent.click(firstExtraOpenBtn)
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders3-Firstheader')).toBeInTheDocument()
      const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders3-Firstheader')
      expect(firstExtraEditor).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('btn-open-editor-extraHeaders3-Secondheader'))
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders3-Secondheader')).toBeInTheDocument()
      const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders3-Secondheader')
      expect(secondExtraEditor).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). check texts of buttons in control panel it is different for Edit published', async () => {
    expect(getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(getByText('Spara')).toBeInTheDocument()
    expect(getByText('Avbryt')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). Click button Spara', async () => {
    fireEvent.click(getByText('Spara'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). render correct number of text about data origin and source info ', () => {
    expect(getAllByText('från kursplan').length).toBe(4)
    expect(screen.queryByText('från kursgemensam information')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(getAllByText('Inkluderas alltid').length).toBe(3)
    expect(getAllByText('Inkludera').length).toBe(7)
    expect(getAllByText('Inkluderas för vissa kurser').length).toBe(1)
    expect(getAllByText('Inkludera ytterligare avsnitt').length).toBe(2)
  })
})
/*******************************************/
/**** Ytterligare Information  extra *******/
/*******************************************/
describe('Active tab extra. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditPublishedMemo activeTab="extra" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: extra (draft of published). renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: extra (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(8)
    const expectedh3ds = introductionHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(25, 27)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: extra (draft of published). renders no collapse and no buttons to close editor for help-text for all editors because they are open', () => {
    const allHelpTextBtns = screen.queryByText('Visa vägledning')
    expect(allHelpTextBtns).not.toBeInTheDocument()
    const allCloseEditorBtn = screen.queryByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn).not.toBeInTheDocument()
  })

  test('tab: extra (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, prep, reqToFinal, contacts]

    expectedInactiveTitles.map((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(extra)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: extra (draft of published). renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(14)
    const expectedAriaLabels = [
      'återgå till senaste publicerade versionen av kurs-PM  (2019-07-01 15:37:34)',
      'Information about Additional regulations',
      'Information about Changes of the course before this course offering',
      'Redigera Ändringar inför denna kursomgång',
      'Information about Created by user First header for section extraHeaders4',
      'Redigera Created by user First header for section extraHeaders4',
      'Information about Created by user Second header for section extraHeaders4',
      'Redigera Created by user Second header for section extraHeaders4',
      null,
      'Information about Made changes',
      null,
      null,
      'Avbryt',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))

    //testa       'Lägg till rubrik till Preparations before course start',
    //  'återgå till senaste publicerade versionen av kurs-PM (2019-07-01 15:37:34)',
  })

  test('tab: extra (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('extra')
    expect(headers.length).toBe(2)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: extra (draft of published). renders <SectionForNonEditable>, there is no mandatory (non-editable) fields', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'extra')
    expect(headers.length).toBe(0)
  })

  test('tab: extra (draft of published). renders <SectionForNonEditable>, there are one standard header which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'extra')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('tab: extra (draft of published). renders <StandardEditorPerTitle>, no fields which are mandatory and can be edited', async () => {
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'extra')
    expect(headers.length).toBe(0)
  })

  test('tab: extra (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'extra')
    expect(headersAndSubHds.length).toBe(1)

    const infoForReregisteredStudents = getByTestId(`text-for-memo-${contentType}-infoForReregisteredStudents`)
    expect(infoForReregisteredStudents).toBeInTheDocument()

    const infoForReregisteredStudentsEditor = getByTestId(`btn-open-editor-infoForReregisteredStudents`)
    expect(infoForReregisteredStudentsEditor).toBeInTheDocument()
  })

  test('tab: extra (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional' // prerequisites
    const headersAndSubHds = getSectionHeadersByType(contentType, 'extra')
    expect(headersAndSubHds.length).toBe(0)
  })

  test('tab: extra (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: extra (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
    const inactiveTabEditorcourseContent = screen.queryByTestId('standard-editor-courseContent')
    expect(inactiveTabEditorcourseContent).not.toBeInTheDocument()
  })

  test('tab: extra (draft of published). Renders "infoForReregisteredStudents" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-infoForReregisteredStudents')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = queryByTestId('btn-open-editor-infoForReregisteredStudents')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = queryByTestId(
        'optional-and-excluded-but-with-content-section-infoForReregisteredStudents'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  // data-xtestid="btn-open-editor-extraHeaders4-0.13108128127030394"
  test('tab: extra (draft of published). both extraHeader editors are not visible, but their editor buttons are visibile', async () => {
    const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders4-Firstheader')
    expect(firstExtraEditor).not.toBeInTheDocument()
    const firstExtraText = screen.queryByText('Html content for section First header')
    expect(firstExtraText).toBeInTheDocument()

    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders4-Firstheader')
    expect(firstExtraOpenBtn).toBeInTheDocument()

    const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders4-Secondheader')
    expect(secondExtraEditor).not.toBeInTheDocument()
    const secondExtraText = screen.queryByText('Html content for section Second header')
    expect(secondExtraText).toBeInTheDocument()
    const secondExtraEditorOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders4-Secondheader')
    expect(secondExtraEditorOpenBtn).toBeInTheDocument()
  })

  // data-xtestid="btn-open-editor-extraHeaders4-0.13108128127030394"
  test('tab: extra (draft of published). Open both extra headers editors', async () => {
    const firstExtraOpenBtn = screen.queryByTestId('btn-open-editor-extraHeaders4-Firstheader')

    fireEvent.click(firstExtraOpenBtn)
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders4-Firstheader')).toBeInTheDocument()
      const firstExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders4-Firstheader')
      expect(firstExtraEditor).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('btn-open-editor-extraHeaders4-Secondheader'))
    await waitFor(() => {
      expect(screen.queryByTestId('btn-close-editor-extraHeaders4-Secondheader')).toBeInTheDocument()
      const secondExtraEditor = screen.queryByTestId('extra-content-editor-extraHeaders4-Secondheader')
      expect(secondExtraEditor).toBeInTheDocument()
    })
  })

  test('tab: extra (draft of published). check texts of buttons in control panel it is different for Edit published', async () => {
    expect(getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(getByText('Spara')).toBeInTheDocument()
    expect(getByText('Avbryt')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: extra (draft of published). Click button Spara', async () => {
    fireEvent.click(getByText('Spara'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: extra (draft of published). render correct number of text about data origin and source info ', () => {
    expect(getAllByText('från kursplan').length).toBe(1)
    expect(screen.queryByText('från kursgemensam information')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: extra (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(screen.queryByText('Inkluderas alltid')).not.toBeInTheDocument()
    expect(getAllByText('Inkludera').length).toBe(3)
    expect(getAllByText('Inkluderas för vissa kurser').length).toBe(1)
    expect(screen.queryByText('Inkludera ytterligare avsnitt')).not.toBeInTheDocument()
  })
})
/*******************************************/
/**** Kontakter  contacts ******************/
/*******************************************/
describe('Active tab contacts. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditPublishedMemo activeTab="contacts" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: contacts (draft of published). renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: contacts (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(10)
  })

  test('tab: contacts (draft of published). renders no collapse and no buttons to close editor for help-text for all editors because they are open', () => {
    const allHelpTextBtns = screen.queryByText('Visa vägledning')
    expect(allHelpTextBtns).not.toBeInTheDocument()
    const allCloseEditorBtn = screen.queryByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn).not.toBeInTheDocument()
  })

  test('tab: contacts (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, prep, reqToFinal, extra]

    expectedInactiveTitles.map((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(contacts)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: contacts (draft of published). renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(14)
    const expectedAriaLabels = [
      'återgå till senaste publicerade versionen av kurs-PM  (2019-07-01 15:37:34)',
      'Information about Communication during course',
      'Redigera Kommunikation i kursen',
      'Information about Course coordinator',
      'Information about Teacher',
      'Information about Teacher assistants',
      'Information about Examiner',
      'Information about Other contacts',
      'Redigera Övriga kontakter',
      'Information about Made changes',
      null,
      null,
      'Avbryt',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
  })

  test('tab: contacts (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('contacts')
    expect(headers.length).toBe(6)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: contacts (draft of published). renders <SectionForNonEditable>, there is no mandatory (non-editable) fields', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(3)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('tab: contacts (draft of published). renders <SectionForNonEditable>, there are one standard header which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(0)
  })

  test('tab: contacts (draft of published). renders <StandardEditorPerTitle>, no fields which are mandatory and can be edited', async () => {
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(0)
  })

  test('tab: contacts (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contacts')
    expect(headersAndSubHds.length).toBe(2)

    const communicationDuringCourse = getByTestId(`text-for-memo-${contentType}-communicationDuringCourse`)
    expect(communicationDuringCourse).toBeInTheDocument()

    const communicationDuringCourseEditor = getByTestId(`btn-open-editor-communicationDuringCourse`)
    expect(communicationDuringCourseEditor).toBeInTheDocument()

    const otherContacts = getByTestId(`text-for-memo-${contentType}-otherContacts`)
    expect(otherContacts).toBeInTheDocument()

    const otherContactsEditor = getByTestId(`btn-open-editor-otherContacts`)
    expect(otherContactsEditor).toBeInTheDocument()
  })

  test('tab: contacts (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contacts')
    expect(headersAndSubHds.length).toBe(1)
    const teacherAssistants = getByTestId(`text-for-memo-${contentType}-teacherAssistants`)
    expect(teacherAssistants).toBeInTheDocument()
    expect(teacherAssistants).toHaveTextContent('Some test data for section teacherAssistants')
  })

  test('tab: contacts (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: contacts (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
    const inactiveTabEditorcourseContent = screen.queryByTestId('standard-editor-courseContent')
    expect(inactiveTabEditorcourseContent).not.toBeInTheDocument()
  })

  test('tab: contacts (draft of published). Renders "communicationDuringCourse" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-communicationDuringCourse')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = queryByTestId('btn-open-editor-communicationDuringCourse')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = queryByTestId(
        'optional-and-excluded-but-with-content-section-communicationDuringCourse'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). Renders "otherContacts" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-otherContacts')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = queryByTestId('btn-open-editor-otherContacts')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = queryByTestId('optional-and-excluded-but-with-content-section-otherContacts')
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). Renders "teacherAssistants" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-teacherAssistants')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const text = queryByTestId('text-for-memo-optional-teacherAssistants')
    expect(text).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = queryByTestId('text-for-memo-optional-teacherAssistants')
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). check texts of buttons in control panel it is different for Edit published', async () => {
    expect(getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(getByText('Spara')).toBeInTheDocument()
    expect(getByText('Avbryt')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: contacts (draft of published). Click button Spara', async () => {
    fireEvent.click(getByText('Spara'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). render correct number of text about data origin and source info ', () => {
    expect(screen.queryByText('från kursplan')).not.toBeInTheDocument()
    expect(getAllByText('från kursgemensam information').length).toBe(1)
    expect(getAllByText('från kurstillfällesinformation').length).toBe(3)
  })

  test('tab: contacts (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(getAllByText('Inkluderas alltid').length).toBe(3)
    expect(getAllByText('Inkludera').length).toBe(3)
    expect(screen.queryByText('Inkluderas för vissa kurser')).not.toBeInTheDocument()
    expect(screen.queryByText('Inkludera ytterligare avsnitt')).not.toBeInTheDocument()
  })
})
