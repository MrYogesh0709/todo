import { Plus, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import useGetData from "./hook/useGetData";
import github from "./assets/github.svg";
function App() {
  const [taskData, setTaskData] = useGetData();
  const [editId, setEditId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!text) {
      window.alert("Please Add Your Task");
      return;
    }
    setTaskData((prevTask) => {
      return [
        ...prevTask,
        { id: prevTask?.at(-1)?.id + 1 || 1, task: text, completed: false },
      ];
    });
    setText("");
  };

  const removeTask = (id) => {
    if (window.confirm("Do you really want to remove task?")) {
      setTaskData((prevTask) => {
        return [...prevTask.filter((task) => task.id !== id)];
      });
    }
  };

  const setEditTodo = (id) => {
    const todo = taskData.find((item) => item.id === id);
    setText(todo.task);
    setEdit(true);
    setEditId(id);
  };

  const editTodo = (e) => {
    e.preventDefault();
    setTaskData((prevTask) => {
      return prevTask.map((item) => {
        return item.id === editId
          ? { id: editId, task: text, completed: false }
          : item;
      });
    });
    setText("");
    setEditId(0);
    setEdit(false);
  };

  const completeTask = (id) => {
    if (window.confirm("Are you Sure that task is complete?")) {
      setTaskData((prevTask) => {
        return prevTask.map((item) => {
          return item.id === id ? { ...item, completed: true } : item;
        });
      });
    }
  };

  return (
    <div className="app">
      <h1 className="d-flex mt-2 flex-center items-center">TODO LIST</h1>
      <div className="line" style={{ marginTop: "1rem" }}></div>
      <form className="d-flex items-center mt-2 flex-center gap-2">
        <input
          type="text"
          name="todo_text"
          id="todo"
          placeholder="Add your task"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        {edit ? (
          <button onClick={(e) => editTodo(e)}>
            <Pen size="35px" color="skyblue" />
          </button>
        ) : (
          <button onClick={(e) => addTodo(e)}>
            <Plus size="40px" color="lightgreen" />
          </button>
        )}
      </form>
      {taskData?.length > 0 ? (
        taskData.map((todo) => (
          <div className="d-flex items-center mt-2 gap-2" key={todo.id}>
            {!todo.completed ? (
              <>
                <input
                  type="checkbox"
                  name="checkbox"
                  className="input-checkbox"
                  checked={todo.completed}
                  onChange={() => completeTask(todo.id)}
                />
                <p className="todo">{todo.task}</p>
                <button onClick={() => setEditTodo(todo.id)}>
                  <Pen size="25px" color="skyblue" />
                </button>
                <button onClick={() => removeTask(todo.id)}>
                  <Trash2 size="25px" color="red" />
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="checkbox"
                  className="input-checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <div className="todo">
                  <strike>{todo.task}</strike>
                </div>
                <button
                  onClick={() =>
                    window.alert(
                      "Sorry, task is completed you can not chang it."
                    )
                  }
                >
                  <Pen size="25px" color="skyblue" />
                </button>
                <button onClick={() => removeTask(todo.id)}>
                  <Trash2 size="25px" color="red" />
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <div className="d-flex flex-center no-task items-center">
          Please Add Your first task
        </div>
      )}
      <a
        href="https://github.com/MrYogesh0709/todo"
        target="_blank"
        rel="noreferrer"
      >
        <img src={github} alt="github" className="github" />
      </a>
    </div>
  );
}

export default App;
