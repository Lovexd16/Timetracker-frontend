import { useEffect, useState } from "react";
import { Task } from "./TaskItem";
import formatTime from "./Utilities/FormatTimeStats";

function ListActiveTasks() {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks/active")
      .then((res) => res.json())
      .then((data) => setActiveTasks(data));
  }, []);

  return (
    <div className="taskContainer">
      <h2>Active tasks:</h2>
      <p className="statisticsText">View time spent on tasks this week:</p>
      {activeTasks.length === 0 ? (
        <p>You do not have any active tasks.</p>
      ) : (
        activeTasks.map((task) => (
          <div key={task.id}>
            <h3>Task name: {task.taskName}</h3>
            <p className="timer">Time: {formatTime(task.time)}</p>
            <p>Creation date: {task.taskDate}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListActiveTasks;
