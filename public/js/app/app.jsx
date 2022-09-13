import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

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
import EditorsForTest from './components/editors/test/EditorsForTest'

function ErrorFallback({ error, resetErrorBoundary }) {
  console.error(error)
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function appFactory(applicationStore) {
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Routes>
        <Route exact path="/kursinfoadmin/kurs-pm-data/_test_editor" element={<EditorsForTest />} />
        <Route exact path="/kursinfoadmin/kurs-pm-data/published/:courseCode/" element={<ChangePublished />} />
        <Route exact path="/kursinfoadmin/kurs-pm-data/:courseCode/" element={<CreateNewMemo />} />
        <Route exact path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint" element={<MemoEditingContainer />} />
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint/preview"
          element={<PreviewContainer />}
        />
      </Routes>
    </MobxStoreProvider>
  )
}

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // const basename = window.config.proxyPrefixPath.uri
  const applicationStore = createApplicationStore()
  uncompressStoreInPlaceFromDocument(applicationStore)

  // Removed basename because it is causing empty string basename={basename}
  const app = (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        location.reload()
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <BrowserRouter>{appFactory(applicationStore)}</BrowserRouter>
    </ErrorBoundary>
  )

  const domElement = document.getElementById('app')
  // ReactDOM.hydrate(app, domElement)
  ReactDOM.render(app, domElement)
  // ReactDOM.render(<BrowserRouter>{appFactory(applicationStore)}</BrowserRouter>, domElement)
}

_renderOnClientSide()

export default appFactory
