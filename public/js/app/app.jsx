import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Sass
import '../../css/node-web.scss'

// Store
import { MobxStoreProvider, uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

// Pages
import ChangePublished from './pages/ChangePublished'
import CreateNewMemo from './pages/CreateNewMemo'
import MemoEditingContainer from './pages/MemoEditingContainer'
import PreviewContainer from './pages/PreviewContainer'

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // const basename = window.config.proxyPrefixPath.uri
  const applicationStore = createApplicationStore()
  uncompressStoreInPlaceFromDocument(applicationStore)

  // Removed basename because it is causing empty string basename={basename}
  const app = <BrowserRouter>{appFactory(applicationStore)}</BrowserRouter>
  const domElement = document.getElementById('app')
  ReactDOM.hydrate(app, domElement)
  // ReactDOM.render(<BrowserRouter>{appFactory(applicationStore)}</BrowserRouter>, domElement)
}

_renderOnClientSide()

function appFactory(applicationStore) {
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Switch>
        <Route exact path="/kursinfoadmin/kurs-pm-data/published/:courseCode/" component={ChangePublished} />
        <Route exact path="/kursinfoadmin/kurs-pm-data/:courseCode/" component={CreateNewMemo} />
        <Route exact path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint" component={MemoEditingContainer} />
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint/preview"
          component={PreviewContainer}
        />
      </Switch>
    </MobxStoreProvider>
  )
}

export default appFactory
