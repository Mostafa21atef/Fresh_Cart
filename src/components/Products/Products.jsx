import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function Products() {
  const { addProductToCart, nOfcart, setnOfcart } = useContext(CartContext);
  const [loadingProductId, setLoadingProductId] = useState(null); // Track loading per product

  let { data, isLoading, isError, error, isFetching } = useProducts();

  async function addToCart(id) {
    setLoadingProductId(id);
    try {
      let response = await addProductToCart(id);

      if (response.data.status === "success") {
        setnOfcart(nOfcart + 1);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setLoadingProductId(null); // Reset loading state
    }
  }

  return (
    <div className="row mb-7">
      {isLoading || isFetching ? (
        <span className="loader"></span>
      ) : isError ? (
        <div className="error-message">{error.message}</div>
      ) : (
        data?.data?.data?.map((product) => (
          <div key={product?.id} className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/6">
            <div className="product p-5">
              <Link to={`productdetails/${product?.id}/${product?.category?.name}`}>
                <img src={product?.imageCover} className="w-full" alt={product?.title} />
                <h4 className="text-emerald-500 text-sm text-left">{product?.category?.name}</h4>
                <h5 className="text-left">{product?.title?.split(" ").slice(0, 2).join(" ")}</h5>
                <div className="flex justify-between">
                  <p>{product?.price} EGP</p>
                  <span>
                    <i className="fa-solid fa-star text-yellow-500"></i> {product?.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product?.id)}
                disabled={loadingProductId === product?.id}
                className="w-full bg-emerald-500 text-white mt-2 rounded-sm p-2 btn"
              >
                {loadingProductId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
