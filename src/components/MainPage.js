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
    // you use the same function in MainPage and DataTable - maybe custom hook would be helpful here?
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
          const updatedData = { ...prev, [endpoint]: result }; // TTT: Good idea with [endpoint] :D Tiny note: You may use a shorten syntax here :)
          return updatedData;
        });
        setError(null); // Ha, nice :D So easy to forget about it :D
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
      {!loading &&
        data.clientinfo && ( // maaaybe...you could pass "loading" as a param, then you could check once if it loads or not in the component :)
          <RenderDataGrid
            data={data} // here and beneath you pass the same data to those components. More clean would be to pass only particular data set
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
