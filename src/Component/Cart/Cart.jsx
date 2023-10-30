import React from 'react'
import { useContext } from 'react'
import { cartContext } from '../context/CartContext'
import { ColorRing } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

   const{deleteAllProduct,updateProduct,cartProducts,totalCartPrice,numOfCartItems,DeleteProduct} = useContext(cartContext)


if(cartProducts===null){
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
if (cartProducts.length===0){
  return <>
   <h1>No Data Found In Your Cart <Link to={'/product'} className='main-color'>Get Some Products</Link>  </h1>

  </>
}
 async function deleteElement(id){
 const res= await DeleteProduct(id)
 if(res.status==="success"){
  toast.success("product removed successfully")
 }
 else {
  toast.error("Error Occured")

 }
 }
 async function updateElementCount(id,count){
  const res= await updateProduct (id,count)
  if(res.status==="success"){
   toast.success("Updated Successfully")
  }
  else {
   toast.error("Error on updating")
 
  }
  }
  async function ClearProduct(){
    await deleteAllProduct ()
    
    
    }

  return <div className="py-5">
   <div className='container py-5  bg-light'>
  <h2>Shop Cart</h2>
  <h5 >Total price: <h6 className='main-color d-inline'>{totalCartPrice}</h6> </h5>
  <h5 >Total items: <h6 className='main-color d-inline'>{numOfCartItems}</h6> </h5>
<div className="d-flex justify-content-between">
<button onClick={ClearProduct} className='btn btn-outline-danger'>Clear Cart</button>
 <Link to="/bill"  className='btn btn-outline-success'>confirm payment</Link> 
</div>


  {cartProducts.map(function(product,idx){
    return   <div key={idx} className="row my-2 border-bottom border-3 p-2 align-items-center">
    <div className="col-sm-1">
        <img src={product.product.imageCover} className='w-100 ' alt="" />
    </div>
    <div className="col-sm-8 ms-5 mb-2 ">
   <h1 className='h6'>{product.product.title} </h1>
   <h1 className='h6'>price:{product.price}</h1>
   <button onClick={()=> deleteElement(product.product.id)} className='btn btn-outline-danger'>Remove</button>
    </div>
    <div className="col-sm-2">
        <div className="d-flex align-items-center">
            <button onClick={()=> updateElementCount(product.product.id,product.count+1)} className='btn btn-outline-success'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=> updateElementCount(product.product.id,product.count-1)} className='btn btn-outline-success'>-</button>

        </div>
    </div>

  </div>
  })}
  
  {/* <div className="row my-2 border-bottom border-3 p-2 align-items-center">
    <div className="col-sm-1">
        <img src={require("../../images/grocery-banner.png")} className='w-100' alt="" />
    </div>
    <div className="col-sm-9">
   <h1 className='h6'>title</h1>
   <h1 className='h6'>price:</h1>
   <button className='btn btn-outline-danger'>Delete</button>
    </div>
    <div className="col-sm-2">
        <div className="d-flex align-items-center">
            <button className='btn btn-outline-success'>+</button>
            <span className='mx-2'>count</span>
            <button className='btn btn-outline-success'>-</button>

        </div>
    </div>

  </div> */}




  </div>
  </div>
}
