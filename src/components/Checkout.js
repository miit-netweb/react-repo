import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartAction } from "../App/store";
import { orderAction } from "../App/store";
import axios from "axios";

const Checkout = () => {

  const cart = useSelector(state => state.carts.cart)

  const products = cart.map((product) => ({ 
    id: product.id, 
    quantity:product.quantity, 
    price: product.price,
    title: product.title
   }));

  console.log("products array : ",products);
  

  const [step, setStep] = useState(1); 
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: "",
    number: "",
    paymentMethod: "Credit Card",
  });
  const [lane,setLane] = useState("");
  const [city,setCity] = useState("")
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }


  const handleSubmitUserDetails = (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.number) {
      alert("Please fill out all user details.");
      return;
    }
    console.log("userDetails : ",userDetails);
    
    setStep(2); 
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();



    if (!city || !state || !lane || !pincode) {
      alert("Please fill in all address fields.");
      return;
    }

    const address = { lane, city, state, pincode };

    console.log("address: ",address);

    const allData = {id:generateRandomString(10),products,...userDetails,...address}

    console.log("allData to sent to backend : ",allData);
    
    const { data } = await axios.post(
      `http://localhost:8080/api/create/order`,
      allData      
    );
    
    dispatch(orderAction.addOrder({ data }));

    alert("Order confirmed!");

    dispatch(cartAction.clearCart())

    navigate("/orders");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Checkout</h2>

      {step === 1 && (
        <form onSubmit={handleSubmitUserDetails}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleUserDetailsChange}
                style={{ width: "100%", padding: "10px", margin: "5px 0" }}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Contact:
              <input
                type="number"
                name="number"
                value={userDetails.number}
                onChange={handleUserDetailsChange}
                style={{ width: "100%", padding: "10px", margin: "5px 0" }}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Payment Method:
              <select
                name="paymentMethod"
                value={userDetails.paymentMethod}
                onChange={handleUserDetailsChange}
                style={{ width: "100%", padding: "10px", margin: "5px 0" }}
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </form>
      )}

      {step === 2 && (
        
        <form onSubmit={handleSubmitAddress} style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Address Details</h2>
      <div>
        <label>Lane:</label>
        <input
          type="text"
          value={lane}
          onChange={(e) => setLane(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <div>
        <label>PIN Code:</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Confirm Order
      </button>
    </form>
      )}
    </div>
  );
};

export default Checkout;
