import React, { useEffect, useState } from "react";

interface Task {
  id: string;
  taskName: string;
}

function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
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
