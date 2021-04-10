import React, { useState, useEffect, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { socket } from '../../../client/Chat'
import TakeInput from '../../main/TakeInput'
import Peer from 'simple-peer'

const VideoCall = () => {

	const [name, setName] = useState('')
	const [myID, setMyID] = useState(null)
	const [caller, setCaller] = useState('')
	const [stream, setStream] = useState(null)
	const [userID, setUserID] = useState(null)
	const [callEnded, setCallEnded] = useState(false)
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [receivingCall, setReceivingCall] = useState(false)

	const connectionRef = useRef()
	const myVideoRef = useRef(null)
	const userVideoRef = useRef(null)

	useEffect(() => {

		navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true
		})
			.then((stream) => {
				setStream(stream)
			})
			.catch((err) => {
				console.log('Error in setting video call', err)
			})

		socket.on('me', (id) => {
			setMyID(id)
		})

		socket.on("callUser", ({ name, from, signal }) => {
			setReceivingCall(true)
			setName(name)
			setCaller(from)
			setCallerSignal(signal)
		})



	}, [])

	const handleChange = (e) => {
		const { id, value } = e.target
		id === 'myname' ? setName(value) : id === 'userID' ? setUserID(value) : null
	}

	const callUser = () => {
		if (!userID) {
			alert('can not call please fill a id to call')
			return
		}

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})

		peer.on("stream", (stream) => {

			userVideo.current.srcObject = stream

		})

		socket.on("callAccepted", (signal) => {
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
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
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
					{stream && <video ref={myVideoRef} autoPlay playsInline muted />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ? <video ref={userVideoRef} autoPlay playsInline /> : null}
				</div>
			</div>
			<div className="myId">
				<TakeInput
					iconName="person"
					labelText="Your Name"
					options={{
						type: 'text',
						id: 'myname',
						ref: inputRef,
						handleChange,
						value: name
					}}
				/>

				<CopyToClipboard text={myID}>
					<button>
						<i className="material-icons left">content_paste</i>
						Copy
					</button>
				</CopyToClipboard>

				<TakeInput
					iconName="content_copy"
					labelText="Paste The ID Here"
					options={{
						type: 'text',
						id: 'userID',
						ref: inputRef,
						handleChange,
						value: userID
					}}
				/>

				<div className="call-button">
					{callAccepted && !callEnded ? (
						<button onClick={endCall}>
							End Call
						</button>)
						: (
							<button onClick={callUser}>
								<i className="material-icons">call</i>
							</button>
						)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
					<div className="caller">
						<h1 >{name} is calling...</h1>
						<button onClick={answerCall}>Anwer</button>
					</div>) : null}
			</div>
		</div>
	)
}

export default VideoCall
