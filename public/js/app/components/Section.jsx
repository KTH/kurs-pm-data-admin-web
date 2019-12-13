import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route } from 'react-router-dom'

import { contents } from '../util/exampleData'

@inject(['routerStore'])
@observer
class Section extends Component {
  render = () => (
    <Route
      render={({ location }) => {
        const section = contents.find(
          content => content.level === 'section' && content.id === location.hash.substr(1)
        )
        return (
          section && (
            <>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </>
          )
        )
      }}
    />
  )
}

export default Section
