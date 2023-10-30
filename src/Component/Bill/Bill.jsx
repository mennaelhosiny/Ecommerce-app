import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../context/CartContext'
import toast from 'react-hot-toast'
import { useFormik } from 'formik';

export default function Bill() {

 const{cartId,setNumOfCartItems,setTotalCartPrice, setCartProducts}= useContext(cartContext)
 let ShippingForm = useFormik({
  initialValues: {
      details: "",
      phone: "",
      city: "",
  },
  onSubmit: function (value) {
    confirmCashPayment()
    const error={}
    
    if (! value.phone.match(/^(02)?01[0125][0-9]{8}$/)){
      error.phone="phone invalid"
  }
  }

})

async function confirmCashPayment(){
    let phoneValue=document.getElementById("#phone")
    let cityValue=document.getElementById("#city")
    let detailsValue=document.getElementById("#details")
    let  shippingAddress= {
           "shippingAddress":{
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
            }
    }
    try{
      const {data}  =await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,    
      {headers:{token:localStorage.getItem("tkn")}})
      
      console.log(data)
      if (data.status==="success"){
        toast.success("Ordered Successfully Intilized")
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        setCartProducts([])
        
     }
     else {
        toast.error("Error In Creating Order")
        
     }
    }
    catch(e){
        console.log("Error Occared",e)
    }
 }
 

  return <>
  
  
  
  <div className="container py-5">
    <form onSubmit={ShippingForm.handleSubmit}>
        <label htmlFor="phone">phone:</label>
        <input id='phone' type="tel" placeholder='phone' className='mb-3 form-control' />
        <label htmlFor="city">city:</label>
        <input id='city' type="text" placeholder='city' className='mb-3 form-control' />  
         <label htmlFor="details">details:</label>
        <textarea id='details' type="text" placeholder='details' className='mb-3 form-control' />
        <button type='submit' className='btn main-bg-color white'   onClick={confirmCashPayment}>Confirm Cash Payment</button>
    </form>
  </div>
  
  

  
  
  </>
  
}
