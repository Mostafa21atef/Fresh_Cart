import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import Products from './../Products/Products';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [CartDetails, setCartDetails] = useState(null)
let {getLoggedUserCart,UpdatedCartProductQuantity,deleteCartItem,nOfcart,setnOfcart} = useContext(CartContext) 

async function getCartItems(){
let response = await getLoggedUserCart();
console.log(response.data.data);
if(response.data.status=="success"){
  setCartDetails(response.data.data)
}

} 
async function UpdatedProducts(id,count){
  if(count==0){
    return
  }else{

 let response = await UpdatedCartProductQuantity(id,count);
 console.log(response);
 if(response.data.status=="success"){

  setCartDetails(response.data.data)
  toast.success("product updated success");
 }else{
toast.error("product didn`t update")
 }
}
}
async function deleteProduct(ProductId){
  let response = await deleteCartItem(ProductId);
  if(response.data.status=="success"){
    setnOfcart(nOfcart-1)
    setCartDetails(response.data.data)
  }
 
}
useEffect(
  ()=>{
    getCartItems()
  },[]
 )
  return <>
  
  {CartDetails?.products?.length > 0 ? (
  <>
  <div className=' pb-16'>
    <h1 className="text-emerald-600 text-center mt-10 text-3xl font-bold capitalize">
      Total Price: {CartDetails?.totalCartPrice || 0} EGP
    </h1>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 pt-5">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden sm:table-header-group">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">Product</th>
        <th scope="col" className="px-6 py-3">Qty</th>
        <th scope="col" className="px-6 py-3">Price</th>
        <th scope="col" className="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {CartDetails.products.map((product) => (
        <tr
          key={product.product?.id || Math.random()}
          className="bg-white border-b dark:bg-gray-800 sm:table-row block w-full mb-4 sm:mb-0"
        >
          {/* Product Image */}
          <td className="p-4 block lg:w-1/5 w-full sm:table-cell">
            <img
              src={product.product?.imageCover || "/placeholder-image.png"}
              className="w-3/4 md:w-32 max-w-full max-h-full mx-auto"
              alt={product.product?.title || "Product Image"}
            />
          </td>

          {/* Product Name */}
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white block w-full sm:table-cell lg:w-1/5">
            <span className="sm:hidden font-bold">Product: </span>
            {product.product?.title || "Unknown Product"}
          </td>

          {/* Quantity Control */}
          <td className="px-6 py-4 block w-full sm:table-cell lg:w-1/5">
            <span className="sm:hidden font-bold">Quantity: </span>
            <div className="flex items-center justify-center sm:justify-start">
              <button
                onClick={() =>
                  UpdatedProducts(product.product.id, product.count - 1)
                }
                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <div>
                <span>{product.count}</span>
              </div>
              <button
                onClick={() =>
                  UpdatedProducts(product.product.id, product.count + 1)
                }
                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </td>

          {/* Price */}
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white block w-full sm:table-cell lg:w-1/5">
            <span className="sm:hidden font-bold">Price: </span>
            {product.price && product.count ? product.price * product.count : 0} EGP
          </td>

          {/* Remove Action */}
          <td className="px-6 py-4 block w-full sm:table-cell text-center sm:text-left lg:w-1/5">
            <span className="sm:hidden font-bold">Action: </span>
            <span
              className="cursor-pointer text-red-700 bg-white p-2 rounded-md font-bold"
              onClick={() => deleteProduct(product.product.id)}
            >
              Remove
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
    <Link to={`/checkout`}>
    <button className='p-3 w-full bg-emerald-700 text-white mt-3'>Checkout</button>
    </Link>
    </div>
  </>
) : (
  <h1 className="mt-20 text-center text-emerald-700 font-bold capitalize text-4xl">
    No data found
  </h1>
)}




 
  </>
}
