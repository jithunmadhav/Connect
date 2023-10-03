import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import ChatList from '../ChatList/ChatList'
import ChatPage from '../ChatPage/ChatPage'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import { io } from 'socket.io-client'

function Home() {
  const socket=useRef()
  const [userdata, setuserdata] = useState('')
  const [chatId, setchatId] = useState('')
  const [sendMessage, setsendMessage] = useState('')
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
socket.current=io('ws://localhost:4000')
socket.current.on('connect', () => {
  console.log('WebSocket connected successfully!');
});

socket.current.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});
socket.current.emit("new-user-add",senderId)
socket.current.on('get-user',(activeusers)=>{
  console.log(activeusers,'%%%%%%%%%%%');
})

return ()=>{
  socket.current.disconnect(); 
}

}, [user])

//sendMessage
useEffect(() => {
  console.log('send-message',sendMessage);
if(sendMessage!==null && sendMessage!==""){
  let data={recieverId:recieverId,text:sendMessage,senderId:senderId,chatId:chatId}
  socket.current.emit('send-message',data)
}
}, [sendMessage])

//Recieve-message
useEffect(()=>{
  socket.current.on('recieve-message',(response)=>{
console.log(response);
setrecievedMessages(response)
  })
},[])
// console.log("RECIEVED_MESSAGES",recievedMessages);
  return (
  <>
  <div className='chat-width'>
  <ChatList data={chatListData} />
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
