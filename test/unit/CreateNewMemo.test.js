import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StaticRouter } from 'react-router-dom/server'

import { MobxStoreProvider } from '../../public/js/app/mobx'

import i18n from '../../i18n'

import CreateNewMemo from '../../public/js/app/pages/CreateNewMemo'
import { mockApplicationStore, mockApplicationStoreEn } from '../mocks/ApplicationStore'
import mockApplicationStoreWithDraftMemos from '../mocks/AppStoreWithDraftMemos'
import translations from '../mocks/translations'

jest.mock('@kth/om-kursen-ladok-client', () => ({
  LadokStatusCode: {
    Started: 'S2',
    Complete: 'S3',
  },
}))

const CreateNewMemoPage = ({ ...rest }) => (
  <StaticRouter>
    <MobxStoreProvider initCallback={() => mockApplicationStore}>
      <CreateNewMemo {...rest} />
    </MobxStoreProvider>
  </StaticRouter>
)

const CreateNewMemoPageEn = ({ ...rest }) => (
  <StaticRouter>
    <MobxStoreProvider initCallback={() => mockApplicationStoreEn}>
      <CreateNewMemo {...rest} />
    </MobxStoreProvider>
  </StaticRouter>
)

const CreateNewMemoPageWithSavedDrafts = ({ ...rest }) => {
  mockApplicationStoreWithDraftMemos.setSectionsStructure()
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => mockApplicationStoreWithDraftMemos}>
        <CreateNewMemo {...rest} />
      </MobxStoreProvider>
    </StaticRouter>
  )
}
const { buttons: buttonsSV, pageTitles: pageTitlesSV } = translations.sv
const { pageTitles: pageTitlesEN, buttons } = translations.en

const [{ alerts, info }] = i18n.messages

describe('Component <CreateNewMemo> Create and publish course memo, initial state, no memo created yet.', () => {
  test('renders without props', () => {
    render(<CreateNewMemoPage />)
    expect(screen.getByText('Create and publish course memo')).toBeInTheDocument()
  })

  test('renders main header h1, page name', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const headers = screen.getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent(pageTitlesEN.new)
  })

  test('renders main subheader, course name. English.', () => {
    render(<CreateNewMemoPageEn langAbbr="en" langIndex={0} />)
    const headers = screen.getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('renders main header h1, page name. Swedish', () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const headers = screen.getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent(pageTitlesSV.new)
  })

  test('renders main subheader, course name. Swedish.', () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const headers = screen.getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent('EF1111 Projekt i plasmafysik 9.0 hp')
  })

  test('renders main header h2, Choose course offering', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)

    const headers = screen.getAllByRole('heading', { level: 2 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent(info.createNew)
  })

  test('renders two visible headers h3', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const allH3Headers = screen.getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(2)
    expect(allH3Headers[0]).toHaveTextContent(info.chooseSavedDraft)
    expect(allH3Headers[1]).toHaveTextContent(info.createNew)
  })

  test('renders only three buttons if nothing pressed yet', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)

    const startButtons = screen.getAllByRole('button')
    expect(startButtons.length).toBe(3)
    expect(startButtons[0]).toHaveTextContent('')
    expect(startButtons[1]).toHaveTextContent(buttons.btnFinish)
    expect(startButtons[2]).toHaveTextContent(buttons.edit)
  })

  test('renders alert if nothing is chosen and button Edit is pressed', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)

    const editButton = screen.getByText(buttons.edit)
    fireEvent.click(editButton)
    await waitFor(() => {
      const redAlert = screen.getByText(alerts.errNoChosen)
      expect(redAlert).toBeInTheDocument()
    })
  })

  test('renders text if no drafts is in the list and no semester is chosen', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)

    expect(screen.getByText(info.noSavedDrafts)).toBeVisible()
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    expect(selectInput).toHaveDisplayValue(info.chooseSemester.label)
    expect(screen.getByTestId('new-course-offering')).toHaveStyle(`display: none;`)
  })

  test('renders select options have focus.', async () => {
    render(<CreateNewMemoPage />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    selectInput.focus()
    expect(selectInput).toHaveFocus()
    selectInput.blur()
    expect(selectInput).not.toHaveFocus()
  })

  test('renders select options for course semesters in English.', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const semesters = screen.getAllByRole('option')
    const semesterEnglish = ['Spring 2021', 'Autumn 2020', 'Spring 2020', 'Autumn 2019']
    semesters.map((s, i) => expect(s).toHaveTextContent(semesterEnglish[i]))
  })

  test('renders select options for course semesters in Swedish.', () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)

    const semestersSw = screen.getAllByRole('option')
    const semesterSwedish = ['VT 2021', 'HT 2020', 'VT 2020', 'HT 2019']
    semestersSw.map((s, i) => expect(s).toHaveTextContent(semesterSwedish[i]))
  })

  test('renders select options can be selected.', () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = screen.getByRole('combobox', { name: /Välj termin/i })
    fireEvent.change(selectInput, { target: { value: '20202' } })
    const options = screen.getAllByRole('option', {}, { name: /Välj termin/i })
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()
    expect(options[2].selected).toBeFalsy()
  })

  test('renders checkboxes for all available rounds with value equals ladokRoundId of each course round', async () => {
    render(<CreateNewMemoPage />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    fireEvent.change(selectInput, { target: { value: '20202' } })

    await waitFor(() => {
      const availableRounds = screen.getAllByRole('checkbox')
      expect(availableRounds.length).toBe(3)
      const roundsToShow = ['11111', '22222', '33333']
      roundsToShow.forEach((round, i) => {
        expect(availableRounds[i].value).toBe(round)
      })
    })
  })

  test('renders in user language: english, list of available autumn course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    fireEvent.change(selectInput, { target: { value: '20202' } })

    await waitFor(() => {
      const labels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
      const roundNames = [
        'Autumn 2020-11111 (Start date 26 Oct 2020, English)',
        'Autumn 2020-22222 (Start date 24 Aug 2020, English)',
        'CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available autumn course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)

    const selectInput = screen.getByRole('combobox', { name: /Välj termin/i })
    fireEvent.change(selectInput, { target: { value: '20202' } })
    await waitFor(() => {
      const labels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
      const roundNames = [
        'HT 2020-11111 (Startdatum 2020-10-26, Engelska)',
        'HT 2020-22222 (Startdatum 2020-08-24, Engelska)',
        'CBIOT1 m.fl. (Startdatum 2020-10-30, Svenska)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: english, list of available spring course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(2)
      const roundNames = [
        'Spring 2021-11111 (Start date 22 Mar 2021, English)',
        'CBIOT1 m.fl. (Start date 20 Mar 2021, Swedish)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available spring course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)

    const selectInput = screen.getByRole('combobox', { name: /Välj termin/i })
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(2)
      const roundNames = [
        'VT 2021-11111 (Startdatum 2021-03-22, Engelska)',
        'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders a copy section when a course offering(s) are chosen and no published memo is available as a template memo', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(2)
    })
    const rounds = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[0])
    const copyLabels = screen.getAllByTestId('label-copy-radio')
    expect(copyLabels.length).toBe(2)
    expect(copyLabels[0]).toHaveTextContent(info.createFrom.basedOnStandard)
    expect(copyLabels[1]).toHaveTextContent(info.createFrom.basedOnAnotherMemo)

    const copyOptions = screen.getAllByTestId('copy-radio')
    expect(copyOptions[0]).toBeChecked()
    expect(copyOptions[1]).not.toBeChecked()

    // no published memo is available as a template memo
    fireEvent.click(copyOptions[1])
    expect(copyOptions[0]).not.toBeChecked()
    expect(copyOptions[1]).toBeChecked()
    expect(screen.getByText(info.noPrevPublishedAvailable)).toBeInTheDocument()
  })

  test('renders only three buttons if checkbox pressed but no saved drafts are chosen', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)

    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      expect(screen.getAllByTestId('label-checkbox-choose-available-round')[0]).toBeInTheDocument()
    })
    const rounds = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[0])

    const buttonsList = screen.getAllByRole('button')
    expect(buttonsList.length).toBe(3)
  })

  test('create a new draft with one round, with correct name (use shortName) in english because round language is english', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = screen.getByRole('combobox', { name: /Välj termin/i })
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const roundsLabels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[0]).toHaveTextContent('VT 2021-11111 (Startdatum 2021-03-22, Engelska)')
    })
    const rounds = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[0])
    await waitFor(() => {
      const copyOptions = screen.getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    const editButton = screen.getByText('Redigera')
    fireEvent.click(editButton)
    expect(screen.getByTestId('test-data')).toBeInTheDocument()

    expect(screen.getByTestId('actionType')).toHaveTextContent('create')
    expect(screen.getByTestId('newMemoName')).toHaveTextContent('Spring 2021-11111 (Start date 22 Mar 2021, English)')
    expect(screen.getByTestId('memoCommonLangAbbr')).toHaveTextContent('en')
    expect(screen.getByTestId('sortedApplicationCodes')).toHaveTextContent('1')
  })

  test('create a new draft with one round, with correct name (use shortName) in swedish because round language is Swedish', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)

    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    const editButton = screen.getByText(buttons.edit)
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const roundsLabels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[1]).toHaveTextContent('CBIOT1 m.fl. (Start date 20 Mar 2021, Swedish)')
    })
    const rounds = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[1])
    await waitFor(() => {
      const copyOptions = screen.getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    fireEvent.click(editButton)
    expect(screen.getByTestId('test-data')).toBeInTheDocument()

    expect(screen.getByTestId('actionType')).toHaveTextContent('create')
    expect(screen.getByTestId('newMemoName')).toHaveTextContent('CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)')
    expect(screen.getByTestId('memoCommonLangAbbr')).toHaveTextContent('sv')
    expect(screen.getByTestId('sortedApplicationCodes')).toHaveTextContent('3')
  })

  test('create a new draft with two rounds, with correct name (use shortName) in english because one of rounds has language: Swedish', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    // render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    const editButton = screen.getByText(buttons.edit)
    fireEvent.change(selectInput, { target: { value: '20202' } })
    const checkAssertionsSelectInput = () => {
      const roundsLabels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[1]).toBeInTheDocument('Autumn 2020-22222 (Start date 24 Aug 2020, English)')
      expect(roundsLabels[2]).toHaveTextContent('CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)')
    }
    await waitFor(() => {
      checkAssertionsSelectInput()
    })
    const rounds = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[1])
    fireEvent.click(rounds[2])
    await waitFor(() => {
      const copyOptions = screen.getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    fireEvent.click(editButton)
    expect(screen.getByTestId('test-data')).toBeInTheDocument()

    expect(screen.getByTestId('actionType')).toHaveTextContent('create')
    expect(screen.getByTestId('newMemoName')).toHaveTextContent(
      'Autumn 2020-22222 (Start date 24 Aug 2020, English), CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)'
    )
    expect(screen.getByTestId('memoCommonLangAbbr')).toHaveTextContent('en')
    expect(screen.getByTestId('sortedApplicationCodes')).toHaveTextContent('2,3')
  })

  test('create the second new draft with one round, with correct name (use shortName) in swedish because round language is Swedish', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = screen.getByRole('combobox', { name: /Choose semester/i })
    const editButton = screen.getByText(buttons.edit)
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const roundsLabels = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[1]).toHaveTextContent('CBIOT1 m.fl. (Start date 20 Mar 2021, Swedish)')
    })
    const rounds = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[1])
    await waitFor(() => {
      const copyOptions = screen.getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    fireEvent.click(editButton)
    expect(screen.getByTestId('test-data')).toBeInTheDocument()

    expect(screen.getByTestId('actionType')).toHaveTextContent('create')
    expect(screen.getByTestId('newMemoName')).toHaveTextContent('CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)')
    expect(screen.getByTestId('memoCommonLangAbbr')).toHaveTextContent('sv')
    expect(screen.getByTestId('sortedApplicationCodes')).toHaveTextContent('3')
  })
})
describe('Component <CreateNewMemo> Create and publish course memo, have some saved drafts.', () => {
  test('render a list of saved drafts', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const labelDrafts = screen.getAllByTestId('label-saved-draft-radio')
    expect(labelDrafts.length).toBe(3)
    const draftNames = [
      'Autumn 2020-22222 (Start date 24 Aug 2020, English), CBIOT1 m.fl. (Start date 30 Oct 2020, Swedish)',
      'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)',
      'Spring 2021-2 (Start date 18 Jan 2021, English)',
    ]
    draftNames.map((draftName, i) => expect(labelDrafts[i]).toHaveTextContent(draftName))
  })

  test('render a filtered list of available rounds (removed saved drafts) to create a new draft', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const selectInput = screen.getByRole('combobox', { name: /Välj termin/i })
    fireEvent.change(selectInput, { target: { value: '20202' } })
    const checkAssertions = () => {
      const availableRounds = screen.getAllByRole('checkbox')
      expect(availableRounds.length).toBe(1)
      const roundsToShow = ['11111']
      expect(availableRounds[0].value).toBe(roundsToShow[0])
    }

    await waitFor(() => {
      checkAssertions()
    })

    const labelRounds = screen.getAllByTestId('label-checkbox-choose-available-round')
    expect(labelRounds.length).toBe(1)
    expect(labelRounds[0]).toHaveTextContent('HT 2020-11111 (Startdatum 2020-10-26, Engelska)')
  })

  test('render radio button for each draft, initially unchecked radio', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const radioSavedDrafts = screen.getAllByTestId('radio-choose-saved-draft')
    radioSavedDrafts.map(draft => expect(draft).not.toBeChecked())
  })

  test('renders only three control buttons if nothing pressed yet', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const startButtons = screen.getAllByRole('button')
    expect(startButtons.length).toBe(3)
    expect(startButtons[0]).toHaveTextContent('')
    expect(startButtons[1]).toHaveTextContent(buttonsSV.btnFinish)
    expect(startButtons[2]).toHaveTextContent(buttonsSV.edit)
  })

  test('check if only one saved draft can be chosen to be edit', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const radioSavedDrafts = screen.getAllByTestId('radio-choose-saved-draft')
    fireEvent.click(radioSavedDrafts[0])
    await waitFor(() => {
      expect(radioSavedDrafts[0]).toBeChecked()
    })
    fireEvent.click(radioSavedDrafts[1])
    expect(radioSavedDrafts[0]).not.toBeChecked()
    expect(radioSavedDrafts[1]).toBeChecked()
  })

  test('check a switch between radio Saved drafts and checkbox Choose a new course offering', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const [radioSavedDraft] = screen.getAllByTestId('radio-choose-saved-draft')
    fireEvent.click(radioSavedDraft)
    await waitFor(() => {
      expect(radioSavedDraft).toBeChecked()
    })

    const selectInput = screen.getByRole('combobox', { name: /Välj termin/i })
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const [roundsLabel] = screen.getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabel).toHaveTextContent('VT 2021-11111 (Startdatum 2021-03-22, Engelska)')
    })

    const [checkboxRound] = screen.getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(checkboxRound)

    expect(radioSavedDraft).not.toBeChecked()
    expect(checkboxRound).toBeChecked()

    fireEvent.click(radioSavedDraft)
    expect(checkboxRound).not.toBeChecked()
    expect(radioSavedDraft).toBeChecked()
  })

  test('show two more buttons if user choose a saved draft', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const [radioSavedDraft] = screen.getAllByTestId('radio-choose-saved-draft')
    fireEvent.click(radioSavedDraft)
    await waitFor(() => {
      expect(radioSavedDraft).toBeChecked()
    })

    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBe(5)
    expect(allButtons[0]).toHaveTextContent('')
    expect(allButtons[1]).toHaveTextContent('Radera utkast')
    expect(allButtons[2]).toHaveTextContent('Ändra kurstillfällen')
    expect(allButtons[3]).toHaveTextContent(buttonsSV.btnFinish)
    expect(allButtons[4]).toHaveTextContent(buttonsSV.edit)
  })

  test('show a modal Add course instances if clicked button Add a course instance to a saved draft. Memo in English can be merged with any round', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const [radioSavedDraftInEn] = screen.getAllByTestId('radio-choose-saved-draft')
    fireEvent.click(radioSavedDraftInEn)
    await waitFor(() => {
      expect(radioSavedDraftInEn).toBeChecked()
    })

    const [, , addRoundButton] = screen.getAllByRole('button')
    expect(addRoundButton).toHaveTextContent('Ändra kurstillfällen')

    fireEvent.click(addRoundButton)

    const checkboxAddRounds = screen.getAllByTestId('checkbox-add-rounds-to-saved-memo')
    expect(checkboxAddRounds.length).toBe(2)
    const [labelAddRound] = screen.getAllByTestId('label-checkbox-add-rounds-to-saved-memo')
    expect(labelAddRound).toHaveTextContent('CBIOT1 m.fl. (Startdatum 2020-10-30, Svenska)')
  })

  test('show a modal Add course instances if clicked button Add a course instance to a saved draft. Memo in Swedish can be merged only with round in Swedish', async () => {
    render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />)
    const [, radioSavedDraftInSv] = screen.getAllByTestId('radio-choose-saved-draft') // CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)
    fireEvent.click(radioSavedDraftInSv)
    await waitFor(() => {
      expect(radioSavedDraftInSv).toBeChecked()
    })

    const [, , addRoundButton] = screen.getAllByRole('button')
    expect(addRoundButton).toHaveTextContent('Ändra kurstillfällen')

    fireEvent.click(addRoundButton)

    const checkboxAddRounds = screen.getAllByTestId('checkbox-add-rounds-to-saved-memo')
    const [labelAvailRound] = screen.getAllByTestId('label-checkbox-add-rounds-to-saved-memo')
    expect(checkboxAddRounds.length).toBe(1)
    expect(checkboxAddRounds[0]).toBeDisabled()
    expect(labelAvailRound).toHaveTextContent(
      'VT 2021-11111 (Startdatum 2021-03-22, Engelska).Går ej att välja, se ovan: Språk kurs-PM.'
    )
  })
})
