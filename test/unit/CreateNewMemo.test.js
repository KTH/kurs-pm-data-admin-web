import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../../public/js/app/mobx'

import i18n from '../../i18n'

import CreateNewMemo from '../../public/js/app/pages/CreateNewMemo'
import mockApplicationStore from '../mocks/ApplicationStore'
import mockApplicationStoreWithDraftMemos from '../mocks/AppStoreWithDraftMemos'
import translations from '../mocks/translations'

const CreateNewMemoPage = ({ ...rest }) => (
  <StaticRouter>
    <MobxStoreProvider initCallback={() => mockApplicationStore}>
      <CreateNewMemo {...rest} />
    </MobxStoreProvider>
  </StaticRouter>
)

const CreateNewMemoPageWithSavedDrafts = ({ ...rest }) => (
  <StaticRouter>
    <MobxStoreProvider initCallback={() => mockApplicationStoreWithDraftMemos}>
      <CreateNewMemo {...rest} />
    </MobxStoreProvider>
  </StaticRouter>
)
const { buttons: buttonsSV } = translations.sv
const { pageTitles: pageTitlesEN, buttons } = translations.en

const { alerts, info, pagesCreateNewPm } = i18n.messages[0]
const { alerts: alertsSV, info: infoSV, pagesCreateNewPm: pagesCreateNewPmSV } = i18n.messages[1]
const { getAllByRole, getAllByTestId, getByTestId } = screen

describe('Component <CreateNewMemo> Create and publish course memo, initial state, no memo created yet.', () => {
  // beforeEach(() => render(<CreateNewMemoPage langAbbr="en" langIndex={0} />))
  test('renders without props', () => {
    render(<CreateNewMemoPage />)
  })

  test('renders main header h1, page name', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const allH2Headers = getAllByRole('heading', { level: 1 })
    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent(pageTitlesEN.new)
  })

  test('renders main subheader h4, course name. English.', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const allH2Headers = getAllByRole('heading', { level: 4 })
    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('renders main header h1, course name. Swedish.', () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const allH2Headers = getAllByRole('heading', { level: 4 })
    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent('EF1111 Projekt i plasmafysik 9.0 hp')
  })

  test('renders main header h2, Choose course offering', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent(info.createNew)
  })

  test('renders two visible headers h3', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const allH3Headers = getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(2)
    expect(allH3Headers[0]).toHaveTextContent(info.chooseSavedDraft)
    expect(allH3Headers[1]).toHaveTextContent(info.createNew)
  })

  test('renders only three buttons if nothing pressed yet', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const startButtons = getAllByRole('button')
    expect(startButtons.length).toBe(3)
    expect(startButtons[0]).toHaveTextContent('')
    expect(startButtons[1]).toHaveTextContent(buttons.btnFinish)
    expect(startButtons[2]).toHaveTextContent(buttons.edit)
  })

  test('renders alert if nothning is chosen and button Edit is pressed', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const editButton = screen.getByText(buttons.edit)
    fireEvent.click(editButton)
    await waitFor(() => {
      const redAlert = screen.getByText(alerts.errNoChosen)
      expect(redAlert).toBeInTheDocument()
    })
  })

  test('renders text if no drafts is in the list and no semester is chosen', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    expect(screen.getByText(info.noSavedDrafts)).toBeVisible()
    const selectInput = getByTestId('select-terms')
    expect(selectInput).toHaveDisplayValue(info.chooseSemester.label)
    expect(getByTestId('new-course-offering')).toHaveStyle(`display: none;`)
  })

  test('renders select options have focus.', () => {
    render(<CreateNewMemoPage />)
    const selectInput = getByTestId('select-terms')
    selectInput.focus()
    expect(selectInput).toHaveFocus()
    selectInput.blur()
    expect(selectInput).not.toHaveFocus()
  })

  test('renders select options for course semesters in English.', () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const semesters = getAllByRole('option')
    const semesterEnglish = ['Spring 2021', 'Autumn 2020', 'Spring 2020', 'Autumn 2019']
    semesters.map((s, i) => expect(s).toHaveTextContent(semesterEnglish[i]))
  })

  test('renders select options for course semesters in Swedish.', () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const semestersSw = getAllByRole('option')
    const semesterSwedish = ['VT 2021', 'HT 2020', 'VT 2020', 'HT 2019']
    semestersSw.map((s, i) => expect(s).toHaveTextContent(semesterSwedish[i]))
  })

  test('renders select options can be selected.', async () => {
    render(<CreateNewMemoPage />)
    const selectInput = getByTestId('select-terms')
    await fireEvent.change(selectInput, { target: { value: '20202' } })
    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()
    expect(options[2].selected).toBeFalsy()
  })

  test('renders checkboxes for all available rounds with value equals ladokRoundId of each course round', async () => {
    render(<CreateNewMemoPage />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20202' } })

    await waitFor(() => {
      const availableRounds = getAllByRole('checkbox')
      expect(availableRounds.length).toBe(3)
      const roundsToShow = ['1', '2', '3']
      roundsToShow.map((round, i) => {
        expect(availableRounds[i].value).toBe(round)
      })
    })
  })

  test('renders in user language: english, list of available autumn course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20202' } })

    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
      const roundNames = [
        'Autumn 2020-1 (Start date 26/10/2020, English)',
        'Autumn 2020-2 (Start date 24/08/2020, English)',
        'CBIOT1 m.fl. (Start date 30/10/2020, Swedish)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available autumn course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20202' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
      const roundNames = [
        'HT 2020-1 (Startdatum 2020-10-26, Engelska)',
        'HT 2020-2 (Startdatum 2020-08-24, Engelska)',
        'CBIOT1 m.fl. (Startdatum 2020-10-30, Svenska)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available spring course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
      const roundNames = [
        'Spring 2021-1 (Start date 22/03/2021, English)',
        'Spring 2021-2 (Start date 18/01/2021, English)',
        'CBIOT1 m.fl. (Start date 20/03/2021, Swedish)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available spring course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
      const roundNames = [
        'VT 2021-1 (Startdatum 2021-03-22, Engelska)',
        'VT 2021-2 (Startdatum 2021-01-18, Engelska)',
        'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)',
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders a copy section when a course offering(s) are chosen and no published memo is available as a template memo', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox-choose-available-round')
      expect(labels.length).toBe(3)
    })
    const rounds = getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[0])
    await waitFor(() => {
      const copyLabels = getAllByTestId('label-copy-radio')
      expect(copyLabels.length).toBe(2)
      expect(copyLabels[0]).toHaveTextContent(info.createFrom.basedOnStandard)
      expect(copyLabels[1]).toHaveTextContent(info.createFrom.basedOnAnotherMemo)
    })
    const copyOptions = getAllByTestId('copy-radio')
    expect(copyOptions[0].checked).toBeTruthy()
    expect(copyOptions[1].checked).toBeFalsy()

    // no published memo is available as a template memo
    fireEvent.click(copyOptions[1])
    expect(copyOptions[0].checked).toBeFalsy()
    expect(copyOptions[1].checked).toBeTruthy()
    expect(screen.getByText(info.noPrevPublishedAvailable)).toBeInTheDocument()
  })

  test('renders only three buttons if checkbox pressed but no saved drafts are chosen', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      expect(getAllByTestId('label-checkbox-choose-available-round')[0]).toBeInTheDocument()
    })
    const rounds = getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[0])

    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(3)
  })

  test('create a new draft with one round, with correct name (use shortName) in english because round language is english', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const roundsLabels = getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[1]).toHaveTextContent('VT 2021-2 (Startdatum 2021-01-18, Engelska)')
    })
    const rounds = getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[1])
    await waitFor(() => {
      const copyOptions = getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    const editButton = screen.getByText('Redigera')
    fireEvent.click(editButton)
    expect(getByTestId('test-data')).toBeInTheDocument()

    await waitFor(() => {
      expect(getByTestId('actionType')).toHaveTextContent('create')
      expect(getByTestId('newMemoName')).toHaveTextContent('Spring 2021-2 (Start date 18/01/2021, English)')
      expect(getByTestId('memoCommonLangAbbr')).toHaveTextContent('en')
      expect(getByTestId('sortedRoundIds')).toHaveTextContent('2')
    })
  })

  test('create a new draft with one round, with correct name (use shortName) in swedish because round language is Swedish', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    const editButton = screen.getByText(buttons.edit)
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const roundsLabels = getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[2]).toHaveTextContent('CBIOT1 m.fl. (Start date 20/03/2021, Swedish)')
    })
    const rounds = getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[2])
    await waitFor(() => {
      const copyOptions = getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    fireEvent.click(editButton)
    expect(getByTestId('test-data')).toBeInTheDocument()

    await waitFor(() => {
      expect(getByTestId('actionType')).toHaveTextContent('create')
      expect(getByTestId('newMemoName')).toHaveTextContent('CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)')
      expect(getByTestId('memoCommonLangAbbr')).toHaveTextContent('sv')
      expect(getByTestId('sortedRoundIds')).toHaveTextContent('3')
    })
  })

  test('create a new draft with two rounds, with correct name (use shortName) in english because one of rounds has language: Swedish', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    const editButton = screen.getByText(buttons.edit)
    fireEvent.change(selectInput, { target: { value: '20202' } })
    await waitFor(() => {
      const roundsLabels = getAllByTestId('label-checkbox-choose-available-round')
      expect(roundsLabels[1]).toBeInTheDocument('Autumn 2020-2 (Start date 24/08/2020, English)')
      expect(roundsLabels[2]).toHaveTextContent('CBIOT1 m.fl. (Start date 30/10/2020, Swedish)')
    })
    const rounds = getAllByTestId('checkbox-choose-available-round')
    fireEvent.click(rounds[1])
    fireEvent.click(rounds[2])
    await waitFor(() => {
      const copyOptions = getAllByTestId('copy-radio')
      expect(copyOptions[0]).toBeInTheDocument()
    })
    fireEvent.click(editButton)
    expect(getByTestId('test-data')).toBeInTheDocument()

    await waitFor(() => {
      expect(getByTestId('actionType')).toHaveTextContent('create')
      expect(getByTestId('newMemoName')).toHaveTextContent(
        'Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)'
      )
      expect(getByTestId('memoCommonLangAbbr')).toHaveTextContent('en')
      expect(getByTestId('sortedRoundIds')).toHaveTextContent('2,3')
    })
  })
})

test('create a new draft with one round, with correct name (use shortName) in swedish because round language is Swedish', async () => {
  render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
  const selectInput = getByTestId('select-terms')
  const editButton = screen.getByText(buttons.edit)
  fireEvent.change(selectInput, { target: { value: '20211' } })
  await waitFor(() => {
    const roundsLabels = getAllByTestId('label-checkbox-choose-available-round')
    expect(roundsLabels[2]).toHaveTextContent('CBIOT1 m.fl. (Start date 20/03/2021, Swedish)')
  })
  const rounds = getAllByTestId('checkbox-choose-available-round')
  fireEvent.click(rounds[2])
  await waitFor(() => {
    const copyOptions = getAllByTestId('copy-radio')
    expect(copyOptions[0]).toBeInTheDocument()
  })
  fireEvent.click(editButton)
  expect(getByTestId('test-data')).toBeInTheDocument()

  await waitFor(() => {
    expect(getByTestId('actionType')).toHaveTextContent('create')
    expect(getByTestId('newMemoName')).toHaveTextContent('CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)')
    expect(getByTestId('memoCommonLangAbbr')).toHaveTextContent('sv')
    expect(getByTestId('sortedRoundIds')).toHaveTextContent('3')
  })
})

describe('Component <CreateNewMemo> Create and publish course memo, have some saved drafts.', () => {
  beforeEach(() => render(<CreateNewMemoPageWithSavedDrafts langAbbr="sv" langIndex={1} />))

  test('render a list of saved drafts', async () => {
    const labelDrafts = getAllByTestId('label-saved-draft-radio')
    expect(labelDrafts.length).toBe(3)
    const draftNames = [
      'Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)',
      'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)',
      'Spring 2021-2 (Start date 18/01/2021, English)',
    ]
    draftNames.map((draftName, i) => expect(labelDrafts[i]).toHaveTextContent(draftName))
  })

  test('render a filtered list of available rounds (removed saved drafts) to create a new draft', async () => {
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20202' } })

    await waitFor(() => {
      const availableRounds = getAllByRole('checkbox')
      expect(availableRounds.length).toBe(1)
      const roundsToShow = ['1']
      expect(availableRounds[0].value).toBe(roundsToShow[0])
    })
    const labelRounds = getAllByTestId('label-checkbox-choose-available-round')
    expect(labelRounds.length).toBe(1)
    expect(labelRounds[0]).toHaveTextContent('HT 2020-1 (Startdatum 2020-10-26, Engelska)')
  })

  test('render radio button for each draft, initially unchecked radio', async () => {
    const radioSavedDrafts = getAllByTestId('radio-choose-saved-draft')
    radioSavedDrafts.map((draft, i) => expect(draft).not.toBeChecked())
  })

  test('renders only three control buttons if nothing pressed yet', async () => {
    const startButtons = getAllByRole('button')
    expect(startButtons.length).toBe(3)
    expect(startButtons[0]).toHaveTextContent('')
    expect(startButtons[1]).toHaveTextContent(buttonsSV.btnFinish)
    expect(startButtons[2]).toHaveTextContent(buttonsSV.edit)
  })

  test('check if only one saved draft can be chosen to be edit', async () => {
    const radioSavedDrafts = getAllByTestId('radio-choose-saved-draft')
    fireEvent.click(radioSavedDrafts[0])
    await waitFor(() => {
      expect(radioSavedDrafts[0]).toBeChecked()
    })
    fireEvent.click(radioSavedDrafts[1])
    await waitFor(() => {
      expect(radioSavedDrafts[0]).not.toBeChecked()
      expect(radioSavedDrafts[1]).toBeChecked()
    })
  })

  test('check a switch between radio Saved drafts and checkbox Choose a new course offering', async () => {
    const radioSavedDraft = getAllByTestId('radio-choose-saved-draft')[0]
    fireEvent.click(radioSavedDraft)
    await waitFor(() => {
      expect(radioSavedDraft).toBeChecked()
    })

    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const roundsLabel = getAllByTestId('label-checkbox-choose-available-round')[0]
      expect(roundsLabel).toHaveTextContent('VT 2021-1 (Startdatum 2021-03-22, Engelska)')
    })
    const checkboxRound = getAllByTestId('checkbox-choose-available-round')[0]
    fireEvent.click(checkboxRound)
    await waitFor(() => {
      expect(radioSavedDraft).not.toBeChecked()
      expect(checkboxRound).toBeChecked()
    })

    fireEvent.click(radioSavedDraft)
    await waitFor(() => {
      expect(checkboxRound).not.toBeChecked()
      expect(radioSavedDraft).toBeChecked()
    })
  })

  test('show two more buttons if user choose a saved draft', async () => {
    const radioSavedDraft = getAllByTestId('radio-choose-saved-draft')[0]
    fireEvent.click(radioSavedDraft)
    await waitFor(() => {
      expect(radioSavedDraft).toBeChecked()
    })

    const allButtons = getAllByRole('button')
    expect(allButtons.length).toBe(5)
    expect(allButtons[0]).toHaveTextContent('')
    expect(allButtons[1]).toHaveTextContent('Radera utkast')
    expect(allButtons[2]).toHaveTextContent('Lägg till kurstillfällen')
    expect(allButtons[3]).toHaveTextContent(buttonsSV.btnFinish)
    expect(allButtons[4]).toHaveTextContent(buttonsSV.edit)
  })

  test('show a modal Add course instances if clicked button Add a course instance to a saved draft. Memo in English can be merged with any round', async () => {
    const radioSavedDraftInEn = getAllByTestId('radio-choose-saved-draft')[0]
    fireEvent.click(radioSavedDraftInEn)
    await waitFor(() => {
      expect(radioSavedDraftInEn).toBeChecked()
    })

    const addRoundButton = getAllByRole('button')[2]
    expect(addRoundButton).toHaveTextContent('Lägg till kurstillfällen')

    fireEvent.click(addRoundButton)
    await waitFor(() => {
      const checkboxAddRounds = getAllByTestId('checkbox-add-rounds-to-saved-memo')
      expect(checkboxAddRounds.length).toBe(1)
      const labelAddRound = getAllByTestId('label-checkbox-add-rounds-to-saved-memo')[0]
      expect(labelAddRound).toHaveTextContent('HT 2020-1 (Startdatum 2020-10-26, Engelska)')
    })
  })

  test('show a modal Add course instances if clicked button Add a course instance to a saved draft. Memo in Swedish can be merged only with round in Swedish', async () => {
    const radioSavedDraftInSv = getAllByTestId('radio-choose-saved-draft')[1] // CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)
    fireEvent.click(radioSavedDraftInSv)
    await waitFor(() => {
      expect(radioSavedDraftInSv).toBeChecked()
    })

    const addRoundButton = getAllByRole('button')[2]
    expect(addRoundButton).toHaveTextContent('Lägg till kurstillfällen')

    fireEvent.click(addRoundButton)
    await waitFor(() => {
      const checkboxAddRounds = getAllByTestId('checkbox-add-rounds-to-saved-memo')
      const labelAvailRound = getAllByTestId('label-checkbox-add-rounds-to-saved-memo')[0]
      expect(checkboxAddRounds.length).toBe(1)
      expect(checkboxAddRounds[0].disabled).toBeTruthy()
      expect(labelAvailRound).toHaveTextContent(
        'VT 2021-1 (Startdatum 2021-03-22, Engelska).Går ej att välja, se ovan: Språk kurs-PM.'
      )
    })
  })
})
