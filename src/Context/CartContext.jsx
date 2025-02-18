import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){
    let headers = 
    {
        token:localStorage.getItem("UserToken")
    };
const [cartId, setcartId] = useState(0)
const [nOfcart, setnOfcart] = useState(0)
 function addProductToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId : productId
    },
    {
        headers,
    }
)
    .then((res)=>res)
    .catch((err)=>err)
}
function getLoggedUserCart(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=>{
       setnOfcart(res.data.numOfCartItems);
        
        setcartId(res.data.data._id);
        return res;
        
    })
    .catch((err)=>err)
}
function UpdatedCartProductQuantity(ProductId,newCount){
  return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`
  ,{count:newCount}
  ,{headers})
.then((res)=>res).
catch((err)=>err)
}
function deleteCartItem(ProductId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,{headers})
   .then((res)=>res)
   .catch((err)=>err)
}
function Checkout(cartId,url,formData){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/
${cartId}?url=${url}`
   ,{shippingAddress : formData},{headers}
)
   .then((res)=>res)
   .catch((err)=>err)
}


    return <CartContext.Provider value={{
    addProductToCart
    ,getLoggedUserCart,
    UpdatedCartProductQuantity,
    deleteCartItem,
    Checkout,
    cartId,
    nOfcart,
    setnOfcart
    }}>
        {props.children}
    </CartContext.Provider>
}