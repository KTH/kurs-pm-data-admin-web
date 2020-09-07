import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'

import ChangePublished from '../../public/js/app/pages/ChangePublished'
import mockRouterStore from '../mocks/RouterStore'
import mockRouterStoreWithAllMemos from '../mocks/RouterStoreWithAllMemos'

const { alerts, info, pagesCreateNewPm, pageTitles, buttons } = i18n.messages[0]
const {
  alerts: alertsSV,
  info: infoSV,
  pagesCreateNewPm: pagesCreateNewPmSV,
  pageTitles: pageTitlesSV,
  buttons: buttonsSV
} = i18n.messages[1]
const { getAllByRole, getAllByTestId, getByTestId, getByText } = screen

const ChangedPublishedEmpty = ({ ...rest }) => (
  <StaticRouter>
    <Provider routerStore={mockRouterStore}>
      <ChangePublished {...rest} />
    </Provider>
  </StaticRouter>
)

const ChangedPublishedWithData = ({ ...rest }) => (
  <StaticRouter>
    <Provider routerStore={mockRouterStoreWithAllMemos}>
      <ChangePublished {...rest} />
    </Provider>
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

  test('renders main subheader h4, course name. English.', () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(1)
    expect(allH4Headers[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9 credits')
  })

  test('renders main header h1, course name. Swedish.', () => {
    render(<ChangedPublishedEmpty langAbbr="sv" langIndex={1} />)
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(1)
    expect(allH4Headers[0]).toHaveTextContent('EF1111 Projekt i plasmafysik 9 hp')
  })

  test('renders main header h2, Choose course offering', () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent(info.choosePublishedMemo)
  })

  test('renders only three buttons if nothing pressed yet', async () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const startButtons = getAllByRole('button')
    expect(startButtons.length).toBe(2)
    expect(startButtons[0]).toHaveTextContent(buttons.cancel)
    expect(startButtons[1]).toHaveTextContent(buttons.edit)
  })

  test('renders message if no published memos exists', async () => {
    render(<ChangedPublishedEmpty langAbbr="en" langIndex={0} />)
    const emptyList = screen.getByText(info.noPublishedMemos)
    expect(emptyList).toBeInTheDocument()
  })
})

describe('Component <ChangedPublished> Edit published course memo. Several published memos.', () => {
  test('renders a page', () => {
    render(<ChangedPublishedWithData />)
  })

  test('renders all labels of published memos. English interface', () => {
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const publishedMemosLabels = getAllByTestId('label-radio-choose-pub-memo')
    expect(publishedMemosLabels.length).toBe(3)
    expect(publishedMemosLabels[0]).toHaveTextContent(
      'Autumn 2019-2 (Start date 28/10/2019, English) (has unpublished changes)'
    )
    expect(publishedMemosLabels[1]).toHaveTextContent(
      'Autumn 2019-2 (Start date 26/08/2019, English)'
    )
    expect(publishedMemosLabels[2]).toHaveTextContent('CDATA (Startdatum 2020-03-16, Svenska)')
  })

  test('renders all labels of published memos. Swedish interface', () => {
    render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    const publishedMemosLabels = getAllByTestId('label-radio-choose-pub-memo')
    expect(publishedMemosLabels.length).toBe(3)
    expect(publishedMemosLabels[0]).toHaveTextContent(
      'Autumn 2019-2 (Start date 28/10/2019, English) (finns opublicerade ändringar)'
    )
    expect(publishedMemosLabels[1]).toHaveTextContent(
      'Autumn 2019-2 (Start date 26/08/2019, English)'
    )
    expect(publishedMemosLabels[2]).toHaveTextContent('CDATA (Startdatum 2020-03-16, Svenska)')
  })

  test('render radio button for each memo, initially unchecked radio', async () => {
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const radioMemos = getAllByTestId('radio-choose-pub-memo')
    radioMemos.map((memo, i) => expect(memo).not.toBeChecked())
  })

  test('check if button Add course instances shows if the memo is chosen', async () => {
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })

    expect(getByText('Add course instances')).toBeInTheDocument()
  })

  test('show a modal Add course instances if clicked button Add a course instance to a memo. No available rounds left.', async () => {
    render(<ChangedPublishedWithData langAbbr="sv" langIndex={1} />)
    const draftOfPublished = getAllByTestId('radio-choose-pub-memo')[0]
    fireEvent.click(draftOfPublished)
    await waitFor(() => {
      expect(draftOfPublished).toBeChecked()
    })

    fireEvent.click(getByText('Lägg till kurstillfällen'))
    await waitFor(() => {
      expect(getByText(infoSV.noRoundsToAdd)).toBeInTheDocument()
    })
  })

  test('check location for next step to edit published memos after click Edit', async () => {
    delete window.location
    render(<ChangedPublishedWithData langAbbr="en" langIndex={0} />)
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
