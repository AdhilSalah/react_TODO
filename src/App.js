import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  //task (Todo) state

  const [toDo, setToDo] = useState([]);


  //temp state

  const [newTask, setNewTask] = useState("");
  const [update, setUpdate] = useState("");

  //add task

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //delete task
  const deleteTask = (id) => {
    let newTask = toDo.filter((task) => task.id !== id);
    setToDo(newTask);
  };
  // task completed

  const taskComplete = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }

      return task;
    });

    setToDo(newTask);
  };

  //cancel update

  const cancelUpdate = () => {
    setUpdate("");
  };

  //change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: update.id,
      title: e.target.value,
      status: update.status ? true : false,
    };

    setUpdate(newEntry);
  };
  //update task

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== update.id);

    let updatedObjects = [...filterRecords, update];

    setToDo(updatedObjects);
    setUpdate("");
  };
  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do</h2>
      <br />
      <br />
      {update && update ? (
        <>
          {/* update task */}
          <div className="row">
            <div className="col">
              <input
                className="form-control form-control-lg"
                value={update && update.title}
                onChange={(e) => changeTask(e)}
              />
            </div>
            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20"
              >
                Update
              </button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* addtask */}
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={addTask} className="btn btn-lg btn-success">
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}
      {/* //display */}
      {toDo && toDo.length ? "" : "No Tasks"}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>

                  <div className="iconsWrap">
                    <span
                      title="Completed"
                      onClick={(e) => taskComplete(task.id)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdate({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span title="Delete" id="delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan}/>
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      <br />
      BY react
    </div>
  );
}

export default App;
