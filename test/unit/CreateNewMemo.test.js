import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import CreateNewMemo from '../../public/js/app/pages/CreateNewMemo'
import { ActionModalButton, PageTitle, ProgressBar } from '@kth/kth-kip-style-react-components'

describe('Component <CreateNewMemo> Create and publish course memo', () => {
  test('renders a page', () => {
    render(<CreateNewMemo />)
  })

  // test('renders a course header with heading h1', () => {
  //   const courseMemoName = 'testHeader'
  //   render(<CreateNewMemo courseMemoName={courseMemoName} />)
  //   expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(courseMemoName)
  // })
})
