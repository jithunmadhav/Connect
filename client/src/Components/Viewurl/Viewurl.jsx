import axios from '../../axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Viewurl() {
    let {id}=useParams()
    useEffect(() => {
        axios.get(`/url/${id}`).then((response)=>{
        window.location.href=response.data.longurl
        }).catch((error)=>{
            console.log(error);
        })
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Viewurl
