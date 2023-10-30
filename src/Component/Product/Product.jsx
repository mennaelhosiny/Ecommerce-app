import axios from "axios"
import {data}from "react-query"
import { ColorRing } from "react-loader-spinner"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { cartContext } from "../context/CartContext"
import { useContext } from "react"
import toast from "react-hot-toast"


export default function Product() {
  const{addProductToCart}= useContext(cartContext)
  async function addProduct(id){
    const res=await addProductToCart(id)
    console.log(res)
    if(res.status==="success"){
      toast.success(res.message,{
        position:"top-center",
        duration:2000
      }  )
    }
    else{
      toast.error("error hapened..")
    }
 }
function getAllProducts(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  
}
const{isLoading,data,refetch}=useQuery("allProducts",getAllProducts,{
  // enabled:false
})

// console.log(data?.data.data) 

// const[allProducts,setProducts]=useState(null)
// async  function getAllProducts(){
//  const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/products")
//  setProducts(data.data)
// }
// useEffect(function(){
//   getAllProducts()
// },[])
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

  <div className="container py-5">
    {/* <button onClick={refetch} className="btn btn-success w-100">Get Product..</button> */}
    <h1 className="main-color text-center">All Products</h1>
    <div className="row gy-4 ">
      {data?.data.data.map(function(product,idx){
        return <div key={idx} className="col-md-3 " id="products">
         <div className="product">

          <Link to={`/ProductDetails/${product.id}`}>
          <img src={product.imageCover} className="w-100 " alt="product" />
          <h6 className="main-color">{product.category.name} </h6>
          <h6>{product.title.split(" ").slice(0,2).join(" ")} </h6>
          <div className="d-flex justify-content-between align-content-center">
          <p>{product.price} EGP</p>
          <p> <span className="main-color"><i class="fa-solid fa-star"></i></span>  {product.ratingsAverage} </p>
          
          </div>
        
        
        </Link>
        <button onClick={()=>addProduct(product.id)} className='w-100 p-1 rounded-3 main-bg-color border-white text-white'>+ADD To Cart</button>

        </div>
      </div>})} 
      
    </div>
  </div> 





  
  
  
  
  </>
}

