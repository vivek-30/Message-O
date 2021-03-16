import React,{ useState, useEffect, useRef } from 'react'
import { socket } from '../../clientStuff/Chat'
import Message from '../../clientStuff/Message'
import chatTone from '../../../public/chat_tone.mp3'

const ChatWindow = () => {

    const [ data, setData ] = useState([])
    const [ user, setUser ] = useState('')
    const [ CSS, setCSS ] = useState({
        backgroundColor: '#c2c2c2',
        padding: '8px 20px'
    })

    const bottomScrollRef = useRef(null)
    const audioRef = useRef(null)

    useEffect(() => {

        socket.on('myMsg',(newData) => {
            setData(data => [ ...data, newData ])
        })

        socket.on('chat',(newData) => {
            setCSS({
                ...CSS,
                display: 'none',
            })
            setUser('')
            setData(data => [ ...data, newData ])
            audioRef.current.muted = false
            audioRef.current.play()
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
            <audio src={chatTone} ref={audioRef} muted></audio>
        </div>
    )
}

export default ChatWindow
