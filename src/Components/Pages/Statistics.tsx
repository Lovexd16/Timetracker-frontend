import ListActiveTasks from "../ListActiveTasks";
import ListInactiveTasks from "../ListInactiveTasks";

function Statistics() {
  return (
    <div>
      <h2>Statistics</h2>
      {/*Hämtar ListActiveTasks & ListInactiveTasks för att visa de olika listorna på sidan*/}
      <ListActiveTasks />
      <ListInactiveTasks />
    </div>
  );
}

export default Statistics;
