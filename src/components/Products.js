import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosAction, cartAction } from "../App/store";
import AddProduct from "./AddProduct";
import UpdateTodo from "./UpdateTodo";
import { api } from "../config";
import PaginationComponent from "./PaginationComponent";

function Products() {
  const todos = useSelector((state) => state.todos.todo);
  const cart = useSelector(state => state.carts.cart)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await api.get(`/api/getall`);
  //     dispatch(todosAction.initializeTodos(data));
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeTodos = async (id) => {
    try {
      await api.delete(`/api/delete/${id}`);
      dispatch(todosAction.removeTodos(id));
    } catch (error) {}
  }; 

  return (
    // <div style={{display:"flex",alignItems:"center", margin:"5% 5%"}}>
    //   {todos.map((todo) => {
    //     return (
    //       <div  key={todo.id} className="card" style={{ width: "18rem", margin:"2% 1%"}}>
    //         <img src={`http://localhost:8080/api/${todo.image}`} className="card-img-top" alt="..." />
    //         <div className="card-body">
    //           <h5 className="card-title">{todo.title}</h5>
    //           <p className="card-text">{todo.content}</p>
    //           <button onClick={() => dispatch(cartAction.addItem(todo.id))} className="btn btn-primary">Add</button>
    //           {/* <button onClick={() => dispatch(cartAction.removeItem(todo.id))} className="btn btn-primary" style={{background:"red",margin:"0% 2%"}}>Remove</button> */}
    //           {/* <button
    //             type="button"
    //             className="btn btn-danger"
    //             onClick={() => removeTodos(todo.id)}
    //           >
    //             Remove
    //           </button>
    //           <UpdateTodo
    //             id={todo.id}
    //             title={todo.title}
    //             content={todo.content}
    //           /> */}
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "20px",
        margin: "5% 5%",
      }}
    >
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="card"
          style={{
            width: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#f8f9fa",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={`http://localhost:8080/api/${todo.image}`}
            className="card-img-top"
            alt={todo.title}
            style={{
              height: "350px",
              objectFit: "cover",
            }}
          />
          <div className="card-body" style={{ padding: "15px" }}>
            <h5
              className="card-title"
              style={{ fontSize: "18px", fontWeight: "bold", color: "#343a40" }}
            >
              {todo.title}
            </h5>
            <p className="card-text" style={{ fontSize: "14px", color: "#6c757d" }}>
              {todo.content}
            </p>
            <p className="card-text" style={{ fontSize: "16px", fontWeight: "bold", color: "#28a745" }}>
              ₹{todo.price}
            </p>
            <button
              onClick={() => dispatch(cartAction.addItem(todo.id))}
              className="btn btn-primary"
              style={{
                backgroundColor: "#007bff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <PaginationComponent />
      </div>

      </>
  );
}

export default Products;
