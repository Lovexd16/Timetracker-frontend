import ListTasks from "../ListTasks";

function Tasks() {
  return (
    <div>
      <h2>Tasks:</h2>
      {/*Hämtar ListTasks filen för att visa listan av aktiva tasks*/}
      <ListTasks />
    </div>
  );
}

export default Tasks;
