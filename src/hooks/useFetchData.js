import { useState, useEffect } from "react";

const useFetchData = (ticketId, endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!ticketId || !endpoint) return;

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

    fetchData();
  }, [ticketId, endpoint]);

  return { data, error, loading };
};

export default useFetchData;
