import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../config";
import { orderAction } from "../App/store";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/api/get/orders`);
      dispatch(orderAction.initializeTodos(data));
    };
    fetchData();
  }, []);

  async function invoice(id) {
    try {
      console.log(id);
      const { data, headers } = await api.get(`/api/invoice/${id}`, {
        responseType: "blob", // Important: Get response as a binary blob
      });

      // Create a Blob from the PDF stream
      const blob = new Blob([data], { type: headers["content-type"] });

      console.log("here  :");

      console.log(blob);

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      console.log(url);

      const link = document.createElement("a");
      link.href = url;

      // Set the file name (optional, inferred from API if not set)
      link.download = `invoice-${id}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the invoice:", error);
    }
  }

  console.log("orders data : ", orders);

  return (
    <>
      <h1> order done</h1>
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">shipping address</th>
            <th scope="col">payment method</th>
            <th scope="col">invoice</th>
          </tr>
        </thead>
        {orders.map((order) => (
          <tbody key={order.id}>
            <tr>
              <th scope="row">{order.id}</th>
              <td>
                {order.lane}, {order.city}, {order.state}
              </td>
              <td>{order.paymentMethod}</td>
              <td onClick={()=>invoice(order.id)}>
              {/* <td> */}
                {/* <a href={`http://localhost:8080/api/invoice/${order.id}`}> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                {/* </a> */}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Orders;
