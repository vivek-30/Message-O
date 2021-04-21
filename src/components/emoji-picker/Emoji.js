import React, { useState } from 'react'
import { Picker } from 'emoji-mart'
import { displayEmoji } from '../main/Form'
import './emojiStyle.css'

const pickerStyle = { 
    top: '8rem',
    right: '3rem',
    width: '18rem',  
    position: 'absolute'
}

const lightThemePicker = {
    backgroundColor: '#eee',
    boxShadow: '2px 2px 8px 1px rgba(0,0,1,0.3)'
}

const darkThemePicker = {
    border: '0px',
    borderRadius: '7px',
    background: '#222',
    boxShadow:  '2px 2px 8px 1px rgba(1,5,2,0.9)'
}

const Emoji = ({ theme = 'light' }) => {

    let currentTheme = theme === 'light' ? lightThemePicker : darkThemePicker

    const [ picker, setPicker ] = useState(true)

    return (
        <span className="reactions">
            <Picker
            showPreview={false} 
            recent={['']}
            showSkinTones={false}
            onSelect={(emoji) => {
                setPicker(!picker)
                displayEmoji(emoji)
            }}
            emojiSize={30} 
            style={{ display: picker ? 'block' : 'none', ...pickerStyle, ...currentTheme }}
            />
        </span>
    )
}

export default Emoji 
