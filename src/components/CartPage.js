import React from 'react'
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { api } from "../config";
import { todosAction, cartAction } from "../App/store";
import { useNavigate } from 'react-router-dom';


const CartPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.carts.cart)
    

    const products = useSelector((state) => state.todos.todo);


    console.log(`cart : ${cart}`);
    
    console.log("products:", products);

    const cartProducts = products.filter((product) => cart[product.id]);  
    
    console.log(`cart products : `,cartProducts);

    // Calculate total quantity and price
    const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const totalPrice = cartProducts.reduce(
        (sum, product) => sum + product.price * cart[product.id],
        0
    );
    
    function checkout(){
        if(cartProducts.length === 0){
            alert("cart is empty")
        }
        else{
            navigate("/checkout")
        }
    }
    
  return (
    
        <div style={{ display: "flex", justifyContent: "space-between", margin: "5% 5%" }}>
        <div style={{ flex: "2", marginRight: "2%" }}>
        {cartProducts.map((product) => (
            <div
            key={product.id}
            className="card"
            style={{ width: "80%", margin: "10px auto", padding: "10px", display: "flex", alignItems: "center", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}
            >
            <img
                src={`http://localhost:8080/api/${product.image}`}
                alt={product.title}
                style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "20px" }}
            />
            <div style={{ flex: "1" }}>
                <h5>{product.title}</h5>
                <p>{product.content}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                    onClick={() => dispatch(cartAction.addItem(product.id))}
                    className="btn btn-primary"
                    style={{ padding: "5px 10px" }}
                >
                    +
                </button>
                <p style={{ margin: "0" }}>
                    <strong>Quantity:</strong> {cart[product.id]}
                </p>
                <button
                    onClick={() => dispatch(cartAction.removeItem(product.id))}
                    className="btn btn-danger"
                    style={{ padding: "5px 10px" }}
                >
                    -
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
        <div
        style={{
            flex: "1",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
            backgroundColor: "#f9f9f9",
        }}
        >
        <h4>Summary</h4>
        <p><strong>Total Products:</strong> {totalQuantity}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
            <button
        style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
        onClick={checkout}
        >
        Checkout
        </button>
        </div>
        </div>

  )
}

export default CartPage