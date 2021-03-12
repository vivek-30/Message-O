import React, { useState } from 'react'
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { displayEmoji } from './Form';

const pickerStyle = { 
    top: '6rem', 
    right: '0.7rem', 
    width: '15rem', 
    height: '27rem', 
    backgroundColor: '#333' 
}

const Toolbar = () => {

    const [ picker, setPicker ] = useState(false)

    return (
        <>
            <span>
                <Picker
                showPreview={false} 
                showSkinTones={false}
                onSelect={(emoji) => {
                    setPicker(!picker)
                    displayEmoji(emoji)
                }}
                emojiSize={30} 
                style={{ display: picker ? 'block' : 'none', position: 'absolute', ...pickerStyle }} 
                />
            </span>
            <div className="grey darken-4" id="features">
                <span><i className="material-icons small blue-text text-darken-2">wallpaper</i></span>
                <span><i className="material-icons small blue-text text-darken-2">video_call</i></span>
                <span><a href="/"><i className="material-icons small blue-text text-darken-2">home</i></a></span>
                <span onClick={() => { setPicker(!picker) }}>
                    <i className="material-icons small blue-text text-darken-2">insert_emoticon</i>
                </span>
                <span><i className="material-icons small blue-text text-darken-2">more_horiz</i></span>
            </div>
        </>
    )
}

export default Toolbar
