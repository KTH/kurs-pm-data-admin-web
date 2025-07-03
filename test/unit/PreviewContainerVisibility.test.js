import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../../public/js/app/mobx'

import translations from '../mocks/translations'
import PreviewContainer from '../../public/js/app/pages/PreviewContainer'
import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'

const { getAllByRole, queryByText } = screen

const PreviewPublishedMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedApplicationStore = {
    ...mockApplicationStoreWithChosenMemo('DRAFT_OF_PUBLISHED', 'filledInAndInvisible', memoLang, userLang),
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

const { labelContacts, labelFacts, labelLinks } = translations.en

describe('Component <PreviewContainer> to display filled in draft of published memo. All memo data is filled in and only optional data must be invisible. memoLang="en" userLang="sv"', () => {
  beforeEach(() => {
    render(<PreviewPublishedMemo memoLang="en" userLang="sv" />)
  })
  test('renders a course memo', done => {
    done()
  })

  test('renders main header H3 (content) in main-content (extra headers and standard non-optional headers visible)', () => {
    const mainContent = screen.getByTestId('preview-main-content')
    const allH3Headers = within(mainContent).getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(16)
    const expectedh3ds = [
      'Course contents',
      'Intended learning outcomes',
      'Created by user First header for section extraHeaders1',
      'Created by user Second header for section extraHeaders1',
      'Support for students with disabilities',
      'Created by user First header for section extraHeaders2',
      'Created by user Second header for section extraHeaders2',
      'Grading scale',
      'Examination',
      'Other requirements for final grade',
      'Ethical approach',
      'Created by user First header for section extraHeaders3',
      'Created by user Second header for section extraHeaders3',
      'Additional regulations',
      'Created by user First header for section extraHeaders4',
      'Created by user Second header for section extraHeaders4',
    ]

    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('renders main subheader h3 in side-content,', () => {
    const mainContent = screen.getByTestId('preview-side-content')
    const h3Headers = within(mainContent).getAllByRole('heading', { level: 3 })
    expect(h3Headers.length).toBe(10)
    const expectedhds = [
      labelFacts.startdate,
      labelFacts.roundsTitle,
      labelFacts.languageOfInstructionTitle,
      labelFacts.offeredByTitle,
      labelLinks.versionTitle,
      labelLinks.courseMemoPrint,
      'Related information',
      labelContacts.courseCoordinatorTitle,
      labelContacts.teacherTitle,
      labelContacts.examinerTitle,
    ]
    expectedhds.map((h4, index) => expect(h3Headers[index]).toHaveTextContent(h4))
  })

  test('renders main subheader h4 for help text', () => {
    const allH4Headers = screen.getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(2)
    const expectedhds = ['Termin', 'Kursomgång']
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('Get no Other contacts if it renders', async () => {
    const otherContacts = queryByText(labelContacts.otherContactsTitle)
    expect(otherContacts).not.toBeInTheDocument()
  })
  test('Get no Communication with Teacher if it renders', async () => {
    const otherContacts = queryByText(labelContacts.communicationWithTeachersTitle)
    expect(otherContacts).not.toBeInTheDocument()
  })

  test('Get all link names if it renders', async () => {
    const allLinks = getAllByRole('link')
    expect(allLinks.length).toBe(3)
    const expectedLinks = ['Rights and responsibilities', 'Course and examination', `Administrate your studies`]
    expectedLinks.map((link, index) => expect(allLinks[index]).toHaveTextContent(link))
  })
})
