import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosAction } from "../App/store";
import { api } from "../config";

function UpdateTodo({ id, title, content }) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todo);
  const [formData, setFormData] = useState({
    id,
    title,
    content,
  });
  const buttonRef = useRef(null);

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    // Update the specific field using the spread operator
    setFormData((prevState) => ({
      ...prevState,
      [key]: value, // dynamically updates the key (title or content)
    }));
  };

  const addTodos = async () => {
    try {
      const { data } = api.put(`/api/update/${formData.id}`, formData);
      dispatch(todosAction.updateTodos(formData));
      setFormData({
        id: null,
        title: "",
        content: "",
      });
      buttonRef.current.click();
    } catch (error) {}
  };

  useEffect(() => {
    setFormData({
      id,
      title,
      content,
    });
  }, [todos]);

  // console.log("update Modal")
  // console.log(formData)
  // console.log(content)
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#_${String(id)}`}
      >
        Update Todo
      </button>

      <div
        class="modal fade"
        id={`_${String(id)}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Todo
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
                  value={formData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={formData.content}
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
      </div>
    </div>
  );
}

export default UpdateTodo;
