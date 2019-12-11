import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'

@inject(['routerStore'])
@observer
class Section extends Component {
  render() {
    return (
      <Switch>
        <Route path="/kursinfoadmin/kurs-pm-data/:courseCode/:semester/1">
          <h2>First Section</h2>
        </Route>
        <Route path="/kursinfoadmin/kurs-pm-data/:courseCode/:semester/2">
          <h2>Second Section</h2>
        </Route>
        <Route path="/kursinfoadmin/kurs-pm-data/:courseCode/:semester/">
          <h2>First Page</h2>
        </Route>
      </Switch>
    )
  }
}
export default Section
