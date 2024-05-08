interface Props {
  setPage: (page: string) => void;
}
//Skapar navigationsknapparna och sätter även vilken sida man ska tas till vid klick
function NavBar(props: Props) {
  return (
    <div className="navBar">
      <button onClick={() => props.setPage("start")}>Homepage</button>
      <button onClick={() => props.setPage("tasks")}>Task list</button>
      <button onClick={() => props.setPage("add")}>Add tasks</button>
      <button onClick={() => props.setPage("statistics")}>Statistics</button>
    </div>
  );
}

export default NavBar;
