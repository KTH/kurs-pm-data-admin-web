import React from 'react'
import { Provider } from 'mobx-react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'

import MemoContainer from '../../public/js/app/pages/MemoContainer'
import mockRouterStoreWithChosenMemo from '../mocks/RouterStoreWithChosenMemo'

const { alerts, info, pagesCreateNewPm, pageTitles, buttons, sectionsLabels } = i18n.messages[0]
const {
  alerts: alertsSV,
  info: infoSV,
  pagesCreateNewPm: pagesCreateNewPmSV,
  pageTitles: pageTitlesSV,
  buttons: buttonsSV,
  sectionsLabels: sectionsLabelsSV
} = i18n.messages[1]
const { getAllByRole, getAllByxTestId, getByxTestId, getByText } = screen

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

describe('Component <MemoContainer> Edit. A New fresh draft of a new memo. Memo in English, user interface in English', () => {
  beforeEach(() => {
    render(<EditFreshDraftOfNewMemo memoLang="en" userLang="en" />)
  })
  xtest('renders a page with a new draft of a new memo', (done) => {
    done()
  })

  xtest('renders main header h1, page name', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(pageTitles.new)
  })

  test('renders main subheader h4 and other menu h4, course name.', () => {
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

  test('renders main header h2, Choose course offering', () => {
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

  xtest('renders only three buttons if nothing pressed yet', async () => {
    const startButtons = getAllByRole('button')
    expect(startButtons.length).toBe(2)
    expect(startButtons[0]).toHaveTextContent(buttons.cancel)
    expect(startButtons[1]).toHaveTextContent(buttons.edit)
  })

  xtest('renders message if no published memos exists', async () => {
    render(<MemoContainer langAbbr="en" langIndex={0} />)
    const emptyList = screen.getByText(info.noPublishedMemos)
    expect(emptyList).toBeInTheDocument()
  })
})

xdescribe('Component <MemoContainer> Edit. A New fresh draft of a new memo. Memo in English, user interface in Swedish', () => {
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

  test('renders main subheader h4 and other menu h4, course name.', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabelsSV
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
})
