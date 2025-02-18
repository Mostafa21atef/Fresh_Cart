import { createContext, useContext } from "react";
import { UserContext } from "./UserContext"; 
import axios from "axios";

export let WhishListContext = createContext();

export default function WhishListContextProvider({ children }) {


  function getHeaders() {
    return {
      token: localStorage.getItem("UserToken"), 
    };
  }
  function addProductToWhishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers: getHeaders() }
      )
      .then((res) => {
        console.log("API Response:", res.data.data);
        return res;
      })
      .catch((err) => {
        console.error("API Error:", err.response || err.message);
        throw err;
      });
  }
  

  function getLoggedUserWhishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: getHeaders(),
    });
  }

  function deleteWhishListItem(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: getHeaders() }
    );
  }

  return (
    <WhishListContext.Provider
      value={{
        addProductToWhishList,
        getLoggedUserWhishList,
        deleteWhishListItem,
      }}
    >
      {children}
    </WhishListContext.Provider>
  );
}
