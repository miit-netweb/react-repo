import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosAction } from "../App/store";
import { api } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setinputData] = useState({
    id: generateRandomString(10),
    title: "",
    content: "",
    image: "",
    price: "",
    stock: "",
  });
  const buttonRef = useRef(null);

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

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setinputData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const addTodos = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("id", inputData.id);
      formData.append("title", inputData.title);
      formData.append("content", inputData.content);
      formData.append("price", inputData.price);
      formData.append("stock", inputData.stock);
      formData.append("image", inputData.image);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const { data } = await axios.post(
        `http://localhost:8080/api/save?id=${inputData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(todosAction.addTodos(inputData));
      setinputData({
        id: generateRandomString(10),
        title: "",
        content: "",
        image: "",
        price: 0,
        stock: 0,
      });
      navigate("/home");
    } catch (error) {}
  };

  // console.log("Add Modal");
  console.log(inputData);
  return (
    <form
      style={{
        margin: "20px auto",
        width: "50%",
        border: "1px solid black",
        padding: "2% 2%",
      }}
      onSubmit={addTodos}
    >
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Title
        </label>
        <br></br>
        <input
          required
          value={inputData.title}
          onChange={(e) => handleInputChange(e, "title")}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          required
          id="exampleFormControlTextarea1"
          rows="3"
          value={inputData.content}
          onChange={(e) => handleInputChange(e, "content")}
        ></textarea>
        <br></br>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Price
          </label>
          <br></br>
          <input
            required
            type="number"
            value={inputData.price}
            onChange={(e) => handleInputChange(e, "price")}
          />
        </div>
        <br></br>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Stock
          </label>
          <br></br>
          <input
            required
            type="number"
            value={inputData.stock}
            onChange={(e) => handleInputChange(e, "stock")}
          />
        </div>
        <br></br>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Image
          </label>
          <br></br>
          <input
            required
            type="file"
            accept="image/*"
            value={inputData.image}
            onChange={(e) => handleInputChange(e, "image")}
          />
        </div>
        <br></br>
        <button type="submit" class="btn btn-primary">
          Save changes
        </button>
      </div>

      {/* <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Todo
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  required
                  value={inputData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  required
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={inputData.content}
                  onChange={(e) => handleInputChange(e, "content")}
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                ref={buttonRef}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={addTodos}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </form>
  );
}

export default AddProduct;
