import { useState, useEffect } from "react";
import formatTime from "./Utilities/FormatTimeStats";

export interface Task {
  id: string;
  taskName: string;
  taskDate: string;
  time: number;
}

function TaskItem({ task, onDelete }: { task: Task; onDelete: () => void }) {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  //Fetchar endpointen för att soft deleta en task
  const deleteTask = async () => {
    await fetch(
      `https://jellyfish-app-4sahl.ondigitalocean.app/task/${task.id}/soft`,
      {
        method: "DELETE",
      }
    );
    onDelete();
  };

  //Fetchar endpointen för att visa tiden av en task
  useEffect(() => {
    fetch(`https://jellyfish-app-4sahl.ondigitalocean.app/task/${task.id}/time`)
      .then((res) => res.json())
      .then((data) => {
        setTime(data);
      });
  }, [task.id]);

  //useEffect för att hantera start och stop av timern
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

  //Stannar timern och fetchar patch endpoint för att ändra den sparade tiden till den nya tiden
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
    <div key={task.id} className="taskContainer">
      <h3>{task.taskName}</h3>
      {/*Om timern är på, visas knappen som "Stop timer", och när den trycks sparas den nya tiden till databasen*/}
      {timerRunning ? (
        <button className="stopBtn" onClick={saveTime}>
          Stop timer
        </button>
      ) : (
        //Annars visas knappen som "Start timer", som vid klick startar timern
        <button className="startBtn" onClick={() => setTimerRunning(true)}>
          Start timer
        </button>
      )}

      {/*Visar tiden med formatet från utlities fil*/}
      <span className="timer">{formatTime(time)}</span>

      {/*Knapp för att soft-deleta tasks med deleteTask*/}
      <button className="deleteBtn" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
