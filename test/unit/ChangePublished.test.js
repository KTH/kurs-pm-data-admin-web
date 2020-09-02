import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import i18n from '../../i18n'

import ChangePublished from '../../public/js/app/pages/ChangePublished'
import mockRouterStore from '../mocks/RouterStore'
import mockHistory from '../mocks/history'

const ChangedPublished = () => (
  <StaticRouter>
    <Provider routerStore={mockRouterStore}>
      <ChangePublished />
    </Provider>
  </StaticRouter>
)

describe('Component <ChangedPublished> Edit published course memo', () => {
  test('renders a page', () => {
    render(<ChangedPublished />)
  })
})
