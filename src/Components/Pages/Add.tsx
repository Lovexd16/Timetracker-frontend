import AddTask from "../AddTask";

function Add() {
  return (
    <div>
      <h2>Add new tasks here!</h2>
      {/*Hämtar addTask filen för att visa "lägga till" formuläret*/}
      <AddTask />
    </div>
  );
}

export default Add;
