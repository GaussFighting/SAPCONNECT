import React, { useState, useEffect } from "react";
import GoBackButton from "./GoBackButton";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { getColumns, getRows } from "../utils/utils";
import Error from "./Error";

const DataTable = ({ ticketId }) => {
  const location = useLocation();
  let title = "";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpointFromPath = () => {
    if (location.pathname.includes("other-orders"))
      return { path: "restorders", title: "Pozostałe zamówienia" };
    if (location.pathname.includes("shipment-info"))
      return { path: "shipment", title: "Dane wysyłki" };
    if (location.pathname.includes("invoices"))
      return { path: "invoices", title: "Faktury" };
  };

  let endpoint = endpointFromPath().path;
  title = endpointFromPath().title;

  const fetchData = async (ticketId, endpoint, setData) => {
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
        setData(result);
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
    if (!data) {
      fetchData(ticketId, endpoint, setData);
    }
  }, [ticketId, endpoint, data]);

  return (
    <>
      <GoBackButton ticketId={ticketId} />
      {loading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {!loading && data && (
        <div>
          <div className="title">{title}</div>
          <div style={{ height: "400px", width: "100%" }}>
            <DataGrid
              rows={getRows(data)}
              columns={getColumns(data)}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default DataTable;
