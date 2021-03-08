import React, { Component } from 'react'
import Banner from './components/Banner'
import Form from './components/Form'
import Toolbar from './components/Toolbar'
import ChatWindow from './components/majorComponents/ChatWindow'
import Chat from './clientStuff/Chat'

class App extends Component {
  render() {
    return (
      <div className="container" id="chat-app">
        <Chat />
        <Banner />
        <ChatWindow />
        <Toolbar />
        <Form />
      </div>
    )
  }
}

export default App
