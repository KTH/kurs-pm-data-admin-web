import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'
import {
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
const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByRole, getByText } = screen

const EditFreshDraftOfNewMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedRouterStore = mockRouterStoreWithChosenMemo(
    'DRAFT_NEW_MEMO',
    'freshEmpty',
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

describe('Component <MemoContainer> Edit. A New fresh draft of a NEW memo. Memo in English, user interface in English', () => {
  beforeEach(() => {
    render(<EditFreshDraftOfNewMemo memoLang="en" userLang="en" />)
  })
  test('renders a page with a new draft of a new memo', (done) => {
    done()
  })

  test('renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.new)
  })

  test('renders main subheader h4 (course name) and other menu h4 (menu headers), ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(8)
    const expectedhds = [
      'EF1111 Project in Plasma Physics 9 credits',
      'Semester',
      'Course offering',
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
      'Edit course memo',
      'Headings',
      contentAndOutcomes,
      prep,
      reqToFinal,
      extra,
      contacts
    ]
    expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(54)
  })

  test('renders Edit buttons for each editable standard header and subheaher because memo content is empty', async () => {
    const openBtn = getAllByTestId('btn-open-editor')
    const expectedNumOfEditable = getNumOfEditableStandardContent()
    expect(openBtn.length).toBe(expectedNumOfEditable)
  })

  test('check how many message about empty content is showed for content which is editable (mandatoryAndEditable + optionalEditable)', async () => {
    const msgs = getAllByTestId('msg-text-about-empty')
    expect(msgs.length).toBe(13)
  })

  test('check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders()
    expect(headers.length).toBe(27)
    headers.map((headerId) => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
    const { mandatory: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatory'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(9)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(2)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('renders <StandardEditorPerTitle>, all standard headers mandatory and editable (literature)  have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(1)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getHeadersByType(contentType)
    expect(headersAndSubHds.length).toBe(12)
  })

  test('renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and non-editable and have no content (not included as well)', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getHeadersByType(contentType)
    expect(headersAndSubHds.length).toBe(2)
  })

  test('renders <StandardEditorPerTitle>, check number of all are optional (non-editable + editable) and have no content (not included as well)', async () => {
    const dynamicSections = getAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(16)
  })

  test('renders checkbox, check they are not checked in because memo content is empty', async () => {
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')
    expect(checkboxIncludeInMemo.length).toBe(18)
    checkboxIncludeInMemo.map((ch) => expect(ch.checked).toBeFalsy())
  })

  test('renders checkbox which are not checked and check it to reveal message about empty content', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    // const axios = { post: jest.fn() }
    //Läraktiviteter - Learning activities
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[0]
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getByText(sectionIsEmpty)).toBeInTheDocument()
      const learningActivitiesText = getAllByTestId(
        'text-for-memo-optionalEditable-learningActivities'
      )[0]
      expect(learningActivitiesText).toHaveTextContent(sectionIsEmpty)
    })
  })

  test('renders alert about result of saving data', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    // const onSave = jest.fn()
    // const axios = { post: jest.fn() }
    //Detailed plan
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[1]
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Choose course offering')).toBeInTheDocument()
    expect(getByText('Save draft')).toBeInTheDocument()
    expect(getByText('Exit (save draft)')).toBeInTheDocument()
    expect(getByText('Preview')).toBeInTheDocument()
  })

  test('Click button Save draft', async () => {
    fireEvent.click(getByText('Save draft'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('Click button Save draft', async () => {
    fireEvent.click(getAllByText('Edit')[0])
    await waitFor(() => {
      expect(getByText('Close edit mode')).toBeInTheDocument()
    })
  })

  test('Click button Edit and render collapse with detailed info about header', async (done) => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
    done()
  })

  test('get memo name', async () => {
    expect(
      getByText(
        'Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)'
      )
    ).toBeInTheDocument()
  })

  test('get memo semester', async () => {
    expect(getByText('Autumn 2020')).toBeInTheDocument()
  })
})

describe('Component <MemoContainer> Edit. A New fresh draft of a new memo. Memo in English, user interface in Swedish', () => {
  beforeEach(() => {
    render(<EditFreshDraftOfNewMemo memoLang="en" userLang="sv" />)
  })
  test('renders a page with a new draft of a new memo', (done) => {
    done()
  })

  test('renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitlesSV.new)
  })

  test('renders main subheader h4 (course name)(sv) and other menu h4 (menu headers)', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(8)
    const expectedhds = [
      'EF1111 Project in Plasma Physics 9 hp',
      'Termin',
      'Kursomgång',
      contentAndOutcomes,
      prep,
      reqToFinal,
      extra,
      contacts
    ]
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('renders main header h2 (page name) in user lang(sv), and memo sections headers in memo lang (en)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(7)
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

  test('(memo=EN) check how many standard headers are shown, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders()
    expect(headers.length).toBe(27)
    headers.map((headerId) => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('(userLang=sv)renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
    const { mandatory: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatory'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(9)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('(userLang=sv) renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(2)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('(userLang=sv) renders <StandardEditorPerTitle>, all standard headers mandatory and editable (literature)  have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getHeadersByType(contentType)
    expect(headers.length).toBe(1)
    headers.map((contentId) => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('(userLang=sv) information about empty optional (non-editable) content is not visible because it is not included in memo (checkbox is empy)', async () => {
    const { optional: optionalIsEmpty } = sourceInfoSV.nothingFetched
    const invisibleMsgForOptional = getAllByText(optionalIsEmpty)
    invisibleMsgForOptional.map((msg) => expect(msg).not.toBeVisible())
  })

  test('(userLang=sv) information about empty optional (non-editable) content becomes visible wheck checkbox clicked', async () => {
    const { optional: optionalIsEmpty } = sourceInfoSV.nothingFetched
    //Rekommenderade förkunskaper - prerequisites
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[2]
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getAllByText(optionalIsEmpty)[0]).toBeVisible()
      const prerequisites = getAllByTestId('text-for-memo-optional-prerequisites')[0]
      expect(prerequisites).toHaveTextContent(optionalIsEmpty)
    })
  })

  test('(userLang=sv) renders checkbox which are not checked and check it to reveal message about empty optionalEditable content', async () => {
    const { section: sectionIsEmpty } = sourceInfoSV.noInfoYet
    // const axios = { post: jest.fn() }
    //Särskilda förberedelser - preparations
    const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[3]
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getAllByText(sectionIsEmpty, { exact: true })[0]).toBeInTheDocument()
      const preparations = getAllByTestId('text-for-memo-optionalEditable-preparations')[0]
      expect(preparations).toHaveTextContent(sectionIsEmpty)
    })
  })

  test('(userLang=sv) check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Välj kursomgång')).toBeInTheDocument()
    expect(getByText('Spara utkast')).toBeInTheDocument()
    expect(getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('Click button Spara utkast', async () => {
    fireEvent.click(getByText('Spara utkast'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
      expect(getByTestId('alert-save-data')).toHaveTextContent(
        'Det gick inte att spara utkast på grund av systemfel. Försök igen eller kontakta IT-support.'
      )
    })
  })

  test('Click button Redigera', async () => {
    fireEvent.click(getAllByText('Redigera')[0])
    await waitFor(() => {
      expect(getByText('Stäng redigeringsläge')).toBeInTheDocument()
    })
  })

  test('Click button Redigera and reveal section with collapse and editor', async (done) => {
    fireEvent.click(getAllByText('Redigera')[1])
    await waitFor(() => {
      expect(getByTestId('standard-editor')).toBeInTheDocument()
    })
    done()
  })

  test('Click button Redigera and render collapse with detailed info about header', async (done) => {
    fireEvent.click(getAllByText('Redigera')[1])
    await waitFor(() => {
      expect(getByText('Visa vägledning')).toBeInTheDocument()
    })
    done()
  })

  test('(memoLang=en) get memo name', async () => {
    expect(
      getByText(
        'Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)'
      )
    ).toBeInTheDocument()
  })

  test('(userLang=sv) get memo semester', async () => {
    expect(getByText('HT 2020')).toBeInTheDocument()
  })
})
