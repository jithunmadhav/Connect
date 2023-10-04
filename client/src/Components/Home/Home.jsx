import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import ChatList from '../ChatList/ChatList'
import ChatPage from '../ChatPage/ChatPage'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import { io } from 'socket.io-client'
const socket=io.connect('ws://localhost:4000')

function Home() {
  // const socket=useRef()
  const [userdata, setuserdata] = useState('')
  const [chatId, setchatId] = useState('')
  const [sendMessage, setsendMessage] = useState('')
  const [activeUsers, setactiveUsers] = useState([])
  const [recievedMessages, setrecievedMessages] = useState('')
  const chatListData=(data)=>{
    setuserdata(data)
  }

  const {user} =useSelector(state=>state)
  const senderId=user?.details?._id;
  const recieverId=userdata?._id;
if(recieverId){
  axios.get('/chatId',{params:{senderId,recieverId}}).then((response)=>{
    setchatId(response.data.chatId)
  }).catch((error)=>{
    console.log(error);
  })
}

useEffect(() => {
// socket.current=io('ws://localhost:4000')
socket.on('connect', () => {
  console.log('WebSocket connected successfully!');
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});
socket.emit("new-user-add",senderId)
socket.on('get-user',(activeusers)=>{
  setactiveUsers(activeusers)
})

return ()=>{
  socket.emit('disconnection'); 
}

}, [user])

//sendMessage
useEffect(() => {
  console.log('send-message',sendMessage);
if(sendMessage!==null && sendMessage!==""){
  let data={recieverId:recieverId,text:sendMessage,senderId:senderId,chatId:chatId}
  socket.emit('send-message',data)
}
}, [sendMessage])
console.log("ONLINE : ",activeUsers);
//Recieve-message
useEffect(()=>{
  socket.on('recieve',(response)=>{
console.log(response);
setrecievedMessages(response)
  })
},[])
// console.log("RECIEVED_MESSAGES",recievedMessages);
  return (
  <>
  <div className='chat-width'>
  <ChatList data={chatListData}
  activeUsers={activeUsers}
  />
  <ChatPage data={userdata}
  chatId={chatId}
  setsendMessage={setsendMessage}
  recievedMessages={recievedMessages}
  />
  </div>
  </>
  )
}

export default Home


// import React,{useEffect} from 'react'
// import { useRef } from 'react';
// import { useState } from 'react';

// function Home() {
//   const [stream, setstream] = useState('')
//   const myvideo=useRef()
//   useEffect(() => {
//          navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
//            setstream(stream)
//            myvideo.current.srcObject=stream;
//            console.log(myvideo);
//          })
//   }, [])
//   return (
//     <div>
//       <video playsInline ref={myvideo} autoPlay style={{width:'100%',height:'100%'}} />
//     </div>
//   )
// }

// export default Home