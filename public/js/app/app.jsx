import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import { Provider } from 'mobx-react'

// Sass
import '../../css/node-web.scss'

// Store
import RouterStore from './stores/RouterStore'

// Pages
import ChangePublished from './pages/ChangePublished'
import CreateNewMemo from './pages/CreateNewMemo'
import MemoContainer from './pages/MemoContainer'
import MemoEditingContainer from './pages/MemoEditingContainer'
import PreviewContainer from './pages/PreviewContainer'

function appFactory() {
  const routerStore = new RouterStore()

  if (typeof window !== 'undefined') {
    routerStore.initializeStore('routerStore')
  }

  return (
    <Provider routerStore={routerStore}>
      <Switch>
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/published/:courseCode/"
          component={ChangePublished}
        />
        <Route exact path="/kursinfoadmin/kurs-pm-data/:courseCode/" component={CreateNewMemo} />
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/v1/:courseCode/:memoEndPoint"
          component={MemoContainer}
        />
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint"
          component={MemoEditingContainer}
        />
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint/preview"
          component={PreviewContainer}
        />
      </Switch>
    </Provider>
  )
}

function staticRender(context, location) {
  return (
    <StaticRouter location={location} context={context}>
      {appFactory()}
    </StaticRouter>
  )
}

if (typeof window !== 'undefined') {
  ReactDOM.render(<BrowserRouter>{appFactory()}</BrowserRouter>, document.getElementById('app'))
}

export { appFactory, staticRender }
