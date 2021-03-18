import React, { useState } from 'react'
import 'emoji-mart/css/emoji-mart.css';
import Emoji from './emoji-picker/Emoji'

const Toolbar = () => {

    const [ picker, setPicker ] = useState(false)

    return (
        <>
            { picker && (<Emoji />) }
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
