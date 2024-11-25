import React from "react";
import GoBackButton from "./GoBackButton";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "./Error";
import InfoGrid from "./InfoGrid";
import useFetchData from "../hooks/useFetchData";

const DataTable = ({ ticketId }) => {
  const location = useLocation();

  const endpointFromPath = () => {
    if (location.pathname.includes("other-orders"))
      return { path: "restorders", title: "Pozostałe zamówienia" };
    if (location.pathname.includes("shipment-info"))
      return { path: "shipment", title: "Dane wysyłki" };
    if (location.pathname.includes("invoices"))
      return { path: "invoices", title: "Faktury" };
  };

  const { path: endpoint, title } = endpointFromPath();
  const { data, error, loading } = useFetchData(ticketId, endpoint);

  if (!ticketId) {
    return <div>Ładowanie ticketId...</div>;
  }

  return (
    <>
      <GoBackButton ticketId={ticketId} />
      {loading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {!loading && data && (
        <InfoGrid data={data} title={title} dataKey={endpoint} />
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default DataTable;
