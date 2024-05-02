import "./App.css";
import AddTask from "./Components/AddTask";
import ListTasks from "./Components/ListTasks";

function App() {
  return (
    <>
      <h1>Timetracker</h1>
      <AddTask />
      <ListTasks />
    </>
  );
}

export default App;
