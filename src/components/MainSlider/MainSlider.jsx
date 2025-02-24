import React from 'react'
import Slider from "react-slick";
import banner4 from '../../images/banner-4.jpeg'
import banner1 from '../../images/grocery-banner.png'
import banner2 from '../../images/grocery-banner-2.jpeg'
import slide1 from '../../images/slider-image-1.jpeg'
import slide2 from '../../images/slider-image-2.jpeg'
import slide3 from '../../images/slider-image-3.jpeg'
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:1000,
    arrows:false,
  };
  return (
    <>
    <div className="row">
      <div className="sm:w-full md:w-3/4">
      <Slider {...settings}>
      <img src={slide3} className='w-full h-[400px] object-cover' />
      <img src={banner1} className='w-full h-[400px] object-cover' />
      <img src={banner2} className='w-full h-[400px] object-cover' />
      <img src={banner4} className='w-full h-[400px] object-cover' />
</Slider>
      </div>
      <div className="sm:w-full md:w-1/4">
      <img src={slide2} className='w-full h-[200px]' />
      <img src={slide1} className='w-full h-[200px]' />
      </div>
    </div>

    </>
  )
}
