import React, { Component } from 'react'
import Services from './Services'
import LoginScreen from '../screens/Login'
import FeedbackScreen from '../screens/Feedback'
import NavBar from './NavBar'
import '../styles/App.css'
import { Route, Switch, withRouter } from 'react-router-dom'
import * as Routes from "./NavBar/routes"; 
class App extends Component {
  render() {
    return (
      <main>
        <NavBar/>
        <Switch>
          <Route exact path={Routes.HOME} component={LoginScreen} />
          <Route exact path={Routes.LOGIN} component={LoginScreen} />  
          <Route exact path={Routes.SERVICES} component={Services} />
          <Route exact path={Routes.FEEDBACK} component={FeedbackScreen} />

        </Switch>
      </main>
    )
  }
}

export default withRouter(App)