import React, { Component } from 'react'

class Toolbar extends Component {
    render() {
        return (
            <div className="grey darken-4" id="features">
                <span id="home"><a href="/"><i className="material-icons small blue-text text-darken-2">home</i></a></span>
                <span id="file-input-icon">
                    <input type="file" id="file-input" accept="video/*,audio/*,image/*,.doc,.png,.jpeg,jpg,.pdf,.gif" multiple />
                    <i className="material-icons small blue-text text-darken-2">attach_file</i>
                </span>
                <span id="camera"><i className="material-icons small blue-text text-darken-2">camera</i></span>
                <span id="location"><i className="material-icons small blue-text text-darken-2">location_on</i></span>
                <span id="microphone"><i className="material-icons small blue-text text-darken-2">mic</i></span>
                <span id="webcam"><i className="material-icons small blue-text text-darken-2">video_call</i></span>
                <span id="play-pause"><i className="material-icons small blue-text text-darken-2">play_arrow</i></span>
            </div>
        )
    }
}

export default Toolbar
