import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Result from './Result.jsx'
import Detail from './Detail.jsx'
import Home from './Home.jsx'
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: ''
    }
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/items" render={props => <Result {...props} />} />
          <Route exact path="/items/:id" render={props => <Detail {...props} />} />
        </Switch>
      </main>
    )
  }
}
export default Main