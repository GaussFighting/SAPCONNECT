import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Table from "./components/Table";
import NoPage from "./components/NoPage";

const App = () => {
  const [ticketId, setTicketId] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("ticketId");
    setTicketId(id);
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path={"/:ticket_id"}
          element={<MainPage ticketId={ticketId} />}
        />
        <Route path={"/table"} element={<Table ticketId={ticketId} />} />
        <Route
          path={"/error"}
          element={<NoPage message={"Brak przesłanego ID ticketu!"} />}
        />
        <Route
          path={"/*"}
          element={<NoPage message={"Strona nie istnieje"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
