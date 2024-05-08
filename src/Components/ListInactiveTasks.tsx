import { useEffect, useState } from "react";
import { Task } from "./TaskItem";
import formatTime from "./Utilities/FormatTimeStats";

function ListInactiveTasks() {
  const [inactiveTasks, setInactiveTasks] = useState<Task[]>([]);

  //Fetchar endpointen för att hämta alla tasks som är soft-deletade
  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks/deleted")
      .then((res) => res.json())
      .then((data) => setInactiveTasks(data));
  }, []);

  //Fetchar min endpoint för att helt deleta en task
  const handleHardDelete = async (taskId: string) => {
    fetch(`https://jellyfish-app-4sahl.ondigitalocean.app/task/${taskId}`, {
      method: "DELETE",
    });
    //Gör så att listan visas utan den borttagna uppgiften utan att behöva refresha sidan
    setInactiveTasks((prevInactiveTasks) =>
      prevInactiveTasks.filter((task) => task.id !== taskId)
    );
    console.log("Task successfully deleted");
  };

  return (
    <div className="taskContainer">
      <h2>Inactive tasks:</h2>
      <p className="statisticsText">View time spent on tasks in total:</p>
      {inactiveTasks.length === 0 ? (
        <p>You do not have any inactive tasks.</p>
      ) : (
        inactiveTasks.map((task) => (
          <div key={task.id}>
            <h3>Task name: {task.taskName}</h3>
            <p className="timer">Time: {formatTime(task.time)}</p>
            <p>Creation date: {task.taskDate}</p>
            {/*använder handleHardDelete metoden för att ta bort en uppgift genom knappen*/}
            <button
              className="deleteBtn"
              onClick={() => handleHardDelete(task.id)}
            >
              Delete forever
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ListInactiveTasks;
