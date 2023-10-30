import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function AllOrders() {
const [userOrders,setUserOrders]=useState(null)
 useEffect(()=>{

    const res= jwtDecode(localStorage.getItem("tkn"))
    getUserOrder(res.id)

 },[])
 async function getUserOrder(id){
try{
    const {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/orders//user/${id}`)
    console.log(data)
    setUserOrders(data)
}
catch{
 console.log("Error Occared")
}
 }
 
if (userOrders===null){
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
  
  
<div className="container p-5">
<div className="row g-4">
    {userOrders.map(function(Order,idx){
      return <div key={idx} className="col-md-6">

      <div className="order bg-light rounded-4 p-3">


      {Order.cartItems?.map(function(item,index){
        return <div className='my-1' key={index}>
          <img src={item.product.imageCover} className='w-25 main-bg-color' alt="" />
         <div  >
         <h6 className='main-color'>title:{item.product.title}</h6>
          <h6>count:{item.count}</h6>
          <h6>price:{item.price}</h6>
         </div>

        </div>
      })}

        <h6>payment method:{Order.paymentMethodType}</h6>
        <h6>total price:{Order.totalOrderPrice} </h6>
      </div>
    </div>
    })}

  </div>
</div>
  
  
  </>
 



}
