import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import NoPage from "./components/NoPage";
import DataTable from "./components/DataTable";

const TicketIdProvider = ({ children }) => {
  const location = useLocation();
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // return query parameter string
    const id = queryParams.get("ticket_id");
    setTicketId(id);
  }, [location]);

  return React.cloneElement(children, { ticketId }); // pass aditional props by cloning existing react element
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
          path={"/other-orders"}
          element={
            <TicketIdProvider>
              <DataTable />
            </TicketIdProvider>
          }
        />
        <Route
          path={"/shipment-info"}
          element={
            <TicketIdProvider>
              <DataTable />
            </TicketIdProvider>
          }
        />
        <Route
          path={"/invoices"}
          element={
            <TicketIdProvider>
              <DataTable />
            </TicketIdProvider>
          }
        />
        <Route
          path={"/overdue-payments"}
          element={
            <TicketIdProvider>
              <DataTable />
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
