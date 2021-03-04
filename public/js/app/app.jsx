import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { StaticRouter } from 'react-router'
// import { Provider } from 'mobx-react'

// Sass
import '../../css/node-web.scss'

// Store
// import RouterStore from './stores/RouterStore'
import { MobxStoreProvider, uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

// Pages
import ChangePublished from './pages/ChangePublished'
import CreateNewMemo from './pages/CreateNewMemo'
// import MemoContainer from './pages/MemoContainer'
// import MemoEditingContainer from './pages/MemoEditingContainer'
import PreviewContainer from './pages/PreviewContainer'

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // const basename = window.config.proxyPrefixPath.uri
  // console.log('basename', basename)
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
        {/* <Route exact path="/kursinfoadmin/kurs-pm-data/v1/:courseCode/:memoEndPoint" component={MemoContainer} />
        <Route exact path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint" component={MemoEditingContainer} />*/}
        <Route
          exact
          path="/kursinfoadmin/kurs-pm-data/:courseCode/:memoEndPoint/preview"
          component={PreviewContainer}
        />
      </Switch>
    </MobxStoreProvider>
  )
}

// function staticRender(context, location) {
//   return (
//     <StaticRouter location={location} context={context}>
//       {appFactory()}
//     </StaticRouter>
//   )
// }

// if (typeof window !== 'undefined') {
//   ReactDOM.render(<BrowserRouter>{appFactory()}</BrowserRouter>, document.getElementById('app'))
// }

export default appFactory
