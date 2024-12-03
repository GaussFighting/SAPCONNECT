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
  const {
    data: purchaseOrders,
    error: purchaseOrdersError,
    loading: purchaseOrdersLoading,
  } = useFetchData(ticketId, "purchaseorders");

  const isLoading =
    clientInfoLoading || currentOrdersLoading || purchaseOrdersLoading;
  const errors = [
    clientInfoError,
    currentOrdersError,
    purchaseOrdersError,
  ].filter(Boolean);

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
      {!isLoading && purchaseOrders && (
        <InfoGrid
          data={purchaseOrders}
          title={"Zamówienia zakupu"}
          dataKey={"purchaseorders"}
        />
      )}
      {errors.length > 0 && (
        <div>
          {errors.map((err, index) => (
            <Error key={index} error={err} />
          ))}
        </div>
      )}
    </>
  );
};

export default MainPage;
