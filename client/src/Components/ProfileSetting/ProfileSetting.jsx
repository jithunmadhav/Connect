import React from 'react'
import './ProfileSetting.css'
import { AiOutlineLogout,AiFillEdit } from "react-icons/ai";
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function ProfileSetting() {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const handlelogout=()=>{
    axios.get('/logout').then((response)=>{
      if(!response.data.err){
        dispatch({type:'refresh'})
        navigate('/login')
      }
    })
  }
  return (
    <div className='outer-div'>
      <h5 style={{ textAlign:'center' }}>Settings</h5>
      <div className='profile-main-div'>
        <div className='profile-box'>
        <img className='profile-img' src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" srcset="" />
        <p className='profile-text'>jithun</p>
        <button className='edit-btn'>Edit <AiFillEdit/></button>
        <button onClick={handlelogout} className='logout-btn'>Logout <AiOutlineLogout/></button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetting
