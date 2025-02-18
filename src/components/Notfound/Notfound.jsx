import React from 'react'
import style from './Notfound.module.css'
import NotFound from "../../images/notfound.avif"
export default function Notfound() {
  return (
    
     <div className='w-3/4 mx-auto -m-24 '>
      <img src={NotFound} alt="NotFound Page😪" className='w-full'/>
     </div>
  )
}
