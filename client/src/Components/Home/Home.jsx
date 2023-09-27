import React from 'react'
import './Home.css'
import ChatList from '../ChatList/ChatList'
import ChatPage from '../ChatPage/ChatPage'

function Home() {
  return (
  <>
  <div className='chat-width'>
  <ChatList/>
  <ChatPage/>
  </div>
  </>
  )
}

export default Home
