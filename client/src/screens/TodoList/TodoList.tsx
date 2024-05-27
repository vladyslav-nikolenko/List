import { AddTask } from "../components/AddTask/AddTask.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./TodoList.ts";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CheckIcon from "@mui/icons-material/Check";

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handleCheck = (id: string) => {
    axios
      .put("http://localhost:3001/check/" + id)
      .then(() => location.reload())
      .catch((error) => console.log(error));
  };

  const handleDelete = (id: string) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(() => location.reload())
      .catch((error) => console.log(error));
  };

  return (
    <div className="home">
      <h2>Todo list</h2>
      <AddTask />
      {todos.length === 0 ? (
        <h3>No results</h3>
      ) : (
        todos.map((todo: Todo) => (
          <div className="task">
            {!todo.isDone ? (
              <CropSquareIcon onClick={() => handleCheck(todo._id)} />
            ) : (
              <CheckIcon onClick={() => handleCheck(todo._id)} />
            )}
            <span className={todo.isDone ? "line-through" : undefined}>
              {todo.task}
            </span>
            <button type="button" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};
