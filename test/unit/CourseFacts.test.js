import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CourseFacts from '../../public/js/app/components/preview/CourseFacts'

import i18n from '../../i18n'

const { courseFactsLabels } = i18n.messages[0]

const TEST_MEMO_DATA_1_ROUND = {
  memoName: 'CDEPR1 m.fl. (Startdatum 2020-08-24, Svenska)',
  languageOfInstructions: '',
  departmentName: '',
  applicationCodes: ['1'],
  semester: '20202',
}

const TEST_MEMO_DATA_2_ROUNDS = {
  memoName: 'CDEPR1 m.fl. (Startdatum 2020-08-24, Svenska), CMEDT1 (Startdatum 2020-10-26, Svenska)',
  languageOfInstructions: 'Svenska',
  departmentName: 'SCI/Matematik',
  applicationCodes: ['1', '2'],
  semester: '20202',
}

const CHECK_LABEL = {
  roundFacts: 'Round Facts',
  offeredByTitle: 'Offered By',
  languageOfInstructionTitle: 'Language Of Instruction',
  roundsTitle: 'Course offering',
  mandatoryFieldMissing: 'Missing mandatory information',
  startdate: 'Start date',
}

describe('Component <CourseFacts>', () => {
  test('renders a facts section', done => {
    render(<CourseFacts labels={courseFactsLabels} memoData={TEST_MEMO_DATA_1_ROUND} />)
    done()
  })

  test('renders Missing mandatory information if field is empty ', done => {
    render(<CourseFacts labels={courseFactsLabels} memoData={TEST_MEMO_DATA_1_ROUND} />)
    const missing = screen.getAllByText('Missing mandatory information')
    expect(missing.length).toBe(3)
    done()
  })

  test('renders course memo name as one round ', done => {
    render(<CourseFacts labels={courseFactsLabels} memoData={TEST_MEMO_DATA_1_ROUND} />)
    const round_1 = screen.getByText('CDEPR1 HT 2020-1')
    expect(round_1).toBeInTheDocument()
    done()
  })

  test('renders course memo name as two rounds', done => {
    render(<CourseFacts labels={courseFactsLabels} memoData={TEST_MEMO_DATA_2_ROUNDS} />)
    const round_1 = screen.getByText('CDEPR1 HT 2020-1')
    expect(round_1).toBeInTheDocument()
    const round_2 = screen.getByText('CMEDT1 HT 2020-2')
    expect(round_2).toBeInTheDocument()
    done()
  })
})
