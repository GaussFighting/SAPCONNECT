import React, { useState, useEffect } from "react";
import MPMenu from "./MPMenu";
import CircularProgress from "@mui/material/CircularProgress";
import RenderDataGrid from "./RenderDataGrid";
import Error from "./Error";

const MainPage = ({ ticketId }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ clientinfo: null, currentorders: null });

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
    if (ticketId) {
      fetchData(ticketId, "clientinfo");
      fetchData(ticketId, "currentorders");
    }
  }, [ticketId]);

  if (!ticketId) {
    return <div>Ładowanie ticketId...</div>;
  }

  return (
    <>
      <MPMenu ticketId={ticketId} />
      {loading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {!loading && data.clientinfo && (
        <RenderDataGrid
          data={data}
          title={"Dane Klienta"}
          dataKey={"clientinfo"}
        />
      )}
      {!loading && data.currentorders && (
        <RenderDataGrid
          data={data}
          title={"Zamówienia"}
          dataKey={"currentorders"}
        />
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default MainPage;
