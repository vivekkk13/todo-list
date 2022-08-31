import { Button, ListGroupIte } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currenttodo, setCurrentTodo] = useState();
  const [idCounter, setIdCounter] = useState(1);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTodo, setEditTodo] = useState("false");

  const addtodo = () => {
    setList([
      ...list,
      { id: idCounter, text: title, description: description },
    ]);
    setIdCounter(idCounter + 1);
  };

  let handleChange = (e) => {
    setTitle(e.target.value);
  };
  let handledescription = (e) => {
    setDescription(e.target.value);
  };

  const deletetodo = (item) => {
    console.log("clickeddd===>");
    let newlist = [...list];
    newlist = newlist.filter((e) => e.id != item.id);
    setList(newlist);
  };

  const edittodo = (item) => {
    let newans = [...list];
    console.log("newansss======>", newans);
    let index = newans.findIndex((e) => e.id === item.id);

    console.log("index===>", index);
  };

  return (
    <>
      <div className="App">
        <div className="mb-3">
          <label className="form-label">Todo List</label>
          <input
            onChange={handleChange}
            type="text"
            value={title}
            placeholder="Title.."
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <label className="form-label">Description</label>
          <input
            onChange={handledescription}
            placeholder="Description.."
            type="text"
            value={description}
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              addtodo();
              setDescription("");
              setTitle("");
            }}
          >
            Add
          </button>
        </div>

        {list.map((item) => (
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${item.id}`}
                >
                  {item.text}
                </button>
              </h2>
            </div>
            <div
              id={`collapse${item.id}`}
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              {item.description}
              <button
                className="btn btn-outline-danger"
                onClick={() => deletetodo(item)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  edittodo(item);
                }}
              >
                Edit
              </button>
              <div class="accordion-body"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
