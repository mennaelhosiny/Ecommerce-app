import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";



export const cartContext=createContext()
export function CartContextProvider({children}){
   const[cartProducts,setCartProducts]= useState(null)
   const[totalCartPrice,setTotalCartPrice]= useState(0)
   const[numOfCartItems,setNumOfCartItems]= useState(0)
   const[cartId,setCartId]= useState(null)



   async function addProductToCart(productId){
    try{
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
        "productId": productId
    },
    {headers:{token:localStorage.getItem("tkn")}}
    )
    
    getUserCart()
    // setNumOfCartItems(data.numOfCartItems)
    // setTotalCartPrice(data.data.totalCartPrice)
    // setCartProducts(data.data.products)
    return data
}
catch(e){
console.log("error",e)
}
    }
   async function getUserCart(){
    try{
     const{data}  = await   axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:localStorage.getItem("tkn")}})
     setNumOfCartItems(data.numOfCartItems)
     setTotalCartPrice(data.data.totalCartPrice)
     setCartProducts(data.data.products)
     setCartId(data.data._id)

    }
    
    catch(e){
   console.log("error",e)
    }
}

async function deleteAllProduct(){
    try{
     const{data}  = await   axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:localStorage.getItem("tkn")}})
     setNumOfCartItems(0)
     setTotalCartPrice(0)
     setCartProducts([])
   console.log(data)
    }
    
    catch(e){
   console.log("error",e)
    }
}





  async function DeleteProduct(productId){
    try{
       const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers:{token:localStorage.getItem("tkn")}
       })
       setNumOfCartItems(data.numOfCartItems)
       setTotalCartPrice(data.data.totalCartPrice)
       setCartProducts(data.data.products)
       return data
    }
    catch(e){
        console.log("error",e)
    }
  }

  async function updateProduct(productId,count){
    try{
       const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        "count": count
    } ,  {
        headers:{token:localStorage.getItem("tkn")}
       })
       setNumOfCartItems(data.numOfCartItems)
       setTotalCartPrice(data.data.totalCartPrice)
       setCartProducts(data.data.products)
       return data
    }
    catch(e){
        console.log("error",e)
    }
  }
useEffect(function(){
    getUserCart()
},[])
 return<cartContext.Provider value={{getUserCart,addProductToCart,cartProducts,totalCartPrice,numOfCartItems,DeleteProduct,updateProduct,deleteAllProduct,cartId,setNumOfCartItems,
    setTotalCartPrice,
    setCartProducts}}>
 
 {children}
 
 </cartContext.Provider>

}
