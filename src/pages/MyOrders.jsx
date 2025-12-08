import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend10-phi.vercel.app/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(orders);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 underline">
        My Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr className="text-sm font-semibold ">
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Buyer</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="8" className="py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}

            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td className="font-semibold">{order.listingName}</td>
                <td>${order?.price}</td>
                <td>{order?.quantity}</td>
                <td>{order?.buyerName}</td>
                <td>{order?.address}</td>
                <td>{order?.phone}</td>
                <td>{order?.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
