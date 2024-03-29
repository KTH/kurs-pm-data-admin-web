import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import i18n from '../../i18n'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../../public/js/app/mobx'

import translations from '../mocks/translations'
import PreviewContainer from '../../public/js/app/pages/PreviewContainer'
import SideMenu from '../../public/js/app/components/preview/SideMenu'
import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'
import generatedExtraHeaders from '../mocks/memoData/generateExtraHeaders'
import generatedStandardMemoData from '../mocks/memoData/generateStandardMemoData'
import mockCourseMemoItems from '../mocks/courseMemoItems'

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText } = screen

const PreviewPublishedMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedApplicationStore = {
    ...mockApplicationStoreWithChosenMemo('DRAFT_OF_PUBLISHED', 'filledInAndVisible', memoLang, userLang),
    koppsFreshData: {
      courseMainSubjects: '',
    },
    browserConfig: { imageStorageUri: 'localhost://' },
    imageFromAdmin: '',
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

const { breadCrumbLabels, labelContacts, labelFacts, labelLinks, orderedFilledInAndVisible, sectionsLabels } =
  translations.en

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

    expect(allH2Headers.length).toBe(6)
    const expectedh2ds = ['Granska och publicera', contentAndOutcomes, prep, reqToFinal, extra, contacts]
    expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('renders main header H3 (content) in user lang(sv),  and memo sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(29)
    const expectedh3ds = orderedFilledInAndVisible
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('tab: contentAndOutcomes (draft of published). renders main subheader (course name)(en)', () => {
    const subheader = getAllByRole('presentation')
    expect(subheader.length).toBe(1)
    expect(subheader[0]).toHaveTextContent('EF1111 Project in Plasma Physics 9.0 credits')
  })

  test('renders h4 for help text and other menu h4 (menu headers), ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(16)
    const expectedhds = [
      'Termin',
      'Kursomgång',
      'EF1111 Project in Plasma Physics 9.0 credits',
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
      labelContacts.teacherAssistantsTitle,
      labelContacts.examinerTitle,
    ]
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('Get buttons and check it is name', async () => {
    const allBtns = getAllByRole('button')
    expect(allBtns.length).toBe(12)
    const expectedBtns = [
      breadCrumbLabels.university,
      breadCrumbLabels.student,
      breadCrumbLabels.directory,
      breadCrumbLabels.aboutCourse,
      `‹ ${breadCrumbLabels.directory}`,
      'Inför kursval',
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

  test('Get Admin link name ', async () => {
    const adminLinkName = getByText('Administer About course')
    expect(adminLinkName).toBeInTheDocument()
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
    const { getByTestId } = render(<SideMenu labels={sectionsLabels} courseMemoItems={mockCourseMemoItems} />)
    const labels = getAllByTestId('side-menu-labels')
    expect(labels.length).toBe(3)
    const sideMenuMemoLabels = ['1', '2', '4']
    sideMenuMemoLabels.map((roundName, i) => expect(labels[i]).toHaveTextContent(roundName))
    done()
  })
})
