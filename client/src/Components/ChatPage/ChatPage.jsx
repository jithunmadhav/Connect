import React, { useEffect, useRef, useState } from 'react';
import './ChatPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSendFill, BsPaperclip } from "react-icons/bs";
import InputEmoji from "react-input-emoji";
import imageUrl from '../../imageUrl';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import {format} from 'timeago.js'
function ChatPage({ data,chatId }) {
  const {user} =useSelector(state=>state)
  const senderId=user?.details?._id;


  const [text, setText] = useState("");
  const [refresh, setrefresh] = useState(false)
  const [message, setmessage] = useState([])

  function handleOnEnter() {
    let message=text;
    axios.post('/addMessage',{chatId,senderId,message}).then(()=>{
      setText('')
      setrefresh(!refresh)
    }).catch((error)=>{
      console.log(error);
    })
  }
  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };

  useEffect(()=>{
    axios.get('/fetchMessage',{params:{chatId}}).then((response)=>{
      console.log(response.data.result,'$$$$$$$$$$');
      setmessage(response.data.result)
    }).catch((error)=>{
      console.log(error);
    })
  },[chatId,refresh])
  return (
    <>
    {!data ?
    <div className='empty-chatpage'>
      <h5 className='empty-quote'>select a chat to start messaging...</h5>
    </div> :
    <div className='chatpage-width'>
        {/* chatHeader */}

      <div className='chat-head'>
        <div className='profile-pic'>
        {
            data?.image ? 
            <img className='user-img' src={imageUrl+data.image.filename} alt="" srcset="" />

            :
        <img className='user-img' src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" alt="" srcset="" />
          }        </div>
        <div className='user-name'>
            <h5 className='name-style'>{data?.name}</h5>
        </div>
      </div>
      {/* chatbody */}

      <div className='chat-body'>
        {
          message.map((messages)=>{
       return ( <>
       <div className={messages.senderId !==senderId ? 'message-recieved sb14'  :'message-recieved message-sent sb13'}>
        <p className='message-para' >{messages.text}</p>
       </div>
        <p className='time-style'>{format(messages.createdAt)}</p>
      
       </>)
          })
        }

      </div>


      {/* chatFooter */}
      <div className='chat-footer'>
        <div className='input-field-main'>
        <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={() => {
         handleOnEnter()
        }}
        placeholder="Type a message"
        />
        </div>
        <div className='button-main'>
         <button onClick={handleClick} className='file-clip'><BsPaperclip/></button>
         <div style={{ width:'50px' }}></div>
         <input ref={ref} type="file" accept='.jpg,.jpeg,.png' />
         <button onClick={handleOnEnter} className='send-btn'><BsSendFill/></button>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default ChatPage
