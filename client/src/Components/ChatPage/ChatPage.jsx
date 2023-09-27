import React from 'react'
import './ChatPage.css'
function ChatPage() {
  return (
    <div className='chatpage-width'>
      <div className='chat-head'>
        <div className='profile-pic'>
            <img className='user-img' src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" alt="" srcset="" />
        </div>
        <div className='user-name'>
            <h3>Jithun</h3>
        </div>
      </div>
      <div className='chat-body'></div>
      <div className='chat-footer'></div>
    </div>
  )
}

export default ChatPage
