import React from "react";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Register from "./Component/Resgister/Register";
import Categories from './Component/Categories/Categories';
import Login from "./Component/Login/Login";
import Brands from "./Component/Brands/Brands";
import NotFound from "./Component/NotFound/NotFound";
import Profile from './Component/Profile/Profile';
import { AuthProvider } from "./context/authentication";
import ProtectedRoute from './Component/Test/Test';
import { QueryClient, QueryClientProvider } from "react-query"
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Component/context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Component/Cart/Cart";
import Bill from "./Component/Bill/Bill";
import AllOrders from './Component/AllOrders/AllOrders';
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import Home from "./Component/Home/Home"
import Product from "./Component/Product/Product";
const myRouter=createBrowserRouter([
{path:'/',element:<Layout/>, children:[
  {index:true, element:<ProtectedRoute>
    <Home/>
  </ProtectedRoute> },
  {path:'home', element:<ProtectedRoute>
    <Home/>
   </ProtectedRoute> },
     {path:'product', element:<ProtectedRoute>
     <Product/>
    </ProtectedRoute> },
   {path:'bill', element:<ProtectedRoute>
    <Bill/>
  </ProtectedRoute> },
   {path:'AllOrders', element:<ProtectedRoute>
   <AllOrders/>
 </ProtectedRoute> },
  {path:'login', element:<Login/>},
  {path:'register', element:<Register/>},
  {path:'categories', element:<ProtectedRoute>
    <Categories/>
  </ProtectedRoute> },
{path:"ProductDetails/:id", element:<ProtectedRoute>
<ProductDetails/>
</ProtectedRoute>},
 { path: "ForgetPassword", element: <ForgetPassword/> },
 { path: "ResetPassword", element: <ResetPassword/> },
  {path:'brands', element:<ProtectedRoute>
    <Brands/>
    </ProtectedRoute> },
  {path:'profile', element: <ProtectedRoute>
    <Profile/>
    </ProtectedRoute>  },

     {path:'cart', element: <ProtectedRoute>
     <Cart/>
     </ProtectedRoute>  },
  {path:'*', element:<NotFound/>}

]}

])
function App() {
 let clientQuery=new QueryClient()
  return <>

  <QueryClientProvider client={clientQuery}>
   <CartContextProvider>
   <AuthProvider>
  <RouterProvider  router={myRouter}/>
  </AuthProvider>
   </CartContextProvider>
  <Toaster/>
  </QueryClientProvider>
 
  
  </>
}

export default App;
