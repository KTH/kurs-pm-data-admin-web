import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'

import CreateNewMemo from '../../public/js/app/pages/CreateNewMemo'
import mockRouterStore from '../mocks/RouterStore'
import mockHistory from '../mocks/history'

const CreateNewMemoPage = ({ ...rest }) => (
  <StaticRouter>
    <Provider routerStore={mockRouterStore}>
      <CreateNewMemo {...rest} />
    </Provider>
  </StaticRouter>
)

// const renderWithState = (stateToSet = {}) => {
//   const newAdminStore = Object.assign(Object.assign({}, mockRouterStore), stateToSet)
//   return CreateNewMemoPage(newAdminStore)
// }

const { alerts, info, pagesCreateNewPm, pageTitles, buttons } = i18n.messages[0]
const {
  alerts: alertsSV,
  info: infoSV,
  pagesCreateNewPm: pagesCreateNewPmSV,
  pageTitles: pageTitlesSV,
  buttons: buttonsSV
} = i18n.messages[1]
const { getAllByRole, getAllByTestId, getByTestId } = screen

describe('Component <CreateNewMemo> Create and publish course memo, initial state, no memo created yet.', () => {
  // beforeEach(() => render(<CreateNewMemoPage langAbbr="en" langIndex={0} />))
  test('renders without props', () => {
    render(<CreateNewMemoPage />)
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
      const labels = getAllByTestId('label-checkbox')
      expect(labels.length).toBe(3)
      const roundNames = [
        'Autumn 2020-1 (Start date 26/10/2020, English)',
        'Autumn 2020-2 (Start date 24/08/2020, English)',
        'CBIOT1 m.fl. (Start date 30/10/2020, Swedish)'
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available autumn course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20202' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox')
      expect(labels.length).toBe(3)
      const roundNames = [
        'HT 2020-1 (Startdatum 2020-10-26, Engelska)',
        'HT 2020-2 (Startdatum 2020-08-24, Engelska)',
        'CBIOT1 m.fl. (Startdatum 2020-10-30, Svenska)'
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available spring course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox')
      expect(labels.length).toBe(3)
      const roundNames = [
        'Spring 2021-1 (Start date 22/03/2021, English)',
        'Spring 2021-2 (Start date 18/01/2021, English)',
        'CBIOT1 m.fl. (Start date 20/03/2021, Swedish)'
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders in user language: swedish, list of available spring course offerings.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox')
      expect(labels.length).toBe(3)
      const roundNames = [
        'VT 2021-1 (Startdatum 2021-03-22, Engelska)',
        'VT 2021-2 (Startdatum 2021-01-18, Engelska)',
        'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)'
      ]
      roundNames.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    })
  })

  test('renders a copy section when a course offering(s) are chosen and no published memo is available as a template memo', async () => {
    render(<CreateNewMemoPage langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      const labels = getAllByTestId('label-checkbox')
      expect(labels.length).toBe(3)
    })
    const rounds = getAllByTestId('rounds-checkbox')
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
      expect(getAllByTestId('label-checkbox')[0]).toBeInTheDocument()
    })
    const rounds = getAllByTestId('rounds-checkbox')
    fireEvent.click(rounds[0])

    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(3)
  })

  test('create a new draft with one round, with correct name (use shortName) in english because round language is english', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20211' } })
    await waitFor(() => {
      expect(getAllByTestId('label-checkbox')[1]).toHaveTextContent(
        'VT 2021-2 (Startdatum 2021-01-18, Engelska)'
      )
    })
    const rounds = getAllByTestId('rounds-checkbox')
    expect(rounds[1])
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
      expect(getByTestId('newMemoName')).toHaveTextContent(
        'Spring 2021-2 (Start date 18/01/2021, English)'
      )
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
      expect(getAllByTestId('label-checkbox')[2]).toHaveTextContent(
        'CBIOT1 m.fl. (Start date 20/03/2021, Swedish)'
      )
    })
    const rounds = getAllByTestId('rounds-checkbox')
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
        'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)'
      )
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
      expect(getAllByTestId('label-checkbox')[0]).toBeInTheDocument()
    })
    const rounds = getAllByTestId('rounds-checkbox')
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
