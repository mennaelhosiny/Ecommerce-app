import axios from 'axios'
import React, { useContext } from 'react'
import { Bars, ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../context/CartContext'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ProductDetails() {
 const{addProductToCart}= useContext(cartContext)
 const[sendingLoader,setSendingLoader]=useState(false)
const {id} =useParams()
async function addProduct(id){
  setSendingLoader(true)
   const res=await addProductToCart(id)
   if(res.status==="success"){
    toast.success(res.message,{
      position:"top-center",
      duration:2000
    }  )
  }
  else{
    toast.error("error hapened..")
  }
  setSendingLoader(false)
   console.log(res)
}

function getProductDetails(){
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

}

   const{data,isLoading}  = useQuery("productDetails",getProductDetails)



if (isLoading){
    return <div className="vh-100 d-flex justify-content-center align-items-center">
 <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>
}

  return <>
  
  
  <div className="container">
    <div className="row align-items-center py-5">
        <div className="col-md-3">
           <figure >
            <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
          </figure>
        </div>
        <div className="col-md-9">
            <div className="details text-center">
                <h1>{data.data.data.title}</h1>
                <p className='text-muted'>{data.data.data.description}</p>
                <h5>Price:{data.data.data.price}EGP</h5>
                <p>{data.data.data.id} </p>
                <button onClick={()=>addProduct(data.data.data.id)} className='w-100 p-2 rounded-3 main-bg-color border-white text-white'>
                  
                  {sendingLoader? 
                    <Bars
                   height="40"
                   width="40"
                   color="#fff"
                   ariaLabel="bars-loading"
                   wrapperStyle={{}}
                   wrapperClass=""
                   visible={true}
                  />:'+ADD To Cart'}
                  
                  </button>
            </div>
            </div>
    </div>
  </div>
  
  
  </>
}
