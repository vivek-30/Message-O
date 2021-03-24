import React from 'react'
import Chat from './Chat'
import SignUp from './components/authentication/SignUp'
import SignIn from './components/authentication/SignIn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div className="container" id="chat-app">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
