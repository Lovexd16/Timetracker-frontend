import React, { useEffect, useState } from "react";

interface Task {
  id: string;
  taskName: string;
}

function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("https://jellyfish-app-4sahl.ondigitalocean.app/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <>
      {tasks.map((task: Task) => (
        <div key={task.id}>{task.taskName}</div>
      ))}
    </>
  );
}

export default ListTasks;
