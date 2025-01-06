import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosAction } from "../App/store";
import AddProduct from "./AddProduct";
import UpdateTodo from "./UpdateTodo";
import { api } from "../config";

function Products() {
  const todos = useSelector((state) => state.todos.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/api/getall`);
      dispatch(todosAction.initializeTodos(data));
    };
    fetchData();
  }, []);

  const removeTodos = async (id) => {
    try {
      await api.delete(`/api/delete/${id}`);
      dispatch(todosAction.removeTodos(id));
    } catch (error) {}
  };
  
  console.log(todos)

  return (
    <div style={{display:"flex",alignItems:"center", margin:"5% 5%"}}>
      {todos.map((todo) => {
        return (
          <div  key={todo.id} className="card" style={{ width: "18rem", margin:"2% 1%"}}>
            <img src={`http://localhost:8080/api/${todo.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text">{todo.content}</p>
              <a href="#"  className="btn btn-primary">Add</a>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeTodos(todo.id)}
              >
                Remove
              </button>
              <UpdateTodo
                id={todo.id}
                title={todo.title}
                content={todo.content}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
