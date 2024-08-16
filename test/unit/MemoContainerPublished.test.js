/* eslint-disable jest-dom/prefer-in-document */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable jest-dom/prefer-to-have-class */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable jest-dom/prefer-checked */
/* eslint-disable jest-dom/prefer-to-have-attribute */
/* eslint-disable testing-library/no-render-in-lifecycle */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StaticRouter } from 'react-router-dom/server'
import { act } from 'react-dom/test-utils'
import { MobxStoreProvider } from '../../public/js/app/mobx'

import i18n from '../../i18n'
import { getOnlyStandardHeaders, getSectionHeadersByType } from '../../public/js/app/util/fieldsByType.js'

import MemoContainer from '../../public/js/app/pages/MemoEditingContainer'

import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'
import translations from '../mocks/translations'
import { SectionContextProvider } from '../../public/js/app/stores/SectionContext'

const [{ sourceInfo }] = i18n.messages

const { memoTitlesByMemoLang, orderedFilledInAndVisible, sectionsLabels } = translations.en
const { pageTitles } = translations.sv
const introductionEditHeaders = {
  sv: ['Kurs-PM versionshanteras'],
  en: ['Edit published course memo'],
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
        <SectionContextProvider>
          <MemoContainer initialActiveTab={activeTab} {...rest} />
        </SectionContextProvider>
      </MobxStoreProvider>
    </StaticRouter>
  )
}
/** *****************************************/
/** ** contentAndOutcomes *******************/
/** *****************************************/
describe('Active tab contentAndOutcomes. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        render(<EditPublishedMemo activeTab="contentAndOutcomes" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: contentAndOutcomes (draft of published). renders a page with a new draft of a new memo', () =>
    new Promise(done => {
      done()
    }))

  test('tab: contentAndOutcomes (draft of published). renders main header h1, page name', () => {
    const allH1Headers = screen.getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.published)
  })

  test('tab: contentAndOutcomes (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = screen.getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(11)
    const expectedh3ds = introductionEditHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(getStartedHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(0, 6)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: contentAndOutcomes (draft of published). renders alert about kopps data were updated', () => {
    const alertText = screen.getByText(
      'Information som hämtas från kursplan och kontakter har uppdaterats automatiskt.'
    )
    expect(alertText).toBeInTheDocument()
  })

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('tab: contentAndOutcomes (draft of published). renders alert about changes not published', () => {
    const alertText = screen.getByText('Det finns ändringar som ej publicerats. Du kan')
    expect(alertText).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). renders collapse for help-text for no editor because they are closed', () => {
    const allHelpTextBtns = screen.queryAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). renders collapse for help-text for open editors', async () => {
    const allEditorButtonTestIds = ['btn-open-editor-learningActivities', 'btn-open-editor-scheduleDetails']

    allEditorButtonTestIds.forEach(id => {
      const button = screen.getByTestId(id)

      fireEvent.click(button)
    })

    const allHelpTextBtns = screen.getAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(2)
  })

  test('tab: contentAndOutcomes (draft of published). No edit buttons has label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = screen.queryAllByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). renders main subheader (course name)(sv)', () => {
    const headers = screen.getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 hp')
  })

  test('tab: contentAndOutcomes (draft of published). renders h4 for help text', () => {
    const allH4Headers = screen.getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(2)
    const expectedhds = ['Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: contentAndOutcomes (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = screen.getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [prep, reqToFinal, extra, contacts]

    expectedInactiveTitles.forEach((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(contentAndOutcomes)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: contentAndOutcomes (draft of published). renders main header h2 (page name) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = screen.getAllByRole('heading', { level: 2 })

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
  })

  test('tab: contentAndOutcomes (draft of published). renders all buttons', async () => {
    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBe(16)
    const expectedAriaLabels = [
      'Information om Course contents',
      'Information om Intended learning outcomes',
      'Information om Learning activities',
      'Edit Learning activities',
      'Information om Detailed plan', // TODO: add ariaLang
      'Edit Detailed plan',
      'Information om Created by user First header for section extraHeaders1',
      'Edit Created by user First header for section extraHeaders1', // fix header in extra rubrik
      'Information om Created by user Second header for section extraHeaders1',
      'Edit Created by user Second header for section extraHeaders1', // fix header in extra rubrik
      null,
      'Information om Made changes',
      null,
      null,
      null,
      null,
      'Avsluta med utkast',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'Lägg till rubrik till Content and learning outcomes',
      '',
      'Välj kurs-PM',
      'Spara',
      'Avsluta med utkast',
      'Granska',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: contentAndOutcomes (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('contentAndOutcomes')
    expect(headers.length).toBe(4)
    headers.forEach(headerId => {
      const contentAndMenyHd = screen.getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: contentAndOutcomes (draft of published). renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(2)
    headers.forEach(contentId => {
      const hdContent = screen.getByTestId(`text-for-memo-${contentType}-${contentId}`)
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
    const dynamicSections = screen.queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: contentAndOutcomes (draft of published). learningActivities editor is not visible', async () => {
    const editor = screen.queryByTestId('standard-editor-learningActivities')
    expect(editor).not.toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). scheduleDetails editor is not visible', async () => {
    const openEditorButton = screen.getByTestId('btn-open-editor-scheduleDetails')

    fireEvent.click(openEditorButton)

    await waitFor(() => {
      const openEditor = screen.getByTestId('standard-editor-scheduleDetails')
      expect(openEditor).toHaveTextContent(
        `Visa vägledningHär beskriver du vilka läraktiviteter och examinationstillfällen som planeras under kursen. Beskriv aktiviteternas ordning, dess innehåll och vilka förberedelser som rekommenderas inför varje aktivitet. Förberedelser kan vara kapitel och andra referenser till kurslitteratur eller webbsidor, men det kan också vara att installera programvara eller annan praktisk förberedelse`
      )
    })
  })

  test('tab: contentAndOutcomes (draft of published). Renders "Learning activities" checkbox which are checked and shows filled in content, then check it to show message about excluded though filled content', async () => {
    // Läraktiviteter - Learning activities
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-learningActivities')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleText = screen.queryByTestId('text-for-memo-optionalEditable-learningActivities')
    expect(visibleText).toBeInTheDocument()
    expect(visibleText).toHaveTextContent('Some test data for section learningActivities')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const emptyMsg = screen.queryByTestId('text-for-memo-optionalEditable-learningActivities')
      expect(emptyMsg).not.toBeInTheDocument()
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-learningActivities'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes (draft of published). Renders "scheduleDetails" checkbox which are checked and editor is closed although it has content', async () => {
    // Renders "scheduleDetails" checkbox which are checked and shows filled in content,
    // then check it to show message about excluded though filled content
    // Detailed plan
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-scheduleDetails')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleEditor = screen.queryByTestId('btn-close-editor-scheduleDetails')
    expect(visibleEditor).not.toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. Check if button edit/close editor works.', async () => {
    const editorOpenBtn = screen.queryByTestId('btn-open-editor-scheduleDetails')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      // Detailed plan
      const editor = screen.queryByTestId('standard-editor-scheduleDetails')
      expect(editor).toBeInTheDocument()

      const closeButton = screen.queryByTestId('btn-close-editor-scheduleDetails')
      expect(closeButton).toBeInTheDocument()
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
    expect(screen.getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(screen.getByText('Spara')).toBeInTheDocument()
    expect(screen.getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(screen.getByText('Granska')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). Click button Spara', async () => {
    fireEvent.click(screen.getByText('Spara'))
    await waitFor(() => {
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes (draft of published). get memo name', async () => {
    expect(screen.getByText('Autumn 2019-2 (Start date 28 Oct 2019, English)')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). get memo semester', async () => {
    expect(screen.getByText('HT 2019')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). comment about changes does not exist in html, because it is not a draft of a published memo', async () => {
    expect(screen.getByTestId('text-about-changes')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). render correct number of text about data origin and source info', () => {
    const dataOrigin = screen.getAllByText(/Inkluderas alltid | Innehåll hämtas från kursplan/i)
    expect(dataOrigin[0]).toBeInTheDocument()
    expect(screen.queryByText('från kursgemensam information')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: contentAndOutcomes (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(screen.getAllByText('Inkluderas alltid').length).toBe(2)
    expect(screen.getAllByText('Inkludera i kurs-PM').length).toBe(4)
    expect(screen.queryByText('Inkluderas när innehåll finns i kursplan')).not.toBeInTheDocument()
    expect(screen.queryByText('Inkludera ytterligare avsnitt')).not.toBeInTheDocument()
  })
})

/** *****************************************/
/** ** Förbereda inför kurstart *************/
/** *****************************************/
describe('Active tab prep. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        render(<EditPublishedMemo activeTab="prep" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: prep (draft of published). renders a page with a new draft of a new memo', () =>
    new Promise(done => {
      done()
    }))

  test('tab: prep (draft of published). renders main header h1, page name', () => {
    const allH1Headers = screen.getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.published)
  })

  test('tab: prep (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = screen.getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(13)
    const expectedh3ds = introductionEditHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(getStartedHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(6, 14)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: prep (draft of published). renders no collapse for help-text for any editors because they are closed', () => {
    const allHelpTextBtns = screen.queryAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(0)
  })

  test('tab: prep (draft of published). renders collapse for help-text for editors if they are open', async () => {
    const allEditorButtonTestIds = [
      'btn-open-editor-preparations',
      'btn-open-editor-literature',
      'btn-open-editor-equipment',
      'btn-open-editor-software',
    ]

    allEditorButtonTestIds.forEach(id => {
      const button = screen.getByTestId(id)

      fireEvent.click(button)
    })

    await waitFor(() => {
      const allHelpTextBtns = screen.getAllByText('Visa vägledning')
      expect(allHelpTextBtns.length).toBe(4)
    })
  })

  test('tab: prep (draft of published). No edit buttons has label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = screen.queryAllByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn.length).toBe(0)
  })

  test('tab: prep (draft of published). renders main subheader (course name)(sv)', () => {
    const headers = screen.getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 hp')
  })

  test('tab: prep (draft of published). renders main subheader h4 (course name), h4 for help text and other menu h4 (menu headers),', () => {
    const allH4Headers = screen.getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(2)
    const expectedhds = ['Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: prep (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = screen.getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, reqToFinal, extra, contacts]

    expectedInactiveTitles.forEach((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const prepTab = screen.getByRole('tab', { selected: true })
    expect(prepTab).toHaveTextContent(prep)

    expect(prepTab.className).toBe('nav-link active')
  })

  test('tab: prep (draft of published). renders main header h2 (page name) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = screen.getAllByRole('heading', { level: 2 })

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
  })

  test('tab: prep (draft of published). renders all buttons', async () => {
    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBe(21)
    const expectedAriaLabels = [
      'Information om Recommended prerequisites',
      'Information om Specific preparations',
      'Edit Specific preparations',
      'Information om Literature',
      'Edit Literature',
      'Information om Equipment', // TODO: add ariaLang
      'Edit Equipment',
      'Information om Software',
      'Edit Software',
      'Information om Support for students with disabilities',
      'Edit Support for students with disabilities',
      'Information om Created by user First header for section extraHeaders2',
      'Edit Created by user First header for section extraHeaders2', // fix header in extra rubrik
      'Information om Created by user Second header for section extraHeaders2',
      'Edit Created by user Second header for section extraHeaders2', // fix header in extra rubrik
      null,
      'Information om Made changes',
      null,
      null,
      null,
      null,
      'Avsluta med utkast',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'Lägg till rubrik till Preparations before course start',
      '',
      'Välj kurs-PM',
      'Spara',
      'Avsluta med utkast',
      'Granska',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: prep (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('prep')
    expect(headers.length).toBe(6)
    headers.forEach(headerId => {
      const contentAndMenyHd = screen.getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: prep (draft of published). renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const contentId = 'permanentDisabilitySubSection'

    const hdContent = screen.getByTestId(`text-for-memo-${contentType}-${contentId}`)
    expect(hdContent).toHaveTextContent(`Some test data for section`)
  })

  test('tab: prep (draft of published). renders <SectionForNonEditable>, there are no standard headers which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(0)
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, literature is a standard header, mandatory and editable, will have closed editor although it has content', async () => {
    const openEditorBtn = screen.getByTestId(`btn-open-editor-literature`)

    fireEvent.click(openEditorBtn)

    await waitFor(() => {
      const editorSectionIsOpen = screen.getByTestId(`standard-editor-literature`)
      expect(editorSectionIsOpen).toBeInTheDocument()
      expect(editorSectionIsOpen).toHaveTextContent(/Visa vägledningHär beskriver du vilken kurslitteratur/i)

      expect(screen.getByTestId(`btn-close-editor-literature`)).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'prep')
    expect(headersAndSubHds.length).toBe(3)
    const preparationsText = screen.getByTestId(`text-for-memo-${contentType}-preparations`)
    expect(preparationsText).toHaveTextContent('Some test data for section preparations')
    const equipmentOpenEditor = screen.queryByTestId(`standard-editor-equipment`)
    expect(equipmentOpenEditor).not.toBeInTheDocument()
    expect(screen.getByTestId(`btn-open-editor-equipment`)).toBeInTheDocument()
    const software = screen.getByTestId(`text-for-memo-${contentType}-software`)
    expect(software).toHaveTextContent('Some test data for section software')
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional' // prerequisites
    const headersAndSubHds = getSectionHeadersByType(contentType, 'prep')
    expect(headersAndSubHds.length).toBe(1)
    const prerequisites = screen.getByTestId(`text-for-memo-${contentType}-${headersAndSubHds[0]}`)
    expect(prerequisites).toBeInTheDocument()
    expect(prerequisites).toHaveTextContent('Some test data for section prerequisites')
  })

  test('tab: prep (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = screen.queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: prep (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
  })

  test('tab: prep. renders Edit buttons for each editable standard header and subheaher because memo content is empty', async () => {
    expect(screen.getByTestId('btn-open-editor-preparations')).toBeInTheDocument()
    expect(screen.getByTestId('btn-open-editor-literature')).toBeInTheDocument()
    expect(screen.getByTestId('btn-open-editor-equipment')).toBeInTheDocument()
    expect(screen.getByTestId('btn-open-editor-software')).toBeInTheDocument()
    expect(screen.getByTestId('btn-open-editor-permanentDisabilitySubSection')).toBeInTheDocument()

    expect(screen.queryByTestId('btn-close-editor-prerequisites')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-permanentDisability')).not.toBeInTheDocument()

    expect(screen.queryByTestId('btn-close-editor-prerequisites')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-permanentDisability')).not.toBeInTheDocument()
  })

  test('tab: prep (draft of published). Renders "preparations" checkbox which are checked and shows filled in content, then check it to show message about excluded though filled content', async () => {
    // Läraktiviteter - Learning activities
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-preparations')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const visibleText = screen.queryByTestId('text-for-memo-optionalEditable-preparations')
    expect(visibleText).toBeInTheDocument()
    expect(visibleText).toHaveTextContent('Some test data for section preparations')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const emptyMsg = screen.queryByTestId('text-for-memo-optionalEditable-preparations')
      expect(emptyMsg).not.toBeInTheDocument()
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-preparations'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). Show text from editor, renders "literature" open editor button, then click it to open editor', async () => {
    const showText = screen.queryByTestId('text-for-memo-mandatoryAndEditable-literature')
    expect(showText).toBeInTheDocument()
    expect(showText).toHaveTextContent('Some test data for section literature')

    const openLiterature = screen.getByTestId('btn-open-editor-literature')
    expect(openLiterature).toBeInTheDocument()

    const visibleText = screen.queryByTestId('text-for-memo-mandatoryEditable-literature')
    expect(visibleText).not.toBeInTheDocument()

    fireEvent.click(openLiterature)
    await waitFor(() => {
      const closeLiterature = screen.getByTestId('btn-close-editor-literature')
      expect(closeLiterature).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). Renders "equipment" checkbox which are checked and editor is closed although it has content', async () => {
    // Renders "equipment" checkbox which are checked and shows filled in content,
    // then check it to show message about excluded though filled content

    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-equipment')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const openEquipment = screen.queryByTestId('btn-open-editor-equipment')
    expect(openEquipment).toBeInTheDocument()
    expect(openEquipment).toHaveTextContent('')
    expect(openEquipment).toHaveAttribute('aria-label', 'Edit Equipment')

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()

      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. Check if button edit/close editor works. If software has some content then software should be closed in the beginning', async () => {
    const editor = screen.queryByTestId('standard-editor-software')
    expect(editor).not.toBeInTheDocument()

    const editorOpenBtn = screen.queryByTestId('btn-open-editor-software')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const closeButton = screen.queryByTestId('btn-close-editor-software')
      expect(closeButton).toBeInTheDocument()
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
    expect(screen.getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(screen.getByText('Spara')).toBeInTheDocument()
    expect(screen.getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(screen.getByText('Granska')).toBeInTheDocument()
  })

  test('tab: prep (draft of published). Click button Spara', async () => {
    fireEvent.click(screen.getByText('Spara'))
    await waitFor(() => {
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep (draft of published). render correct number of text about data origin and source info', () => {
    expect(screen.queryByText('från kursplan')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: prep (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(screen.getAllByText('Inkluderas alltid').length).toBe(1)
    expect(screen.getAllByText('Inkludera i kurs-PM').length).toBe(6)
    expect(screen.queryByText('Inkluderas när innehåll finns i kursplan')).not.toBeInTheDocument()
    expect(screen.getAllByText('Inkludera ytterligare avsnitt').length).toBe(1)
  })
})

/** *****************************************/
/** ** Examination  reqToFinal **************/
/** *****************************************/
describe('Active tab reqToFinal. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        render(<EditPublishedMemo activeTab="reqToFinal" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: reqToFinal (draft of published). renders a page with a new draft of a new memo', () =>
    new Promise(done => {
      done()
    }))

  test('tab: reqToFinal (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = screen.getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(16)
    const expectedh3ds = introductionEditHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(getStartedHeaders.sv)
      .concat(moreHelpHeaders.sv)
      .concat([...orderedFilledInAndVisible.slice(14, 25)])
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: reqToFinal (draft of published). renders collapse for help-text for all editors because they are open', () => {
    const allHelpTextBtns = screen.queryAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). No edit buttons has label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = screen.queryAllByRole('button', { name: 'Stäng redigeringsläge' })
    expect(allCloseEditorBtn.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = screen.getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, prep, extra, contacts]

    expectedInactiveTitles.forEach((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(reqToFinal)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: reqToFinal (draft of published). renders all buttons', async () => {
    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBe(26)
    const expectedAriaLabels = [
      'Information om Grading scale',
      'Information om Examination',
      'Edit Examination',
      'Information om Other requirements for final grade',
      'Information om Grading criteria/assessment criteria',
      'Edit Grading criteria/assessment criteria',
      'Information om Opportunity to complete the requirements via supplementary examination',
      'Edit Opportunity to complete the requirements via supplementary examination',
      'Information om Opportunity to raise an approved grade via renewed examination',
      'Edit Opportunity to raise an approved grade via renewed examination',
      'Information om Alternatives to missed activities or tasks',
      'Edit Alternatives to missed activities or tasks',
      'Information om Reporting of exam results',
      'Edit Reporting of exam results',
      'Information om Ethical approach',
      'Edit Ethical approach',
      'Information om Created by user First header for section extraHeaders3',
      'Edit Created by user First header for section extraHeaders3', // fix header in extra rubrik
      'Information om Created by user Second header for section extraHeaders3',
      'Edit Created by user Second header for section extraHeaders3', // fix header in extra rubrik
      null,
      'Information om Made changes',
      null,
      null,
      null,
      null,
      'Avsluta med utkast',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))

    // testa       'Lägg till rubrik till Preparations before course start',
    //  'återgå till senaste publicerade versionen av kurs-PM (2019-07-01 15:37:34)',
  })

  test('tab: reqToFinal (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('reqToFinal')
    expect(headers.length).toBe(9)
    headers.forEach(headerId => {
      const contentAndMenyHd = screen.getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: reqToFinal (draft of published). renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const contentId = 'ethicalApproachSubSection'
    const hdContent = screen.getByTestId(`text-for-memo-${contentType}-${contentId}`)
    expect(hdContent).toHaveTextContent(`Some test data for section`)
  })

  test('tab: reqToFinal (draft of published). renders <SectionForNonEditable>, there are one standard header which are mandatory for some courses and non-editable', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(1)
    headers.forEach(contentId => {
      const hdContent = screen.getByTestId(`text-for-memo-${contentType}-${contentId}`)
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

    const examinationSubSectionEditorInactive = screen.queryByTestId(`standard-editor-examinationSubSection`)
    expect(examinationSubSectionEditorInactive).not.toBeInTheDocument()

    const gradingCriteriaText = screen.getByTestId(`text-for-memo-${contentType}-gradingCriteria`)
    expect(gradingCriteriaText).toBeInTheDocument()

    const possibilityToCompletionEditor = screen.queryByTestId(`standard-editor-possibilityToCompletion`)
    expect(possibilityToCompletionEditor).not.toBeInTheDocument()

    const possibilityToAdditionEditor = screen.queryByTestId(`standard-editor-possibilityToAddition`)
    expect(possibilityToAdditionEditor).not.toBeInTheDocument()

    const possibilityToCompensate = screen.getByTestId(`text-for-memo-${contentType}-possibilityToCompensate`)
    expect(possibilityToCompensate).toHaveTextContent('Some test data for section possibilityToCompensate')

    const reportingResults = screen.getByTestId(`text-for-memo-${contentType}-reportingResults`)
    expect(reportingResults).toHaveTextContent('Some test data for section reportingResults')

    const ethicalApproachSubSection = screen.queryByTestId(`standard-editor-ethicalApproachSubSection`)
    expect(ethicalApproachSubSection).not.toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional' // prerequisites
    const headersAndSubHds = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headersAndSubHds.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = screen.queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: reqToFinal (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
    const inactiveTabEditorcourseContent = screen.queryByTestId('standard-editor-courseContent')
    expect(inactiveTabEditorcourseContent).not.toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). Renders "examinationSubSection" closed editor, then opens it after pressing button "edit"', async () => {
    const editorOpenBtn = screen.getByTestId('btn-open-editor-examinationSubSection')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const editorCloseBtn = screen.getByTestId('btn-close-editor-examinationSubSection')
      expect(editorCloseBtn).toBeInTheDocument()
      expect(screen.queryByTestId('standard-editor-examinationSubSection')).toBeInTheDocument()
      expect(screen.queryByTestId('text-for-memo-optionalEditable-examinationSubSection')).not.toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "examinationSubSection" visibility checkbox and text.', async () => {
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-examinationSubSection')
    expect(checkboxIncludeInMemo).toBeTruthy()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(
        screen.getByTestId('optional-and-excluded-but-with-content-subSection-examinationSubSection')
      ).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "gradingCriteria" closed editor and tries to change visibility and then open it after pressing button "open"', async () => {
    const visibleText = screen.queryByTestId('text-for-memo-optionalEditable-gradingCriteria')
    expect(visibleText).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('checkbox-visibility-gradingCriteria'))
    await waitFor(() => {
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-gradingCriteria'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
    })
    const editorOpenBtn = screen.getByTestId('btn-open-editor-gradingCriteria')

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const editorCloseBtn = screen.getByTestId('btn-close-editor-gradingCriteria')
      expect(editorCloseBtn).toBeInTheDocument()
    })
  })

  // ethicalApproachSubSection
  test('tab: reqToFinal (draft of published). Renders "ethicalApproachSubSection" edit button, try to open it and save added text', async () => {
    const editorOpenBtn = screen.getByTestId('btn-open-editor-ethicalApproachSubSection')
    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const buttonSaveAndExit = screen.getByTestId('save-and-exit')
      fireEvent.click(buttonSaveAndExit)
    })
    expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). Renders "ethicalApproachSubSection" closed editor, shows warning about included-but-with-no-content and tries to open it after pressing button "edit"', async () => {
    const { subSection: subsectionIsEmpty } = sourceInfo.noInfoYet

    const checkbox = screen.queryByTestId('checkbox-visibility-ethicalApproachSubSection')
    expect(checkbox).toBeInTheDocument()

    fireEvent.click(checkbox) /
      (await waitFor(() => {
        const preparationsText = screen.getByTestId('text-for-memo-optionalEditable-ethicalApproachSubSection')
        expect(preparationsText).toHaveTextContent(subsectionIsEmpty)
      }))

    const editorOpenBtn = screen.getByTestId('btn-open-editor-ethicalApproachSubSection')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const editor = screen.getByTestId('standard-editor-ethicalApproachSubSection')
      expect(editor).toBeInTheDocument()
      const editorCloseBtn = screen.getByTestId('btn-close-editor-ethicalApproachSubSection')
      expect(editorCloseBtn).toBeInTheDocument()
    })
  })

  // possibilityToCompletion

  test('tab: reqToFinal (draft of published). Renders "possibilityToCompletion" checkbox which is checked and unchecks it', async () => {
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-possibilityToCompletion')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = screen.queryByTestId('btn-open-editor-possibilityToCompletion')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()

      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). Renders "possibilityToCompletion" as an open editor and tries to change visibility and to close it by pressing a button "close"', async () => {
    const visibleText = screen.queryByTestId('text-for-memo-optionalEditable-possibilityToCompletion')
    expect(visibleText).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('checkbox-visibility-possibilityToCompletion'))
    await waitFor(() => {
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-possibilityToCompletion'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()
    })

    const editorOpenBtn = screen.getByTestId('btn-open-editor-possibilityToCompletion')
    expect(editorOpenBtn).toBeInTheDocument()
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
    expect(screen.getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(screen.getByText('Spara')).toBeInTheDocument()
    expect(screen.getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(screen.getByText('Granska')).toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). Click button Spara', async () => {
    fireEvent.click(screen.getByText('Spara'))
    await waitFor(() => {
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal (draft of published). render correct number of text about data origin and source info', () => {
    const dataOrigin = screen.getAllByText(/Inkluderas när innehåll finns i kursplan | Innehåll hämtas från kursplan/i)
    expect(dataOrigin[0]).toBeInTheDocument()
    expect(screen.queryByText('från kursgemensam information')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: reqToFinal (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(screen.getAllByText('Inkluderas alltid').length).toBe(3)
    expect(screen.getAllByText('Inkludera i kurs-PM').length).toBe(7)
    expect(screen.getAllByText('Inkluderas när innehåll finns i kursplan').length).toBe(1)
    expect(screen.getAllByText('Inkludera ytterligare avsnitt').length).toBe(2)
  })
})
/** *****************************************/
/** ** Ytterligare Information  extra *******/
/** *****************************************/
describe('Active tab extra. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        render(<EditPublishedMemo activeTab="extra" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: extra (draft of published). renders a page with a new draft of a new memo', () =>
    new Promise(done => {
      done()
    }))

  test('tab: extra (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = screen.getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(9)
    const expectedh3ds = introductionEditHeaders.sv
      .concat(informStudentsHeaders.sv)
      .concat(getStartedHeaders.sv)
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
    const allInactiveTab = screen.getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, prep, reqToFinal, contacts]

    expectedInactiveTitles.forEach((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(extra)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: extra (draft of published). renders all buttons', async () => {
    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBe(13)
    const expectedAriaLabels = [
      'Information om Additional regulations',
      'Information om Changes of the course before this course offering',
      'Edit Changes of the course before this course offering',
      'Information om Created by user First header for section extraHeaders4',
      'Edit Created by user First header for section extraHeaders4',
      'Information om Created by user Second header for section extraHeaders4',
      'Edit Created by user Second header for section extraHeaders4',
      null,
      'Information om Made changes',
      null,
      null,
      null,
      null,
      null,
      'Avsluta med utkast',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))

    // testa       'Lägg till rubrik till Preparations before course start',
    //  'återgå till senaste publicerade versionen av kurs-PM (2019-07-01 15:37:34)',
  })

  test('tab: extra (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('extra')
    expect(headers.length).toBe(2)
    headers.forEach(headerId => {
      const contentAndMenyHd = screen.getAllByText(memoTitlesByMemoLang[headerId])
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
    headers.forEach(contentId => {
      const hdContent = screen.getByTestId(`text-for-memo-${contentType}-${contentId}`)
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

    const infoForReregisteredStudents = screen.getByTestId(`text-for-memo-${contentType}-infoForReregisteredStudents`)
    expect(infoForReregisteredStudents).toBeInTheDocument()

    const infoForReregisteredStudentsEditor = screen.getByTestId(`btn-open-editor-infoForReregisteredStudents`)
    expect(infoForReregisteredStudentsEditor).toBeInTheDocument()
  })

  test('tab: extra (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional' // prerequisites
    const headersAndSubHds = getSectionHeadersByType(contentType, 'extra')
    expect(headersAndSubHds.length).toBe(0)
  })

  test('tab: extra (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = screen.queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: extra (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
    const inactiveTabEditorcourseContent = screen.queryByTestId('standard-editor-courseContent')
    expect(inactiveTabEditorcourseContent).not.toBeInTheDocument()
  })

  test('tab: extra (draft of published). Renders "infoForReregisteredStudents" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-infoForReregisteredStudents')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = screen.queryByTestId('btn-open-editor-infoForReregisteredStudents')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-infoForReregisteredStudents'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
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
    expect(screen.getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(screen.getByText('Spara')).toBeInTheDocument()
    expect(screen.getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(screen.getByText('Granska')).toBeInTheDocument()
  })

  test('tab: extra (draft of published). Click button Spara', async () => {
    fireEvent.click(screen.getByText('Spara'))
    await waitFor(() => {
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: extra (draft of published). render correct number of text about data origin and source info', () => {
    expect(screen.getByText('Inkluderas när innehåll finns i kursplan')).toBeInTheDocument()
    expect(screen.getByText(/Innehåll hämtas från kursplan/i)).toBeInTheDocument()
    expect(screen.queryByText('från kursgemensam information')).not.toBeInTheDocument()
    expect(screen.queryByText('från kurstillfällesinformation')).not.toBeInTheDocument()
  })

  test('tab: extra (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(screen.queryByText('Inkluderas alltid')).not.toBeInTheDocument()
    expect(screen.getAllByText('Inkludera i kurs-PM').length).toBe(3)
    expect(screen.getByText(/Inkluderas när innehåll finns i kursplan/i)).toBeInTheDocument()
    expect(screen.queryByText('Inkludera ytterligare avsnitt')).not.toBeInTheDocument()
  })
})
/** *****************************************/
/** ** Kontakter  contacts ******************/
/** *****************************************/
describe('Active tab contacts. Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        render(<EditPublishedMemo activeTab="contacts" memoLang="en" userLang="sv" />)
      })
  )
  test('tab: contacts (draft of published). renders a page with a new draft of a new memo', () =>
    new Promise(done => {
      done()
    }))

  test('tab: contacts (draft of published). renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = screen.getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(11)
  })

  test('tab: contacts (draft of published). renders no collapse and no buttons to close editor for help-text for all editors because they are open', () => {
    const allHelpTextBtns = screen.queryByText('Visa vägledning')
    expect(allHelpTextBtns).not.toBeInTheDocument()
    const allCloseEditorBtn = screen.queryByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn).not.toBeInTheDocument()
  })

  test('tab: contacts (draft of published). renders memo sections headers in memo lang in tab pane', () => {
    const allInactiveTab = screen.getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, prep, reqToFinal, extra]

    expectedInactiveTitles.forEach((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(contacts)

    expect(activeTab.className).toBe('nav-link active')
  })

  test('tab: contacts (draft of published). renders all buttons', async () => {
    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBe(13)
    const expectedAriaLabels = [
      'Information om Communication during course',
      'Edit Communication during course',
      'Information om Course coordinator',
      'Information om Teachers',
      'Information om Teacher assistants',
      'Information om Examiner',
      'Information om Other contacts',
      'Edit Other contacts',
      'Information om Made changes',
      null,
      null,
      null,
      null,
      'Avsluta med utkast',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
  })

  test('tab: contacts (draft of published). check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('contacts')
    expect(headers.length).toBe(6)
    headers.forEach(headerId => {
      const contentAndMenyHd = screen.getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: contacts (draft of published). renders <SectionForNonEditable>, there is no mandatory (non-editable) fields', async () => {
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(3)
    headers.forEach(contentId => {
      const hdContent = screen.getByTestId(`text-for-memo-${contentType}-${contentId}`)
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

    const communicationDuringCourse = screen.getByTestId(`text-for-memo-${contentType}-communicationDuringCourse`)
    expect(communicationDuringCourse).toBeInTheDocument()

    const communicationDuringCourseEditor = screen.getByTestId(`btn-open-editor-communicationDuringCourse`)
    expect(communicationDuringCourseEditor).toBeInTheDocument()

    const otherContacts = screen.getByTestId(`text-for-memo-${contentType}-otherContacts`)
    expect(otherContacts).toBeInTheDocument()

    const otherContactsEditor = screen.getByTestId(`btn-open-editor-otherContacts`)
    expect(otherContactsEditor).toBeInTheDocument()
  })

  test('tab: contacts (draft of published). renders <StandardEditorPerTitle>, check the text of prerequisites which is optional and non-editable is visible', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contacts')
    expect(headersAndSubHds.length).toBe(1)
    const teacherAssistants = screen.getByTestId(`text-for-memo-${contentType}-teacherAssistants`)
    expect(teacherAssistants).toBeInTheDocument()
    expect(teacherAssistants).toHaveTextContent('Some test data for section teacherAssistants')
  })

  test('tab: contacts (draft of published). renders <StandardEditorPerTitle>, no message about emptiness of optional (non-editable + editable)', async () => {
    const dynamicSections = screen.queryAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(0)
  })

  test('tab: contacts (draft of published). Check if content from other tab, is not visible in this section', async () => {
    const inactiveTabEditor = screen.queryByTestId('standard-editor-learningActivities')
    expect(inactiveTabEditor).not.toBeInTheDocument()
    const inactiveTabEditorcourseContent = screen.queryByTestId('standard-editor-courseContent')
    expect(inactiveTabEditorcourseContent).not.toBeInTheDocument()
  })

  test('tab: contacts (draft of published). Renders "communicationDuringCourse" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-communicationDuringCourse')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = screen.queryByTestId('btn-open-editor-communicationDuringCourse')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-communicationDuringCourse'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). Renders "otherContacts" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-otherContacts')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const closedEditor = screen.queryByTestId('btn-open-editor-otherContacts')
    expect(closedEditor).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = screen.queryByTestId(
        'optional-and-excluded-but-with-content-section-otherContacts'
      )
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). Renders "teacherAssistants" checkbox which are checked and shows filled in content as a text', async () => {
    const checkboxIncludeInMemo = screen.getByTestId('checkbox-visibility-teacherAssistants')
    expect(checkboxIncludeInMemo.checked).toBeTruthy()

    const text = screen.queryByTestId('text-for-memo-optional-teacherAssistants')
    expect(text).toBeInTheDocument()

    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeFalsy()
      const filledInButNotIncludedMsg = screen.queryByTestId('text-for-memo-optional-teacherAssistants')
      expect(filledInButNotIncludedMsg).toBeInTheDocument()

      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). check texts of buttons in control panel it is different for Edit published', async () => {
    expect(screen.getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(screen.getByText('Spara')).toBeInTheDocument()
    expect(screen.getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(screen.getByText('Granska')).toBeInTheDocument()
  })

  test('tab: contacts (draft of published). Click button Spara', async () => {
    fireEvent.click(screen.getByText('Spara'))
    await waitFor(() => {
      expect(screen.getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts (draft of published). render correct number of text about data origin and source info', () => {
    expect(screen.queryByText('från kursplan')).not.toBeInTheDocument()
    const dataOrigin = screen.queryAllByTestId('data-origin')
    expect(dataOrigin.length).toBe(3)
  })

  test('tab: contacts (draft of published). render correct number of include label, standard + extra headers', () => {
    expect(screen.getAllByText('Inkluderas alltid').length).toBe(3)
    expect(screen.getAllByText('Inkludera i kurs-PM').length).toBe(3)
    expect(screen.queryByText('Inkluderas när innehåll finns i kursplan')).not.toBeInTheDocument()
    expect(screen.queryByText('Inkludera ytterligare avsnitt')).not.toBeInTheDocument()
  })
})
