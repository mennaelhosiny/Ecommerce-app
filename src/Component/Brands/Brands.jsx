import axios from 'axios'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categories() {




  function getAllCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  const{isLoading,data}=useQuery("allCategories",getAllCategories,{
    // enabled:false
  })
  console.log(data)

 
  if(isLoading){
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
<h1 className="main-color text-center mb-5">All Brands</h1>

<div className="row gy-5">
      {data?.data.data.map(function(brand,idx){
        return <div  key={idx} className="col-md-3 mb-2">
         <div className="brand ">

          <img style={{width:"100%", height:"400px"}} src={brand.image}  alt="brand" />
          <h6 >{brand.name} </h6>
        
        
        

        </div>
      </div>})} 
      
    </div>
</div>
  
  </>
}



