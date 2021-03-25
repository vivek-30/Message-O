import React from 'react'
import Banner from './components/Banner'
import Form from './components/Form'
import Toolbar from './components/Toolbar'
import ChatWindow from './components/majorComponents/ChatWindow'

const App = () => {
  return (
    <div className="container" id="chat-app">
      <Banner />
      <ChatWindow />
      <Toolbar />
      <Form />
    </div>
  )
}

export default App
