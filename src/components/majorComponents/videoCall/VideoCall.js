import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../../client/Chat'
import { useParams, useHistory } from 'react-router-dom'
import { customAlert } from '../../../client/helperFunctions'
import Peer from 'simple-peer'
import './videoCall.css'

export var answerCall = null
export var callUser = null

const VideoCall = () => {

	const [ myID, setMyID ] = useState(null)
	const [ person, setPerson ] = useState('')
	const [ caller, setCaller ] = useState('')
	const [ stream, setStream ] = useState(null)
	const [ isHomeButton, setIsHomeButton ] = useState(false)
	const [ isDisabled, setIsDisabled ] = useState(false)
	const [ callerSignal, setCallerSignal ] = useState(null)
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ receivingCall, setReceivingCall ] = useState(false)

	const params = useParams()
	const history = useHistory()

	const connectionRef = useRef(null)
	const myVideoRef = useRef(null)
	const userVideoRef = useRef(null)

	var callEnded = false

	useEffect(() => {

		let isMounted = true

		if (isMounted) {

			socket.emit('get-myID')
			socket.on('myID', (id) => setMyID(id))
			
			navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})
			.then((stream) => {
				setStream(stream)
				myVideoRef.current.srcObject = stream
			})
			.catch((err) => {
				console.log('Error in setting video call', err)
			})

			socket.on('call-user', ({ name, from, signal }) => {
				setReceivingCall(true)
				setPerson(name)
				setCaller(from)
				setCallerSignal(signal)
			})

			socket.on('call-rejected', (user) => {
				customAlert(`${user} declined your video call.`)
				setIsHomeButton(true)
			})
		}

		return () => {
			socket.emit('stop-notifying')
			stream?.getTracks().forEach(function(track) {
				track.stop()
			})
			isMounted = false
		}

	}, [])

	callUser = (id = null) => {

		const ID = id || params.id

		if(!ID) {
			alert('Something Went Wrong. Can\'t make a call.')
			return
		}

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

		peer.on('signal', (data) => {
			socket.emit('call-user', {
				userToCall: ID,
				signalData: data,
				from: myID
			})
		})

		peer.on('stream', (stream) => {
			userVideoRef.current ? userVideoRef.current.srcObject = stream 
			: console.log('Can not set stream on empty element')
		})

		socket.on('call-accepted', (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	answerCall = () => {

		setCallAccepted(true)

		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})

		peer.on('signal', (data) => {
			socket.emit('answer-call', { 
				signal: data, 
				to: caller 
			})
		})

		peer.on('stream', (stream) => {
			userVideoRef.current ? userVideoRef.current.srcObject = stream 
			: console.log('Can not set stream on empty element')
		})

		callerSignal ? peer.signal(callerSignal) : console.log('No callerSignal present.')
		connectionRef.current = peer
	}

	const endCall = () => {
		stream?.getTracks().forEach(function(track) {
			track.stop()
		})
		connectionRef.current?.destroy()
		history.push('/chat')
	}

	return (
		<div className="section row" id="video-container">
			<div className="col s12 m12 l12 center">
				{ receivingCall && !callAccepted ? (
					<em className="flow-text pink-text text-darken-5">{person} is calling...</em>
				) : null }
			</div>
			<div className="col s12 m12 l12">
				<div className="row">
					<span className="video col s12 m5 l5">
						{ stream && <video ref={myVideoRef} playsInline autoPlay muted /> }
					</span>
					<span className="video col s12 m5 l5">
						{ callAccepted && !callEnded ? ( <video ref={userVideoRef} playsInline autoPlay muted /> )
						: null }
					</span>
				</div>
			</div>
			<div id="call-handlers" className="col s12 m12 l12 center">
				{ isHomeButton ? (
					<button className="btn-large grey lighten-4 orange-text center" onClick={endCall}>
						<i className="material-icons left">home</i>
						Go Home
					</button>
				) : callAccepted && !callEnded ? (
					<button className="btn-large red darken-1 center" onClick={endCall}>
						<i className="material-icons left">call_end</i>
						End Call
					</button> 
				) : receivingCall && !callAccepted ? (
					<button className="btn-large green lighten-1 center" onClick={() => answerCall()}>
						<i className="material-icons left">call</i>
						Anwer Call
					</button>
				) : (
					<button className={`btn-large blue darken-1 center ${isDisabled ? 'disabled' : ''}`} onClick={() => {
						if(!isDisabled) {
							setIsDisabled(true)
							callUser()
						}
					}}>
						<i className="material-icons left">call</i>
						{isDisabled ? 'Calling ...' : 'Make Call'}
					</button>
				) }
			</div>
		</div>
	)
}

export default VideoCall
