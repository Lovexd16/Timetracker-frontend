import { useState, useEffect } from "react";

interface Task {
  id: string;
  taskName: string;
}

function TaskItem({ task, onDelete }: { task: Task; onDelete: () => void }) {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const deleteTask = async () => {
    await fetch(
      `https://jellyfish-app-4sahl.ondigitalocean.app/task/${task.id}`,
      {
        method: "DELETE",
      }
    );
    onDelete();
  };

  useEffect(() => {
    fetch(`https://jellyfish-app-4sahl.ondigitalocean.app/task/${task.id}/time`)
      .then((res) => res.json())
      .then((data) => {
        setTime(data);
      });
  }, [task.id]);

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

  const formatTimer = (time: number) => {
    const mins = Math.floor((time / 60000) % 60);
    const secs = Math.floor((time / 1000) % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div key={task.id}>
      {task.taskName}
      {timerRunning ? (
        <button onClick={saveTime}>Stop timer</button>
      ) : (
        <button onClick={() => setTimerRunning(true)}>Start timer</button>
      )}
      <span>{formatTimer(time)}</span>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default TaskItem;
