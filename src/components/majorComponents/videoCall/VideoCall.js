import React, { useState, useEffect, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { socket } from '../../../client/Chat'
import TakeInput from '../../main/TakeInput'
import Peer from 'simple-peer'

const VideoCall = () => {

	const [ name, setName ] = useState('')
	const [ myID, setMyID ] = useState(null)
	const [ caller, setCaller ] = useState('')
	const [ stream, setStream ] = useState(null)
	const [ userID, setUserID ] = useState(null)
	const [ callEnded, setCallEnded ] = useState(false)
	const [ callerSignal, setCallerSignal ] = useState(null)
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ receivingCall, setReceivingCall ] = useState(false)

	const connectionRef = useRef(null)
	const myVideoRef = useRef(null)
	const userVideoRef = useRef(null)

	useEffect(() => {	

		let isMounted = true

		if (isMounted) {

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

			socket.emit('get-myID')

			socket.on('myID', (ID) => { 
				console.log(ID)
				setMyID(ID)
			})

			socket.on('call-user', ({ name, from, signal }) => {
				setReceivingCall(true)
				setName(name)
				setCaller(from)
				setCallerSignal(signal)
			})
		}

		return () => {
			isMounted = false
		}

	}, [])

	const handleChange = (e) => {
		const { id, value } = e.target
		id === 'myname' ? setName(value) : id === 'userID' ? setUserID(value) : null
	}

	const callUser = () => {

		if(!userID) {
			alert('Can\'t make a call. Please fill an ID first')
			return
		}

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

		peer.on('signal', (data) => {
			socket.emit('call-user', {
				userToCall: userID,
				signalData: data,
				from: myID,
				name: name
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

	const answerCall = () => {

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
				<TakeInput
					iconName="person"
					labelText="Your Name"
					validate={false}
					options={{
						type: 'text',
						id: 'myname',
						handleChange,
						value: name
					}}
				/>

				<CopyToClipboard text={myID}>
					<button className="btn">
						<i className="material-icons left">content_paste</i>
						Copy ID
					</button>
				</CopyToClipboard>

				<TakeInput
					iconName="content_copy"
					labelText="Paste The ID Here"
					validate={false}
					options={{
						type: 'text',
						id: 'userID',
						handleChange,
						value: userID
					}}
				/>

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
					{userID}
				</div>
			</div>
			<div>
				{ receivingCall && !callAccepted ? (
					<div className="caller">
						<h1>{name} is calling...</h1>
						<button className="btn" onClick={answerCall}>Anwer</button>
					</div> ) : null }
			</div>
		</div>
	)
}

export default VideoCall
