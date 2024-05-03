interface Props {
  setPage: (page: string) => void;
}

function NavBar(props: Props) {
  return (
    <div>
      <button onClick={() => props.setPage("start")}>Homepage</button>
      <button onClick={() => props.setPage("tasks")}>Task list</button>
      <button onClick={() => props.setPage("add")}>Add tasks</button>
      <button onClick={() => props.setPage("statistics")}>Statistics</button>
    </div>
  );
}

export default NavBar;
