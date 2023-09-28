import React from 'react'
import './ProfileSetting.css'
function ProfileSetting() {
  return (
    <div className='outer-div'>
      <h5 style={{ textAlign:'center' }}>Settings</h5>
      <div className='profile-main-div'>
        <div className='profile-box'>
        <img className='profile-img' src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" srcset="" />
        <p className='profile-text'>jithun</p>
        <button>Edit</button>
        <button>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetting
