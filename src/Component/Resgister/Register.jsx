import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
export default function Register() {
   let user={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""

   }

   const [errMsg,setErrMsg] =useState(null)
   const [successMsg,setSuccessMsg] =useState(null)
   const [isLouding,setisLouding] =useState(false)


  const navigate=useNavigate()

   async function RegisterNewData(value){
    setisLouding(true)
    console.log("sending to backend")

  //  const {data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value).catch( function(error){
  //   console.log("error occar",error)
  //   console.log(error.response.data.message)

  //  })
  //  console.log(data)

try{
    const {data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value)
      console.log(data)
      if (data.message==="success"){
        setSuccessMsg("Account has created successfully")
        setTimeout(function(){
          navigate('/Login')
        },1000)
      }
}
catch(err){
  console.log("error occur",err.response.data.message)
  setErrMsg(err.response.data.message)
}


setisLouding(false)

  }

  const formikObj=useFormik({
    initialValues:user,
    onSubmit:RegisterNewData,
    validate : function(value){

      setErrMsg(null)

    const error={}
    if (value.name.length<4 || value.name.length>10){
      error.name="Name must be at from 4 to 10 charcters"
    }
    if (value.email.includes( "@"===false) || value.email.includes( "."===false)){
      error.email='Email Invalid'
    }

    if (! value.phone.match(/^(02)?01[0125][0-9]{8}$/)){
        error.phone="phone invalid"
    }
    if (value.password.length<6 || value.password.length>12){
      error.password="password must be at from 6 to 12 charcters"
    }
    if (value.rePassword  !==  value.password){
      error.rePassword="repassword and password doesn't match"
   }
    return error
    }
  })


  return <>
  
  <div className="w-75 m-auto py-5">
    {errMsg?  <div className="alert alert-danger">{errMsg}</div> :"" }
    {successMsg? <div className="alert alert-success">{successMsg}</div> :"" }
    <h2>Register Now:</h2>
    <form onSubmit={formikObj.handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' className='form-control mb-3' type= "text" placeholder='Name' />
    {formikObj.errors.name&& formikObj.touched.name?    <div className="alert alert-danger">{formikObj.errors.name}</div>:""}
    <label htmlFor="email">Email:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email'className='form-control mb-3' type ="text" placeholder='Email' /> 
    {formikObj.errors.email&& formikObj.touched.email?    <div className="alert alert-danger">{formikObj.errors.email}</div>:""}

    <label htmlFor="password">Password:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password'className='form-control mb-3' type="password" placeholder='Password' />
    {formikObj.errors.password&& formikObj.touched.password?    <div className="alert alert-danger">{formikObj.errors.password}</div>:""}

    <label htmlFor="rePassword">rePassword:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword'className='form-control mb-3' type="password" placeholder='rePassword' />
    {formikObj.errors.rePassword&& formikObj.touched.rePassword?    <div className="alert alert-danger">{formikObj.errors.rePassword}</div>:""}

    <label htmlFor="phone">Phone:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' className='form-control mb-3' type ="tel" placeholder='Phone' />
    {formikObj.errors.phone&& formikObj.touched.phone?    <div className="alert alert-danger">{formikObj.errors.phone}</div>:""}

    <button type='submit' disabled={ formikObj.isValid===false || formikObj.dirty===false}  className='btn btn-success'>
      
      
      {isLouding? <FallingLines
          color="#fff"
          width="50"
          visible={true}
          ariaLabel='falling-lines-loading'
      />:"Register"}
      
      
      
      
      
      
      
      </button>
    </form>
    </div>
  
  
  
  
  </>
}

