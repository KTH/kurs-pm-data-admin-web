import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route } from 'react-router-dom'

import EditorPerTitle from './Editor'

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

        if (!section) return null

        if (section.editor)
          return (
            <>
              <h2>{section.title}</h2>
              <EditorPerTitle id={section.id} onEditorChange={this.handleEditorChange} />
            </>
          )

        const { koppsFreshData } = this.props.routerStore
        const text = section.koppsId ? (
          // eslint-disable-next-line react/no-danger
          <p dangerouslySetInnerHTML={{ __html: koppsFreshData[section.koppsId] }} />
        ) : (
          <p>{section.text}</p>
        )

        return (
          <>
            <h2>{section.title}</h2>

            <p>{text}</p>
          </>
        )
      }}
    />
  )
}

export default Section
