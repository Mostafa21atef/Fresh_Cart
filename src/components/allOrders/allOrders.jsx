import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllOrders() {
  const [Orders, setOrders] = useState([]);

  function getAllOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((res) => {
        console.log(res.data.data); // Debug: Log the orders array
        setOrders(res.data.data); // Save the entire orders array to state
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div className="row my-10">
        {Orders.length === 0 ? (
          <div className="text-center w-full">
            <span class="loader"></span>
          </div>
        ) : (
          Orders.map((order) =>
            order.cartItems.map((item, index) => (
              <div key={index} className="xs:w-full sm:w-full md:w-1/2 xl:w-1/4">
                <div className="order p-3 shadow-md rounded-sm">
                  <img
                    src={item.product.category.image}
                    alt={item.product.category.name}
                    className="w-full h-[350px] object-cover rounded-md"
                  />
                  <h2 className="font-bold text-lg mt-2">
                    {item.product.category.name}
                  </h2>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </>
  );
  
}
