import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import Table from "./components/Table";
import NoPage from "./components/NoPage";

const TicketIdProvider = ({ children }) => {
  const location = useLocation();
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("ticket_id");
    setTicketId(id);
  }, [location]);

  return React.cloneElement(children, { ticketId });
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={"/"}
          element={
            <TicketIdProvider>
              <MainPage />
            </TicketIdProvider>
          }
        />
        <Route
          path={"/table"}
          element={
            <TicketIdProvider>
              <Table />
            </TicketIdProvider>
          }
        />
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
