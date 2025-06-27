import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../../public/js/app/mobx'

import translations from '../mocks/translations'
import PreviewContainer from '../../public/js/app/pages/PreviewContainer'
import SideMenu from '../../public/js/app/components/preview/SideMenu'
import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'
import generatedExtraHeaders from '../mocks/memoData/generateExtraHeaders'
import generatedStandardMemoData from '../mocks/memoData/generateStandardMemoData'
import mockCourseMemoItems from '../mocks/courseMemoItems'

const { getAllByRole, getAllByTestId, getAllByText, getByText } = screen

const PreviewPublishedMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedApplicationStore = {
    ...mockApplicationStoreWithChosenMemo('DRAFT_OF_PUBLISHED', 'filledInAndVisible', memoLang, userLang),
    koppsFreshData: {
      courseMainSubjects: '',
    },
    noMemoData: () => false,
    memoDatas: [],
    activeTermsPublishedMemos: [],
    activeMemoEndPoint: id => false,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PreviewContainer {...rest} />
      </MobxStoreProvider>
    </StaticRouter>
  )
}

const { labelContacts, labelFacts, labelLinks, orderedFilledInAndVisible, sectionsLabels } = translations.en

describe('Component <PreviewContainer> to display filled in draft of published memo. All memo data is filled in and visible. memoLang="en" userLang="sv"', () => {
  beforeEach(() => {
    render(<PreviewPublishedMemo memoLang="en" userLang="sv" />)
  })
  test('renders a course memo', done => {
    done()
  })

  test('renders and check all headers on the place', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(2)
    expect(allH1Headers[0]).toHaveTextContent('Ändra publicerat kurs-PM')
    expect(allH1Headers[1]).toHaveTextContent('Course memo Autumn 2019')
  })

  test('renders main header h2 (page name) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH2Headers.length).toBe(7)
    const expectedh2ds = [
      'Granska och publicera',
      'Om kursen EF1111',
      contentAndOutcomes,
      prep,
      reqToFinal,
      extra,
      contacts,
    ]
    expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const mainContent = screen.getByTestId('preview-main-content')
    const allH3Headers = within(mainContent).getAllByRole('heading', { level: 3 })

    expect(allH3Headers.length).toBe(29)
    const expectedh3ds = orderedFilledInAndVisible
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('renders main subheader h3 in side-content,', () => {
    const mainContent = screen.getByTestId('preview-side-content')
    const h3Headers = within(mainContent).getAllByRole('heading', { level: 3 })
    expect(h3Headers.length).toBe(12)
    const expectedhds = [
      labelFacts.startdate,
      labelFacts.roundsTitle,
      labelFacts.languageOfInstructionTitle,
      labelFacts.offeredByTitle,
      labelLinks.versionTitle,
      labelLinks.courseMemoPrint,
      'Related information',
      labelContacts.communicationWithTeachersTitle,
      labelContacts.courseCoordinatorTitle,
      labelContacts.teacherTitle,
      labelContacts.examinerTitle,
    ]
    expectedhds.map((h3, index) => expect(h3Headers[index]).toHaveTextContent(h3))
  })

  test('Get buttons and check it is name', async () => {
    const allBtns = getAllByRole('button')
    expect(allBtns.length).toBe(10)
    const expectedBtns = [
      'Kurs- och programkatalogen',
      'Inför kursval',
      'Kurs-PM',
      'Course memo Autumn 2019-1',
      'Kursens utveckling',
      'Arkiv',
      'Print or save',
      'Redigera',
      'Avsluta med utkast',
      'Publicera',
    ]
    expectedBtns.map((btn, index) => expect(allBtns[index]).toHaveTextContent(btn))
  })

  test('Get Other contacts if it renders', async () => {
    const otherContacts = getByText(labelContacts.otherContactsTitle)
    expect(otherContacts).toBeInTheDocument()
  })

  test('Get all link names if it renders', async () => {
    const allLinks = getAllByRole('link')
    expect(allLinks.length).toBe(3)
    const expectedLinks = ['Rights and responsibilities', 'Course and examination', `Administrate your studies`]
    expectedLinks.map((link, index) => expect(allLinks[index]).toHaveTextContent(link))
  })

  test('get memo name as memo name', async () => {
    const memoNames = getAllByText('Autumn 2019-2 (Start date 28 Oct 2019, English)')
    expect(memoNames.length).toBe(1)
  })

  test('get memo semester', async () => {
    expect(getByText('HT 2019')).toBeInTheDocument()
  })

  test('get all texts', async () => {
    expect(getByText('HT 2019')).toBeInTheDocument()
  })

  test('Check if Extra heades content is on page', () => {
    const extraheadersContent = generatedExtraHeaders(true)
    const extraHeaders = ['extraHeaders1', 'extraHeaders2', 'extraHeaders3', 'extraHeaders4']
    expect(getAllByText('Html content for section First header').length).toBe(extraHeaders.length)
    expect(getAllByText('Html content for section Second header').length).toBe(extraHeaders.length)
  })

  test('get memo standard content', async () => {
    const standardheadersContent = Object.values(generatedStandardMemoData(true, '', ''))
    standardheadersContent.map(content => {
      expect(getByText(content)).toBeInTheDocument()
    })
  })
})
describe('Component <SideMenu>', () => {
  test('renders', done => {
    render(<SideMenu labels={sectionsLabels} courseMemoItems={[]} />)
    done()
  })
  test('renders published active memos', done => {
    render(<SideMenu labels={sectionsLabels} courseMemoItems={mockCourseMemoItems} />)

    const labels = getAllByTestId('side-menu-labels')
    expect(labels.length).toBe(3)
    const sideMenuMemoLabels = ['11111', '22222', '44444']
    sideMenuMemoLabels.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    done()
  })
})
