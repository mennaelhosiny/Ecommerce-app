import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import { authContext } from '../../context/authentication'
export default function Login() {

 const {setToken}= useContext(authContext)


   let user={
  
    email:"",
    password:"",
  

   }

   const [errMsg,setErrMsg] =useState(null)
   const [successMsg,setSuccessMsg] =useState(null)
   const [isLouding,setisLouding] =useState(false)


  const navigate=useNavigate()

   async function LoginToAccount(value){
    setisLouding(true)
    console.log("sending to backend")

  //  const {data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value).catch( function(error){
  //   console.log("error occar",error)
  //   console.log(error.response.data.message)

  //  })
  //  console.log(data)

try{
    const {data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",value)
      console.log(data)
      if (data.message==="success"){
        localStorage.setItem('tkn',data.token)
        setToken(data.token)
        setSuccessMsg("Welcome back")
        setTimeout(function(){
          navigate('/Home')
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
    onSubmit:LoginToAccount,
    validate : function(value){

      setErrMsg(null)

    const error={}
    
    if (value.email.includes( "@"===false) || value.email.includes( "."===false)){
      error.email='Email Invalid'
    }

    if (value.password.length<6 || value.password.length>12){
      error.password="password must be at from 6 to 12 charcters"
    }
   
    return error
    }
  })


  return <>
  
  <div className="w-75 m-auto py-5">
    {errMsg?  <div className="alert alert-danger">{errMsg}</div> :"" }
    {successMsg? <div className="alert alert-success">{successMsg}</div> :"" }
    <h2>Login :</h2>
    <form onSubmit={formikObj.handleSubmit}>

    <label htmlFor="email">Email:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email'className='form-control mb-3' type ="text" placeholder='Email' /> 
    {formikObj.errors.email&& formikObj.touched.email?    <div className="alert alert-danger">{formikObj.errors.email}</div>:""}

    <label htmlFor="password">Password:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password'className='form-control mb-3' type="password" placeholder='Password' />
    {formikObj.errors.password&& formikObj.touched.password?    <div className="alert alert-danger">{formikObj.errors.password}</div>:""}

    <Link to='/ForgetPassword' className='main-color'>ForgetPassword ?</Link>

    
    <button type='submit' disabled={ formikObj.isValid===false || formikObj.dirty===false}  className='btn main-bg-color white ms-auto d-block'>
      

      
      {isLouding? <FallingLines
          color="#fff"
          width="50"
          visible={true}
          ariaLabel='falling-lines-loading'
      />:"Login"}
      
      
      
      
      
      
      </button>
    </form>
    </div>
  
  
  
  
  </>
}
