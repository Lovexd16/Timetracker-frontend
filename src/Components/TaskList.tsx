import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  taskName: string;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <>
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </>
  );
}

export default TaskList;
