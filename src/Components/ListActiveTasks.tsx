import { useEffect, useState } from "react";
import { Task } from "./TaskItem";
import formatTime from "./Utilities/FormatTimeStats";

function ListActiveTasks() {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  //Fetchar min endpoint för att rendera ut en lista av alla aktiva tasks
  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks/active")
      .then((res) => res.json())
      .then((data) => setActiveTasks(data));
  }, []);

  return (
    <div className="taskContainer">
      <h2>Active tasks:</h2>
      <p className="statisticsText">View time spent on tasks this week:</p>
      {/*Om listan av aktiva tasks är tom så visas istället en text*/}
      {activeTasks.length === 0 ? (
        <p>You do not have any active tasks.</p>
      ) : (
        //Mappar igenom alla tasks som hittades och skriver ut med namn, tid och skapelsedatum
        activeTasks.map((task) => (
          <div key={task.id}>
            <h3>Task name: {task.taskName}</h3>
            {/*Använder formatTime från utilites för att formatera tiden*/}
            <p className="timer">Time: {formatTime(task.time)}</p>
            <p>Creation date: {task.taskDate}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListActiveTasks;
