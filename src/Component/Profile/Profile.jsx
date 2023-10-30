import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'




export default function Profile() {
  const[name,setName]=useState(null)
  
useEffect(()=>{
 const x= jwtDecode(localStorage.getItem("tkn"))
 setName(x.name)
},[])

if(name===null){
  return <h1>Loading</h1>
}


  return <div className='container'>
  
  <h1 className='text-center'>Hello {name} </h1>
  
  </div>
}
