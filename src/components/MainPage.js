import React, { useState, useEffect } from "react";
import MPMenu from "./MPMenu";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns, getRows } from "../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";

const MainPage = (props) => {
  const ticketId =
    process.env.NODE_ENV === "development" ? "42380" : props.ticketId;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ clientinfo: null, currentorders: null });

  const fetchData = async (endpoint, ticketId) => {
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
        setData((prev) => ({ ...prev, [endpoint]: result }));
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
    fetchData("clientinfo", ticketId);
    fetchData("currentorders", ticketId);
  }, [ticketId]);

  const renderDataGrid = (title, dataKey) => (
    <>
      <div className="title">{title}</div>
      <DataGrid
        rows={getRows(data[dataKey])}
        columns={getColumns(data[dataKey])}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ marginBottom: "20px" }}
      />
    </>
  );

  return (
    <>
      <MPMenu ticketId={ticketId} />
      {loading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {!loading &&
        data.clientinfo &&
        renderDataGrid("Dane Klienta", "clientinfo")}
      {!loading &&
        data.currentorders &&
        renderDataGrid("Zamówienia", "currentorders")}
      {error && <div>Error: {error}</div>}
    </>
  );
};

export default MainPage;
