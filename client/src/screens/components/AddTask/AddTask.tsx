import { useState } from "react";
import axios from "axios";

export const AddTask = () => {
  const [task, setTask] = useState<string>();

  const addTask = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then(() => location.reload())
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="create-form">
        <input type="text" name="" onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={addTask}>
          Add
        </button>
      </div>
    </>
  );
};
