import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import Slider from "react-slick";
import axios from 'axios';

export default function ProductDetails() {
  const [product, setproduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:1000,
    arrows:false,
  };
let {id ,category} = useParams();

function getProduct(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then((res)=>{
console.log(res.data.data);
setproduct(res.data.data)
  })
  .catch((res)=>{
console.log(res);
  })
}
function getAllProducts(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  .then((res)=>{
    let related = res.data.data.filter((product)=>product.category.name==category)
    setrelatedProducts(related)
      })
      .catch((res)=>{
    console.log(res);
      })
}
useEffect(()=>{
getProduct(id)
getAllProducts()
},[id,category])
return <>
  <div className="row items-center mt-10">
    <div className="w-1/3">
    <div className="product_img">
    <Slider {...settings}>
   {product?.images.map((src)=> <div>
    <img src={src} className='w-full' />
   </div>)}
    </Slider>
      
    </div>
    </div>
    <div className="w-2/3 px-7">
    <div className="product_info">
    <h1 className='text-left mb-5'>{product?.title}</h1>
    <h3 className='text-slate-400 text-left mb-3'>{product?.description}</h3>
    <h4 className='text-left mb-4'>{product?.category.name}</h4>
    <div className='flex justify-between'><span>{product?.price}EGP</span>
    <span><i className='fas fa-star text-yellow-500'></i>{product?.ratingsAverage}</span></div>
    <button className='w-full bg-emerald-500 text-white rounded-sm p-2 mt-5'>Add To Cart</button>
    </div>
    </div>
  </div>
  <h2 className='text-left text-2xl font-bold my-5'>Related Products</h2>
  <div className="row">
  
  { relatedProducts.length>0 ? relatedProducts.map((product)=>
<div key={product.id} className='row sm:w-full md:w-1/3 xl:w-1/6 md:flex justify-center items-center'>

<div className="product p-5">
<Link to={`/productdetails/${product.id}/${product.category.name}`}>
<img src={product.imageCover} className='w-full' />
<h4 className='text-emerald-500 text-sm text-left'>{product.category.name}</h4>
<h5 className='text-left'>{product.title.split(" ").slice(0,2).join(" ")}</h5>
<div className="flex justify-between">
  <p>{product.price}EGP</p>
  <span><i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</span>
</div>
</Link>
<button className='w-full bg-emerald-500 text-white mt-2 rounded-sm p-2 btn'>Add To Cart</button>
</div>
</div>):<span className="loader"></span>}
</div>
  </>
}
