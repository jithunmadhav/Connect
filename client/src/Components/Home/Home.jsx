import React, { useState } from 'react'
import './Home.css'
import ChatList from '../ChatList/ChatList'
import ChatPage from '../ChatPage/ChatPage'

function Home() {
  const [userdata, setuserdata] = useState('')
  const chatListData=(data)=>{
    setuserdata(data)
  }
  return (
  <>
  <div className='chat-width'>
  <ChatList data={chatListData} />
  <ChatPage data={userdata}/>
  </div>
  </>
  )
}

export default Home
