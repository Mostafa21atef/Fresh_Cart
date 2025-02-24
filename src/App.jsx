import React, {createContext, useContext, useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from '../src/components/Layout/Layout'
import Home from '../src/components/Home/Home'
import Products from '../src/components/Products/Products'
import Cart from '../src/components/Cart/Cart'
import Brands from '../src/components/Brands/Brands'
import Categories from '../src/components/Categories/Categories'
import Register from '../src/components/Register/Register'
import Login from '../src/components/Login/Login'
import ProductDetails from '../src/components/ProductDetails/ProductDetails'
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/allOrders/allOrders';
import WhishList from './components/WhishList/WhishList';
import WhishListContextProvider, { WhishListContext } from './Context/WhishListContext'
import ForgetPass from './components/ForgetPass/ForgetPass';
import ResetPass from './components/Reset-Pass/Reset-Pass';
import Verifypass from './components/Verifypass/Verifypass';
import Notfound from './components/Notfound/Notfound';

let query = new QueryClient()

let x = createBrowserRouter([
  {path:"",element:<Layout />,children :[
    {index:true , element:<ProtectedRoute><Home /></ProtectedRoute>},
    {path:"products" , element:<ProtectedRoute><Products /></ProtectedRoute>},
    {path:"products/productdetails/:id/:category" , element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path:"cart" , element:<ProtectedRoute><Cart /></ProtectedRoute>},
    {path:"brands" , element:<ProtectedRoute><Brands /></ProtectedRoute>},
    {path:"categories" , element:<ProtectedRoute><Categories /></ProtectedRoute>},
    {path:"checkout" , element:<ProtectedRoute><Checkout /></ProtectedRoute>},
    {path:"allorders" , element:<ProtectedRoute><AllOrders /></ProtectedRoute>},
    {path:"wishlist" , element:<ProtectedRoute><WhishList /></ProtectedRoute>},
    {path:"productdetails/:id/:category" , element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path:"register" , element:<Register />},
    {path:"login" , element:<Login />},
    {path:"forgetpassword" , element:<ForgetPass />},
    {path:"reset-pass" , element:<ResetPass />},
    {path:"verify-pass" , element:<Verifypass />},
    {path:"*" , element:<Notfound/>},
  ]},

])

function App() {
  

  return (
    <>
 <UserContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>
      <WhishListContextProvider>
        <RouterProvider router={x} />
        <Toaster />
        </WhishListContextProvider>
      </CartContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  
</UserContextProvider>

    </>
  );
}

export default App
