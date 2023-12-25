import { Plus, Pen, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import useGetData from "./hook/useGetData";
import github from "./assets/github.svg";
function App() {
  const [taskData, setTaskData] = useGetData();
  const [editId, setEditId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text) {
      window.alert("Please Add Your Task");
      return;
    }
    setTaskData([
      ...taskData,
      { id: taskData.at(-1)?.id + 1 || 1, task: text, completed: false },
    ]);
    setText("");
  };

  const removeTask = (id) => {
    if (window.confirm("Do you really want to remove task?")) {
      setTaskData(taskData.filter((task) => task.id !== id));
    }
    setText("");
    inputRef.current.focus();
  };

  const setEditTodo = (id) => {
    const todo = taskData.find((item) => item.id === id);
    setText(todo.task);
    setEdit(true);
    setEditId(id);
    inputRef.current.focus();
  };

  const editTodo = (e) => {
    e.preventDefault();
    if (!text) {
      window.alert(edit && "Text Length too short");
      return;
    }
    setTaskData(
      taskData.map((task) =>
        task.id === editId ? { id: editId, task: text, completed: false } : task
      )
    );
    setText("");
    setEditId(0);
    setEdit(false);
  };

  const completeTask = (id) => {
    if (window.confirm("Are you Sure that task is complete?")) {
      setTaskData(
        taskData.map((item) =>
          item.id === id ? { ...item, completed: true } : item
        )
      );
    }
  };

  return (
    <div className="app">
      <header>
        <h1 className="d-flex mt-2 flex-center items-center">TODO LIST</h1>
      </header>
      <hr className="line" style={{ marginTop: "1rem" }} />
      <form className="d-flex items-center mt-2 flex-center gap-2">
        <label htmlFor="todo" className="sr-only">
          Add a new task:
        </label>
        <input
          type="text"
          name="todo_text"
          id="todo"
          placeholder="Add your task"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
          autoFocus
          ref={inputRef}
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
                  aria-label="complete task"
                />
                <p className="todo">{todo.task}</p>
                <button
                  onClick={() => setEditTodo(todo.id)}
                  aria-label="Edit task"
                >
                  <Pen size="25px" color="skyblue" />
                </button>
                <button
                  onClick={() => removeTask(todo.id)}
                  aria-label="Delete task"
                >
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
                  aria-label="completed task"
                />
                <div className="todo">
                  <strike>{todo.task}</strike>
                </div>
                <button
                  onClick={() =>
                    window.alert(
                      "Sorry, task is completed you can not change it."
                    )
                  }
                >
                  <Pen size="25px" color="skyblue" />
                </button>
                <button
                  onClick={() => removeTask(todo.id)}
                  aria-label="Delete task"
                >
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
        aria-label="github repository "
      >
        <img src={github} alt="github" className="github" />
      </a>
    </div>
  );
}

export default App;
