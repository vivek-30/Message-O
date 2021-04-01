import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../client/Chat'
import Message from '../../client/Message'
import chatTone from '../../../public/chat_tone.mp3'
import { setWallpaper } from '../../client/helperFunctions'
import DropDown from '../../client/dropdown/DropDown'
import ToolBar from '../main/Toolbar'

const ChatWindow = ({ theme, setTheme }) => {

    const [ data, setData ] = useState([])
    const [ user, setUser ] = useState('')
    const [ options, setOptions ] = useState(false)
    const [ CSS, setCSS ] = useState({
        backgroundColor: '#c2c2c2', 
        padding: '8px 20px'
    })

    const bottomScrollRef = useRef(null)
    const audioRef = useRef(null)

    useEffect(() => {

        let isMounted = true
    
        if(isMounted) {

            setWallpaper()

            socket.on('myMsg', (newData) => {
                setData(data => [ ...data, newData ])
            })

            socket.on('chat', (newData) => {
                setCSS({
                    ...CSS, 
                    display: 'none'
                })
                setUser('')
                setData(data => [ ...data, newData ])

                if(audioRef.current){
                    audioRef.current.muted = false
                    audioRef.current?.play()
                }
            })

            socket.on('status', (user) => {
                setCSS({
                    ...CSS,
                    display: 'block'
                })
                setUser(user)
            })
        }

        return () => {
            isMounted = false
        }
        
    }, [])

    useEffect(() => {
        bottomScrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [data])

    return (
        <>
            <div style={{ backgroundColor: '#f2f2f2', marginTop: '0.4rem' }} id="outer-chat-box">
                <div id="chat-window">
                    <div id="display">
                        <Message data={data} theme={theme} />
                        <div ref={bottomScrollRef}></div>
                    </div>
                    <div id="status-bar" className="teal-text text-darken-2" style={CSS} >
                        <em>{user} is typing ...</em>
                    </div>
                    <audio src={chatTone} ref={audioRef} muted></audio>
                </div>
                { options && <DropDown theme={theme} setOptions={setOptions} setData={setData} setTheme={setTheme} /> }
            </div>
            <ToolBar setOptions={setOptions} theme={theme} />
        </>
    )
}

export default ChatWindow
