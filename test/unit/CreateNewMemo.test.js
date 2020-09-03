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
const { alerts, info, pagesCreateNewPm, pageTitles, buttons } = i18n.messages[0]
const {
  alerts: alertsSV,
  info: infoSV,
  pagesCreateNewPm: pagesCreateNewPmSV,
  pageTitles: pageTitlesSV,
  buttons: buttonsSV
} = i18n.messages[1]
const { getAllByRole, getByTestId } = screen

describe('Component <CreateNewMemo> Create and publish course memo, initial state, no memo created yet. English interface', () => {
  xtest('renders without props', () => {
    render(<CreateNewMemoPage />)
  })

  xtest('renders two visible headers h3', () => {
    render(<CreateNewMemoPage />)
    const allH3Headers = getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(2)
    expect(allH3Headers[0]).toHaveTextContent(info.chooseSavedDraft)
    expect(allH3Headers[1]).toHaveTextContent(info.createNew)
  })

  test('renders text if no drafts is in the list and no semester is chosen', () => {
    render(<CreateNewMemoPage />)
    expect(screen.getByText(info.noSavedDrafts)).toBeVisible()
    const selectInput = getByTestId('select-terms')
    expect(selectInput).toHaveDisplayValue(info.chooseSemester.label)
    expect(getByTestId('new-course-offering')).toHaveStyle(`display: none;`)
  })

  test('renders select options for course semesters in English.', async () => {
    render(<CreateNewMemoPage />)
    const semesters = getAllByRole('option')
    const semesterEnglish = ['Spring 2021', 'Autumn 2020', 'Spring 2020', 'Autumn 2019']
    semesters.map((s, i) => expect(s).toHaveTextContent(semesterEnglish[i]))
  })

  test('renders select options for course semesters in Swedish.', async () => {
    render(<CreateNewMemoPage langAbbr="sv" langIndex={1} />)
    const semestersSw = getAllByRole('option')
    const semesterSwedish = ['VT 2021', 'HT 2020', 'VT 2020', 'HT 2019']
    semestersSw.map((s, i) => expect(s).toHaveTextContent(semesterSwedish[i]))

    //expect(selectInput).not.toHaveValue(['VT 2021'])
    // fireEvent.click(screen.getByText(infoSV.chooseSemester.label))
    // await waitFor(() => screen.getByText('VT 2021'))
    // await waitFor(() => screen.getByText('HT 2020'))
  })
})
