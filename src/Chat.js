import React from 'react'
import Banner from './components/main/Banner'
import ToolBar from './components/main/Toolbar'
import Form from './components/main/Form'
import ChatWindow from './components/majorComponents/ChatWindow'

const Chat = () => {
    return (
        <>
            <Banner />
            <ChatWindow />
            <ToolBar />
            <Form />
        </>
    )
}

export default Chat
