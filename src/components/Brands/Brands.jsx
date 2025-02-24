import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function Brands() {
 const [GetBrands, setGetBrands] = useState([])
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>setGetBrands(res.data.data))
    .catch((err)=>err)
  }
 useEffect(()=>{
  getBrands();
 },[])
 return (
  <div className="row mt-5 justify-center items-center">
    {GetBrands.map((brand) => (
      <Link key={brand._id} to={"/"}>
        <div
          className="w-full text-center rounded-sm p-3 cursor-pointer"
        >
          <img
            src={brand.image}
            alt="brand"
            className="w-full h-[250px] object-cover"
          />
          <h3>{brand.name}</h3>
        </div>
      </Link>
    ))}
  </div>
)
}
