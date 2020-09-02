import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'

import CreateNewMemo from '../../public/js/app/pages/CreateNewMemo'
import mockRouterStore from '../mocks/RouterStore'
import mockHistory from '../mocks/history'

const CreateNewMemoPage = () => (
  <StaticRouter>
    <Provider routerStore={mockRouterStore}>
      <CreateNewMemo />
    </Provider>
  </StaticRouter>
)

describe('Component <CreateNewMemo> Create and publish course memo', () => {
  test('renders without props', () => {
    render(<CreateNewMemoPage />)
  })
})
