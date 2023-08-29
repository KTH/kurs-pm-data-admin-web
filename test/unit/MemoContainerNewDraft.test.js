import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router-dom/server'
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
import { SectionContextProvider } from '../../public/js/app/stores/SectionContext'

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
        <SectionContextProvider>
          <MemoContainer initialActiveTab={activeTab} {...rest} />
        </SectionContextProvider>
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

  test('tab: contentAndOutcomes. renders main subheader (course name)(en)', () => {
    const subheader = getAllByRole('presentation')
    expect(subheader.length).toBe(1)
    expect(subheader[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('tab: contentAndOutcomes. renders menu h4', () => {
    const subheader = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(subheader.length).toBe(2)
    const expectedhds = ['Semester', 'Course offering']
    expectedhds.map((h4, index) => expect(subheader[index]).toHaveTextContent(h4))
  })

  test('tab: contentAndOutcomes. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Edit course memo')
  })

  test('tab: contentAndOutcomes. renders memo sections headers in memo lang (en) in tab pane', () => {
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
    expect(getByTestId('btn-open-editor-learningActivities')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-scheduleDetails')).toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-courseContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-learningOutcomes')).not.toBeInTheDocument()
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
    expect(checkboxIncludeInMemo.checked).toBeFalsy()
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
    expect(checkboxIncludeInMemo.checked).toBeFalsy()
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. Check if button edit/close editor works. If no content exist then scheduleDetails should be closed in the beginning.', async () => {
    //Detailed plan

    const editorOpenBtn = screen.queryByTestId('btn-open-editor-scheduleDetails')
    expect(editorOpenBtn).toBeInTheDocument()

    fireEvent.click(editorOpenBtn)
    await waitFor(() => {
      const close = screen.queryByTestId('btn-close-editor-scheduleDetails')
      expect(close).toBeInTheDocument()
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

  test('tab: contentAndOutcomes. Click button Edit and render collapse with detailed info about header', async () => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
  })

  test('tab: contentAndOutcomes. get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24 Aug 2020, English), CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)')
    ).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes. get memo semester', async () => {
    expect(getByText('Autumn 2020')).toBeInTheDocument()
  })

  test('tab: contentAndOutcomes. render a correct number of infos about data origin and source info ', () => {
    expect(getAllByText('from course syllabus').length).toBe(2)
    expect(screen.queryByText('from common course information')).not.toBeInTheDocument()
    expect(screen.queryByText('Fetched from course round information')).not.toBeInTheDocument()
  })

  test('tab: contentAndOutcomes. render a correct number of "include" labels, only of standard stype (no extra headers)', () => {
    expect(getAllByText('Always included').length).toBe(2)
    expect(getAllByText('Include').length).toBe(2)
    expect(screen.queryByText('Included when there is content in the course syllabus')).not.toBeInTheDocument()
    expect(screen.queryByText('Include additional section')).not.toBeInTheDocument()
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

  test('tab: prep. renders main subheader (course name)(en)', () => {
    const subheader = getAllByRole('presentation')
    expect(subheader.length).toBe(1)
    expect(subheader[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('tab: prep. renders (en) menu h4', () => {
    const subheader = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(subheader.length).toBe(2)
    const expectedhds = ['Semester', 'Course offering']
    expectedhds.map((h4, index) => expect(subheader[index]).toHaveTextContent(h4))
  })

  test('tab: prep. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Edit course memo')
  })

  test('tab: prep. renders memo sections headers in memo lang (en) in tab pane', () => {
    const allInactiveTab = getAllByRole('tab', { selected: false })
    expect(allInactiveTab.length).toBe(4)

    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    const expectedInactiveTitles = [contentAndOutcomes, reqToFinal, extra, contacts]

    expectedInactiveTitles.map((tabTitle, index) => {
      expect(allInactiveTab[index]).toHaveTextContent(tabTitle)
    })

    const activeTab = screen.getByRole('tab', { selected: true })
    expect(activeTab).toHaveTextContent(prep)

    expect(activeTab.className).toBe('nav-link active')
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
    expect(getByTestId('btn-open-editor-preparations')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-literature')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-equipment')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-software')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-permanentDisabilitySubSection')).toBeInTheDocument()

    expect(screen.queryByTestId('btn-open-editor-prerequisites')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-permanentDisability')).not.toBeInTheDocument()

    expect(screen.queryByTestId('btn-close-editor-prerequisites')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-permanentDisability')).not.toBeInTheDocument()
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
      expect(contentAndMenyHd.length).toBe(2)
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

  test('tab: prep. renders <StandardEditorPerTitle>, all standard headers mandatory and editable (literature)  have a correct message about an empty content and closed editor', async () => {
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

  test('tab: prep. Click button Edit and render collapse with detailed info about header', async () => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
  })

  test('tab: prep. get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24 Aug 2020, English), CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)')
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

  test('tab: reqToFinal examinations. renders a page with a new draft of a new memo', done => {
    done()
  })

  test('tab: reqToFinal examinations. renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitlesSV.new)
  })

  test('tab: reqToFinal examinations. renders main subheader (course name)(sv)', () => {
    const subheader = getAllByRole('presentation')
    expect(subheader.length).toBe(1)
    expect(subheader[0]).toHaveTextContent('Skapa och publicera kurs-PMEF1111 Project in Plasma Physics 9.0 hp')
  })

  test('tab: reqToFinal examinations. renders (sv) menu h4', () => {
    const subheader = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(subheader.length).toBe(2)
    const expectedhds = ['Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(subheader[index]).toHaveTextContent(h4))
  })

  test('tab: reqToFinal examinations. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Redigera kurs-PM')
  })

  test('tab: reqToFinal examinations. renders memo sections headers in memo lang (en) in tab pane', () => {
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

  test('tab: reqToFinal examinations. (memo=EN) check how many standard headers are shown for active tab, check if each header appear twice: once in content of memo, once in overview meny', async () => {
    const headers = getOnlyStandardHeaders('reqToFinal')
    expect(headers.length).toBe(9)
    headers.map(headerId => {
      const contentAndMenyHd = getAllByText(memoTitlesByMemoLang[headerId])
      expect(contentAndMenyHd.length).toBe(2) // content header and header in overview meny
    })
  })

  test('tab: reqToFinal examinations. (userLang=sv) <SectionForNonEditable>, all standard headers which are mandatory (non-editable) have a correct message about an empty content', async () => {
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
  test('tab: reqToFinal examinations. (userLang=sv) renders <SectionForNonEditable>, all standard headers which are mandatory for some courses and non-editable have a correct message about an empty content', async () => {
    const { mandatoryForSome: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatoryForSome'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(1)
    headers.map(contentId => {
      const hdContent = getByTestId(`text-for-memo-${contentType}-${contentId}`)
      expect(hdContent).toHaveTextContent(emptyTextMsg)
    })
  })

  test('tab: reqToFinal examinations. (userLang=sv) renders <StandardEditorPerTitle> , all editable standard mandatory headers have a correct message about an empty content', async () => {
    const { mandatoryAndEditable: emptyTextMsg } = sourceInfoSV.nothingFetched
    const contentType = 'mandatoryAndEditable'
    const headers = getSectionHeadersByType(contentType, 'reqToFinal')
    expect(headers.length).toBe(0)
  })

  test('tab: reqToFinal examinations. (userLang=sv) renders checkbox which are not checked and check it to reveal message about empty optionalEditable content', async () => {
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

  test('tab: reqToFinal examinations. (userLang=sv) check texts of buttons in control panel it is different for Create new', async () => {
    expect(getByText('Välj kursomgång')).toBeInTheDocument()
    expect(getByText('Spara utkast')).toBeInTheDocument()
    expect(getByText('Avsluta med utkast')).toBeInTheDocument()
    expect(getByText('Granska')).toBeInTheDocument()
  })

  test('tab: reqToFinal examinations. Click button Spara utkast', async () => {
    fireEvent.click(getByText('Spara utkast'))
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
      expect(getByTestId('alert-save-data')).toHaveTextContent(
        'Det gick inte att spara utkast på grund av systemfel. Försök igen eller kontakta IT-support.'
      )
    })
  })

  test('tab: reqToFinal examinations. Click button Redigera', async () => {
    fireEvent.click(getAllByText('Redigera')[0])
    await waitFor(() => {
      expect(getByText('Stäng redigeringsläge')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal examinations. Click button Redigera and reveal section with collapse and editor', async () => {
    fireEvent.click(getAllByText('Redigera')[1]) // click on gradingCriteria
    await waitFor(() => {
      expect(getByTestId('standard-editor-gradingCriteria')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal examinations. Click button Redigera and render collapse with detailed info about header', async () => {
    fireEvent.click(getAllByText('Redigera')[1])
    await waitFor(() => {
      expect(getByText('Visa vägledning')).toBeInTheDocument()
    })
  })

  test('tab: reqToFinal examinations. (memoLang=en) get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24 Aug 2020, English), CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)')
    ).toBeInTheDocument()
  })

  test('tab: reqToFinal examinations. (userLang=sv) get memo semester', async () => {
    expect(getByText('HT 2020')).toBeInTheDocument()
  })

  test('tab: reqToFinal examinations. render a correct number of infos about data origin and source info ', () => {
    expect(getAllByText('från kursplan').length).toBe(4)
  })

  test('tab: reqToFinal examinations. render a correct number of "include" labels, only of standard stype (no extra headers)', () => {
    expect(getAllByText('Inkluderas alltid').length).toBe(3)
    expect(getAllByText('Inkludera').length).toBe(5)
    expect(getAllByText('Inkluderas när innehåll finns i kursplan').length).toBe(1)
    expect(getAllByText('Inkludera ytterligare avsnitt').length).toBe(2)
  })

  test('tab: reqToFinal examinationSubSection. Visibility checkbox and text.', async () => {
    const { section: sectionIsEmpty } = sourceInfoSV.noInfoYet

    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-examinationSubSection')
    expect(checkboxIncludeInMemo.checked).toBeFalsy()
    expect(screen.queryByTestId('text-for-memo-optionalEditable-examinationSubSection')).not.toBeInTheDocument()
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
    })
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

  test('tab: contactss. renders main subheader (course name)(en)', () => {
    const subheader = getAllByRole('presentation')
    expect(subheader.length).toBe(1)
    expect(subheader[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('tab: contacts. renders main subheader (course name)(en) menu h4', () => {
    const subheader = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(subheader.length).toBe(2)
    const expectedhds = ['Semester', 'Course offering']
    expectedhds.map((h4, index) => expect(subheader[index]).toHaveTextContent(h4))
  })

  test('tab: contacts. renders main header h2 (page name) in user lang(sv)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels

    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('Edit course memo')
  })

  test('tab: contacts. renders memo sections headers in memo lang (en) in tab pane', () => {
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

  test('tab: contacts. renders all buttons', async () => {
    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(12)
    const expectedAriaLabels = [
      'Information about Communication during course',
      'Edit Communication during course',
      'Information about Course coordinator',
      'Information about Teachers',
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

  test('tab: contacts. Check which fields have edit/close buttons and which not', async () => {
    expect(getByTestId('btn-open-editor-communicationDuringCourse')).toBeInTheDocument()
    expect(getByTestId('btn-open-editor-otherContacts')).toBeInTheDocument()

    expect(screen.queryByTestId('btn-open-editor-courseCoordinator')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-teacher')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-teacherAssistants')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-open-editor-examiner')).not.toBeInTheDocument()

    expect(screen.queryByTestId('btn-close-editor-courseCoordinator')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-teacher')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-teacherAssistants')).not.toBeInTheDocument()
    expect(screen.queryByTestId('btn-close-editor-examiner')).not.toBeInTheDocument()
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

  //communicationDuringCourse
  test('tab: contacts. Renders "communicationDuringCourse" checkbox which are not checked and check it to reveal message about empty content', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-communicationDuringCourse')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getByText(sectionIsEmpty)).toBeInTheDocument()
      const text = getByTestId('text-for-memo-optionalEditable-communicationDuringCourse')
      expect(text).toHaveTextContent(sectionIsEmpty)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  //otherContacts
  test('tab: contacts. Renders "otherContacts" checkbox which are not checked and check it to reveal message about empty content', async () => {
    const { section: sectionIsEmpty } = sourceInfo.noInfoYet
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-otherContacts')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      expect(getByText(sectionIsEmpty)).toBeInTheDocument()
      const text = getByTestId('text-for-memo-optionalEditable-otherContacts')
      expect(text).toHaveTextContent(sectionIsEmpty)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  //checkbox-visibility-teacherAssistants
  test('tab: contacts. Renders "teacherAssistants" checkbox which are not checked and check it to reveal message about empty content', async () => {
    const { optional: optionalIsEmpty } = sourceInfo.nothingFetched
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-teacherAssistants')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(checkboxIncludeInMemo.checked).toBeTruthy()
      const text = getByTestId('text-for-memo-optional-teacherAssistants')
      expect(text).toHaveTextContent(optionalIsEmpty)
      expect(getByTestId('alert-save-data')).toBeInTheDocument()
    })
  })

  test('tab: contacts. renders alert about result of saving data', async () => {
    const checkboxIncludeInMemo = getByTestId('checkbox-visibility-teacherAssistants')
    fireEvent.click(checkboxIncludeInMemo)
    await waitFor(() => {
      expect(getByTestId('alert-save-data')).toHaveTextContent('Something went wrong. Contact IT Support.')
    })
  })

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

  test('tab: contacts. Click button Edit and render collapse with detailed info about header', async () => {
    fireEvent.click(getAllByText('Edit')[1])
    await waitFor(() => {
      expect(getByText('Show guidance')).toBeInTheDocument()
    })
  })

  test('tab: contacts. get memo name', async () => {
    expect(
      getByText('Autumn 2020-2 (Start date 24 Aug 2020, English), CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)')
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
    // expect(getAllByText('Included when there is content in the course syllabus').length).toBe(0)
    // expect(getAllByText('Include additional section').length).toBe(2)
  })
})
