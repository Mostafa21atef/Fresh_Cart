import React, {useContext, useState} from 'react'
import {useFormik}from "formik"
import * as yup from "yup"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../Context/UserContext'

export default function Login() {
let{UserLogin,setUserLogin}=useContext(UserContext); 
  const [ApiError, setApiError] = useState("")
  const [IsLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

function handleLogin(values){
  setIsLoading(true);
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
  .then(function(res){
  setIsLoading(false);
    if(res.data.message=="success"){
      console.log("okay");
      localStorage.setItem("UserToken",res.data.token)
      setUserLogin(res.data.token)
      navigate("/");
    }
  })
  .catch(function(res){
    setIsLoading(false);
    setApiError(res.response.data.message)
  })
}

let validateInputs = yup.object().shape({
  email:yup.string().email("email not valid").required("email is required"),
  password:yup.string().min(6,"min length is 6").required("password is required"),
  
})


  let formik = useFormik(
    {
      initialValues:{
        email:"",
        password:"",
       
      },
   validationSchema:validateInputs,
      onSubmit : handleLogin ,
    }
  )
  return <>
  
  <form onSubmit={formik.handleSubmit} className="max-w-md sm:mx-auto mt-7">
    {ApiError ?<div className='w-1/2 mx-auto bg-red-500 rounded-lg text-white text-center my-6 p-5'>
    {ApiError}
    </div>:null}
  <div className="relative z-0 w-full mb-5 group">
      <input type="email"
      name="email" //1
      value={formik.values.email}//2
      onChange={formik.handleChange}//3
      onBlur={formik.handleBlur}//4
      id="floating_email"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium left-0 absolute text-sm text-slate-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: border-emerald-500 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Email</label>
      {formik.errors.email && formik.touched.email ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
  <span className="font-medium">{formik.errors.email}</span>
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password"
      name="password" //1
      value={formik.values.password}//2
      onChange={formik.handleChange}//3
      onBlur={formik.handleBlur}//4
      id="floating_password"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium left-0 absolute text-sm text-slate-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: border-emerald-500 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Password</label>
      {formik.errors.password && formik.touched.password ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
  <span className="font-medium">{formik.errors.password}</span>
</div>:null}
  </div>
  <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5">
    {IsLoading ? <i className='fas fa-spinner fa-spin'></i>:"Login"}
    </button> 
    <Link to={`/forgetpassword`}><span className='text-blue-700 ms-5'>ForgetPassword?</span></Link>
   <div className='mx-auto w-1/2 mt-5 text-center'>
   <Link to={"/Register"}><span className='text-blue-500'>Don`t have account? Register</span></Link>
   </div>
  </form>
  </>
}
