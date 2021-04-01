import React, { useState } from 'react'
import Banner from './components/main/Banner'
import Form from './components/main/Form'
import ChatWindow from './components/majorComponents/ChatWindow'

const Chat = () => {
    const [ theme, setTheme ] = useState('light')
    return (
        <>
            <Banner theme={theme} />
            <ChatWindow theme={theme} setTheme={setTheme} />
            <Form theme={theme} />
        </>
    )
}

export default Chat
