import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { Task } from "./TaskItem";

function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks/active")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)}
          />
        ))
      ) : (
        <p>You currently do not have any tasks!</p>
      )}
    </>
  );
}

export default ListTasks;
