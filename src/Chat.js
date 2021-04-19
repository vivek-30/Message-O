import React, { useState, useEffect } from 'react'
import Banner from './components/main/Banner'
import Form from './components/main/Form'
import ChatWindow from './components/majorComponents/ChatWindow'

const Chat = () => {

    let currentTheme = localStorage.getItem('theme') || 'light'

    const [ theme, setTheme ] = useState(currentTheme)

    useEffect(() => {

        let isMounted = true

        if(isMounted) {
            var Body = document.body
            if(theme === 'dark') {
                Body.classList.add('dark-bg')
            }
            else {
                Body.classList.remove('dark-bg')
            }
        }

        return () => {
            isMounted = false
            Body.classList.remove('dark-bg')
        }
        
    }, [theme])

    return (
        <>
            <Banner theme={theme} />
            <ChatWindow theme={theme} setTheme={setTheme} />
            <Form theme={theme} />
        </>
    )
}

export default Chat
