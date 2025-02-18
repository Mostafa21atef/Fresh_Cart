import React, {useContext, useEffect, useState} from 'react'
import {useFormik}from "formik"
import { CartContext } from '../../Context/CartContext'


export default function Checkout() {
  const { Checkout, cartId, getLoggedUserCart } = useContext(CartContext);

 
  useEffect(() => {
    async function fetchCart() {
      await getLoggedUserCart(); 
    }
    fetchCart();
  }, [getLoggedUserCart]);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cartId, `http://localhost:5173`),
  });

  async function handleCheckout(cartId, url) {
    if (!cartId) {
      alert("Cart ID is not available. Please try again.");
      return;
    }
    try {
      const { data } = await Checkout(cartId, url, formik.values);
      window.location.href = data.session.url; 
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to initiate checkout. Please try again.");
    }
  }
    
 
  return <>
  
  <form onSubmit={formik.handleSubmit} className="max-w-md sm:mx-auto mt-16">
    
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"
      name="details" //1
      value={formik.values.details}//2
      onChange={formik.handleChange}//3
      onBlur={formik.handleBlur}//4
      id="floating_details"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
      <label htmlFor="floating_details" className="peer-focus:font-medium left-0 absolute text-sm text-slate-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: border-emerald-500 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter details</label>
      {formik.errors.details && formik.touched.details ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
  <span className="font-medium">{formik.errors.details}</span>
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel"
      name="phone" //1
      value={formik.values.phone}//2
      onChange={formik.handleChange}//3
      onBlur={formik.handleBlur}//4
      id="floating_phone"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
      <label htmlFor="floating_phone" className="peer-focus:font-medium left-0 absolute text-sm text-slate-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: border-emerald-500 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter phone</label>
      {formik.errors.phone && formik.touched.phone ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
  <span className="font-medium">{formik.errors.phone}</span>
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"
      name="city" //1
      value={formik.values.city}//2
      onChange={formik.handleChange}//3
      onBlur={formik.handleBlur}//4
      id="floating_city"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
      <label htmlFor="floating_city" className="peer-focus:font-medium left-0 absolute text-sm text-slate-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: border-emerald-500 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter city</label>
     
  </div>
  <button  type="submit" className="text-white bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5">
    Checkout
    </button>
   
  </form>
  </>
}
