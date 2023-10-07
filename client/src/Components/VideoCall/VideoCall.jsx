import React, { useEffect, useRef, useState } from 'react'

import Peer from 'simple-peer'
import socket from '../../socketConnection'
import './VideoCall.css'


function VideoCall({socketId,recieverSocketId,recievername}) {
    const [ me, setMe ] = useState(socketId)
	console.log('ME :',me);
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState(recieverSocketId)
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState(recievername)
    const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		}).catch(()=>{
			console.log('Error in accessing webcam');
		})



		socket.on("callUser", (data) => {
			console.log(data);
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = () => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: idToCall,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			console.log('SIGNAL', signal);
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
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

	const leaveCall = () => {
		try {
		  setCallEnded(true);
		  if (connectionRef.current) {
            connectionRef.current.destroy(); 
        }		

	} catch (error) {
		  console.error("Error when ending the call:", error);
		}
	  };
  return (
    <div className='chatpage-width'>
      <div className='videocall-maindiv'>
		<div className='caller-div'>
			<video playsInline autoPlay muted ref={myVideo} />
		</div>
		<div className='reciever-div'>
		{callAccepted && !callEnded ?
			<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}		
		</div>
	  </div>
	  <div className="call-button">
					{callAccepted && !callEnded ? (
						<button  color="secondary" onClick={leaveCall}>
							End Call
						</button>
					) : (
						<button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							call
						</button>
					)}
					{idToCall}
				</div>  
				<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>
				 </div>
  )
}

export default VideoCall
