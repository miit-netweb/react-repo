import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
            <h4>Order {index + 1}</h4>
            <p><strong>City:</strong> {order.address.city}</p>
            <p><strong>State:</strong> {order.address.state}</p>
            <p><strong>Country:</strong> {order.address.country}</p>
            <p><strong>ZIP Code:</strong> {order.address.zip}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
