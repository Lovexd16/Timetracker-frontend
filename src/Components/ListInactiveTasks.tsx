import { useEffect, useState } from "react";
import { Task } from "./TaskItem";
import formatTime from "./Utilities/FormatTimeStats";

function ListInactiveTasks() {
  const [inactiveTasks, setInactiveTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks/deleted")
      .then((res) => res.json())
      .then((data) => setInactiveTasks(data));
  }, []);

  const handleHardDelete = (taskId: string) => {
    fetch(`https://jellyfish-app-4sahl.ondigitalocean.app/task/${taskId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setInactiveTasks(inactiveTasks.filter((task) => task.id !== taskId));
        console.log(data);
      });
  };

  return (
    <div className="statsLists">
      <h2>Inaktiva uppgifter:</h2>
      {inactiveTasks.map((task) => (
        <div key={task.id}>
          <p>Task name: {task.taskName}</p>
          <p>Time: {formatTime(task.time)}</p>
          <p>Creation date: {task.taskDate}</p>
          <button
            className="deleteBtn"
            onClick={() => handleHardDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListInactiveTasks;
