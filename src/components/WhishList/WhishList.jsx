import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { WhishListContext } from "../../Context/WhishListContext";
import { CartContext } from "../../Context/CartContext";

export default function WhishList() {
  const [whishListDetails, setWhishListDetails] = useState([]);
  const { getLoggedUserWhishList, deleteWhishListItem } = useContext(WhishListContext);
  const { addProductToCart } = useContext(CartContext);

 
  async function getWhishListItems() {
    try {
      const response = await getLoggedUserWhishList();
      if (response.data.status === "success") {
        const products = response.data.data.products || response.data.data;

     
        const groupedByCategory = [];
        products.forEach((product) => {
          const category = product.category?.name || "Uncategorized";
          const categoryIndex = groupedByCategory.findIndex(
            (group) => group.category === category
          );
          if (categoryIndex === -1) {
            groupedByCategory.push({ category, products: [product] });
          } else {
            groupedByCategory[categoryIndex].products.push(product);
          }
        });

        setWhishListDetails(groupedByCategory);
      } else {
        toast.error("Failed to fetch wishlist items.");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("An error occurred while fetching wishlist items.");
    }
  }

  
  async function handleRemove(productId) {
    try {
      await deleteWhishListItem(productId);
      toast.success("Item removed from wishlist.");
      getWhishListItems(); 
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from wishlist.");
    }
  }


  async function handleAddToCart(productId) {
    try {
      const response = await addProductToCart(productId);
      if (response.status === 200) {
        toast.success("Product added to cart.");
        await handleRemove(productId); 
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  }

  useEffect(() => {
    getWhishListItems();
  }, []);

  const isEmpty = whishListDetails.length === 0;

  return (
    <div className="mt-5">
      <h1 className="font-bold text-3xl my-10">My WishList</h1>
      {isEmpty ? (
        <p>No items in your wishlist.</p>
      ) : (
        whishListDetails.map((group) => (
          <div key={group.category} className="mb-10">
            {group.products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row justify-between items-center mb-5 border p-4 rounded-lg shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                  <img
                    src={product.imageCover }
                    alt={product.title}
                    className="sm:w-[150px] h-[150px] object-cover rounded-md"
                  />
                  <div className="w-full text-center sm:text-left">
                    <h3 className="text-lg font-medium">
                      {product.title.split(" ").slice(0, 5).join(" ")}
                    </h3>
                    <p className="text-emerald-500">{product.price} EGP</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-1/3">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-emerald-500 text-white p-2 rounded-lg w-1/2 sm:w-auto"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="bg-red-500 text-white p-2 rounded-lg w-1/2 sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
  
}
