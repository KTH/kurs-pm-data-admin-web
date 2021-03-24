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
    const expectedh3ds = [
      'Hur blir ditt kurs-PM bra för studenter?',
      'Kom i gång snabbt',
      'Mer hjälp?',
      ...orderedFilledInAndVisible.slice(0, 6),
    ]
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
    const allTabs = getAllByRole('tab')
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allTabs.length).toBe(5)
    const expectedtabs = [contentAndOutcomes, prep, reqToFinal, extra, contacts]
    expectedtabs.map((tabTitle, index) => {
      expect(allTabs[index]).toHaveTextContent(tabTitle)
    })
  })

  test('tab: contentAndOutcomes (draft of published). renders main header h2 (page name) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
    // const expectedh2ds = ['Redigera kurs-PM', 'Rubriker', contentAndOutcomes, prep, reqToFinal, extra, contacts]
    // expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('tab: contentAndOutcomes (draft of published). renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(17)
    const expectedAriaLabels = [
      'återgå till senaste publicerade versionen av kurs-PM  (Invalid Date)',
      'Information about Course contents',
      'Information about Intended learning outcomes',
      'Information about Learning activities',
      'Redigera Läraktiviteter',
      'Information about Detailed plan', //TODO: add ariaLang
      'Stäng redigeringsläge Detaljplanering',
      'Information about Created by user First header for section extraHeaders1',
      'Redigera undefined', // fix header in extra rubrik
      'Information about Created by user Second header for section extraHeaders1',
      'Redigera undefined', // fix header in extra rubrik
      null,
      'Information about Made changes',
      null,
      null,
      'Avbryt',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      'återgå till senaste publicerade versionen av kurs-PM (Invalid Date)',
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
    // headers.map(contentId => {
    //   const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
    //   expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    // })
  })

  test('tab: contentAndOutcomes (draft of published). renders <StandardEditorPerTitle>, there are no standard headers mandatory and editable', async () => {
    // const { mandatoryAndEditable: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(0)
    // headers.map(contentId => {
    //   const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
    //   expect(hdContent).toHaveTextContent(emptyTextMsg)
    // })
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

  test('tab: contentAndOutcomes (draft of published). learningActivities editor is not visible', async done => {
    const editor = screen.queryByTestId('standard-editor-learningActivities')
    expect(editor).not.toBeInTheDocument()
    done()
  })

  test('tab: contentAndOutcomes (draft of published). scheduleDetails editor is visible', async done => {
    const openEditor = getByTestId('standard-editor-scheduleDetails')
    expect(openEditor).toHaveTextContent(
      `Visa vägledningUnder rubriken "Detaljplanering" beskriver du vilka läraktiviteter eller examinationstillfällen som har planerats under kursen. Använd med fördel en tabell för att på ett överblickbart sätt beskriva aktiviteternas ordning, dess innehåll och vilka förberedelser som rekommenderas inför varje aktivitet. Systemet skapar en tabell med tre kolumner åt dig där du kan skriva i kursomgångens läraktiviteter. Du kan anpassa denna tabell genom att t.ex. lägga till rader, lägga till kolumner, eller ersätta den med en tabell från Word. Ett enkelt och tydligt sätt är att beskriva detaljplanering genom att för varje läraktivitet eller examination ange typ av aktivitet, aktivitetens innehåll och vilka förberedelser som studenten behöver göra. Förberedelser kan vara kapitel och andra referenser till kurslitteratur eller webbsidor, men det kan också vara att installera programvara eller annan praktisk förberedelse. Länka gärna till instruktioner och material för kursomgången i Canvas, men var uppmärksam på att länkar från tidigare kurs-PM som kopierats till detta kurs-PM kan vara ogiltiga. Testa därför länkar till andra webbsidor innan publicering. Följande Detaljplanering är ett exempel från kurs HI1027: [Infoga exempel på tabell] Om du beskrivit kursens olika läraktiviteter under rubriken "Läraktiviteter" rekommenderas att använda samma terminologi för att studenterna ska se den röda träden genom detta kurs-PM. Om det är någon aktivitet som är särskilt viktigt för studenten att förbereda kan det understrykas genom att beskriva det i rubriken "Särskilda förberedelser".`
    )
    done()
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
    const editor = screen.queryByTestId('standard-editor-extraHeaders1-scheduleDetails')
    expect(editor).not.toBeInTheDocument()

    const editorOpenBtn = screen.queryByTestId('btn-close-editor-scheduleDetails')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const close = screen.queryByTestId('btn-open-editor-scheduleDetails')
      expect(close).toBeInTheDocument()
    })
  })

  // data-testid="btn-open-editor-extraHeaders1-0.13108128127030394"
  test('tab: contentAndOutcomes (draft of published). both extraHeader editors are not visible, but their editor buttons are visibile', async done => {
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
    done()
  })

  // data-testid="btn-open-editor-extraHeaders1-0.13108128127030394"
  test('tab: contentAndOutcomes (draft of published). Open both extra headers editors', async done => {
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

    done()
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

  xtest('tab: contentAndOutcomes (draft of published). render correct number of text about data origin and source info ', () => {
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

/**** Förbereda inför kurstart ***** */
