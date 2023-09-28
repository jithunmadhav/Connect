import React, { useRef, useState } from 'react'
import './ChatPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSendFill,BsPaperclip } from "react-icons/bs";
import InputEmoji from "react-input-emoji";
function ChatPage() {
  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }
  const ref = useRef()
  const handleClick = (e) => {
    ref.current.click()
  }
  return (
    <div className='chatpage-width'>
        {/* chatHeader */}

      <div className='chat-head'>
        <div className='profile-pic'>
            <img className='user-img' src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" srcset="" />
        </div>
        <div className='user-name'>
            <h5 className='name-style'>Jithya Madhav</h5>
        </div>
      </div>
      {/* chatbody */}

      <div className='chat-body'>
       <div className='message-recieved sb13'>
        <p>hai jithun madhav</p>
       </div>
       <div className='message-recieved message-sent sb14'>
       <p>hai jithun</p>
       </div>

      </div>

      {/* chatFooter */}
      <div className='chat-footer'>
        <div className='input-field-main'>
        <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
        />
        {/* <input className='input-field' type="text" placeholder=' Enter message...' name="" id="" /> */}
        </div>
        <div className='button-main'>
         <button onClick={handleClick} className='file-clip'><BsPaperclip/></button>
         <div style={{ width:'50px' }}></div>
         <button className='send-btn'><BsSendFill/></button>
         <input ref={ref} type="file" accept='.jpg,.jpeg,.png' />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
