import "./App.css";
import Tasks from "./Components/Pages/Tasks";
import Statistics from "./Components/Pages/Statistics";
import Start from "./Components/Pages/Start";
import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Add from "./Components/Pages/Add";

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
        //Om sidan inte finns skickas man till start sidan
        pageUrl = "start";
      }
    }

    //Visar sidan man är på i URL:en
    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>
      <h1>TimeTracker</h1>
      {/*Visar NavBar komponenten*/}
      <NavBar setPage={setPage} />

      {
        {
          //switch som sätter sidan till rätt komponent
          start: <Start />,
          tasks: <Tasks />,
          add: <Add />,
          statistics: <Statistics />,
        }[page]
      }
    </>
  );
}

export default App;
