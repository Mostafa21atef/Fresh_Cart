import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  function ForgetPassword(userEmail){
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`
    ,{email:userEmail})
    .then((res)=>{
      setLoading(false);
      console.log(res)
      toast.success("A verification code has been sent to your email!");
      navigate("/verify-pass");
    })
    .catch((err)=>{
      setLoading(false);
      console.log(err);
      toast.error("There was an error. Please try again.");
    });
  }
 
  return <>
  <div className='mx-auto w-1/2 p-10 rounded-lg bg-[#F8F9FA] shadow-lg mt-10'>
  <h1 className='text-emerald-500 text-2xl text-center my-5 font-bold'>Account Recovery</h1>
  <div className="mb-6">
        <label htmlFor="email" className="text-start block mb-2 text-2xl text-emerald-500">Email address</label>
        <input type="email" 
        id="email" 
        className="bg-gray-50 border border-emerald-300 text-gray-900 text-sm 
        rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full 
        p-2.5 " 
        placeholder="Enter Your E-mail" required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
    </div>
    
    <button
        onClick={() => ForgetPassword(email)}
        className="py-2 px-3 rounded-lg border border-emerald-600 text-emerald-500 mt-4 hover:text-white hover:bg-emerald-600"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
      </button>
    
  </div>
  </>
}
