import React,{ useState, useEffect, useRef } from 'react'
import { socket } from '../../clientStuff/Chat'
import Message from '../../clientStuff/Message'

const ChatWindow = () => {

    const [ data, setData ] = useState([])
    const [ user, setUser ] = useState('')
    const [ CSS, setCSS ] = useState({
        backgroundColor: '#c2c2c2',
        padding: '8px 20px'
    })

    const bottomScrollRef = useRef(null)

    useEffect(() => {
        socket.on('chat',(newData) => {
            setUser('')
            setData(data => [ ...data, newData ])
            setCSS({
                ...CSS,
                display: 'none',
            })
        })

        socket.on('status',(user) => {
            setCSS({
                ...CSS,
                display: 'block',
            })
            setUser(user)
        })
    }, [])

    useEffect(() => {
        bottomScrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [data])
    
    return (
        <div id="chat-window">
            <div id="display">
                <Message data={data} />
                <div ref={bottomScrollRef}></div>
            </div>
            <div id="status-bar" className="teal-text text-darken-2" style={CSS} >
                <em>{user} is typing ...</em>
            </div>
        </div>
    )
}

export default ChatWindow
