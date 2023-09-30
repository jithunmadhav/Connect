import React, { useState } from 'react'
import './Home.css'
import ChatList from '../ChatList/ChatList'
import ChatPage from '../ChatPage/ChatPage'
import { useSelector } from 'react-redux'
import axios from '../../axios'

function Home() {
  const [userdata, setuserdata] = useState('')
  const [chatId, setchatId] = useState('')
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
  return (
  <>
  <div className='chat-width'>
  <ChatList data={chatListData} />
  <ChatPage data={userdata}
  chatId={chatId}
  />
  </div>
  </>
  )
}

export default Home
