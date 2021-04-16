import React, { useState, useEffect, useRef } from 'react'
import { socket } from '../../../client/Chat'
import { useParams } from 'react-router-dom'
import Peer from 'simple-peer'

export var answerCall = null
export var callRejected = null
export var callUser = null

const VideoCall = () => {

	const [ myID, setMyID ] = useState(null)
	const [ person, setPerson ] = useState('')
	const [ caller, setCaller ] = useState('')
	const [ stream, setStream ] = useState(null)
	const [ callEnded, setCallEnded ] = useState(false)
	const [ callerSignal, setCallerSignal ] = useState(null)
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ receivingCall, setReceivingCall ] = useState(false)

	const params = useParams()
	const connectionRef = useRef(null)
	const myVideoRef = useRef(null)
	const userVideoRef = useRef(null)

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
		}

		return () => {
			socket.emit('stop-notifying')
			stream?.getTracks()?.forEach(function(track) {
				track.stop()
			})
			isMounted = false
		}

	}, [])

	callRejected = () => {
		console.log('callReject using video component')
	}

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
			userVideoRef.current.srcObject = stream
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
			userVideoRef.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const endCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<div className="container section">
			<div id="video-container">
				<div className="video">
					{ stream && <video ref={myVideoRef} style={{ width: '300px' }} autoPlay playsInline muted /> }
				</div>
				<div className="video">
					{ callAccepted && !callEnded ? ( <video ref={userVideoRef} style={{ width: '300px' }} autoPlay playsInline /> )
					: null }
				</div>
			</div>
			<div className="myId">
				<div className="call-button">
					{ callAccepted && !callEnded ? (
						<button className="btn" onClick={endCall}>
							End Call
						</button> )
						: (
							<button className="btn" onClick={callUser}>
								<i className="material-icons">call</i>
							</button>
						) }
				</div>
			</div>
			<div>
				{ receivingCall && !callAccepted ? (
					<div>
						<h4>{person} is calling...</h4>
						<button className="btn" onClick={answerCall}>Anwer</button>
					</div> ) : null }
			</div>
		</div>
	)
}

export default VideoCall
