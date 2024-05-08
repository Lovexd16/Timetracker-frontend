import React, { useState } from "react";

function AddTask() {
  const [newTask, setNewTask] = useState<string>("");

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    //För att undvika omladdning av sidan
    e.preventDefault();

    //Fetchar min Post endpoint för att lägga till en task
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName: newTask }),
    }).then(() => {
      //Tömmer input-fältet vid lyckad tillägning av task
      setNewTask("");
      //Alert för att informera att en task har blivit tillagd
      alert("Your task has been added!");
    });
  };

  return (
    <div>
      {/*Kallar på addNewTask vid submit*/}
      <form onSubmit={addNewTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new tasks"
          required
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddTask;
