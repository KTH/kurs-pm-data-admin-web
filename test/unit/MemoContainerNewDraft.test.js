import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import { act } from 'react-dom/test-utils'

import { MobxStoreProvider } from '../../public/js/app/mobx'

import i18n from '../../i18n'
import {
  getNumOfEditableStandardContent,
  getOnlyStandardHeaders,
  getSectionHeadersByType,
  typeOfThisHeader,
} from '../../public/js/app/util/fieldsByType.js'
import MemoContainer from '../../public/js/app/pages/MemoEditingContainer'
import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'
import translations from '../mocks/translations'

const { memoTitlesByMemoLang, sectionsLabels, pageTitles: pageTitlesEN } = translations.en
const { notIncludedInMemoYet, pageTitles: pageTitlesSV, sectionsLabels: sectionsLabelsSV } = translations.sv

const { alerts, info, pagesCreateNewPm, sourceInfo } = i18n.messages[0]
const {
  alerts: alertsSV,
  info: infoSV,
  pagesCreateNewPm: pagesCreateNewPmSV,
  sourceInfo: sourceInfoSV,
} = i18n.messages[1]

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByRole, getByText } = screen

const sectionExam = 'reqToFinal'
const EditFreshDraftOfNewMemo = ({ activeTab, memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedRouterStore = mockApplicationStoreWithChosenMemo('DRAFT_NEW_MEMO', 'freshEmpty', memoLang, userLang)
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedRouterStore}>
        <MemoContainer initialActiveTab={activeTab} {...rest} />
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Active tab contentAndOutcomes. Component <MemoContainer> Edit. A New fresh draft of a NEW memo. Memo in English, user interface in English', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditFreshDraftOfNewMemo activeTab="contentAndOutcomes" memoLang="en" userLang="en" />)
      })
  )
  test('tab: contentAndOutcomes. renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: contentAndOutcomes. renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent('Create and publish course memo')
  })

  test('tab: contentAndOutcomes. renders main subheader h4 (course name)(en) and other menu h4', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(3)
    const expectedhds = ['EF1111 Project in Plasma Physics 9.0 credits', 'Semester', 'Course offering']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: contentAndOutcomes. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Edit course memo')
  })

  test('tab: contentAndOutcomes. renders memo sections headers in memo lang (en) in tab pane', () => {
    const allTabs = getAllByRole('tab')
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allTabs.length).toBe(5)
    const expectedtabs = [contentAndOutcomes, prep, reqToFinal, extra, contacts] //todo test tabs instead
    expectedtabs.map((tabTitle, index) => {
      expect(allTabs[index]).toHaveTextContent(tabTitle)
    })
  })

  test('tab: contentAndOutcomes. renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(11)
    const expectedAriaLabels = [
      'Information about Course contents',
      'Information about Intended learning outcomes',
      'Information about Learning activities',
      'Edit Learning activities',
      'Information about Detailed plan',
      'Edit Detailed plan',
      null,
      null,
      null,
      'Exit (save draft)',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      '',
      '',
      '',
      'Edit',
      '',
      'Edit',
      'Add heading to Content and learning outcomes',
      'Choose course offering',
      'Save draft',
      'Exit (save draft)',
      'Preview',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: contentAndOutcomes. renders Edit buttons for each editable standard header and subheaher because memo content is empty', async () => {
    const openBtn = getAllByTestId('btn-open-editor')
    expect(openBtn.length).toBe(2)
  })

  test('tab: contentAndOutcomes. check how many message about empty content is showed for content which is editable (mandatoryAndEditable + optionalEditable)', async () => {
    const msgs = getAllByTestId('msg-text-about-empty')
    expect(msgs.length).toBe(2)
  })

  test('tab: contentAndOutcomes. check how many standard headers are shown for active tab, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('contentAndOutcomes')
    expect(headers.length).toBe(4)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: contentAndOutcomes. renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
    const { mandatory: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(2)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: contentAndOutcomes. renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(0)
  })

  test('tab: contentAndOutcomes. renders <StandardEditorPerTitle>, all standard headers mandatory and editable (literature)  have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headers.length).toBe(0)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: contentAndOutcomes. renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headersAndSubHds.length).toBe(2)
  })

  test('tab: contentAndOutcomes. renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and non-editable and have no content (not included as well)', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contentAndOutcomes')
    expect(headersAndSubHds.length).toBe(0)
  })

  test('tab: contentAndOutcomes. renders <StandardEditorPerTitle>, check number of all are optional (non-editable + editable) and have no content (not included as well)', async () => {
    const dynamicSections = getAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(2)
  })

  test('tab: contentAndOutcomes. renders "Learning activities" checkbox which are not checked and check it to reveal message about empty content', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    //Läraktiviteter - Learning activities
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-learningActivities')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getByText(sectionIsEmpty)).toBeInTheDocument()
      const learningActivitiesText = getByTestId('text-for-memo-optionalEditable-learningActivities')
      expect(learningActivitiesText).toHaveTextContent(sectionIsEmpty)
    })
  })

  test('tab: contentAndOutcomes. renders alert about result of saving data', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    //Detailed plan
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-scheduleDetails')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Choose course offering')).toBeInTheDocument()
    expect(getByText('Save draft')).toBeInTheDocument()
    expect(getByText('Exit (save draft)')).toBeInTheDocument()
    expect(getByText('Preview')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes. Click button Save draft', async () => {
    fireEvent.click(getByText('Save draft'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. Click button Save draft', async () => {
    fireEvent.click(getAllByText('Edit')[0])
    await waitFor(() => {
      expect(getByText('Close edit mode')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. Click button Edit and render collapse with detailed info about header', async done => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
    done()
  })

  test('tab: contentAndOutcomes. get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)')
    ).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes. get memo semester', async () => {
    expect(getByText('Autumn 2020')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes. render a correct number of infos about data origin and source info ', () => {
    expect(getAllByText('from course syllabus').length).toBe(2)
    // expect(getAllByText('from common course information').length).toBe(1)
    // expect(getAllByText('Fetched from course round information').length).toBe(3)
  })

  test('tab: contentAndOutcomes. render a correct number of "include" labels, only of standard stype (no extra headers)', () => {
    expect(getAllByText('Always included').length).toBe(2)
    expect(getAllByText('Include').length).toBe(2)
    // expect(getAllByText('Included for some courses').length).toBe(0)
    // expect(getAllByText('Include additional section').length).toBe(1)
  })
})

describe('Active tab prep. Component <MemoContainer> Edit. A New fresh draft of a NEW memo. Memo in English, user interface in English', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditFreshDraftOfNewMemo activeTab="prep" memoLang="en" userLang="en" />)
      })
  )
  test('tab: prep. renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: prep. renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent('Create and publish course memo')
  })

  test('tab: prep. renders main subheader h4 (course name)(en) and other menu h4', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(3)
    const expectedhds = ['EF1111 Project in Plasma Physics 9.0 credits', 'Semester', 'Course offering']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: prep. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Edit course memo')
  })

  test('tab: prep. renders memo sections headers in memo lang (en) in tab pane', () => {
    const allTabs = getAllByRole('tab')
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allTabs.length).toBe(5)
    const expectedtabs = [contentAndOutcomes, prep, reqToFinal, extra, contacts] //todo test tabs instead
    expectedtabs.map((tabTitle, index) => {
      expect(allTabs[index]).toHaveTextContent(tabTitle)
    })
  })

  test('tab: prep. renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(16)
    const expectedAriaLabels = [
      'Information about Recommended prerequisites',
      'Information about Specific preparations',
      'Edit Specific preparations',
      'Information about Literature',
      'Edit Literature',
      'Information about Equipment',
      'Edit Equipment',
      'Information about Software',
      'Edit Software',
      'Information about Support for students with disabilities',
      'Edit Support for students with disabilities',
      null,
      null,
      null,
      'Exit (save draft)',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      '',
      '',
      'Edit',
      '',
      'Edit',
      '',
      'Edit',
      '',
      'Edit',
      '',
      'Edit',
      'Add heading to Preparations before course start',
      'Choose course offering',
      'Save draft',
      'Exit (save draft)',
      'Preview',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: prep. renders Edit buttons for each editable standard header and subheaher because memo content is empty', async () => {
    const openBtn = getAllByTestId('btn-open-editor')
    // const expectedNumOfEditable = getNumOfEditableStandardContent()
    expect(openBtn.length).toBe(5)
  })

  test('tab: prep. check how many message about empty content is showed for content which is editable (mandatoryAndEditable + optionalEditable)', async () => {
    const msgs = getAllByTestId('msg-text-about-empty')
    expect(msgs.length).toBe(2)
  })

  test('tab: prep. check how many standard headers are shown for active tab, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('prep')
    expect(headers.length).toBe(6)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: prep. renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
    const { mandatory: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: prep. renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(0)
  })

  test('tab: prep. renders <StandardEditorPerTitle>, all standard headers mandatory and editable (literature)  have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'prep')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: prep. renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'prep')
    expect(headersAndSubHds.length).toBe(3)
  })

  test('tab: prep. renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and non-editable and have no content (not included as well)', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'prep')
    expect(headersAndSubHds.length).toBe(1)
  })

  test('tab: prep. renders <StandardEditorPerTitle>, check number of all are optional (non-editable + editable) and have no content (not included as well)', async () => {
    const dynamicSections = getAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(4)
  })

  test('tab: prep. information about empty optional (non-editable) content is not visible because it is not included in memo (checkbox is empy)', async () => {
    const { optional: optionalIsEmpty } = sourceInfo.nothingFetched
    const invisibleMsgForOptional = getAllByText(optionalIsEmpty)
    invisibleMsgForOptional.map(msg => expect(msg).not.toBeVisible())
  })

  test('tab: prep. renders "prerequisites" checkbox which are not checked and check it to reveal message about empty content for optional header', async () => {
    const { nothingFetched } = sourceInfo
    //prerequisites
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-prerequisites')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      const prerequisitesText = getByTestId('text-for-memo-optional-prerequisites')
      expect(prerequisitesText).toHaveTextContent(nothingFetched.optional)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. renders "preparations" checkbox which are not checked and check it to reveal message about empty content for optionalEditable header', async () => {
    const { section: emptyTextMsg } = sourceInfo.noInfoYet
    //preparations
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-preparations')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      // expect(getByText(nothingFetched)).toBeInTheDocument()
      const preparationsText = getByTestId('text-for-memo-optionalEditable-preparations')
      expect(preparationsText).toHaveTextContent(emptyTextMsg)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. renders "equipment" checkbox which are not checked and check it to reveal message about empty content for optionalEditable header', async () => {
    const { section: emptyTextMsg } = sourceInfo.noInfoYet
    //equipment
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-equipment')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      const equipment = getByTestId('text-for-memo-optionalEditable-equipment')
      expect(equipment).toHaveTextContent(emptyTextMsg)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. renders "software" checkbox which are not checked and check it to reveal message about empty content for optionalEditable header', async () => {
    const { section: emptyTextMsg } = sourceInfo.noInfoYet
    //equipment
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-software')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      const equipment = getByTestId('text-for-memo-optionalEditable-software')
      expect(equipment).toHaveTextContent(emptyTextMsg)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. renders alert about result of saving data for subsection for permanentDisabilitySubSection', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-permanentDisabilitySubSection')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      const text = getByTestId('text-for-memo-optionalEditable-permanentDisabilitySubSection')
      expect(text).toHaveTextContent(sectionIsEmpty)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Choose course offering')).toBeInTheDocument()
    expect(getByText('Save draft')).toBeInTheDocument()
    expect(getByText('Exit (save draft)')).toBeInTheDocument()
    expect(getByText('Preview')).toBeInTheDocument()
  })

  test('tab: prep. Click button Save draft', async () => {
    fireEvent.click(getByText('Save draft'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: prep. Click button Save draft', async () => {
    fireEvent.click(getAllByText('Edit')[0])
    await waitFor(() => {
      expect(getByText('Close edit mode')).toBeInTheDocument()
    })
  })

  test('tab: prep. Click button Edit and render collapse with detailed info about header', async done => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
    done()
  })

  test('tab: prep. get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)')
    ).toBeInTheDocument()
  })

  test('tab: prep. get memo semester', async () => {
    expect(getByText('Autumn 2020')).toBeInTheDocument()
  })

  test('tab: prep. render a correct number of infos about data origin and source info ', () => {
    expect(getAllByText('from common course information').length).toBe(1)
  })

  test('tab: prep. render a correct number of "include" labels, only of standard stype (no extra headers)', () => {
    expect(getAllByText('Always included').length).toBe(2)
    expect(getAllByText('Include').length).toBe(4)
    expect(getAllByText('Include additional section').length).toBe(1)
  })
})

describe('Active tab: Examination. Component <MemoContainer> Edit. A New fresh draft of a new memo. Memo in English, user interface in Swedish', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditFreshDraftOfNewMemo activeTab="reqToFinal" memoLang="en" userLang="sv" />)
      })
  )

  test('tab: examinations. renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: examinations. renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitlesSV.new)
  })

  test('tab: examinations. renders main subheader h4 (course name)(sv) and other menu h4', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(3)
    const expectedhds = ['EF1111 Project in Plasma Physics 9.0 hp', 'Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: examinations. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
  })

  test('tab: examinations. renders memo sections headers in memo lang (en) in tab pane', () => {
    const allTabs = getAllByRole('tab')
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allTabs.length).toBe(5)
    const expectedtabs = [contentAndOutcomes, prep, reqToFinal, extra, contacts] //todo test tabs instead
    // const expectedh2ds = ['Redigera kurs-PM']
    expectedtabs.map((tabTitle, index) => {
      expect(allTabs[index]).toHaveTextContent(tabTitle)
    })
  })

  test('tab: examinations. (memo=EN) check how many standard headers are shown for active tab, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('reqToFinal')
    expect(headers.length).toBe(9)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: examinations. (userLang=sv) <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
    const { mandatory: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(3)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  //mandatoryForSome
  test('tab: examinations. (userLang=sv) renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: examinations. (userLang=sv) renders <StandardEditorPerTitle> , all editable standard mandatory headers have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(0)
  })

  test('tab: examinations. (userLang=sv) renders checkbox which are not checked and check it to reveal message about empty optionalEditable content', async () => {
    const { section: sectionIsEmpty } = sourceInfoSV.noInfoYet
    //gradingCriteria
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-gradingCriteria')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getAllByText(sectionIsEmpty, { exact: true })[0]).toBeInTheDocument()
      const preparations = getAllByTestId('text-for-memo-optionalEditable-gradingCriteria')[0]
      expect(preparations).toHaveTextContent(sectionIsEmpty)
    })
  })

  test('tab: examinations. (userLang=sv) check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Välj kursomgång')).toBeInTheDocument()
    expect(getByText('Spara utkast')).toBeInTheDocument()
    expect(getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: examinations. Click button Spara utkast', async () => {
    fireEvent.click(getByText('Spara utkast'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
      expect(getByTestId('alert-save-data')).toHaveTextContent(
        'Det gick inte att spara utkast på grund av systemfel. Försök igen eller kontakta IT-support.'
      )
    })
  })

  test('tab: examinations. Click button Redigera', async () => {
    fireEvent.click(getAllByText('Redigera')[0])
    await waitFor(() => {
      expect(getByText('Stäng redigeringsläge')).toBeInTheDocument()
    })
  })

  test('tab: examinations. Click button Redigera and reveal section with collapse and editor', async done => {
    fireEvent.click(getAllByText('Redigera')[1])
    await waitFor(() => {
      expect(getByTestId('standard-editor')).toBeInTheDocument()
    })
    done()
  })

  test('tab: examinations. Click button Redigera and render collapse with detailed info about header', async done => {
    fireEvent.click(getAllByText('Redigera')[1])
    await waitFor(() => {
      expect(getByText('Visa vägledning')).toBeInTheDocument()
    })
    done()
  })

  test('tab: examinations. (memoLang=en) get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)')
    ).toBeInTheDocument()
  })

  test('tab: examinations. (userLang=sv) get memo semester', async () => {
    expect(getByText('HT 2020')).toBeInTheDocument()
  })

  test('tab: examinations. render a correct number of infos about data origin and source info ', () => {
    expect(getAllByText('från kursplan').length).toBe(4)
  })

  test('tab: examinations. render a correct number of "include" labels, only of standard stype (no extra headers)', () => {
    expect(getAllByText('Inkluderas alltid').length).toBe(3)
    expect(getAllByText('Inkludera').length).toBe(5)
    expect(getAllByText('Inkluderas för vissa kurser').length).toBe(1)
    expect(getAllByText('Inkludera ytterligare avsnitt').length).toBe(2)
  })
})

describe('Active tab: contacts. Component <MemoContainer> Edit. A New fresh draft of a NEW memo. Memo in English, user interface in English', () => {
  beforeEach(
    async () =>
      await act(async () => {
        await render(<EditFreshDraftOfNewMemo activeTab="contacts" memoLang="en" userLang="en" />)
      })
  )
  test('tab: contacts. renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: contacts. renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent('Create and publish course memo')
  })

  test('tab: contacts. renders main subheader h4 (course name)(en) and other menu h4', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH4Headers.length).toBe(3)
    const expectedhds = ['EF1111 Project in Plasma Physics 9.0 credits', 'Semester', 'Course offering']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('tab: contacts. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Edit course memo')
  })

  test('tab: contacts. renders memo sections headers in memo lang (en) in tab pane', () => {
    const allTabs = getAllByRole('tab')
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allTabs.length).toBe(5)
    const expectedtabs = [contentAndOutcomes, prep, reqToFinal, extra, contacts] //todo test tabs instead
    expectedtabs.map((tabTitle, index) => {
      expect(allTabs[index]).toHaveTextContent(tabTitle)
    })
  })

  test('tab: contacts. renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(12)
    const expectedAriaLabels = [
      'Information about Communication during course',
      'Edit Communication during course',
      'Information about Course coordinator',
      'Information about Teacher',
      'Information about Teacher assistants',
      'Information about Examiner',
      'Information about Other contacts',
      'Edit Other contacts',
      null,
      null,
      'Exit (save draft)',
      null,
    ]
    allButtons.forEach((b, index) => expect(b.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
    const expectedTextLabel = [
      '',
      'Edit',
      '',
      '',
      '',
      '',
      '',
      'Edit',
      'Choose course offering',
      'Save draft',
      'Exit (save draft)',
      'Preview',
    ]
    allButtons.forEach((b, index) => expect(b).toHaveTextContent(expectedTextLabel[index]))
  })

  test('tab: contacts. renders Edit buttons for each editable standard header and subheaher because memo content is empty', async () => {
    const openBtn = getAllByTestId('btn-open-editor')
    expect(openBtn.length).toBe(2)
  })

  test('tab: contacts. check how many message about empty content is showed for content which is editable (mandatoryAndEditable + optionalEditable)', async () => {
    const msgs = getAllByTestId('msg-text-about-empty')
    expect(msgs.length).toBe(4)
  })

  test('tab: contacts. check how many standard headers are shown for active tab, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('contacts')
    expect(headers.length).toBe(6)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: contacts. renders <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
    const { mandatory: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatory'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(3)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: contacts. renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(0)
  })

  test('tab: contacts. renders <StandardEditorPerTitle>, all standard headers mandatory and editable (literature)  have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfo.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'contacts')
    expect(headers.length).toBe(0)
  })

  test('tab: contacts. renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and editable and have no content (not included as well)', async () => {
    const contentType = 'optionalEditable'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contacts')
    expect(headersAndSubHds.length).toBe(2)
  })

  test('tab: contacts. renders <StandardEditorPerTitle>, check number of all section/subsection which are optional and non-editable and have no content (not included as well)', async () => {
    const contentType = 'optional'
    const headersAndSubHds = getSectionHeadersByType(contentType, 'contacts')
    expect(headersAndSubHds.length).toBe(1)
  })

  test('tab: contacts. renders <StandardEditorPerTitle>, check number of all are optional (non-editable + editable) and have no content (not included as well)', async () => {
    const dynamicSections = getAllByTestId(`dynamic-empty-content-and-not-included`)
    expect(dynamicSections.length).toBe(2)
  })

  // test('tab: contacts. renders checkbox, check they are not checked in because memo content is empty', async () => {
  //   const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')
  //   expect(checkboxIncludeInMemo.length).toBe(18)
  //   checkboxIncludeInMemo.map(ch => expect(ch.checked).toBeFalsy())
  // })

  // test('tab: contacts. renders checkbox which are not checked and check it to reveal message about empty content', async () => {
  //   const { section: sectionIsEmpty } = sourceInfo.noInfoYet
  //   //Läraktiviteter - Learning activities
  //   const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[0]
  //   fireEvent.click(checkboxIncludeInMemo)
  //   await waitFor(() => {
  //     expect(checkboxIncludeInMemo.checked).toBeTruthy()
  //     expect(getByText(sectionIsEmpty)).toBeInTheDocument()
  //     const learningActivitiesText = getAllByTestId('text-for-memo-optionalEditable-learningActivities')[0]
  //     expect(learningActivitiesText).toHaveTextContent(sectionIsEmpty)
  //   })
  // })

  // test('tab: contacts. renders alert about result of saving data', async () => {
  //   const { section: sectionIsEmpty } = sourceInfo.noInfoYet
  //   //Detailed plan
  //   const checkboxIncludeInMemo = getAllByTestId('checkbox-visibility')[1]
  //   fireEvent.click(checkboxIncludeInMemo)
  //   await waitFor(() => {
  //     expect(getByTestId('alert-save-data')).toBeInTheDocument()
  //   })
  // })

  test('tab: contacts. check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Choose course offering')).toBeInTheDocument()
    expect(getByText('Save draft')).toBeInTheDocument()
    expect(getByText('Exit (save draft)')).toBeInTheDocument()
    expect(getByText('Preview')).toBeInTheDocument()
  })

  test('tab: contacts. Click button Save draft', async () => {
    fireEvent.click(getByText('Save draft'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts. Click button Save draft', async () => {
    fireEvent.click(getAllByText('Edit')[0])
    await waitFor(() => {
      expect(getByText('Close edit mode')).toBeInTheDocument()
    })
  })

  test('tab: contacts. Click button Edit and render collapse with detailed info about header', async done => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
    done()
  })

  test('tab: contacts. get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)')
    ).toBeInTheDocument()
  })

  test('tab: contacts. get memo semester', async () => {
    expect(getByText('Autumn 2020')).toBeInTheDocument()
  })

  test('tab: contacts. render a correct number of infos about data origin and source info ', () => {
    // expect(getAllByText('from course syllabus').length).toBe(4)
    expect(getAllByText('from common course information').length).toBe(1)
    // expect(getAllByText('Fetched from course round information').length).toBe(3)
  })

  test('tab: contacts. render a correct number of "include" labels, only of standard stype (no extra headers)', () => {
    expect(getAllByText('Always included').length).toBe(3)
    expect(getAllByText('Include').length).toBe(3)
    // expect(getAllByText('Included for some courses').length).toBe(0)
    // expect(getAllByText('Include additional section').length).toBe(2)
  })
})
