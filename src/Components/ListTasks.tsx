import { useState, useEffect } from "react";

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

  const TaskItem = ({ task }: { task: Task }) => {
    const [time, setTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
      let interval;
      if (timerRunning) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else {
        clearInterval(interval!);
      }
      return () => clearInterval(interval!);
    }, [timerRunning]);

    const saveTime = async () => {
      setTimerRunning(false);

      fetch(
        `https://jellyfish-app-4sahl.ondigitalocean.app/task/${task.id}/time`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ time }),
        }
      );
    };

    return (
      <div key={task.id}>
        {task.taskName}
        {timerRunning ? (
          <button onClick={saveTime}>Stop timer</button>
        ) : (
          <button onClick={() => setTimerRunning(true)}>Start timer</button>
        )}
        <span>{"0" + Math.floor((time / 60000) % 60)}:</span>
        <span>{"0" + Math.floor((time / 1000) % 60)}</span>
      </div>
    );
  };

  return (
    <>
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </>
  );
}

export default ListTasks;
