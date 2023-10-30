import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoImage from "../../images/freshcart-logo.svg"
import { authContext } from '../../context/authentication'
import { cartContext } from '../context/CartContext'
export default function Navbar() {
  const {token,setToken}=useContext(authContext)
 const{numOfCartItems}= useContext(cartContext)
  const navFun=useNavigate()
  function logOut(){
    localStorage.removeItem("tkn")
    setToken(null)
    navFun("/Login")
  }
  return <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container">
<Link classNameName='navbar-brands ' to='/'> 
<img src={logoImage} alt="" /></Link>
    

<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse " id="navbarSupportedContent">
  <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center align-items-center ">
    {token?<> 
    <li className="nav-item">
      <Link className="nav-link active" aria-current="page" to="/Home"> Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Categories">Categories </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/product">Products </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/AllOrders">All Orders </Link>
    </li>
    
    <li className="nav-item">
      <Link className="nav-link" to="/Brands"> Brands</Link>
    
    </li></> :"" }
  
   
    
  </ul>
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
 
    {token?<>   <li className="nav-item">
    


    {/* <i class="fa-brands fa-facebook me-2 "></i>
    <i class="fa-brands fa-twitter me-2"></i>
    <i class="fa-brands fa-linkedin me-2"></i>
    <i class="fa-brands fa-whatsapp me-2"></i> */}


 </li>
 <li className="nav-item">
      <Link className="nav-link position-relative" to="/Cart"><i class="fa-solid fa-cart-shopping main-color font-size-30px"></i> 
      
       
       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
       {numOfCartItems}
       <span class="visually-hidden">unread messages</span>
       </span>
      
      </Link>
    </li>
    
     <li className="nav-item">
      <Link className="nav-link active" aria-current="page" to="/profile"> Profile</Link>
    </li>
   
    <li className="nav-item">
      <span onClick={logOut} style={{cursor:"pointer"}}  className="nav-link" > Logout</span>
    </li></>:<> <li className="nav-item">
      <Link className="nav-link active" aria-current="page" to="/Login"> Login</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/Register"> Register</Link>
    </li></>}
   
  
    
  </ul>
  
</div>
</div>
</nav>

</>
}

