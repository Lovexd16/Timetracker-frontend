import React, { useState } from "react";

function AddTask() {
  const [newTask, setNewTask] = useState<string>("");

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName: newTask }),
    }).then(() => setNewTask(""));
  };

  return (
    <div>
      <form onSubmit={addNewTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddTask;
