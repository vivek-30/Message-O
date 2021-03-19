import React, { useState } from 'react'
import { Picker } from 'emoji-mart';
import { CustomEmotes } from './CustomEmotes'
import { displayEmoji } from '../main/Form'
import './emojiStyle.css'

const pickerStyle = { 
    top: '8rem',
    right: '3rem',
    width: '15rem',  
    position: 'absolute',
    backgroundColor: '#f1f1f1',
    boxShadow: '2px 2px 8px 1px rgba(0,0,1,0.3)'
}

const Emoji = () => {

    const [ picker, setPicker ] = useState(true)

    return (
        <span className="reactions">
            <Picker
            showPreview={false} 
            showSkinTones={false}
            onSelect={(emoji) => {
                setPicker(!picker)
                displayEmoji(emoji)
            }}
            emojiSize={30} 
            style={{ display: picker ? 'block' : 'none', ...pickerStyle }}
            include={['custom']}
            custom={CustomEmotes} 
            />
        </span>
    )
}

export default Emoji 
