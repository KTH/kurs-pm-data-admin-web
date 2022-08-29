import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import i18n from '../../i18n'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../../public/js/app/mobx'

import translations from '../mocks/translations'
import PreviewContainer from '../../public/js/app/pages/PreviewContainer'
import mockApplicationStoreWithChosenMemo from '../mocks/AppStoreWithChosenMemo'
import generatedExtraHeaders from '../mocks/memoData/generateExtraHeaders'
import generatedStandardMemoData from '../mocks/memoData/generateStandardMemoData'

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText, queryByText } = screen

const PreviewPublishedMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedApplicationStore = {
    ...mockApplicationStoreWithChosenMemo('DRAFT_OF_PUBLISHED', 'filledInAndInvisible', memoLang, userLang),
    koppsFreshData: {
      courseMainSubjects: '',
    },
    browserConfig: { imageStorageUri: 'localhost://' },
    imageFromAdmin: '',
    noMemoData: () => false,
    memoDatas: [],
    activeMemoEndPoint: id => false,
    roundIds: [],
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

describe('Component <PreviewContainer> to display filled in draft of published memo. All memo data is filled in and only optional data must be invisible. memoLang="en" userLang="sv"', () => {
  beforeEach(() => {
    render(<PreviewPublishedMemo memoLang="en" userLang="sv" />)
  })
  test('renders a course memo', done => {
    done()
  })

  test('renders main header H3 (content) in user lang(sv),  and memo only extra sections headers in memo lang(en)', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    const { contentAndOutcomes, prep, reqToFinal, extra, contacts } = sectionsLabels
    expect(allH3Headers.length).toBe(8) //29
    // const expectedh3ds = orderedFilledInAndVisible
    const expectedh3ds = [
      'Created by user First header for section extraHeaders1',
      'Created by user Second header for section extraHeaders1',
      'Created by user First header for section extraHeaders2',
      'Created by user Second header for section extraHeaders2',
      'Created by user First header for section extraHeaders3',
      'Created by user Second header for section extraHeaders3',
      'Created by user First header for section extraHeaders4',
      'Created by user Second header for section extraHeaders4',
    ]

    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('renders main subheader h4 (course name), h4 for help text and other menu h4 (menu headers), ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(12) //16
    const expectedhds = [
      'Termin',
      'Kursomgång',
      'EF1111 Project in Plasma Physics 9.0 credits',
      labelFacts.offeredByTitle,
      labelFacts.languageOfInstructionTitle,
      labelFacts.roundsTitle,
      labelLinks.versionTitle,
      labelLinks.courseMemoPrint,
      'Related information',
      labelContacts.courseCoordinatorTitle,
      labelContacts.teacherTitle,
      labelContacts.examinerTitle,
    ]
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
  test('Get no Teacher assistans if it renders', async () => {
    const otherContacts = queryByText(labelContacts.teacherAssistantsTitle)
    expect(otherContacts).not.toBeInTheDocument()
  })

  test('Get all link names if it renders', async () => {
    const allLinks = getAllByRole('link')
    expect(allLinks.length).toBe(4)
    const expectedLinks = [
      labelLinks.courseMemoArchiveLabel,
      'Rights and responsibilities',
      'Course and examination',
      `Administrate your studies`,
    ]
    expectedLinks.map((link, index) => expect(allLinks[index]).toHaveTextContent(link))
  })

  test('Get Admin link name ', async () => {
    const adminLinkName = getByText('Administer About course')
    expect(adminLinkName).toBeInTheDocument()
  })
})
