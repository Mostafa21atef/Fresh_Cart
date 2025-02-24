import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WhishListContext } from "../../Context/WhishListContext";

export default function RecentProducts() {
  let { addProductToWhishList, nOfWhishList, setnOfWhishList } = useContext(WhishListContext);
  let { addProductToCart, nOfcart, setnOfcart } = useContext(CartContext);
  let { data, isLoading, isError, error, isFetching } = useProducts();
  const [Loading, setLoading] = useState(false);
  const [CurrentId, setCurrentId] = useState(0);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
   
    const storedLikedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(storedLikedProducts);
  }, []);

  const saveLikedProductsToStorage = (products) => {
    localStorage.setItem("likedProducts", JSON.stringify(products));
  };

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);

    if (response?.data.status === "success") {
      setnOfcart(nOfcart + 1);
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  async function addToWhishList(productId) {
    setCurrentId(productId);
    setLoading(true);
  
    try {
      const response = await addProductToWhishList(productId);
  
      if (response?.data?.status === "success") {
        toggleHeartColor(productId, true); // Pass true to indicate adding
      } else {
        toast.error("Failed to add product to wishlist.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while adding to wishlist."
      );
    } finally {
      setLoading(false);
    }
  }
  
  const toggleHeartColor = (id, isAdding) => {
    let updatedLikedProducts;
    if (likedProducts.includes(id)) {
   
      updatedLikedProducts = likedProducts.filter((productId) => productId !== id);
      toast.success("Product removed from wishlist successfully"); 
    } else {
     
      updatedLikedProducts = [...likedProducts, id];
      if (isAdding) {
        toast.success("Product added to wishlist successfully"); 
      }
    }
    setLikedProducts(updatedLikedProducts);
    saveLikedProductsToStorage(updatedLikedProducts); 
  };
  
  return (
    <>
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
                  <img
                    src={product?.imageCover}
                    className="w-full"
                    alt={product?.title}
                  />
                  <h4 className="text-emerald-500 text-sm text-left">
                    {product?.category?.name}
                  </h4>
                  <h5 className="text-left">
                    {product?.title?.split(" ").slice(0, 2).join(" ")}
                  </h5>
                  <div className="flex justify-between">
                    <p>{product?.price} EGP</p>
                    <span>
                      <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                      {product?.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="text-end mt-3">
                  <i
                    className={`fa-solid fa-heart fa-2xl ${
                      likedProducts.includes(product.id)
                        ? "text-red-600"
                        : "text-black"
                    }`}
                    onClick={() => addToWhishList(product?.id)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <button
                  onClick={() => addToCart(product?.id)}
                  className="w-full bg-emerald-500 text-white mt-2 rounded-sm p-2 btn"
                >
                  {Loading && CurrentId === product.id ? (
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
    </>
  );
}
