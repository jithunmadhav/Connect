import React, { useEffect, useState } from 'react';
import './ProfileSetting.css';
import { AiOutlineLogout, AiFillEdit } from "react-icons/ai";
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import imageUrl from '../../imageUrl';

function ProfileSetting({userId}) {
  const {user} = useSelector(state =>state)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openEdit, setopenEdit] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const [userdata, setuserdata] = useState('')
  const [name, setname] = useState(user?.details?.name)
  const [files, setfiles] = useState('')

  const handlelogout = () => {
    axios.get('/logout').then((response) => {
      if (!response.data.err) {
        dispatch({ type: 'refresh' });
        navigate('/login');
      }
    });
  };

  useEffect(() => {
   axios.get('/singleUser',{params:{userId}}).then((response)=>{
    setuserdata(response.data.result)
   }).catch((error)=>{
    console.log(error);
  })
}, [refresh])

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('/updateUser',{name,files,userId},{headers:{'Content-Type':'multipart/form-data'}}).then((response)=>{
      if(!response.data.err){
        setopenEdit(!openEdit)
        setrefresh(!refresh)
      }
    })
  }

  const handleEditProfile = () => {
    setopenEdit(true)
  };

  return (
    <div className='outer-div'>
      <h5 style={{ textAlign: 'center' }}>Settings</h5><hr></hr>
      <div className='profile-main-div'>
        <div className='profile-box'>
          {
            userdata?.image ? 
            <img className='profile-img' src={imageUrl+userdata?.image?.filename} alt="" srcset="" />
            :
           <img className='profile-img' src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" alt="" srcset="" />
          }
          <p className='profile-name'>{userdata?.name}</p>
          <p className='profile-email'>{userdata?.email}</p>
          {openEdit ? 
          <>
            <form onSubmit={handleSubmit}>
            <div className='edit-div'>
            <input className='edit-field' onChange={(e)=>setname(e.target.value)} value={name} type="text"  />
            {/* <input className='edit-field' type="file" style={{ display:'block' }} name="image" /> */}
            <input  type="file" onChange={(e)=>setfiles(e.target.files[0])}  id="file" class="hidden" accept='.jpeg,.jpg,.png'/>
            <label style={{ marginBottom:'10px',cursor:'pointer', fontFamily:'monospace' }} for="file">update img</label>
           </div>
          <div style={{ display:'flex',justifyContent:'center' }}>
            <button className='cancel-button' onClick={()=>setopenEdit(!openEdit)}>cancel</button>
            <button className='save-btn' type='submit' >save</button>
          </div>
            </form>
            </>
          :<>
          <button onClick={handleEditProfile} className='edit-btn'>Edit <AiFillEdit /></button>
          <button onClick={handlelogout} className='logout-btn'>Logout <AiOutlineLogout /></button>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
