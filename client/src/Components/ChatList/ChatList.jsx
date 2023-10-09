import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './ChatList.css'
import { useSelector } from 'react-redux'
import {AiOutlineSetting  } from "react-icons/ai";
import ProfileSetting from '../ProfileSetting/ProfileSetting';
import imageUrl from '../../imageUrl';
function ChatList({data,activeUsers}) {


  const [search, setsearch] = useState('')
  let [userdata, setuserdata] = useState([])
  const [opensetting, setopensetting] = useState(false)
  const {user} =useSelector(state=>state)
  const userId=user?.details?._id;

  // Data passing to the chatpage component
  const HomePageData=(para,status)=>{
    data(para,status)
  }
// creating chat with the user
  const createChat=(recieverId)=>{
    const senderId=userId;
    axios.post('/createChat',{senderId,recieverId})
  }

  useEffect(() => {
    axios.get('/userdetails',{params:{search,userId}}).then((response)=>{
      if(response?.data?.result){
        setuserdata(response?.data?.result)
      }
    }).catch((err)=>{
      console.log(err);
    })
  }, [search])
  console.log(activeUsers,'ACTIVE');

//    userdata = userdata.map((item) => {
//     const isOnline = activeUsers.some((user) => user.userId === item._id);
//     return { ...item, online: isOnline };
// });


  return (
    <div className='list-width' >
      <div className='setting'>
      <h5 className='chat-heading' >Chats</h5>
      <p onClick={()=>setopensetting(!opensetting)}><AiOutlineSetting/></p>
      </div>
      {opensetting ? 
      <ProfileSetting userId={userId}/>
      :<>
        <input className='input-field' onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='🔍 Search here...' name="" id="" />
        <h6>Recents</h6>
        <div className='scroll-div'>
        {userdata.map((item)=>{
          return (
        <div className='user-list' 
        onClick={()=>{HomePageData(item,true); createChat(item._id)}}
        >
        <div className='prof-pic'>
          {
            item?.image ? 
            <img className='user-img' src={imageUrl+item.image.filename} alt="" srcset="" />

            :
        <img className='user-img' src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" alt="" srcset="" />
          }
        </div>
        <div className='prof-name' >
          <p>{item.name}</p>
          <p className='online-para'>{item.online ?'online' : ''}</p>
        </div>
      </div>
          )
        })}
        </div>
        </>
       }
    </div>
  )
}

export default ChatList
