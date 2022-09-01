import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";

function App() {
  const [idCounter, setIdCounter] = useState(1);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [editTodo, setEditTodo] = useState(true);

  const addtodo = () => {
    setList([
      ...list,
      { id: idCounter, text: title, description: description },
    ]);

    setIdCounter(idCounter + 1);
  };

  useEffect(() => {
    console.log("listt====>", list);
  }, [list]);

  let handleChange = (e) => {
    setTitle(e.target.value);
  };
  let handledescription = (e) => {
    setDescription(e.target.value);
  };

  const deletetodo = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your todo task!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let newlist = [...list];
        newlist = newlist.filter((e) => e.id != item.id);
        setList(newlist);
        swal("Poof! Your todo task is deleted!", {
          icon: "success",
        });
      } else {
        swal("Your task is not deleted!");
      }
    });
  };

  const edittodo = (item) => {
    setTitle(item.text);
    setDescription(item.description);
    setId(item.id);
  };

  const updateData = () => {
    const newList = [...list];
    const userIndex = list.findIndex((item) => item.id == id);
    newList[userIndex] = { id: id, text: title, description: description };
    setList(newList);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <a class="navbar-brand" href="#">
          My to do list
        </a>
      </nav>

      <div className="container">
        <div className="row my-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <label className="form-label">Todo List</label>
                <input
                  onChange={handleChange}
                  type="text"
                  value={title}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <label className="form-label">Description</label>
                <input
                  onChange={handledescription}
                  type="text"
                  value={description}
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    if (editTodo) {
                      addtodo();
                      setDescription("");
                      setTitle("");
                    } else {
                      updateData();
                      setDescription("");
                      setTitle("");
                      setEditTodo(true);
                    }
                  }}
                >
                  {editTodo ? "Add" : "Edit"}
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-8">
            <div className="task">Tasks</div>
            {list.map((item) => (
              <div class="row">
                <div class="col-sm-3 text-left"></div>
                <div class="col-sm-6 text-left"></div>
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
                        <span
                          className="spann"
                          onClick={() => deletetodo(item)}
                        >
                          delete
                          <span>
                            <i class="fa-solid fa-trash-check"></i>
                          </span>
                        </span>

                        <span
                          className="edit"
                          onClick={() => {
                            edittodo(item);
                            setEditTodo(false);
                          }}
                        >
                          Edit
                        </span>
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
                    {/* <button
                      className="btn btn-outline-danger"
                      onClick={() => deletetodo(item)}
                    >
                      Delete
                    </button> */}
                    {/* <button
                      className="btn btn-outline-dark"
                      onClick={() => {
                        edittodo(item);
                      }}
                    >
                      Edit
                    </button> */}
                    <div class="accordion-body"></div>
                  </div>
                </div>{" "}
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
