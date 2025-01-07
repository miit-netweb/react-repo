import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartAction } from "../App/store";
import { orderAction } from "../App/store";

const Checkout = () => {
  const [step, setStep] = useState(1); 
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: "",
    contact: "",
    paymentMethod: "Credit Card",
  });
//   const [address, setAddress] = useState("");
 const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [PinCode, setPinCode] = useState("");
  const navigate = useNavigate();

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };


  const handleSubmitUserDetails = (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.contact) {
      alert("Please fill out all user details.");
      return;
    }
    console.log("userDetails : ",userDetails);
    
    setStep(2); 
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();

    if (!city || !state || !country || !PinCode) {
      alert("Please fill in all address fields.");
      return;
    }

    const address = { city, state, country, PinCode };

    console.log("address: ",address);
    

    dispatch(orderAction.addOrder({ address }));

    dispatch(cartAction.clearCart())

    alert("Order confirmed!");

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
                type="text"
                name="contact"
                value={userDetails.contact}
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
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <div>
        <label>ZIP Code:</label>
        <input
          type="text"
          value={PinCode}
          onChange={(e) => setPinCode(e.target.value)}
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
