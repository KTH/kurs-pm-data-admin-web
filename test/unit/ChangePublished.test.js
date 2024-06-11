import React from 'react'
import { MobxStoreProvider } from '../../public/js/app/mobx'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StaticRouter } from 'react-router-dom/server'
import i18n from '../../i18n'

import ChangePublished from '../../public/js/app/pages/ChangePublished'
import mockApplicationStore from '../mocks/ApplicationStore'
import mockApplicationStoreWithAllMemos from '../mocks/AppStoreWithAllMemos'
import translations from '../mocks/translations'
import { act } from 'react-dom/test-utils'

const { buttons, pageTitles } = translations.en

const { info } = i18n.messages[0]
const { info: infoSV } = i18n.messages[1]
const { getAllByRole, getAllByTestId, getByTestId, getByText } = screen

delete global.window.location

global.window.location = {
  href: 'http://localhost:3000/kursinfoadmin/kurs-pm-data/published/EF1111',
  search: '',
}
const ChangedPublishedEmpty = ({ ...rest }) => (
  <StaticRouter>
    <MobxStoreProvider initCallback={() => mockApplicationStore}>
      <ChangePublished {...rest} />
    </MobxStoreProvider>
  </StaticRouter>
)

const ChangedPublishedWithData = ({ ...rest }) => (
  <StaticRouter>
    <MobxStoreProvider initCallback={() => mockApplicationStoreWithAllMemos}>
      <ChangePublished {...rest} />
    </MobxStoreProvider>
  </StaticRouter>
)

describe('Component <ChangedPublished> Edit published course memo with empty list of memos', () => {
  test('renders a page', () => {
    render(<ChangedPublishedEmpty />)
  })

  test('renders main header h1, page name', () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.published)
  })

  test('renders main subheader, course name. English.', () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const headers = getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('renders main header h1, course name. Swedish.', () => {
    render(<ChangedPublishedEmpty langAbbr="sv" langIndex={1} />)
    const headers = getAllByRole('heading', { level: 1 })
    expect(headers.length).toBe(1)
    expect(headers[0]).toHaveTextContent('EF1111 Projekt i plasmafysik 9.0 hp')
  })

  test('renders only three buttons if nothing pressed yet', async () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const startButtons = getAllByRole('button')
    expect(startButtons.length).toBe(3)
    expect(startButtons[0]).toHaveTextContent('')
    expect(startButtons[1]).toHaveTextContent(buttons.cancel)
    expect(startButtons[2]).toHaveTextContent(buttons.edit)
  })
})

describe('Component <ChangedPublished> Edit published course memo. Several published memos.', () => {
  test('renders a page', () => {
    render(<ChangedPublishedWithData />)
  })

  test('renders select options have focus.', async () => {
    await act(async () => {
      await render(<ChangedPublishedWithData />)
    })
    const selectInput = getByTestId('select-terms')
    selectInput.focus()
    expect(selectInput).toHaveFocus()
    selectInput.blur()
    expect(selectInput).not.toHaveFocus()
  })

  test('renders select options for course semesters in English.', async () => {
    await act(async () => {
      await render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    })
    const semesters = getAllByRole('option')
    const semesterEnglish = ['Spring 2021', 'Autumn 2020', 'Spring 2020', 'Autumn 2019']
    semesters.map((s, i) => expect(s).toHaveTextContent(semesterEnglish[i]))
  })

  test('renders select options for course semesters in Swedish.', async () => {
    await act(async () => {
      await render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    })
    const semestersSw = getAllByRole('option')
    const semesterSwedish = ['VT 2021', 'HT 2020', 'VT 2020', 'HT 2019']
    semestersSw.map((s, i) => expect(s).toHaveTextContent(semesterSwedish[i]))
  })

  test('renders select options can be selected.', async () => {
    await act(async () => {
      await render(<ChangedPublishedWithData />)
    })
    const selectInput = getByTestId('select-terms')
    await fireEvent.change(selectInput, { target: { value: '20192' } })
    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeFalsy()

    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(2)
    expect(allH2Headers[1]).toHaveTextContent(info.choosePublishedMemo)
  })

  test('renders all labels of published memos. English interface', () => {
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20192' } })
    const publishedMemosLabels = getAllByTestId('label-radio-choose-pub-memo')
    expect(publishedMemosLabels.length).toBe(3)
    expect(publishedMemosLabels[0]).toHaveTextContent('Autumn 2019-2 (Start date 28 Oct 2019, English) - Draft')
    expect(publishedMemosLabels[1]).toHaveTextContent('Autumn 2019-2 (Start date 26 Aug 2019, English)')
    expect(publishedMemosLabels[2]).toHaveTextContent('Autumn 2019-2 (Start date 26 Aug 2019, English)')
  })

  test('renders all labels of published memos. Swedish interface', () => {
    render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20192' } })
    const publishedMemosLabels = getAllByTestId('label-radio-choose-pub-memo')
    expect(publishedMemosLabels.length).toBe(3)
    expect(publishedMemosLabels[0]).toHaveTextContent('Autumn 2019-2 (Start date 28 Oct 2019, English) - Utkast')
    expect(publishedMemosLabels[1]).toHaveTextContent('Autumn 2019-2 (Start date 26 Aug 2019, English)')
    expect(publishedMemosLabels[2]).toHaveTextContent('Autumn 2019-2 (Start date 26 Aug 2019, English)')
  })

  test('show new button if user choose a saved draft', async () => {
    render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20192' } })
    const radioSavedDraft = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(radioSavedDraft)
    await waitFor(() => {
      expect(radioSavedDraft).toBeChecked()
    })

    const allButtons = getAllByRole('button')
    expect(allButtons[2]).toHaveTextContent('Radera utkast')
  })

  test('render radio button for each memo, initially unchecked radio', async () => {
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20201' } })
    const radioMemos = getAllByTestId('radio-choose-pub-memo')
    radioMemos.map((memo, i) => expect(memo).not.toBeChecked())
  })

  test('check if button Add course instances shows if the memo is chosen', async () => {
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20201' } })
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })

    expect(getByText('Change course instances')).toBeInTheDocument()
  })

  test('show a modal Add course instances if clicked button Add a course instance to a memo. No available rounds left.', async () => {
    render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20201' } })
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })

    fireEvent.click(getByText('Ändra kurstillfällen'))
    await waitFor(() => {
      expect(getByText(infoSV.noRoundsToAdd)).toBeInTheDocument()
    })
  })

  test('check location for next step to edit published memos after click Edit', async () => {
    //delete window.location
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20192' } })
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })
    const edit = screen.getByText('Edit')
    fireEvent.click(edit)
    await waitFor(() => {
      expect(window.location).toBe('/kursinfoadmin/kurs-pm-data/EF1111/EF111120192-1')
    })
  })
})

describe('Component <ChangedPublished> Add course instances to chosed published memo', () => {
  test('renders a page', () => {
    render(<ChangedPublishedWithData />)
  })

  test('show a modal Add course instances if clicked button Add a course instance to a saved draft. Memo in Swedish can be merged only with round in Swedish', async () => {
    render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20192' } })
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })

    fireEvent.click(getByText('Ändra kurstillfällen'))

    await waitFor(() => {
      const checkboxAddRounds = getAllByTestId('checkbox-add-rounds-to-saved-memo')
      expect(checkboxAddRounds.length).toBe(1)
      const labelAddRound = getAllByTestId('label-checkbox-add-rounds-to-saved-memo')[0]
      expect(labelAddRound).toHaveTextContent('HT 2019-3 (Startdatum 2019-10-28, Engelska)')
    })
  })

  test('show a modal Add course instances if clicked button Add a course instance to a saved draft. Memo in English can be merged with any round', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '?memoEndPoint=EF111120192-1&semester=20192&event=addedRoundId',
      },
    })

    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const selectInput = getByTestId('select-terms')
    fireEvent.change(selectInput, { target: { value: '20192' } })
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })

    fireEvent.click(getByText('Change course instances'))

    await waitFor(() => {
      const checkboxAddRounds = getAllByTestId('checkbox-add-rounds-to-saved-memo')
      expect(checkboxAddRounds.length).toBe(1)
      const labelAddRound = getAllByTestId('label-checkbox-add-rounds-to-saved-memo')[0]
      expect(labelAddRound).toHaveTextContent('Autumn 2019-3 (Start date 28 Oct 2019, English)')
    })
    const save = screen.getByText('Save')
    fireEvent.click(save)
    await waitFor(() => {
      expect(window.location.search).toBe('?memoEndPoint=EF111120192-1&semester=20192&event=addedRoundId')
    })
  })
})
