import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './ChatList.css'
import { useSelector } from 'react-redux'
import {AiOutlineSetting  } from "react-icons/ai";
import ProfileSetting from '../ProfileSetting/ProfileSetting';
function ChatList({data}) {


  const [search, setsearch] = useState('')
  const [userdata, setuserdata] = useState([])
  const [opensetting, setopensetting] = useState(false)
  const {user} =useSelector(state=>state)
  const userId=user?.details?._id;

  const HomePageData=(para)=>{
    data(para)
  }
  useEffect(() => {
    axios.get('/userdetails',{params:{search,userId}}).then((response)=>{
      setuserdata(response.data.result)
    }).catch((err)=>{
      console.log(err);
    })
  }, [search])



  return (
    <div className='list-width' >
      <div className='setting'>
      <h5 className='chat-heading' >Chats</h5>
      <p onClick={()=>setopensetting(!opensetting)}><AiOutlineSetting/></p>
      </div>
      {opensetting ? 
      <ProfileSetting/>
      :<>
        <input className='input-field' onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='🔍 Search here...' name="" id="" />
        <h6>Recents</h6>
        {userdata.map((item)=>{
          return (
        <div className='user-list' 
        onClick={()=>HomePageData(item)}
        >
        <div className='prof-pic'>
        <img className='user-img' src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" srcset="" />
        </div>
        <div className='prof-name' >
          <p>{item.name}</p>
        </div>
      </div>
          )
        })}
        </>
       }
    </div>
  )
}

export default ChatList
