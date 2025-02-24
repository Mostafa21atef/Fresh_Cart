import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:1000,
    arrows:false,
  };
  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
console.log(res.data.data);

      setcategories(res.data.data);
    })
    .catch((res)=>{console.log(res.data.data)})
  }
useEffect(()=>{
  getCategories()
},[])
 
 
  return (
    <>
    <h2 className='text-slate-800 text-left my-5 font-bold	text-2xl '>Shop popular Categories</h2>
    <Slider {...settings}>
{categories.map((category)=>
<div>
  <img src={category?.image} alt="category_Image" className='h-[150px] object-fill' />
  <h4>{category?.name}</h4>
</div>
)}
      <div>
        
      </div>
    </Slider>
    </>
  )
}
