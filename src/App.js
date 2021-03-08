import React, { Component } from 'react'
import Banner from './components/Banner'
import Form from './components/Form'
import Toolbar from './components/Toolbar'
import ChatWindow from './components/majorComponents/ChatWindow'

class App extends Component {
  render() {
    return (
      <div className="container" id="chat-app">
        <Banner />
        <ChatWindow />
        <Toolbar />
        <Form />
      </div>
    )
  }
}

export default App
