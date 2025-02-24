import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export default function useProducts() {
 
  function getProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
 }
 let productInfo = useQuery({
    queryKey:["recentProducts"],
   queryFn:getProducts,
  //  staleTime:5000,
  //  retry:7,
//    refetchInterval:3000,
// refetchIntervalInBackground:true

  });
 return productInfo;
}
