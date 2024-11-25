import React, { useState, useEffect } from "react";
import GoBackButton from "./GoBackButton";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "./Error";
import RenderDataGrid from "./RenderDataGrid";

const DataTable = ({ ticketId }) => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let title = "";

  const endpointFromPath = () => {
    if (location.pathname.includes("other-orders"))
      return { path: "restorders", title: "Pozostałe zamówienia" };
    if (location.pathname.includes("shipment-info"))
      return { path: "shipment", title: "Dane wysyłki" };
    if (location.pathname.includes("invoices"))
      return { path: "invoices", title: "Faktury" };
    // what will happen if no condition fits? :)
  };

  let endpoint = endpointFromPath().path;
  title = endpointFromPath().title; // maybe just let title = ... ? :)

  const fetchData = async (ticketId, endpoint) => {
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/endpoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId,
          endpoint,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setData((prev) => {
          const updatedData = { ...prev, [endpoint]: result };
          return updatedData;
        });
        setError(null);
      } else {
        setError(result.error || "Unknown error");
      }
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId && (!data || !data[endpoint])) {
      fetchData(ticketId, endpoint);
    }
  }, [ticketId, endpoint, data]);

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
        <RenderDataGrid data={data} title={title} dataKey={endpoint} />
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default DataTable;
