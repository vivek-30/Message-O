import React, { useState, useRef } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import Emoji from '../emoji-picker/Emoji'
import { useHistory } from 'react-router-dom'
import { customAlert, setBackground } from '../../client/helperFunctions'

const Toolbar = () => {

    const [ picker, setPicker ] = useState(false)

    const history = useHistory()
    const fileRef = useRef(null)

    const handleFileInput = () => {
        var value = fileRef.current.files[0]
        var url = URL.createObjectURL(value)
        localStorage.setItem('bg-wallpaper', JSON.stringify(url))
        setBackground(url)
    }

    const removeWallpaper = () => {
        if(localStorage.getItem('bg-wallpaper') !== null) {
            let chatWindow = document.getElementById('chat-window')
            chatWindow.style.background = '#f2f2f2'
            localStorage.removeItem('bg-wallpaper')
        }
    }

    const Logout = () => {
        fetch('http://127.0.0.1:4000/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => {
            response.ok ? history.push('/SignIn') : customAlert('There is a problem in server please try again later')
        })
        .catch((err) => {
            console.log('Error in Log out', err)
        })
    }

    return (
        <>
            { picker && (<Emoji />) }
            <div className="grey darken-4" id="features">
                <span onClick={() => { fileRef.current.click() }}>
                    <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={handleFileInput} />
                    <i className="material-icons small blue-text text-darken-2">wallpaper</i>
                </span>
                <span><i className="material-icons small blue-text text-darken-2">video_call</i></span>
                <span onClick={Logout}>
                    <i className="material-icons small blue-text text-darken-2">home</i>
                </span>
                <span onClick={() => { setPicker(!picker) }}>
                    <i className="material-icons small blue-text text-darken-2">insert_emoticon</i>
                </span>
                <span onClick={removeWallpaper}><i className="material-icons small blue-text text-darken-2">more_horiz</i></span>
            </div>
        </>
    )
}

export default Toolbar
