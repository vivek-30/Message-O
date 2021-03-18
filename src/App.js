import React from 'react'
import Banner from './components/Banner'
import Form from './components/Form'
import Toolbar from './components/Toolbar'
import ChatWindow from './components/majorComponents/ChatWindow'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import SignUp from './components/authentication/SignUp'
import NavBar from './components/authentication/NavBar'
import SignIn from './components/authentication/SignIn'

const App = () => {
  return (
    <div className="container" id="chat-app">

      <Router>
      <NavBar />
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/SignIn">
              <SignIn />
            <Link to="/chat" className="center">go</Link>
          </Route>
          <Route path="/chat">
            <Banner />
            <ChatWindow />
            <Toolbar />
            <Form />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
