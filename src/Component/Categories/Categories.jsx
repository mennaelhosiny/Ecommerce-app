import axios from 'axios'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categories() {




  function getAllCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
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
<div className="row gy-5">
      {data?.data.data.map(function(category,idx){
        return <div key={idx} className="col-md-4">
         <div className="category brand">

          <img style={{width:"100%", height:"400px"}} src={category.image}  alt="category" />
          <h6 >{category.name} </h6>
        
        
        

        </div>
      </div>})} 
      
    </div>
</div>
  
  </>
}

