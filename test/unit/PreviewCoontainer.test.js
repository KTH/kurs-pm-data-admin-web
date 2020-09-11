import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import i18n from '../../i18n'

import PreviewContainer from '../../public/js/app/pages/PreviewContainer'

const PreviewPublishedMemo = ({ memoLang = 'en', userLang = 'en', ...rest }) => {
  const updatedRouterStore = {
    ...mockRouterStoreWithChosenMemo(
      'DRAFT_OF_PUBLISHED',
      'filledInAndVisible',
      memoLang,
      userLang
    ),
    ...{
      memoDatas: [
        {
          semester: '',
          ladokRoundIds: [],
          memoCommonLangAbbr: ''
        }
      ],
      activeMemoEndPoint: (id) => false,
      roundIds: [],
      memoData: {
        courseTitle: '',
        visibleInMemo: {}
      }
    }
  }
  return (
    <StaticRouter>
      <Provider routerStore={updatedRouterStore}>
        <PreviewContainer {...rest} />
      </Provider>
    </StaticRouter>
  )
}

describe('Component <PreviewContainer>', () => {
  test('renders a course memo', () => {
    render(
      <Provider routerStore={routerStore}>
        <PreviewPublishedMemo />
      </Provider>
    )
  })
})
