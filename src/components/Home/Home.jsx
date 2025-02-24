import React, { useContext } from 'react'
import { WhishListContext } from '../../Context/WhishListContext'
import RecentProducts from './../RecentProducts/RecentProducts'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {
 let {WhishList,changeWhishList} = useContext(WhishListContext)


 return <>
 <MainSlider />
 <CategoriesSlider />
  <RecentProducts />
  </>
}
