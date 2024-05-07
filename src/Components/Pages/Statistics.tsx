import ListActiveTasks from "../ListActiveTasks";
import ListInactiveTasks from "../ListInactiveTasks";

function Statistics() {
  return (
    <div>
      <h2>Statistics</h2>
      <p className="statisticsText">
        View your total time spent on your tasks:
      </p>
      <ListActiveTasks />
      <ListInactiveTasks />
    </div>
  );
}

export default Statistics;
