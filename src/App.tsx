import "./App.css";
import Tasks from "./Components/Pages/Tasks";
import Statistics from "./Components/Pages/Statistics";
import Start from "./Components/Pages/Start";
import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";

function App() {
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "start";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>
      <h1>TimeTracker</h1>
      <NavBar setPage={setPage} />

      {
        {
          start: <Start />,
          tasks: <Tasks />,
          statistics: <Statistics />,
        }[page]
      }
    </>
  );
}

export default App;
