import React from "react";
import MPMenu from "./MPMenu";
import CircularProgress from "@mui/material/CircularProgress";
import InfoGrid from "./InfoGrid";
import Error from "./Error";
import useFetchData from "../hooks/useFetchData";

const MainPage = ({ ticketId }) => {
  const {
    data: clientInfo,
    error: clientInfoError,
    loading: clientInfoLoading,
  } = useFetchData(ticketId, "clientinfo");
  const {
    data: currentOrders,
    error: currentOrdersError,
    loading: currentOrdersLoading,
  } = useFetchData(ticketId, "currentorders");

  const isLoading = clientInfoLoading || currentOrdersLoading;
  const error = clientInfoError || currentOrdersError;

  if (!ticketId) {
    return <div>Ładowanie ticketId...</div>;
  }

  return (
    <>
      <MPMenu ticketId={ticketId} />
      {isLoading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {!isLoading && clientInfo && (
        <InfoGrid
          data={clientInfo}
          title={"Dane Klienta"}
          dataKey={"clientinfo"}
        />
      )}
      {!isLoading && currentOrders && (
        <InfoGrid
          data={currentOrders}
          title={"Zamówienia"}
          dataKey={"currentorders"}
        />
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default MainPage;
