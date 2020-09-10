import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'
import {
  allStandardHeadersAndSubHd,
  getNumOfEditableStandardContent,
  getOnlyStandardHeaders,
  getHeadersByType,
  typeOfThisHeader
} from '../../public/js/app/util/fieldsByType.js'
import MemoContainer from '../../public/js/app/pages/MemoContainer'
import mockRouterStoreWithChosenMemo from '../mocks/RouterStoreWithChosenMemo'

const {
  alerts,
  info,
  pagesCreateNewPm,
  pageTitles,
  buttons,
  sourceInfo,
  sectionsLabels,
  memoTitlesByMemoLang
} = i18n.messages[0]
const {
  alerts: alertsSV,
  info: infoSV,
  pagesCreateNewPm: pagesCreateNewPmSV,
  pageTitles: pageTitlesSV,
  buttons: buttonsSV,
  sectionsLabels: sectionsLabelsSV,
  sourceInfo: sourceInfoSV,
  memoTitlesByMemoLang: memoTitlesByMemoLangSV
} = i18n.messages[1]
const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText } = screen

const EditPublishedMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedRouterStore = mockRouterStoreWithChosenMemo(
    'DRAFT_OF_PUBLISHED',
    'filledInAndVisible',
    memoLang,
    userLang
  )
  return (
    <StaticRouter>
      <Provider routerStore={updatedRouterStore}>
        <MemoContainer {...rest} />
      </Provider>
    </StaticRouter>
  )
}

describe('Component <MemoContainer> Edit published. A New draft of a PUBLISHED memo. All data is filled in and visible. Memo in English, user interface in Swedish', () => {
  beforeEach(() => {
    render(<EditPublishedMemo memoLang="en" userLang="sv" />)
  })
  test('renders a page with a new draft of a new memo', (done) => {
    done()
  })
  //

  test('renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitlesSV.published)
  })

  test('renders alert about kopps data were updated', () => {
    const alert = getByText(
      'Kursplans-information och kontaktinformation har uppdaterats automatiskt.'
    )
    expect(alert).toBeInTheDocument()
  })

  test('renders alert about kopps data were updated', () => {
    const alert = getByText('Det finns ändringar som ej publicerats. Du kan')
    expect(alert).toBeInTheDocument()
  })

  test('renders collapse for help-text for all editors because they are open', () => {
    const allHelpTextBtns = getAllByText('Visa vägledning')
    expect(allHelpTextBtns.length).toBe(8)
  })

  test('All edit buttons have label Stäng redigeringsläge', async () => {
    const allCloseEditorBtn = getAllByText('Stäng redigeringsläge')
    expect(allCloseEditorBtn.length).toBe(8)
  })

  test('All section with editor are visible', async (done) => {
    const allCloseEditorBtn = getAllByTestId('standard-editor')
    expect(allCloseEditorBtn.length).toBe(8)
    done()
  })

  test('renders main subheader h4 (course name), h4 for help text and other menu h4 (menu headers), ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(16)
    const expectedhds = [
      'EF1111 Project in Plasma Physics 9 hp',
      'Termin',
      'Kursomgång',
      'Visa vägledning',
      'Visa vägledning',
      'Visa vägledning',
      'Visa vägledning',
      'Visa vägledning',
      'Visa vägledning',
      'Visa vägledning',
      'Visa vägledning',
      contentAndOutcomes,
      prep,
      reqToFinal,
      extra,
      contacts
    ]
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('renders main header h2 (page name) in user lang(en),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(7)
    // expect(allH2Headers[0]).toHaveTextContent()
    const expectedh2ds = [
      'Redigera kurs-PM',
      'Rubriker',
      contentAndOutcomes,
      prep,
      reqToFinal,
      extra,
      contacts
    ]
    expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders()
    expect(headers.length).toBe(27)
    headers.map((headerId) => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct content', async () => {
    const contentType = 'mandatory'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(9)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct content', async () => {
    const contentType = 'mandatoryForSome'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(2)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(`Some test data for section ${contentId}`)
    })
  })

  test('renders checkbox, check they are checked in because memo content is all visible, standard + extra headers', async () => {
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')
    expect(checkboxIncludeInMemo.length).toBe(26)
    checkboxIncludeInMemo.map((ch) => expect(ch.checked).toBeTruthy())
  })

  test('renders checkbox which are checked and check it to reveal message about include in msg', async (done) => {
    const { section: sectionIsNotIncluded } = sourceInfoSV.notIncludedInMemoYet
    //Läraktiviteter - Learning activities
    const checkExclude = getAllByTestId('checkbox-visibility')[0]
    fireEvent.click(checkExclude)
    await waitFor(() => {
      expect(checkExclude.checked).toBeFalsy()
      expect(getByText(sectionIsNotIncluded)).toBeInTheDocument()
      const learningActivitiesText = getByTestId(
        `optional-and-excluded-but-with-content-section-learningActivities`
      )
      expect(learningActivitiesText).toHaveTextContent(sectionIsNotIncluded)
    })
    done()
  })

  test('renders alert about result of saving data', async (done) => {
    //Detailed plan
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[1]
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
    done()
  })

  test('check texts of buttons in control panel it is different for Edit published', async () => {
    expect(getByText('Välj kurs-PM')).toBeInTheDocument()
    expect(getByText('Spara')).toBeInTheDocument()
    expect(getByText('Avbryt')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('Click button Spara', async () => {
    fireEvent.click(getByText('Spara'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('get memo name', async () => {
    expect(getByText('Autumn 2019-2 (Start date 28/10/2019, English)')).toBeInTheDocument()
  })

  test('get memo semester', async () => {
    expect(getByText('HT 2019')).toBeInTheDocument()
  })

  test('comment about changes does not exist in html, because it is not a draft of a published memo', async () => {
    expect(getByTestId('text-about-changes')).toBeInTheDocument()
  })
})
