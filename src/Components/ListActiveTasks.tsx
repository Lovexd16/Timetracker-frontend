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
    <div className="statsLists">
      <h2>Aktiva uppgifter:</h2>
      {activeTasks.map((task) => (
        <div key={task.id}>
          <p>Task Name: {task.taskName}</p>
          <p>Time spent: {formatTime(task.time)}</p>
          <p>Creation date: {task.taskDate}</p>
        </div>
      ))}
    </div>
  );
}

export default ListActiveTasks;
